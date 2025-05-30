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
      uploadedFileName: '',
      internalFile: null
    }
  },
  watch: {
    localText(newText) {
      if (newText.trim()) {
        // Crear archivo txt a partir del texto
        const blob = new Blob([newText], { type: 'text/plain' })
        const file = new File([blob], 'texto.txt', { type: 'text/plain' })
        this.internalFile = file
        this.uploadedFileName = file.name
        this.$emit('file-upload', file)
      } else if (!this.uploadedFileName) {
        // Si no hay texto ni archivo, emitimos null
        this.internalFile = null
        this.$emit('file-upload', null)
      }
    }
  },
  methods: {
    onTextChange() {
      // Emitimos el texto para otras partes que lo usen
      this.$emit('text-change', this.localText)
    },
    
    onFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        const validTypes = [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ]
        if (!validTypes.includes(file.type)) {
          alert('Formato de archivo no válido. Solo se permiten PDF y DOCX.')
          event.target.value = null // limpiar input
          return
        }
        if (file.size > 10 * 1024 * 1024) {
          alert('El archivo es demasiado grande. Máximo 10MB.')
          event.target.value = null // limpiar input
          return
        }
        // Al subir archivo real, limpiamos texto y guardamos archivo
        this.localText = ''
        this.internalFile = file
        this.uploadedFileName = file.name
        this.$emit('file-upload', file)
      }
    },
    
    removeFile() {
      this.uploadedFileName = ''
      this.internalFile = null
      this.localText = ''
      this.$emit('file-upload', null)
      this.$emit('text-change', '')  // Limpiar también el texto
      this.$refs.fileInput.value = null  // limpiar input file
    }
  }
}
</script>
