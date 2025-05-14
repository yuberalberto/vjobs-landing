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

    <!-- Modal -->
    <div v-if="showModal" class="magnet-modal">
      <button class="close-button" @click="showModal = false">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="modal-content" v-if="!submitted">
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
              placeholder="Tu mejor correo electrónico" 
              required
              class="form-input"
            >
          </div>
          <button type="submit" class="submit-button">
            <span>Descargar Guía</span>
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
      submitted: false,
      shouldAnimate: false,
      animationInterval: null
    }
  },
  mounted() {
    // Iniciar animación periódica
    this.startAnimationInterval()
  },
  beforeUnmount() {
    // Limpiar intervalo al desmontar
    if (this.animationInterval) {
      clearInterval(this.animationInterval)
    }
  },
  methods: {
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
      // Aquí iría la lógica para enviar el email y el PDF
      // Por ahora solo simulamos el envío
      this.submitted = true
      setTimeout(() => {
        this.showModal = false
        this.submitted = false
        this.email = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.floating-magnet-wrapper {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
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
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.minimize-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.minimized .floating-button {
  transform: translateY(calc(100% + 1rem));
  opacity: 0;
  pointer-events: none;
}

.magnet-modal {
  position: absolute;
  bottom: calc(100% + 1rem);
  right: 0;
  width: 350px;
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
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

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border: 2px solid #eee;
  border-radius: 8px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(255, 138, 0, 0.1);
}

.submit-button {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(45deg, var(--accent-color), #ff8a00);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(255, 138, 0, 0.3);
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
    right: -1rem;
  }

  .floating-button {
    padding: 0.8rem 1rem;
  }
}
</style>
