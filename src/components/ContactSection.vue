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
              placeholder="Nombre completo" 
              :disabled="isLoading"
              required
              @input="validateName(formData.name)"
              @blur="formData.name = formatName(formData.name)"
              :class="{ 'input-error': formErrors.name }"
            >
            <span v-if="formErrors.name" class="error-message">{{ formErrors.name }}</span>
          </div>

          <div v-if="!showEmail" class="form-group phone-group">
            <div class="phone-input-container">
              <input 
                type="text" 
                v-model="formData.countryCode"
                :disabled="isLoading"
                class="country-code-input"
                placeholder="+1"
                @input="formatCountryCode"
                maxlength="4"
              >
              <input 
                type="tel" 
                v-model="formData.phone" 
                placeholder="(XXX) XXX-XXXX"
                :disabled="isLoading"
                @input="formatPhoneNumber"
                @blur="validatePhone"
                :class="{ 'input-error': formErrors.phone }"
                required
                maxlength="14"
              >
            </div>
            <span v-if="formErrors.phone" class="error-message">{{ formErrors.phone }}</span>
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
              :disabled="isLoading"
              required
              maxlength="100"
              @input="validateEmail"
              :class="{ 'input-error': formErrors.email }"
            >
            <span v-if="formErrors.email" class="error-message">{{ formErrors.email }}</span>
            <p class="contact-switch">
              <a href="#" @click.prevent="toggleContactMethod">
                Prefiero dejar mi número de teléfono
              </a>
            </p>
          </div>

          <div class="form-group">
            <select v-model="formData.stage" :disabled="isLoading" required>
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
              :disabled="isLoading"
              maxlength="500"
              @input="sanitizeMessage"
              :class="{ 'input-error': formErrors.message }"
            ></textarea>
            <span v-if="formErrors.message" class="error-message">{{ formErrors.message }}</span>
            <span class="character-count" :class="{ 'near-limit': formData.message.length > MESSAGE_MAX_LENGTH * 0.9 }">
              {{ formData.message.length }}/{{ MESSAGE_MAX_LENGTH }}
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
import { ref, reactive } from 'vue';

export default {
  setup() {
    const showEmail = ref(false);
    const isLoading = ref(false);
    const formData = ref({
      name: '',
      phone: '',
      countryCode: '+1',  // Default to Canada/USA
      email: '',
      stage: '',
      message: '',
      website: ''  // Campo honeypot
    });

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
      formData.value.message = formData.value.message.replace(/[\u0000-\u001F\u007F-\u009F\u2000-\u200F\u2028-\u202F]/g, '');
      
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

    const formStatus = reactive({
      type: '', // 'success' or 'error'
      message: '',
      icon: ''
    });

    const toggleContactMethod = () => {
      showEmail.value = !showEmail.value;
      formData.value.phone = '';
      formData.value.email = '';
    };

    const resetFormStatus = () => {
      formStatus.type = '';
      formStatus.message = '';
      formStatus.icon = '';
    };

    const submitForm = async () => {
      // Check honeypot
      if (formData.value.website) {
        console.log('Honeypot detected possible spam submission');
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
      
      console.log('Form submission started with data:', JSON.stringify(formData.value, null, 2));
      
      try {
        // SIMULATED API CALL - FOR TESTING PURPOSES ONLY
        // In a real application, this would be replaced with an actual API call
        console.log('Simulating API call...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // This is just test data - in a real app, you would use the API response
        const testResponse = {
          success: true,
          message: 'Form submitted successfully (test data)',
          timestamp: new Date().toISOString()
        };
        
        console.log('Simulated API response:', testResponse);
        
        // Show success message
        formStatus.type = 'success';
        formStatus.message = '¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.';
        formStatus.icon = 'fas fa-check-circle';
        
        // Reset form
        formData.value = {
          name: '',
          phone: '',
          email: '',
          stage: '',
          message: ''
        };
        
        // Reset form status after 5 seconds
        console.log('Form submission successful, showing success message');
        setTimeout(() => {
          console.log('Hiding success message');
          resetFormStatus();
        }, 5000);
        
      } catch (error) {
        console.error('Error in form submission:', error);
        formStatus.type = 'error';
        formStatus.message = 'Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.';
        formStatus.icon = 'fas fa-exclamation-circle';
      } finally {
        isLoading.value = false;
        console.log('Form submission process completed');
      }
    };

    return {
      showEmail,
      formData,
      formErrors,
      isLoading,
      formStatus,
      MESSAGE_MAX_LENGTH,
      toggleContactMethod,
      submitForm,
      validateName,
      formatName,
      formatPhoneNumber,
      validatePhone,
      formatCountryCode,
      validateEmail,
      sanitizeMessage
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

  input {
    height: 42px;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    font-size: 0.9rem;
  }

  input[type="text"].country-code-input {
    width: 45px;
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    text-align: center;
    min-width: unset;
    flex: 0 0 45px;
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

@media (max-width: 480px) {
  .contact-section {
    padding: 3rem 0;
  }

  .contact-container {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.8rem;
  }
}
</style>
