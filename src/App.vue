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
import { obtenerResumen } from './Service/resumenService'  // Ajusta ruta según ubicación real

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
      console.log('[handleTextChange] Nuevo texto:', text);
      this.inputText = text
      this.clearResult()
    },
    
    handleFileUpload(file) {
      console.log('[handleFileUpload] Archivo cargado:', file);
      this.uploadedFile = file
      this.clearResult()
    },
    
    handleActionChange(action) {
      console.log('[handleActionChange] Acción seleccionada:', action);
      this.selectedAction = action
      this.clearResult()
    },
    
    async processContent() {
      console.log('[processContent] Inicio de procesamiento');
      if (!this.hasContent) {
        this.error = 'Por favor, ingresa texto o sube un archivo'
        console.warn('[processContent] No hay contenido para procesar');
        return
      }

      this.loading = true
      this.error = null

      try {
        if (this.selectedAction === 'resumir') {
          if (this.uploadedFile) {
            console.log('[processContent] Enviando archivo al backend para resumen...');
            const response = await obtenerResumen({ archivo: this.uploadedFile })
            console.log('[processContent] Respuesta recibida:', response);
            // Corrección aquí: acceder a response.resumen, no response.summary
            this.result = response.resumen || 'No se recibió resumen'
          } else {
            console.log('[processContent] Resumiendo texto ingresado localmente');
            this.result = `Resumen: ${this.inputText.substring(0, 100)}...`
          }
        } else {
          console.log('[processContent] Acción traducción seleccionada');
          this.result = `Traducción: [Translated content of: ${this.inputText.substring(0, 50)}...]`
        }
      } catch (err) {
        console.error('[processContent] Error al procesar contenido:', err);
        this.error = err.message || 'Error al procesar el contenido. Inténtalo de nuevo.'
      } finally {
        this.loading = false
        console.log('[processContent] Fin de procesamiento');
      }
    },
    
    clearResult() {
      console.log('[clearResult] Limpiando resultados y errores');
      this.result = ''
      this.error = null
    }
  }
}
</script>
