<template>
  <section class="services" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">¿Cómo Te Ayudo?</span>
        <h2>Elige tu ruta y descubre el plan ideal para ti</h2>
              </div>

      <div class="tab-selector">
        <button 
          @click="switchPath('canada')"
          :class="{ 'tab-active': activePath === 'canada' }"
          class="tab-button"
        >
          <i class="fas fa-flag"></i>
          Busco Empleo En Canadá
        </button>
        <button 
          @click="switchPath('it')"
          :class="{ 'tab-active': activePath === 'it' }"
          class="tab-button"
        >
          <i class="fas fa-laptop-code"></i>
          Quiero Transicionar a IT
        </button>
      </div>

      <transition name="fade" mode="out-in">
        <div :key="activePath" class="dynamic-content">
          <div class="pain-points-section">
            <h3 class="pain-points-title">{{ servicesData[activePath].checklistTitle }}</h3>
            <div class="pain-points-checklist">
              <div class="checklist-column">
                <div 
                  v-for="(point, index) in currentContent.painPoints.slice(0, 2)" 
                  :key="index"
                  class="checklist-item"
                >
                  <div class="checklist-icon">
                    <i class="fas fa-check"></i>
                  </div>
                  <p class="checklist-text">{{ point }}</p>
                </div>
              </div>
              <div class="checklist-column">
                <div 
                  v-for="(point, index) in currentContent.painPoints.slice(2)" 
                  :key="index + 2"
                  class="checklist-item"
                >
                  <div class="checklist-icon">
                    <i class="fas fa-check"></i>
                  </div>
                  <p class="checklist-text">{{ point }}</p>
                </div>
              </div>
            </div>
          </div>

          <h3 class="pain-points-title">Elige tu plan y desbloquea tu siguiente etapa profesional:</h3>

          <div class="services-grid">
        <div 
          v-for="(plan, index) in services" 
          :key="index"
          class="service-card"
          :class="{ 'featured': plan.featured }"
        >
          <div class="service-content">
            <div class="service-badge" v-if="plan.featured">
              Más Popular
            </div>

            <h3>{{ plan.name.toUpperCase() }}{{ activePath === 'canada' ? ' - CA' : ' - IT' }}</h3>
            <p class="service-subtitle">{{ plan.subtitle }}</p>
            
            <div class="service-pricing">
              <div class="price">
                <span class="amount">{{ plan.price }}</span>
              </div>
            </div>

            <ul class="service-benefits">
              <li v-for="(feature, idx) in plan.features" :key="idx">
                <i class="fas fa-check"></i>
                {{ feature }}
              </li>
            </ul>

            <button 
              class="btn btn-service" 
              :class="plan.featured ? 'btn-primary' : 'btn-outline'"
              @click="acquireService(plan)"
            >
              {{ plan.buttonText }}
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
        </div>
      </transition>

      <div class="services-footer">
        <p class="guarantee">
          <i class="fas fa-shield-alt"></i>
          Pago único y seguro • Cupos limitados por mes para garantizar la calidad del servicio.
        </p>
      </div>
    </div>

    <!-- Toast Notification -->
    <transition name="toast-fade">
      <div v-if="showToast" class="toast-notification" :class="`toast-${toastType}`" @click.stop>
        <i class="fas" :class="toastType === 'warning' ? 'fa-clock' : 'fa-info-circle'"></i>
        <span>{{ toastMessage }}</span>
        <button v-if="toastType === 'info'" @click="showToast = false" class="toast-close">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </transition>
    
    <!-- Toast overlay for info type -->
    <div v-if="showToast && toastType === 'info'" class="toast-overlay" @click="showToast = false"></div>

  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { servicesData } from '@/data/services.js';

// Rate limiting configuration
// 🔧 DEVELOPMENT FLAG: Change to true to enable rate limiting in production
const ENABLE_RATE_LIMIT = true;
const COOLDOWN_MS = 3000; // 3 seconds between clicks
const MAX_CLICKS = 3; // Maximum clicks per session
const RESET_AFTER_MS = 180000; // Reset counter after 3 minutes of inactivity

const activePath = ref('canada'); // Smart default

// Computed property for current content
const currentContent = computed(() => servicesData[activePath.value]);

// Convert plans array to flat services for current template compatibility
const services = computed(() => currentContent.value.plans);

// Rate limiting state
const lastClickTime = ref(0);
const clickCount = ref(0);

// Toast notification state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('warning');

const displayToast = (message, type = 'warning') => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;
  
  // Block scroll for info type (limit reached toast)
  if (type === 'info') {
    document.body.style.overflow = 'hidden';
  }
  
  // Only auto-dismiss warning toasts, info toasts stay until closed
  if (type === 'warning') {
    setTimeout(() => {
      showToast.value = false;
    }, 3000);
  }
};

// Watch for toast changes to handle scroll blocking
watch(() => showToast.value, (newValue) => {
  if (!newValue) {
    // Toast is closing, restore scroll
    document.body.style.overflow = '';
  }
});

const switchPath = (path) => {
  // Ignore if already on this path (prevents unnecessary re-renders)
  if (activePath.value === path) return;
  
  // Simply switch the path - no throttling needed for tabs
  activePath.value = path;
};

const generateSecureWhatsAppUrl = (path, planName, price) => {
  // Obfuscated phone number (anti-scraping protection)
  const p1 = '1226';
  const p2 = '698';
  const p3 = '5787';
  const phoneNumber = p1 + p2 + p3;
  
  let message = '';
  const routeName = path === 'canada' ? 'Empleo en Canadá' : 'Transición a IT';
  
  if (planName.toUpperCase() === 'STARTER' || planName === 'Starter') {
    message = `Hola VJobs, estoy interesado en el Plan ${planName} (${price}) de ${routeName}. Necesito el diagnóstico escrito.`;
  } else if (planName.toUpperCase() === 'BUILDER' || planName === 'Builder') {
    message = `Hola VJobs, quiero el Plan ${planName} (${price}) de ${routeName}. Necesito agendar la sesión estratégica 1:1.`;
  } else if (planName.toUpperCase() === 'VISIBILITY' || planName === 'Visibility') {
    message = `Hola VJobs, me interesa el Plan ${planName} (${price}) de ${routeName}. Quiero el acompañamiento completo hasta la entrevista.`;
  }
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

const acquireService = (plan) => {
  // Apply rate limiting only if enabled
  if (ENABLE_RATE_LIMIT) {
    const now = Date.now();
    
    // Reset counter if enough time has passed (3 minutes)
    if (lastClickTime.value > 0 && now - lastClickTime.value > RESET_AFTER_MS) {
      clickCount.value = 0;
    }
    
    // Check cooldown period
    if (now - lastClickTime.value < COOLDOWN_MS) {
      const remainingSeconds = Math.ceil((COOLDOWN_MS - (now - lastClickTime.value)) / 1000);
      displayToast(`Por favor espera ${remainingSeconds} segundo(s) antes de contactar nuevamente.`, 'warning');
      return;
    }
    
    // Check click limit
    if (clickCount.value >= MAX_CLICKS) {
      displayToast('Has alcanzado el límite de contactos. Si necesitas ayuda, escríbenos a hola@vjobs.ca', 'info');
      return;
    }
    
    // Update tracking counters
    lastClickTime.value = now;
    clickCount.value++;
  }
  
  // Generate secure WhatsApp URL and open
  const whatsappUrl = generateSecureWhatsAppUrl(activePath.value, plan.name, plan.price);
  window.open(whatsappUrl, '_blank');
};
</script>

<style scoped>
.services {
  padding: 6rem 0;
  background-color: white;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.section-tag {
  display: inline-block;
  background-color: rgba(102, 154, 207, 0.1);
  color: var(--accent-color);
  padding: 0.35rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

.section-header h2 {
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.section-subtitle {
  color: var(--text-color);
  font-size: 1.1rem;
  opacity: 0.8;
}

/* Tab Selector Styles */
.tab-selector {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 3rem 0 2rem;
}

.tab-button {
  padding: 1rem 2rem;
  border: 2px solid var(--primary-color);
  background: white;
  color: var(--primary-color);
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1001;
  pointer-events: auto !important;
}

.tab-button:hover {
  background: rgba(102, 154, 207, 0.1);
  transform: translateY(-2px);
}

.tab-button.tab-active {
  background: var(--primary-color);
  color: white;
  box-shadow: 0 4px 12px rgba(5, 57, 97, 0.2);
}

/* Dynamic Content Wrapper */
.dynamic-content {
  margin-top: 2rem;
}

/* Pain Points Section */
.pain-points-section {
  margin-bottom: 2rem;
  padding: 1rem 0;
}

.pain-points-title {
  text-align: center;
  color: var(--primary-color);
  font-size: 1.5rem;
  margin-bottom: 0;
}

.pain-points-checklist {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(5, 57, 97, 0.05);
}

.checklist-column {
  padding: 0;
}

.checklist-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.checklist-icon {
  color: #ff6b35;
  font-size: 0.9rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.checklist-text {
  margin: 0;
  color: var(--text-color);
  line-height: 1.3;
  font-size: 0.85rem;
}

/* Services Grid - Updated for 3 columns */
.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 2rem 0;
}

/* Transition Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease; /* Reduced from 0.3s to prevent accumulation */
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive Styles */
@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .pain-points-checklist {
    grid-template-columns: 1fr;
  }
}

/* Touch device optimizations - applies to ANY device with touch capability */
@media (hover: none) and (pointer: coarse) {
  .tab-button {
    transition: none !important; /* Disable transitions on touch devices to prevent blocking */
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
    user-select: none;
    -webkit-user-select: none;
  }
  
  .tab-button:hover {
    transform: none;
  }
}

/* Responsive layout - screen size based */
@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .tab-selector {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .tab-button {
    width: 100%;
    justify-content: center;
  }
  
  .pain-points-section {
    padding: 1.5rem;
  }
  
  .pain-points-title {
    font-size: 1.25rem;
  }
}

.service-card {
  background: rgba(255, 220, 190, 0.85); /* Naranja un poco más intenso con 85% de opacidad */
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(5, 57, 97, 0.05);
  border: 1px solid rgba(214, 125, 9, 0.2);
  position: relative;
}

.service-card.featured {
  border: 2px solid var(--accent-color);
  box-shadow: 0 8px 16px rgba(102, 154, 207, 0.2);
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(5, 57, 97, 0.12);
  border-color: var(--accent-color);
}

.service-content {
  padding: 2rem;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.service-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  border-radius: 12px;
  color: white;
  font-size: 1.2rem;
  box-shadow: 0 4px 8px rgba(102, 154, 207, 0.2);
}

.service-badge {
  background-color: rgba(214, 125, 9, 0.9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.service-card h3 {
  font-size: 2.2rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
  text-align: left;
  font-weight: 600;
}

.service-subtitle {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.4;
  text-align: left;
  font-size: 1.05rem;
}

.service-benefits {
  list-style: none;
  margin: 1.5rem 0;
  padding: 0;
}

.service-benefits li {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
  font-size: 1rem;
}

.service-benefits i {
  color: #4A90E2;
  font-size: 1rem;
  margin-top: 0.2rem;
}

.service-pricing {
  margin: 1.5rem 0;
  text-align: center;
}

.price {
  display: inline-flex;
  align-items: baseline;
  gap: 0.25rem;
}

.currency {
  font-size: 1.2rem;
  color: var(--text-color);
}

.amount {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--primary-color);
}

.period {
  color: var(--text-color);
  opacity: 0.7;
}

.btn-service {
  width: 100%;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: auto;
}

.btn-primary {
  background: var(--primary-color);
  color: white;
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-service:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(5, 57, 97, 0.1);
}

.btn-primary:hover {
  background: var(--accent-color);
}

.btn-outline:hover {
  background: var(--primary-color);
  color: white;
}

.services-footer {
  text-align: center;
  margin-top: 3rem;
}

.guarantee {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color);
  opacity: 0.8;
}

.guarantee i {
  color: var(--accent-color);
}

/* Service Popup Styles */
.service-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 57, 97, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.service-popup {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  max-width: 600px;
  width: 90%;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-color);
  opacity: 0.5;
  transition: opacity 0.3s ease;
}

.close-btn:hover {
  opacity: 1;
}

.popup-content {
  text-align: left;
}

.popup-icon {
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  border-radius: 16px;
  color: white;
  font-size: 1.5rem;
}

.popup-description {
  margin: 1.5rem 0;
  line-height: 1.8;
  color: var(--text-color);
  opacity: 0.8;
}

.popup-actions {
  margin: 2rem 0;
  box-shadow: 0 6px 20px rgba(214, 125, 9, 0.4);
}

.primary-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(214, 125, 9, 0.3);
}

.popup-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
}

.nav-btn {
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  z-index: 1000;
  pointer-events: auto !important;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-btn:not(:disabled):hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #f0f4f8 100%);
  padding: 4rem 0;
  position: relative;
  overflow: hidden;
}

.services::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 300px;
  background: rgba(214, 125, 9, 0.03);
  transform: skewY(-3deg);
  transform-origin: top left;
  z-index: 0;
}

.pagination {
  color: #666;
  font-weight: 500;
}

/* Toast Notification Styles */
.toast-notification {
  position: fixed;
  top: 2rem;
  right: 2rem;
  background: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(5, 57, 97, 0.15);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  z-index: 9999;
  max-width: 400px;
  border-left: 4px solid var(--accent-color);
}

.toast-notification i {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.toast-notification span {
  color: var(--text-color);
  font-size: 0.95rem;
  line-height: 1.4;
  user-select: text;
  cursor: text;
}

.toast-close {
  background: none;
  border: none;
  color: var(--text-color);
  opacity: 0.5;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: 0.5rem;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 1;
}

.toast-close i {
  font-size: 1rem;
}

.toast-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(5, 57, 97, 0.3);
  z-index: 9998;
  backdrop-filter: blur(2px);
}

.toast-warning {
  border-left-color: #ff6b35;
}

.toast-warning i {
  color: #ff6b35;
}

.toast-info {
  border-left-color: var(--accent-color);
  z-index: 9999;
}

.toast-info i {
  color: var(--accent-color);
}

.toast-info span {
  cursor: text;
  user-select: text;
}

/* Toast animations */
.toast-fade-enter-active {
  animation: toast-slide-in 0.3s ease-out;
}

.toast-fade-leave-active {
  animation: toast-slide-out 0.3s ease-in;
}

@keyframes toast-slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes toast-slide-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .services {
    padding: 3rem 0;
  }

  .section-header h2 {
    font-size: 2rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .toast-notification {
    top: 1rem;
    right: 1rem;
    left: 1rem;
    max-width: none;
  }
  
  .toast-close {
    padding: 0.5rem;
    gap: 1.5rem;
    margin: 1rem 0;
  }
  
  .service-popup {
    padding: 2rem 1.5rem 1.5rem;
  }
  
  .popup-icon {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }
  
  .popup-content h3 {
    font-size: 1.8rem;
  }
  
  .popup-navigation {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>