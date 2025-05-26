<template>
  <div class="floating-magnet-wrapper" :class="{ 'minimized': isMinimized }">
    <!-- Botón flotante -->
    <button 
      v-if="!showModal" 
      @click="showModal = true" 
      class="floating-button"
      :class="{ 'animate-attention': shouldAnimate }"
    >
      <div class="button-content">
        <i class="fas fa-rocket icon-main"></i>
        <span class="button-text">
          <strong>¡GRATIS!</strong>
          <br>
          Optimiza tu LinkedIn
        </span>
      </div>
      <div class="pulse-effect"></div>
    </button>

    <!-- Modal with click outside handling -->
    <div v-if="showModal" class="modal-overlay" @click.self="handleClickOutside">
      <div class="magnet-modal">
        <button class="close-button" @click.stop="closeModal">
          <i class="fas fa-times"></i>
        </button>
      
      <div class="modal-content" v-if="!submitted">
        <!-- Honeypot field -->
        <div class="hp-field">
          <input
            type="text"
            v-model="honeypot"
            autocomplete="off"
            tabindex="-1"
            placeholder="Leave this empty"
          >
        </div>
        <div class="modal-icon">
          <i class="fab fa-linkedin"></i>
        </div>
        <h3>¡Potencia tu Perfil de LinkedIn!</h3>
        <p class="description">
          Descarga nuestra guía gratuita con estrategias avanzadas para:
        </p>
        <ul class="benefits-list">
          <li><i class="fas fa-check"></i> Optimizar tu perfil para los reclutadores</li>
          <li><i class="fas fa-check"></i> Destacar tus logros profesionales</li>
          <li><i class="fas fa-check"></i> Crear contenido que genere oportunidades</li>
          <li><i class="fas fa-check"></i> Construir una red profesional efectiva</li>
        </ul>
        
        <form @submit.prevent="submitForm" class="magnet-form">
          <div class="form-group">
            <input 
              type="email" 
              v-model="email"
              @input="handleEmailInput"
              @blur="handleEmailBlur"
              placeholder="Tu mejor correo electrónico" 
              required
              :class="{ 'input-error': emailError }"
              :disabled="isValidating"
            >
            <span v-if="emailError" class="error-message">{{ emailError }}</span>
          </div>
          <button type="submit" class="btn btn-primary btn-large" :disabled="isValidating">
            <span v-if="!isValidating">Descargar Guía</span>
            <span v-else>Enviando...</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </form>
        
        <p class="privacy-note">
          <i class="fas fa-shield-alt"></i>
          Tu información está segura. No spam.
        </p>
      </div>

      <div class="success-message" v-else>
        <i class="fas fa-check-circle"></i>
        <h3>¡Gracias!</h3>
        <p>Hemos enviado la guía a tu correo.</p>
        <p class="check-spam">Si no la encuentras, revisa tu carpeta de spam.</p>
        </div>
      </div>
    </div>

    <!-- Botón minimizar -->
    <button @click="toggleMinimize" class="minimize-button">
      <i :class="isMinimized ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FloatingMagnet',
  data() {
    return {
      showModal: false,
      isMinimized: false,
      email: '',
      emailError: '',
      honeypot: '',
      isValidating: false,
      submitted: false,
      shouldAnimate: false,
      animationInterval: null,
      escapeListener: null,
      // Validation configuration
      validation: {
        email: {
          minLength: 6,
          maxLength: 254,
          pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        }
      }
    };
  },
  mounted() {
    // Iniciar animación periódica
    this.startAnimationInterval()
  },
  beforeUnmount() {
    // Clean up interval
    if (this.animationInterval) {
      clearInterval(this.animationInterval)
    }
    // Clean up event listener
    if (this.escapeListener) {
      document.removeEventListener('keydown', this.escapeListener);
    }
  },
  
  watch: {
    showModal(newVal, oldVal) {
      if (newVal === oldVal) return;
      
      if (newVal) {
        // Modal is opening
        document.body.style.overflow = 'hidden';
        this.escapeListener = (e) => e.key === 'Escape' && this.closeModal();
        document.addEventListener('keydown', this.escapeListener);
      } else {
        // Modal is closing - clean up
        this.clearForm();
        document.body.style.overflow = '';
        if (this.escapeListener) {
          document.removeEventListener('keydown', this.escapeListener);
          this.escapeListener = null;
        }
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.closeModal();
    },
    
    clearForm() {
      // Clear all form state
      this.email = '';
      this.emailError = '';
      this.honeypot = '';
      this.isValidating = false;
      this.submitted = false;
    },
    
    closeModal() {
      // Just close the modal - cleanup happens in the watcher
      this.showModal = false;
    },
    

    
    sanitizeInput(input) {
      // Handle undefined, null or empty input
      if (!input) return '';
      
      // Convert to string and remove any potentially dangerous characters
      return String(input)
        .replace(/[<>&"']/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    },

    validateEmail(email) {
      // Sanitize input first
      const sanitizedEmail = this.sanitizeInput(email);
      
      // Reset error
      this.emailError = '';

      // Check if empty
      if (!sanitizedEmail) {
        this.emailError = 'Por favor ingresa tu correo electrónico';
        return false;
      }

      // Check minimum length
      if (sanitizedEmail.length < this.validation.email.minLength) {
        this.emailError = `El correo debe tener al menos ${this.validation.email.minLength} caracteres`;
        return false;
      }

      // Check maximum length
      if (sanitizedEmail.length > this.validation.email.maxLength) {
        this.emailError = `El correo no puede tener más de ${this.validation.email.maxLength} caracteres`;
        return false;
      }

      // Check email pattern
      if (!this.validation.email.pattern.test(sanitizedEmail)) {
        this.emailError = 'Por favor ingresa un correo electrónico válido';
        return false;
      }

      return true;
    },
    
    handleEmailInput() {
      if (this.emailError) {
        this.validateEmail(this.email);
      }
    },
    
    handleEmailBlur() {
      this.validateEmail(this.email);
    },
    
    startAnimationInterval() {
      // Animar cada 30 segundos si no está minimizado
      this.animationInterval = setInterval(() => {
        if (!this.isMinimized && !this.showModal) {
          this.shouldAnimate = true
          setTimeout(() => {
            this.shouldAnimate = false
          }, 3000)
        }
      }, 15000)
    },
    
    toggleMinimize() {
      this.isMinimized = !this.isMinimized
      if (!this.isMinimized) {
        this.showModal = false
      }
    },
    
    async submitForm() {
      // Check honeypot first
      if (this.honeypot) {
        console.log('Bot detected by honeypot');
        return;
      }

      // Validate email before submission
      if (!this.validateEmail(this.email)) {
        return;
      }

      // Sanitize email before submission
      this.email = this.sanitizeInput(this.email);
      
      this.isValidating = true;
      
      try {
        // Prepare data for Brevo - Solo email y lista
        const payload = {
          email: this.email,
          listIds: [7], // ID de la lista para el lead magnet
          updateEnabled: true // Permitir actualizar contactos existentes
        };
        
        console.log('Enviando a Brevo:', payload);
        
        // Send to Brevo API
        const response = await fetch(`${import.meta.env.VITE_BREVO_API_URL}/contacts`, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': import.meta.env.VITE_BREVO_API_KEY
          },
          body: JSON.stringify(payload)
        });
        
        // Procesamos la respuesta
        if (response.ok) {
          console.log('Contacto creado exitosamente en Brevo');
        } else {
          // Intentamos obtener el mensaje de error
          let errorMessage = 'Error al enviar el formulario';
          try {
            const responseData = await response.json();
            console.log('Respuesta de error de Brevo:', responseData);
            
            // Si el error es porque el contacto ya existe, lo consideramos un éxito
            if (responseData.message && responseData.message.includes('already associated')) {
              console.log('El correo ya existe en la lista, continuando como éxito');
              // Continuamos como si fuera exitoso
            } else {
              throw new Error(responseData.message || errorMessage);
            }
          } catch (parseError) {
            console.error('Error al procesar la respuesta:', parseError);
            throw new Error(errorMessage);
          }
        }
        
        // Show success message
        this.submitted = true;
        
        // Reset form after showing success message
        setTimeout(() => {
          this.showModal = false;
          this.submitted = false;
          this.email = '';
          this.emailError = '';
        }, 3000);
        
      } catch (error) {
        console.error('Error al enviar el formulario a Brevo:', error);
        this.emailError = 'Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.';
      } finally {
        this.isValidating = false;
      }
    }
  }
}
</script>

<style scoped>
.floating-magnet-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.floating-button {
  background: linear-gradient(45deg, var(--accent-color), #ff8a00);
  border: none;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.button-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.icon-main {
  font-size: 1.5rem;
  animation: float 3s ease-in-out infinite;
}

.button-text {
  font-size: 0.9rem;
  text-align: left;
  line-height: 1.2;
}

.pulse-effect {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, var(--accent-color), #ff8a00);
  opacity: 0.5;
  border-radius: inherit;
  z-index: 1;
  transform: scale(1.2);
}

.floating-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 138, 0, 0.3);
}

.floating-button:hover .pulse-effect {
  animation: pulse 1.5s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 0; }
  100% { transform: scale(1); opacity: 0.5; }
}

.animate-attention {
  animation: attention 0.5s ease-in-out 6;
}

@keyframes attention {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.minimize-button {
  background: linear-gradient(45deg, var(--accent-color), #ff8a00);
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: absolute;
  right: 0;
  top: -34px;
  z-index: 1001;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.minimize-button:hover {
  transform: translateY(-2px) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.minimized .floating-button {
  transform: translateY(calc(100% + 1rem));
  opacity: 0;
  pointer-events: none;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 20px;
  z-index: 1000;
}

.magnet-modal {
  position: relative;
  width: 350px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
  margin-bottom: 60px; /* Space for the floating button */
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.5rem;
  transition: all 0.3s ease;
}

.close-button:hover {
  color: #333;
  transform: rotate(90deg);
}

.modal-icon {
  font-size: 3rem;
  color: #0077b5;
  margin-bottom: 1rem;
}

.modal-content h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.benefits-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.benefits-list i {
  color: var(--accent-color);
}

.magnet-form {
  margin-top: 1.5rem;
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
  margin-bottom: 1rem;
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

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  line-height: 1.5;
}

.btn-primary {
  background-color: var(--accent-color);
  color: white;
  border: none;
  width: 100%;
  justify-content: center;
}

.btn-primary:hover:not(:disabled) {
  background-color: #3a7ebf;
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(102, 154, 207, 0.3);
}

.btn-primary:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.privacy-note {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #999;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: center;
}

.success-message {
  text-align: center;
  padding: 2rem;
}

.success-message i {
  font-size: 3rem;
  color: #4CAF50;
  margin-bottom: 1rem;
}

.success-message h3 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.check-spam {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.5rem;
}

@media (max-width: 480px) {
  .floating-magnet-wrapper {
    bottom: 1rem;
    right: 1rem;
  }

  .magnet-modal {
    width: calc(100vw - 2rem);
    margin: 0;
  }

  .floating-button {
    padding: 0.8rem 1rem;
  }
}
</style>
