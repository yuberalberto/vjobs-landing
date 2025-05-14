<template>
  <section class="services" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">Nuestros Servicios</span>
        <h2>Soluciones para tu éxito profesional</h2>
        <p class="section-subtitle">Elige el plan que mejor se adapte a tus objetivos</p>
      </div>
      
      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service-card"
          :class="{ 'featured': service.featured }"
          @mouseover="hoveredService = index"
          @mouseleave="hoveredService = null"
        >
          <div class="service-content">
            <div class="service-header">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <div class="service-badge" v-if="service.badge">
                {{ service.badge }}
              </div>
            </div>

            <h3>{{ service.title }}</h3>
            <p class="service-description">{{ service.shortDescription }}</p>

            <ul class="service-benefits">
              <li v-for="(benefit, idx) in service.benefits" :key="idx">
                <i class="fas fa-check"></i>
                {{ benefit }}
              </li>
            </ul>

            <div class="service-pricing" v-if="service.pricing">
              <div class="price">
                <span class="currency">$</span>
                <span class="amount">{{ service.pricing.amount }}</span>
                <span class="period">/{{ service.pricing.period }}</span>
              </div>
            </div>

            <button 
              class="btn btn-service" 
              :class="service.featured ? 'btn-primary' : 'btn-outline'"
              @click.stop="openService(index)"
            >
              {{ service.buttonText }}
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="services-footer">
        <p class="guarantee">
          <i class="fas fa-shield-alt"></i>
          Garantía de satisfacción del 100% • Cancela en cualquier momento
        </p>
      </div>
    </div>

    <!-- Service Popup -->
    <div v-if="currentService !== null" class="service-popup-overlay" @click.self="closePopup">
      <div class="service-popup">
        <button class="close-btn" @click="closePopup">
          <i class="fas fa-times"></i>
        </button>
        
        <div class="popup-content">
          <div class="popup-icon">
            <i :class="services[currentService].icon"></i>
          </div>
          <h3>{{ services[currentService].title }}</h3>
          <p class="popup-description">{{ services[currentService].description }}</p>
          
          <div class="popup-actions">
            <button class="action-btn primary-btn" @click="acquireService">
              Adquirir Servicio
              <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          
          <div class="popup-navigation">
            <button 
              class="nav-btn prev-btn" 
              @click="navigate(-1)"
              :disabled="currentService === 0"
            >
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <div class="pagination">
              {{ currentService + 1 }} / {{ services.length }}
            </div>
            <button 
              class="nav-btn next-btn" 
              @click="navigate(1)"
              :disabled="currentService === services.length - 1"
            >
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const services = [
  {
    title: 'Sesión Diagnóstica',
    icon: 'fas fa-compass',
    badge: 'Gratuita',
    shortDescription: 'Evalúa tu situación actual y define tu plan de acción personalizado.',
    description: 'En esta sesión gratuita, analizaremos tu perfil profesional, objetivos y desafíos actuales para crear un plan de acción efectivo.',
    benefits: [
      'Evaluación personalizada',
      'Plan de acción inicial',
      'Sin compromiso'
    ],
    buttonText: 'Agendar Sesión',
    featured: false
  },
  {
    title: 'Plan Profesional',
    icon: 'fas fa-rocket',
    badge: 'Más Popular',
    shortDescription: 'Asesoría completa para tu transición profesional exitosa.',
    description: 'Programa integral que incluye coaching personalizado, revisión de CV, preparación para entrevistas y estrategia de búsqueda laboral.',
    benefits: [
      '4 sesiones de coaching',
      'Optimización de LinkedIn y CV',
      'Simulación de entrevistas',
      'Acceso a red de contactos'
    ],
    pricing: {
      amount: '299',
      period: 'mes'
    },
    buttonText: 'Comenzar Ahora',
    featured: true
  },
  {
    title: 'Mentoría IT',
    icon: 'fas fa-laptop-code',
    shortDescription: 'Guía especializada para tu transición al sector tecnológico.',
    description: 'Programa diseñado para profesionales que buscan hacer una transición exitosa al sector IT, con mentores expertos en la industria.',
    benefits: [
      'Mentor IT personalizado',
      'Plan de estudio adaptado',
      'Proyectos prácticos',
      'Conexiones en la industria'
    ],
    pricing: {
      amount: '399',
      period: 'mes'
    },
    buttonText: 'Explorar Programa',
    featured: false
  },
  {
    title: 'Empleo en Canadá',
    icon: 'fas fa-flag',
    shortDescription: 'Estrategia integral para encontrar trabajo en Canadá.',
    description: 'Programa especializado para profesionales que buscan oportunidades laborales en Canadá, incluyendo asesoría migratoria y laboral.',
    benefits: [
      'Asesoría migratoria',
      'Búsqueda laboral local',
      'Preparación cultural',
      'Red de contactos en Canadá'
    ],
    pricing: {
      amount: '499',
      period: 'mes'
    },
    buttonText: 'Más Información',
    featured: false
  }
];

const currentService = ref(null);
const hoveredService = ref(null);

const openService = (index) => {
  currentService.value = index;
  document.body.style.overflow = 'hidden'; // Prevent scrolling when popup is open
};

const closePopup = () => {
  currentService.value = null;
  document.body.style.overflow = ''; // Re-enable scrolling
};

const navigate = (direction) => {
  const newIndex = currentService.value + direction;
  if (newIndex >= 0 && newIndex < services.length) {
    currentService.value = newIndex;
  }
};

const acquireService = () => {
  // Lógica para adquirir el servicio
  alert(`¡Has solicitado el servicio: ${services[currentService.value].title}`);
  // Aquí podrías redirigir a un formulario de contacto o carrito de compras
};

// Close popup when pressing Escape key
const handleKeyDown = (e) => {
  if (e.key === 'Escape' && currentService.value !== null) {
    closePopup();
  }
};

// Add event listener for Escape key
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

// Remove event listener when component is unmounted
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<style scoped>
.services {
  padding: 6rem 0;
  background-color: white;
  position: relative;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-tag {
  display: inline-block;
  background-color: rgba(102, 154, 207, 0.1);
  color: var(--accent-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
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

.services-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 2rem 0;
}

@media (max-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
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
  transform: translateY(-10px);
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
  background-color: rgba(214, 125, 9, 0.1);
  color: var(--secondary-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(214, 125, 9, 0.2);
}

.service-card h3 {
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.service-description {
  color: var(--text-color);
  opacity: 0.8;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-benefits {
  list-style: none;
  margin: 1.5rem 0;
  padding: 0;
}

.service-benefits li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-color);
}

.service-benefits i {
  color: var(--accent-color);
  font-size: 0.9rem;
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
  font-weight: 700;
  color: var(--primary-color);
}

.period {
  color: var(--text-color);
  opacity: 0.7;
}

.btn-service {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
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