<template>
  <div v-if="modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-body">
        <div class="calendly-inline-widget" 
             data-url="https://calendly.com/vjobs-2023/diagnostico-inicial-gratuito-vjobs" 
             style="min-width:320px;height:850px;">
        </div>
      </div>
      
      <div class="modal-footer">
        <button @click="closeModal" class="btn btn-text">
          Cerrar [X]
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

// Browser back button handling
const isBrowserBack = ref(false);

// Handle ESC key to close modal
const handleEscapeKey = (event) => {
  if (event.key === 'Escape' && props.modelValue) {
    closeModal();
  }
};

// Handle browser back button
const handlePopState = () => {
  if (props.modelValue) {
    isBrowserBack.value = true;
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscapeKey);
});

onUnmounted(() => {
  // Safety net: clean up event listener if component is destroyed
  window.removeEventListener('popstate', handlePopState);
  document.removeEventListener('keydown', handleEscapeKey);
});

// Reset modal scroll behavior when opening/closing
watch(() => props.modelValue, (newValue) => {
  if (newValue === true) {
    // Modal is opening, block body scroll
    document.body.style.overflow = 'hidden';
    
    // Add browser history entry for back button handling
    window.history.pushState({ modalOpen: true }, '', window.location.href);
    window.addEventListener('popstate', handlePopState); // ✅ Justo después de pushState
    
    // Initialize Calendly widget when modal opens
    setTimeout(() => {
      const widget = document.querySelector('.calendly-inline-widget');
      if (window.Calendly && widget && widget.innerHTML === '') {
        window.Calendly.initInlineWidget({
          url: 'https://calendly.com/vjobs-2023/diagnostico-inicial-gratuito-vjobs',
          parentElement: widget,
          prefill: {},
          utm: {}
        });
      }
    }, 100);
  } else {
    // Modal is closing, restore scroll
    document.body.style.overflow = '';
    
    // Clean up browser history and event listeners
    window.removeEventListener('popstate', handlePopState); // ✅ Primero
    
    // Only go back if modal was closed by back button
    if (isBrowserBack.value) {
      isBrowserBack.value = false;
    } else {
      // Remove the history entry we added when opening modal
      window.history.back();
    }
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

.modal-footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    flex-shrink: 0;
  }

.modal-footer .btn-text {
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

.modal-footer .btn-text:hover {
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
  .modal-overlay {
    padding: 0;
  }
  
  .modal-content {
    background: white;
    border-radius: 16px 16px 0 0;
    padding: 16px 0 0 0; /* Add top padding to show border-radius */
    max-width: 100%;
    width: 100%;
    height: 85vh;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: modalSlideUp 0.3s ease-out;
    display: flex;
    flex-direction: column;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }
  
  .modal-body {
    flex: 1;
    overflow: hidden;
    padding: 0 16px; /* Add horizontal padding */
  }
  
  .calendly-inline-widget {
    min-width: 100% !important;
    height: calc(85vh - 96px) !important; /* Account for padding and header */
    border-radius: 8px; /* Add slight border-radius to widget */
    overflow: hidden;
  }
  
  .modal-footer {
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    flex-shrink: 0;
    padding: 1rem;
    background: white;
    border-top: 1px solid #f0f0f0;
    z-index: 10; /* Ensure footer is above content */
  }
}

@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 576px) {
  .modal-content {
    height: 90vh;
    border-radius: 12px 12px 0 0;
    padding: 12px 0 0 0;
  }
  
  .modal-body {
    padding: 0 12px;
  }
  
  .modal-footer {
    padding: 0.75rem;
  }
  
  .modal-footer .btn-text {
    font-size: 1.25rem;
  }
  
  .calendly-inline-widget {
    height: calc(90vh - 82px) !important;
    border-radius: 6px;
  }
}
</style>
