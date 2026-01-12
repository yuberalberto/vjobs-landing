<template>
  <section class="contact-section">
    <div class="container">
      <h2>Agenda tu <span class="highlight">sesión diagnóstica gratuita</span></h2>
      <p class="section-subtitle">Un experto te ayudará a evaluar tus opciones</p>

      <div class="contact-container">
        <div class="contact-info">
          <h3>¿Por qué agendar una sesión?</h3>
          <ul class="benefits-list">
            <li>
              <i class="fas fa-check-circle"></i>
              Evaluación personalizada de tu perfil
            </li>
            <li>
              <i class="fas fa-check-circle"></i>
              Plan de acción específico para tu caso
            </li>
            <li>
              <i class="fas fa-check-circle"></i>
              Resolución de dudas con un experto
            </li>
            <li>
              <i class="fas fa-check-circle"></i>
              Sin costo y sin compromiso
            </li>
          </ul>
        </div>

        <form @submit.prevent="submitForm" class="contact-form">
          <!-- Honeypot field -->
          <div class="hp-field">
            <input
              type="text"
              v-model="formData.website"
              autocomplete="off"
              tabindex="-1"
              placeholder="Leave this empty"
            >
          </div>
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

          <!-- Email Field (always visible) -->
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

          <!-- Phone Field (always visible) -->
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
            <p class="contact-note">
              Te contactaremos por teléfono para coordinar la sesión. El correo lo usaremos para enviarte recordatorios.
            </p>
          </div>

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

          <button type="submit" class="btn btn-primary btn-large" :disabled="isLoading">
            <span v-if="!isLoading">
              <i class="fas fa-calendar-check"></i> Agendar mi sesión gratuita
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin"></i> Enviando...
            </span>
          </button>
          
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
  </section>
</template>

<script>
import { ref, reactive, watch, computed, onMounted } from 'vue';

export default {
  setup() {
    const showEmail = ref(false);
    const isLoading = ref(false);
    const lastSubmitTime = ref(0);
    const SUBMIT_COOLDOWN = 30000; // 30 seconds cooldown between submissions
    const formStatus = reactive({
      message: '',
      type: '', // 'success' or 'error'
      icon: ''
    });
    // Lista de códigos de país para las Américas
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
      countryCode: '+1',  // Default to Canada/USA
      email: '',
      stage: '',
      message: '',
      website: ''  // Honeypot field
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

    // formStatus ya está declarado anteriormente

    const formatCountryCode = () => {
      // Ensure it starts with +
      if (!formData.value.countryCode.startsWith('+')) {
        formData.value.countryCode = '+' + formData.value.countryCode;
      }
      // Remove any non-digit after the +
      formData.value.countryCode = '+' + formData.value.countryCode.slice(1).replace(/\D/g, '');
    };

    const formErrors = reactive({
      name: '',
      phone: '',
      email: '',
      message: ''
    });

    const MESSAGE_MAX_LENGTH = 500; // Límite de caracteres para el mensaje

    const formatName = (name) => {
      // Remove leading/trailing spaces and reduce multiple spaces to single
      return name.trim().replace(/\s+/g, ' ');
    };

    const formatPhoneNumber = () => {
      // Remove all non-numeric characters
      let cleaned = formData.value.phone.replace(/\D/g, '');
      
      // Limit to 10 digits
      cleaned = cleaned.slice(0, 10);
      
      // Format as (XXX) XXX-XXXX
      if (cleaned.length >= 6) {
        formData.value.phone = `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6)}`;
      } else if (cleaned.length >= 3) {
        formData.value.phone = `(${cleaned.slice(0,3)}) ${cleaned.slice(3)}`;
      } else if (cleaned.length > 0) {
        formData.value.phone = `(${cleaned}`;
      }
      
      // Validate after formatting
      validatePhone();
    };

    const sanitizeMessage = () => {
      formErrors.message = '';
      
      // Eliminar HTML tags
      formData.value.message = formData.value.message.replace(/<[^>]*>/g, '');
      
      // Eliminar caracteres de control y Unicode malicioso
      formData.value.message = formData.value.message.replace(/[\0-\031\177-\237]/g, '');
      
      // Reemplazar múltiples espacios/saltos de línea con uno solo
      formData.value.message = formData.value.message.replace(/\s+/g, ' ');
      
      // Validar longitud
      if (formData.value.message.length > MESSAGE_MAX_LENGTH) {
        formData.value.message = formData.value.message.slice(0, MESSAGE_MAX_LENGTH);
      }
      
      return true;
    };

    const validateEmail = () => {
      formErrors.email = '';
      
      // Check if email is empty
      if (!formData.value.email) {
        return false;
      }
      
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.value.email)) {
        formErrors.email = 'Ingresa un email válido';
        return false;
      }
      
      return true;
    };

    const validatePhone = () => {
      formErrors.phone = '';
      
      // Get only numbers
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

    const validateName = (name) => {
      // Reset error
      formErrors.name = '';
      
      // Check minimum length
      if (name.length < 2) {
        formErrors.name = 'El nombre es muy corto (mínimo 2 caracteres)';
        return false;
      }
      
      // Check maximum length
      if (name.length > 50) {
        formErrors.name = 'El nombre es muy largo (máximo 50 caracteres)';
        return false;
      }
      
      // Check for letters and spaces only
      if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]*$/.test(name)) {
        formErrors.name = 'El nombre solo puede contener letras y espacios';
        return false;
      }
      
      return true;
    };

    // formStatus is already declared above

    
    const resetFormStatus = () => {
      formStatus.type = '';
      formStatus.message = '';
      formStatus.icon = '';
    };

    const submitForm = async () => {
      // Check honeypot
      if (formData.value.website) {
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

      // Reset status
      resetFormStatus();
      
      // Validate name before submission
      if (!validateName(formData.value.name)) {
        return;
      }

      // Validate phone/email depending on which is shown
      if (showEmail.value) {
        if (!validateEmail()) {
          return;
        }
      } else {
        if (!validatePhone()) {
          return;
        }
      }
      
      isLoading.value = true;
      
      
      try {
        // Preparar los datos para Brevo
        const contactData = {
          email: formData.value.email,
          attributes: {
            FULLNAME: formData.value.name,
            PHONE: formData.value.countryCode + formData.value.phone.replace(/\D/g, ''),
            STAGE: formData.value.stage,
            MESSAGE: formData.value.message
          },
          listIds: [3], // ID de la lista en Brevo
          updateEnabled: true
        };

        // Enviar a la API de Brevo via serverless function segura
        const response = await fetch('/api/brevo-contact', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(contactData)
        });

        if (!response.ok) {
          await response.json(); // Consume the response body
          throw new Error('Error al enviar el formulario');
        }

        // Mostrar mensaje de éxito
        showSuccess('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
        
        // Update last submit time for rate limiting
        lastSubmitTime.value = Date.now();
        
        // Resetear el formulario
        resetForm();
      } catch {
        showError('Lo sentimos, tenemos un problema técnico temporal. Por favor, intenta nuevamente en unos minutos o contáctanos directamente.');
      } finally {
        isLoading.value = false;
      }
    };

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

    const showSuccess = (message) => {
      formStatus.message = message;
      formStatus.type = 'success';
      formStatus.icon = 'fas fa-check-circle';
    };

    const showError = (message) => {
      formStatus.message = message;
      formStatus.type = 'error';
      formStatus.icon = 'fas fa-exclamation-circle';
    };

    // Limpiar el estado del formulario cuando se cierre la sección
    watch(() => formStatus.message, (newMessage) => {
      if (newMessage) {
        // Limpiar el mensaje después de 5 segundos
        const timer = setTimeout(() => {
          resetFormStatus();
        }, 5000);
        
        // Limpiar el timer cuando el componente se desmonte o cambie el mensaje
        return () => clearTimeout(timer);
      }
    });

    return {
      showEmail,
      isLoading,
      formData,
      formErrors,
      formStatus,
      lastSubmitTime,
      SUBMIT_COOLDOWN,
      MESSAGE_MAX_LENGTH,
      countryCodes,
      submitForm,
      formatName,
      validateName,
      validateEmail,
      validatePhone,
      formatPhoneNumber,
      formatCountryCode,
      sanitizeMessage,
      resetForm,
      showSuccess,
      showError,
      // Custom dropdown
      dropdownOpen,
      selectedCountryDisplay,
      toggleDropdown,
      selectCountryCode
    };
  }
};
</script>

<style scoped>
.contact-section {
  padding: 5rem 0;
  background: linear-gradient(to bottom, #f8f9fa, white);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.section-subtitle {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem;
}

.contact-info {
  padding-right: 2rem;
}

.contact-info h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  color: #444;
}

.benefits-list i {
  color: var(--accent-color);
  font-size: 1.2rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

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
  margin-bottom: 1rem;
}

.phone-input-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;

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

.character-count {
  font-size: 0.8rem;
  color: #666;
  text-align: right;
  display: block;
  margin-top: 0.25rem;

  &.near-limit {
    color: #dc3545;
  }
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
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

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
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

.form-feedback {
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }

  .contact-info {
    padding-right: 0;
    padding-bottom: 2rem;
    border-bottom: 1px solid #eee;
  }

  h2 {
    font-size: 2rem;
  }

  .section-subtitle {
    font-size: 1.1rem;
  }
}

</style>
