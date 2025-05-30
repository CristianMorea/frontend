<template>
  <div class="result-container">
    <div class="result-header">
      <h2>{{ getTitle() }}</h2>
      <button 
        v-if="result && !loading" 
        @click="$emit('clear')"
        class="clear-btn"
      >
        Limpiar
      </button>
    </div>
    
    <div class="result-content">
      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>{{ getLoadingMessage() }}</p>
        <div class="progress-bar">
          <div class="progress-fill"></div>
        </div>
      </div>
      
      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <span class="error-icon">⚠️</span>
        <p class="error-message">{{ error }}</p>
      </div>
      
      <!-- Result State -->
      <div v-else-if="result" class="result-state">
        <div class="result-text">
          {{ result }}
        </div>
        <div class="result-actions">
          <button @click="copyResult" class="copy-btn">
            📋 Copiar
          </button>
          <button @click="downloadResult" class="download-btn">
            💾 Descargar
          </button>
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <span class="empty-icon">📄</span>
        <p>El resultado aparecerá aquí</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultDisplay',
  props: {
    result: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: null
    },
    action: {
      type: String,
      default: 'resumir'
    }
  },
  emits: ['clear'],
  methods: {
    getTitle() {
      if (this.action === 'resumir') {
        return 'Resumen'
      } else if (this.action === 'traducir') {
        return 'Traducción'
      }
      return 'Resultado'
    },
    
    getLoadingMessage() {
      if (this.action === 'resumir') {
        return 'Generando resumen...'
      } else if (this.action === 'traducir') {
        return 'Traduciendo texto...'
      }
      return 'Procesando...'
    },
    
    async copyResult() {
      try {
        await navigator.clipboard.writeText(this.result)
        // Mostrar notificación temporal
        this.showNotification('Texto copiado al portapapeles')
      } catch (err) {
        console.error('Error al copiar:', err)
      }
    },
    
    downloadResult() {
      const blob = new Blob([this.result], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${this.action}_resultado.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    
    showNotification(message) {
      // Implementar sistema de notificaciones
      alert(message) // Temporal
    }
  }
}
</script>

