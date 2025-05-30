<template>
  <div class="text-input-container">
    <div class="input-header">
      <h2>Ingresa tu texto o sube un archivo</h2>
    </div>
    
    <div class="input-content">
      <div class="text-area-section">
        <label for="text-input" class="input-label">Texto:</label>
        <textarea
          id="text-input"
          v-model="localText"
          @input="onTextChange"
          placeholder="Escribe aquí tu texto..."
          class="text-area"
          :disabled="loading"
        ></textarea>
      </div>
      
      <div class="file-upload-section">
        <label class="file-upload-label">
          <span class="upload-icon">📄</span>
          <span>Archivo PDF</span>
          <input
            type="file"
            @change="onFileUpload"
            accept=".pdf,.docx"
            class="file-input"
            :disabled="loading"
          />
        </label>
        
        <div v-if="uploadedFileName" class="uploaded-file">
          <span class="file-name">{{ uploadedFileName }}</span>
          <button @click="removeFile" class="remove-file-btn">✕</button>
        </div>
        
        <div class="file-info">
          <small>Formatos soportados: PDF, DOCX</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['text-change', 'file-upload'],
  data() {
    return {
      localText: '',
      uploadedFileName: ''
    }
  },
  methods: {
    onTextChange() {
      this.$emit('text-change', this.localText)
    },
    
    onFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        // Validar tipo de archivo
        const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if (!validTypes.includes(file.type)) {
          alert('Formato de archivo no válido. Solo se permiten PDF y DOCX.')
          return
        }
        
        // Validar tamaño (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
          alert('El archivo es demasiado grande. Máximo 10MB.')
          return
        }
        
        this.uploadedFileName = file.name
        this.$emit('file-upload', file)
        this.localText = '' // Limpiar texto si se sube archivo
      }
    },
    
    removeFile() {
      this.uploadedFileName = ''
      this.$emit('file-upload', null)
    }
  }
}
</script>