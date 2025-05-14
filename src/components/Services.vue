<template>
  <section class="services" id="services">
    <div class="container">
      <h2>Our Services</h2>
      <p class="section-subtitle">Everything you need to advance your career</p>
      
      <div class="services-grid">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service-card"
          @click="openService(index)"
        >
          <div class="service-icon">
            <i :class="service.icon"></i>
          </div>
          <h3>{{ service.title }}</h3>
          <p>{{ service.shortDescription }}</p>
        </div>
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
    title: 'Job Search',
    icon: 'fas fa-search',
    shortDescription: 'Find the perfect job that matches your skills and experience with our advanced search engine.',
    description: 'Our advanced job search platform helps you find the perfect position that matches your skills, experience, and career goals. Filter by location, salary, company size, and more to discover opportunities that align with your professional aspirations.'
  },
  {
    title: 'Career Coaching',
    icon: 'fas fa-user-tie',
    shortDescription: 'Get personalized guidance from industry experts to advance your career.',
    description: 'Connect with experienced career coaches who can help you navigate your professional journey. From resume reviews to interview preparation and career planning, our experts provide personalized guidance to help you achieve your career objectives.'
  },
  {
    title: 'Company Profiles',
    icon: 'fas fa-building',
    shortDescription: 'Explore detailed company profiles and learn about their culture and values.',
    description: 'Gain valuable insights into potential employers with our comprehensive company profiles. Learn about company culture, values, benefits, and employee experiences to find organizations that align with your professional values and goals.'
  },
  {
    title: 'Salary Insights',
    icon: 'fas fa-chart-line',
    shortDescription: 'Access comprehensive salary data to negotiate better compensation.',
    description: 'Make informed decisions about your career with our salary insights. Access up-to-date compensation data for various roles and industries, helping you understand your market value and negotiate better compensation packages.'
  }
];

const currentService = ref(null);

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

.services h2 {
  text-align: center;
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
}

.section-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 4rem;
  font-size: 1.2rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  padding: 2rem;
  text-align: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.service-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--accent-color);
}

.service-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  transition: all 0.3s ease;
}

.service-card:hover .service-icon {
  background-color: var(--accent-color);
  transform: scale(1.1);
}

.service-card h3 {
  color: var(--primary-color);
  margin-bottom: 1rem;
  transition: color 0.3s ease;
}

.service-card p {
  color: #666;
  line-height: 1.6;
  transition: color 0.3s ease;
}

/* Popup Styles */
.service-popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(5px);
  animation: fadeIn 0.3s ease;
}

.service-popup {
  background-color: white;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 3rem 2rem 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--primary-color);
  background-color: #f0f0f0;
}

.popup-content {
  text-align: center;
}

.popup-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
}

.popup-content h3 {
  color: var(--primary-color);
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.popup-description {
  color: #444;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
}

.popup-actions {
  margin: 2rem 0;
  display: flex;
  justify-content: center;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.9rem 2rem;
  font-size: 1.05rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.primary-btn {
  background-color: var(--accent-color);
  color: white;
  box-shadow: 0 4px 15px rgba(214, 125, 9, 0.3);
}

.primary-btn:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
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
  background-color: var(--accent-color);
  transform: translateY(-2px);
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
  .services-grid {
    grid-template-columns: 1fr;
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