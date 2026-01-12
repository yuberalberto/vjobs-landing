<template>
  <div v-if="modelValue" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">&times;</button>
      
      <h2>Agenda tu <span class="highlight">sesión diagnóstica gratuita</span></h2>
      <p class="modal-subtitle">Un experto te ayudará a evaluar tus opciones</p>

      <form @submit.prevent="submitForm" class="contact-form">
        <!-- Honeypot field - hidden from users -->
        <div class="hp-field">
          <input
            type="text"
            v-model="formData.website"
            autocomplete="off"
            tabindex="-1"
            placeholder="Leave this empty"
          >
        </div>

        <!-- Name field -->
        <div class="form-group">
          <input 
            type="text" 
            v-model="formData.name" 
            placeholder="Nombre completo *" 
            :disabled="isLoading"
            required
            @input="validateName(formData.name)"
            @blur="formData.name = formatName(formData.name)"
            :class="{ 'input-error': formErrors.name }"
          >
          <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
        </div>

        <!-- Email field -->
        <div class="form-group">
          <input 
            type="email" 
            v-model="formData.email" 
            placeholder="Correo electrónico *" 
            :disabled="isLoading"
            required
            maxlength="100"
            @input="validateEmail"
            @blur="validateEmail"
            :class="{ 'input-error': formErrors.email }"
          >
          <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
        </div>

        <!-- Phone field with country code -->
        <div class="form-group phone-group">
          <div class="phone-input-container">
            <!-- Custom dropdown implementation -->
            <div class="custom-dropdown">
              <div class="selected-option" @click="toggleDropdown">
                {{ selectedCountryDisplay }}
                <span class="dropdown-arrow"></span>
              </div>
              <div class="dropdown-options" v-if="dropdownOpen">
                <div 
                  v-for="(country, index) in countryCodes" 
                  :key="index"
                  class="dropdown-option"
                  @click="selectCountryCode(country.code)"
                >
                  {{ country.name }} ({{ country.code }})
                </div>
              </div>
            </div>
            <input 
              type="tel" 
              v-model="formData.phone" 
              placeholder="Número de teléfono *"
              :disabled="isLoading"
              @input="formatPhoneNumber"
              @blur="validatePhone"
              :class="{ 'input-error': formErrors.phone }"
              required
              maxlength="14"
            >
          </div>
          <span v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
        </div>

        <!-- Stage selection -->
        <div class="form-group">
          <select 
            v-model="formData.stage" 
            :disabled="isLoading" 
            required
            :class="{ 'input-error': formErrors.stage }"
            @change="validateStage"
          >
            <option value="" disabled selected>¿En qué etapa estás? *</option>
            <option value="canada">Buscando empleo en Canadá</option>
            <option value="it">En transición a IT</option>
            <option value="exploring">Explorando opciones</option>
          </select>
          <span v-if="formErrors.stage" class="error-message">{{ formErrors.stage }}</span>
        </div>

        <!-- Message field -->
        <div class="form-group">
          <textarea 
            v-model="formData.message" 
            placeholder="¿Algo más que debamos saber? (opcional)"
            rows="3"
            :disabled="isLoading"
            maxlength="500"
            @input="sanitizeMessage"
            :class="{ 'input-error': formErrors.message }"
          ></textarea>
          <span v-if="formErrors.message" class="error-message">{{ formErrors.message }}</span>
          <span class="character-count" :class="{ 'near-limit': formData.message.length > MESSAGE_MAX_LENGTH * 0.9 }">
            {{ formData.message.length }}/{{ MESSAGE_MAX_LENGTH }} caracteres
          </span>
        </div>

        <!-- Submit button with loading state -->
        <button type="submit" class="btn btn-primary btn-large" :disabled="isLoading">
          <span v-if="!isLoading">
            <i class="fas fa-calendar-check"></i> Agendar mi sesión gratuita
          </span>
          <span v-else>
            <i class="fas fa-spinner fa-spin"></i> Enviando...
          </span>
        </button>
        
        <!-- Form status messages -->
        <div v-if="formStatus.message" :class="['form-feedback', formStatus.type]">
          <i :class="formStatus.icon"></i> {{ formStatus.message }}
        </div>

        <p class="privacy-notice">
          <i class="fas fa-shield-alt"></i> 
          Tu información está segura. No la compartiremos con nadie.
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue';

const props = defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue', 'form-success']);

// Reset form and messages when modal opens
watch(() => props.modelValue, (newValue) => {
  if (newValue === true) {
    // Modal is opening, reset everything
    resetForm();
    resetFormStatus();
  }
});

// Form state
const isLoading = ref(false);
const lastSubmitTime = ref(0);
const SUBMIT_COOLDOWN = 30000; // 30 seconds cooldown between submissions

// Form data and validation
const countryCodes = [
  { code: '+1', name: 'US/CA' },    // Estados Unidos/Canadá
  { code: '+52', name: 'MX' },      // México
  { code: '+54', name: 'AR' },      // Argentina
  { code: '+55', name: 'BR' },      // Brasil
  { code: '+56', name: 'CL' },      // Chile
  { code: '+57', name: 'CO' },      // Colombia
  { code: '+51', name: 'PE' },      // Perú
  { code: '+58', name: 'VE' },      // Venezuela
  { code: '+506', name: 'CR' },     // Costa Rica
  { code: '+53', name: 'CU' },      // Cuba
  { code: '+593', name: 'EC' },     // Ecuador
  { code: '+502', name: 'GT' },     // Guatemala
  { code: '+504', name: 'HN' },     // Honduras
  { code: '+52', name: 'MX' },      // México
  { code: '+505', name: 'NI' },     // Nicaragua
  { code: '+507', name: 'PA' },     // Panamá
  { code: '+595', name: 'PY' },     // Paraguay
  { code: '+51', name: 'PE' },      // Perú
  { code: '+1', name: 'PR' },       // Puerto Rico
  { code: '+1', name: 'DO' },       // República Dominicana
  { code: '+598', name: 'UY' },     // Uruguay
  { code: '+58', name: 'VE' }       // Venezuela
];

const formData = ref({
  name: '',
  phone: '',
  countryCode: '+1',
  email: '',
  stage: '',
  message: '',
  website: ''  // Honeypot field - invisible to users
});

// Custom dropdown state
const dropdownOpen = ref(false);

// Get the display text for the selected country code
const selectedCountryDisplay = computed(() => {
  const country = countryCodes.find(c => c.code === formData.value.countryCode);
  return country ? `${country.name} (${country.code})` : 'US/CA (+1)';
});

// Toggle dropdown open/closed
const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

// Select a country code and close dropdown
const selectCountryCode = (code) => {
  formData.value.countryCode = code;
  dropdownOpen.value = false;
  formatCountryCode();
};

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.custom-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
      dropdownOpen.value = false;
    }
  });

});

const formErrors = reactive({
  name: '',
  phone: '',
  email: '',
  stage: '',
  message: ''
});

const formStatus = reactive({
  message: '',
  type: '', // 'success' or 'error'
  icon: ''
});

const MESSAGE_MAX_LENGTH = 500;

// Format country code, ensure it starts with + and only contains digits after
const formatCountryCode = () => {
  if (!formData.value.countryCode.startsWith('+')) {
    formData.value.countryCode = '+' + formData.value.countryCode;
  }
  formData.value.countryCode = '+' + formData.value.countryCode.slice(1).replace(/\D/g, '');
};

// Format name: trim and standardize spaces
const formatName = (name) => {
  return name.trim().replace(/\s+/g, ' ');
};

// Format phone number as (XXX) XXX-XXXX
const formatPhoneNumber = () => {
  let cleaned = formData.value.phone.replace(/\D/g, '');
  cleaned = cleaned.slice(0, 10);
  
  if (cleaned.length >= 6) {
    formData.value.phone = `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length >= 3) {
    formData.value.phone = `(${cleaned.slice(0,3)}) ${cleaned.slice(3)}`;
  } else if (cleaned.length > 0) {
    formData.value.phone = `(${cleaned}`;
  }
  
  validatePhone();
};

// Sanitize message content
const sanitizeMessage = () => {
  formErrors.message = '';
  
  // Remove HTML tags
  formData.value.message = formData.value.message.replace(/<[^>]*>/g, '');
  
  // Remove control characters and malicious Unicode
  formData.value.message = formData.value.message.replace(/[\0-\031\177-\237]/g, '');
  
  // Normalize multiple spaces/line breaks
  formData.value.message = formData.value.message.replace(/\s+/g, ' ');
  
  // Enforce length limit
  if (formData.value.message.length > MESSAGE_MAX_LENGTH) {
    formData.value.message = formData.value.message.slice(0, MESSAGE_MAX_LENGTH);
  }
  
  return true;
};

// Validate email format
const validateEmail = () => {
  formErrors.email = '';
  
  if (!formData.value.email) {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    formErrors.email = 'Ingresa un email válido';
    return false;
  }
  
  return true;
};

// Validate phone number
const validatePhone = () => {
  formErrors.phone = '';
  
  const digits = formData.value.phone.replace(/\D/g, '');
  
  if (digits.length === 0) {
    if (formData.value.phone) {
      formErrors.phone = 'Ingresa un número de teléfono válido';
    }
    return false;
  }
  
  if (digits.length !== 10) {
    formErrors.phone = 'El teléfono debe tener 10 dígitos';
    return false;
  }
  
  return true;
};

// Validate name
const validateName = (name) => {
  formErrors.name = '';
  
  if (name.length < 2) {
    formErrors.name = 'El nombre es muy corto (mínimo 2 caracteres)';
    return false;
  }
  
  if (name.length > 50) {
    formErrors.name = 'El nombre es muy largo (máximo 50 caracteres)';
    return false;
  }
  
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(name)) {
    formErrors.name = 'El nombre solo puede contener letras y espacios';
    return false;
  }
  
  return true;
};

// Validate stage selection
const validateStage = () => {
  formErrors.stage = '';
  if (!formData.value.stage) {
    formErrors.stage = 'Selecciona una etapa';
    return false;
  }
  return true;
};

// Reset form status messages
const resetFormStatus = () => {
  formStatus.type = '';
  formStatus.message = '';
  formStatus.icon = '';
};

// Reset form data to initial state
const resetForm = () => {
  formData.value = {
    name: '',
    phone: '',
    countryCode: '+1',
    email: '',
    stage: '',
    message: '',
    website: ''
  };
};

// Show success message
const showSuccess = (message) => {
  formStatus.message = message;
  formStatus.type = 'success';
  formStatus.icon = 'fas fa-check-circle';
};

// Show error message
const showError = (message) => {
  formStatus.message = message;
  formStatus.type = 'error';
  formStatus.icon = 'fas fa-exclamation-circle';
};

// Close the modal
const closeModal = () => {
  emit('update:modelValue', false);
};

// Validate all form fields
const validateForm = () => {
  return validateName(formData.value.name) && 
         validatePhone() && 
         validateEmail() && 
         validateStage();
};

// Submit form to Brevo API
const submitForm = async () => {
  resetFormStatus();
  
  // Check for honeypot
  if (formData.value.website) {
    // Show success message to the bot but close modal immediately
    setTimeout(() => {
      closeModal();
      // Emit a custom event that parent components can listen to for showing a toast/notification
      emit('form-success', 'Formulario enviado con éxito');
    }, 500);
    return;
  }
  
  // Rate limiting check
  const now = Date.now();
  const timeSinceLastSubmit = now - lastSubmitTime.value;
  if (timeSinceLastSubmit < SUBMIT_COOLDOWN) {
    const waitTimeSeconds = Math.ceil((SUBMIT_COOLDOWN - timeSinceLastSubmit) / 1000);
    showError(`Por favor espera ${waitTimeSeconds} segundos antes de enviar el formulario nuevamente.`);
    return;
  }
  
  if (!validateForm()) {
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Prepare data for API
    const payload = {
      email: formData.value.email,
      attributes: {
        FULLNAME: formData.value.name,
        PHONE: formData.value.countryCode + formData.value.phone.replace(/\D/g, ''),
        STAGE: formData.value.stage,
        MESSAGE: formData.value.message || 'No message provided',
        FUENTE: 'Modal de contacto'
      },
      listIds: [3], // Match the list ID used in ContactSection
      updateEnabled: true
    };
    
    
    // Call Brevo API via secure serverless function
    const response = await fetch('/api/brevo-contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      await response.json(); // Consume the response body
      throw new Error('Error al enviar el formulario');
    }
    
    // Show success briefly then close modal
    showSuccess('¡Gracias por contactarnos! Te llamaremos pronto para coordinar tu sesión.');
    
    // Update last submit time for rate limiting
    lastSubmitTime.value = Date.now();
    
    // Reset form data
    resetForm();
    
    // Close modal after a short delay and emit success event for parent notification
    setTimeout(() => {
      closeModal();
      emit('form-success', 'Formulario enviado con éxito');
    }, 1500);
  } catch {
    showError('Lo sentimos, tenemos un problema técnico temporal. Por favor, intenta nuevamente en unos minutos o contáctanos directamente.');
  } finally {
    isLoading.value = false;
  }
};

// All top-level bindings are automatically available in the template
// No need for explicit return in script setup
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
  overflow: visible; /* Attempt to allow dropdown to escape bounds */
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

/* Honeypot field - completely hidden from users */
.hp-field {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
  overflow: hidden;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.phone-group {
  margin-bottom: 0.5rem;
}

.phone-input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  position: relative;

  input, select {
    height: 42px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 0.9rem;
  }

  /* Custom dropdown styles */
  .custom-dropdown {
    position: relative;
    min-width: 130px;
    width: auto;
    flex: 0 1 auto;
    height: 42px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: white;
  }

  .selected-option {
    display: flex;
    align-items: center;
    padding: 0.25rem 1.5rem 0.25rem 0.5rem;
    height: 100%;
    cursor: pointer;
    position: relative;
  }

  .dropdown-arrow {
    position: absolute;
    right: 0.5rem;
    width: 12px;
    height: 12px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .dropdown-options {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    z-index: 1060;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }

  .dropdown-option {
    padding: 0.5rem;
    cursor: pointer;
  }

  .dropdown-option:hover {
    background-color: #f5f5f5;
  }

  input[type="tel"] {
    flex: 1;
  }
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

.form-group input:focus:not(:disabled),
.form-group select:focus:not(:disabled),
.form-group textarea:focus:not(:disabled) {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(102, 154, 207, 0.2);
}

.input-error {
  border-color: #dc3545 !important;
  background-color: #fff8f8;
}

.input-error:focus {
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.2) !important;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
}

.character-count {
  font-size: 0.8rem;
  color: #666;
  text-align: right;
  display: block;
  margin-top: 0.25rem;
}

.character-count.near-limit {
  color: #dc3545;
}

.contact-note {
  font-size: 0.85rem;
  color: #666;
  margin-top: 0.25rem;
}

.form-feedback {
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  margin-top: 1rem;
}

.form-feedback.success {
  background-color: #dff0d8;
  color: #3c763d;
  border: 1px solid #3c763d;
}

.form-feedback.error {
  background-color: #f2dede;
  color: #a94442;
  border: 1px solid #a94442;
}

.privacy-notice {
  font-size: 0.8rem;
  color: #666;
  margin-top: 1rem;
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

@media (max-width: 768px) {
  .modal-content {
    padding: 1.5rem;
  }
}
</style>
