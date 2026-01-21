<template>
  <div v-if="modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <div class="calendly-inline-widget" 
             data-url="https://calendly.com/yuberalberto/diagnostico-gratuito-vjobs" 
             style="min-width:320px;height:850px;">
        </div>
      </div>
      
      <div class="modal-header">
        <button @click="closeModal" class="btn btn-text">
          Cerrar [X]
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

// Handle ESC key to close modal
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.modelValue) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscapeKey);
});

// Reset modal scroll behavior when opening/closing
watch(() => props.modelValue, (newValue) => {
  if (newValue === true) {
    // Modal is opening, block body scroll
    document.body.style.overflow = 'hidden';
    // Initialize Calendly widget when modal opens
    setTimeout(() => {
      const widget = document.querySelector('.calendly-inline-widget');
      if (window.Calendly && widget && widget.innerHTML === '') {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/yuberalberto/diagnostico-gratuito-vjobs',
          parentElement: widget,
          prefill: {},
          utm: {}
        });
      }
    }, 100);
  } else {
    // Modal is closing, restore scroll
    document.body.style.overflow = '';
  }
});

// Close the modal
const closeModal = () => {
  emit('update:modelValue', false);
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 1rem;
  max-width: 600px;
  width: 100%;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
  display: flex;
  flex-direction: column;
}

.modal-body {
  flex: 1;
  overflow: hidden;
}

.modal-header {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    flex-shrink: 0;
}

.modal-header .btn-text {
  color: var(--primary-color);
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.modal-header .btn-text:hover {
  transform: translateY(-2px);
  color: var(--accent-color);
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 0.75rem;
    margin: 1rem;
  }
}

@media (max-width: 576px) {
  .modal-content {
    padding: 0.5rem;
    margin: 0.5rem;
  }
}
</style>
