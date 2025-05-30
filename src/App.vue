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
import TextInput from './components/TextInput.vue';
import ActionSelector from './components/ActionSelector.vue';
import ResultDisplay from './components/ResultDisplay.vue';

export default {
  name: 'AppMain',
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
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        const content = this.uploadedFile
          ? `Contenido del archivo: ${this.uploadedFile.name}`
          : this.inputText
        
        if (this.selectedAction === 'resumir') {
          this.result = `Resumen: ${content.substring(0, 100)}...`
        } else {
          this.result = `Traducción: [Translated content of: ${content.substring(0, 50)}...]`
        }
      } catch (err) {
        this.error = 'Error al procesar el contenido. Inténtalo de nuevo.'
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
