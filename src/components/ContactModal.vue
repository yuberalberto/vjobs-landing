<template>
  <div v-if="modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      
      <h2>Agenda tu <span class="highlight">sesión diagnóstica gratuita</span></h2>
      <p class="modal-subtitle">Un experto te ayudará a evaluar tus opciones</p>

      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <input 
            type="text" 
            v-model="formData.name" 
            placeholder="Nombre completo" 
            required
          >
        </div>

        <div v-if="!showEmail" class="form-group">
          <input 
            type="tel" 
            v-model="formData.phone" 
            placeholder="Tu número para contactarte fácilmente" 
            required
          >
          <p class="contact-switch">
            Solo lo usaremos para esta sesión. 
            <a href="#" @click.prevent="toggleContactMethod">
              Si prefieres, puedes dejar tu correo aquí
            </a>
          </p>
        </div>

        <div v-else class="form-group">
          <input 
            type="email" 
            v-model="formData.email" 
            placeholder="Correo electrónico" 
            required
          >
          <p class="contact-switch">
            <a href="#" @click.prevent="toggleContactMethod">
              Prefiero dejar mi número de teléfono
            </a>
          </p>
        </div>

        <div class="form-group">
          <select v-model="formData.stage" required>
            <option value="" disabled selected>¿En qué etapa estás?</option>
            <option value="canada">Buscando empleo en Canadá</option>
            <option value="it">En transición a IT</option>
            <option value="exploring">Explorando opciones</option>
          </select>
        </div>

        <div class="form-group">
          <textarea 
            v-model="formData.message" 
            placeholder="Mensaje (opcional)"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" class="btn btn-primary btn-large">
          <i class="fas fa-calendar-check"></i> Agendar mi sesión gratuita
        </button>
      </form>

      <p class="privacy-notice">
        <i class="fas fa-shield-alt"></i> 
        Tu información está segura. No la compartiremos con nadie.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'submit']);

const showEmail = ref(false);
const formData = ref({
  name: '',
  phone: '',
  email: '',
  stage: '',
  message: ''
});

const toggleContactMethod = () => {
  showEmail.value = !showEmail.value;
  formData.value.phone = '';
  formData.value.email = '';
};

const closeModal = () => {
  emit('update:modelValue', false);
};

const submitForm = () => {
  emit('submit', formData.value);
  closeModal();
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
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  max-width: 500px;
  width: 100%;
  position: relative;
  animation: modalSlideIn 0.3s ease-out;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
}

.close-button:hover {
  color: var(--primary-color);
}

h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.modal-subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.9rem 1.2rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  width: 100%;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(102, 154, 207, 0.2);
}

.contact-switch {
  font-size: 0.9rem;
  color: #666;
}

.contact-switch a {
  color: var(--accent-color);
  text-decoration: none;
}

.contact-switch a:hover {
  text-decoration: underline;
}

.privacy-notice {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1.5rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

@media (max-width: 640px) {
  .modal-content {
    padding: 1.5rem;
  }
}
</style>
