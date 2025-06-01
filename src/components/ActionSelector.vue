<template>
  <div class="action-selector-container">
    <div class="selector-header">
      <h2>Selecciona la acción</h2>
    </div>
    
    <div class="action-buttons">
      <button
        @click="selectAction('resumir')"
        :class="['action-btn', { 'active': selectedAction === 'resumir', 'disabled': disabled }]"
        :disabled="disabled"
      >
        <span class="action-icon">📝</span>
        <span class="action-text">Resumir</span>
        <span v-if="selectedAction === 'resumir'" class="active-indicator">⦿</span>
      </button>

      <!-- Botón de "Traducir" oculto -->
      <!--
      <button
        @click="selectAction('traducir')"
        :class="['action-btn', { 'active': selectedAction === 'traducir', 'disabled': disabled }]"
        :disabled="disabled"
      >
        <span class="action-icon">🌐</span>
        <span class="action-text">Traducir</span>
        <span v-if="selectedAction === 'traducir'" class="active-indicator">⦿</span>
      </button>
      -->
    </div>

    <button 
      class="process-btn"
      :disabled="disabled"
      @click="$emit('confirm-action')"
    >
      Procesar
    </button>

    <div v-if="disabled" class="selector-hint">
      <small>Ingresa texto o sube un archivo para activar las opciones</small>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ActionSelector',
  props: {
    selectedAction: {
      type: String,
      default: 'resumir'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['action-change', 'confirm-action'],
  methods: {
    selectAction(action) {
      if (!this.disabled) {
        this.$emit('action-change', action)
      }
    }
  }
}
</script>

<style scoped>
.action-selector-container {
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background: #f0f0f0;
}

.action-btn.active {
  border-color: #007bff;
  background-color: #e6f0ff;
}

.process-btn {
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.process-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
