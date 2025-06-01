<template>
  <div class="home-container">
    <div class="content-wrapper">
      <TextInput 
        @text-change="handleTextChange"
        @file-upload="handleFileUpload"
        :loading="loading"
      />
      
      <ActionSelector 
        @action-change="handleActionChange"
        @confirm-action="processContent"
        :selected-action="selectedAction"
        :disabled="!hasContent || loading"
      />
      
      <ResultDisplay 
        :result="result"
        :loading="loading"
        :error="error"
        :action="selectedAction"
        @clear="clearResult"
      />
    </div>
  </div>
</template>

<script>
import TextInput from '../components/TextInput.vue'
import ActionSelector from '../components/ActionSelector.vue'
import ResultDisplay from '../components/ResultDisplay.vue'
import { procesarContenido } from '../Service/resumenService'

export default {
  name: 'HomeView',
  components: {
    TextInput,
    ActionSelector,
    ResultDisplay
  },
  data() {
    return {
      inputText: '',
      uploadedFile: null,
      selectedAction: 'resumir',
      result: '',
      loading: false,
      error: null
    }
  },
  computed: {
    hasContent() {
      return this.inputText.trim() || this.uploadedFile
    }
  },
  methods: {
    handleTextChange(text) {
      this.inputText = text
      this.clearResult()
    },
    handleFileUpload(file) {
      this.uploadedFile = file
      this.clearResult()
    },
    handleActionChange(action) {
      this.selectedAction = action
      this.clearResult()
    },
    async processContent() {
      if (!this.hasContent) {
        this.error = 'Por favor, ingresa texto o sube un archivo'
        return
      }

      this.loading = true
      this.error = null

      try {
        const response = await procesarContenido({
          text: this.inputText,
          file: this.uploadedFile,
          action: this.selectedAction
        })

        this.result = response.resultado || 'No se recibió respuesta válida del servidor.'

      } catch (err) {
        this.error = 'Error al procesar el contenido. Inténtalo de nuevo.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    clearResult() {
      this.result = ''
      this.error = null
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 2rem;
  display: flex;
  justify-content: center;
}

.content-wrapper {
  width: 100%;
  max-width: 1200px;
  padding: 2rem;
  box-sizing: border-box;
  background-color: #f9f9f9;
  border-radius: 10px;
}
</style>
