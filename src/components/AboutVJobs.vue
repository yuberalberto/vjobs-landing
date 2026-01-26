<template>
  <section class="about" id="about">
    <div class="container">
      <!-- Section Title -->
      <div class="section-header">
        <span class="section-tag">Sobre VJobs</span>
        <h2 class="section-main-title">Sobre VJobs</h2>
      </div>
      
      <div class="about-grid">
        <!-- Photo Section -->
        <div class="about-image">
          <div class="image-wrapper">
            <img 
              src="/aboutVJobs_img.JPG" 
              alt="Vivian Castellanos - Career Transition Specialist" 
              class="profile-photo"
            />
            <div class="image-accent-shape"></div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="about-content">
          <div class="content-wrapper">
            <div class="about-text">
              <!-- Hook Connection -->
              <p class="intro-text">
                Soy Vivian Castellanos, profesional en Recursos Humanos y migrante como tú. Acompaño a profesionales latinos a definir una estrategia laboral clara para comunicar su perfil y avanzar en el mercado canadiense o en su transición al sector IT.
              </p>
              
              <!-- MAIN EMPHASIS: Success Story -->
              <p class="story-text featured">
                <strong>Cuando llegué a Canadá era estudiante full time con solo permiso part time</strong> —un escenario que muchos consideraban "casi imposible". Sin embargo, con estrategia y claridad, <strong>logré acceder a un rol corporativo en una multinacional incluso antes de terminar mis estudios</strong>.
              </p>
              
              <!-- Credibility Support -->
              <p class="credibility-text">
                Con más de 8 años de experiencia en RRHH en el sector tecnológico, he trabajado con empresas internacionales en América. Entiendo de primera mano qué buscan los reclutadores y cómo se toman las decisiones reales de contratación.
              </p>
              
              <!-- Methodology -->
              <p class="methodology-text">
                Me obsesiona ayudar a las personas a potencializar al máximo lo que ya tienen. En cada asesoría identifico ese "oro" profesional que no saben cómo comunicar, lo traduzco al lenguaje del mercado y lo reflejo en un perfil que realmente represente quiénes son.
              </p>
              
              <!-- Mission -->
              <p class="mission-text">
                VJobs nace de esa experiencia y la convicción de que el talento, cuando se comunica con estrategia, sí puede abrir puertas reales.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- CTA Section Outside Content Wrapper -->
    <div id="about-cta" class="cta-container">
      <div class="cta-grid">
        <!-- Left Column: Benefits -->
        <div class="benefits-column">
          <h3>¿Por qué agendar una llamada conmigo?</h3>
          <div class="benefits-list">
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Evaluación personalizada de tu perfil</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Plan de acción específico para tu caso</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Resolución de dudas con un experto</span>
            </div>
            <div class="benefit-item">
              <i class="fas fa-check-circle"></i>
              <span>Sin costo y sin compromiso</span>
            </div>
          </div>
        </div>
        
        <!-- Right Column: CTA -->
        <div class="cta-column">
          <div class="cta-highlight">
            <p class="cta-subtext">Descubre cómo tu historia puede ser la próxima</p>
            <button @click="scrollToContact" class="btn btn-about">
              Agenda una llamada conmigo
              <span class="arrow-icon">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- ContactModal - Custom version without history manipulation -->
    <ContactModal 
      v-model="showModal" 
      :disable-history="true"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ContactModal from './ContactModal.vue';

const showModal = ref(false);

const scrollToContact = () => {
  showModal.value = true;
};
</script>

<style scoped>
/* Base Mobile Styles */
.about {
  padding: 3rem 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;
}

.about::before {
  content: '';
  position: absolute;
  top: 20%;
  right: 20%;
  width: 60%;
  height: 60%;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%);
  opacity: 0.05;
  border-radius: 0 0 0 100%;
  z-index: 0;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 1rem;
  position: relative;
  z-index: 2;
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

.section-main-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  position: relative;
}

.section-main-title::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(135deg, var(--secondary-color) 0%, #e67e00 100%);
  border-radius: 2px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 2;
}

.about-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
}

/* Image Section */
.about-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 250px;
  aspect-ratio: 3/4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(5, 57, 97, 0.15);
  transition: transform 0.3s ease;
}

.image-wrapper:hover {
  transform: translateY(-5px);
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-accent-shape {
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 40%;
  height: 40%;
  background: var(--secondary-color);
  opacity: 0.1;
  border-radius: 50%;
  z-index: 1;
}

/* Content Section */
.about-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content-wrapper {
  max-width: 100%;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  line-height: 1.2;
}

.section-subtitle {
  font-size: 1.1rem;
  color: var(--secondary-color);
  margin-bottom: 2rem;
  font-weight: 500;
}

.about-text {
  margin-bottom: 2rem;
}

.about-text p {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-color);
  margin-bottom: 1.5rem;
}

.intro-text {
  font-weight: 500;
  color: var(--primary-color);
}

/* Featured Story - Main Emphasis */
.story-text.featured {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--primary-color);
  background: rgba(102, 154, 207, 0.05);
  padding: 1.2rem;
  border-radius: 12px;
  border-left: 4px solid var(--secondary-color);
  margin: 1.5rem 0;
}

.story-text.featured strong {
  color: var(--secondary-color);
  font-weight: 600;
}

.credibility-text {
  opacity: 0.9;
}

.methodology-text {
  opacity: 0.85;
}

.mission-text {
  font-style: italic;
  opacity: 0.85;
  font-weight: 500;
}

/* CTA Section Outside Content Wrapper */
.cta-container {
  background: linear-gradient(135deg, rgba(102, 154, 207, 0.05) 0%, rgba(214, 125, 9, 0.05) 100%);
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid rgba(102, 154, 207, 0.1);
  margin: 2rem auto 0;
  max-width: 1200px;
  position: relative;
  z-index: 1;
}

.cta-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 2rem;
  align-items: center;
}

/* Benefits Column */
.benefits-column h3 {
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: var(--text-color);
}

.benefit-item i {
  color: var(--secondary-color);
  font-size: 1rem;
  min-width: 16px;
}

/* CTA Column */
.cta-column {
  text-align: center;
}

.cta-highlight {
  background: rgba(214, 125, 9, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border-left: 3px solid var(--secondary-color);
}

.btn-about {
  padding: 0.9rem 1.8rem;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, var(--secondary-color) 0%, #e67e00 100%);
  color: white;
  border: none;
  border-radius: 50px;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(214, 125, 9, 0.3);
  cursor: pointer;
  white-space: nowrap;
  max-width: fit-content;
}

.btn-about:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 20px -3px rgba(214, 125, 9, 0.4);
}

.arrow-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
  font-weight: bold;
}

.btn-about:hover .arrow-icon {
  transform: translateX(3px);
}

.cta-subtext {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
  opacity: 0.8;
}

/* Animations */
.content-wrapper {
  animation: fadeInUp 0.8s ease-out;
}

.image-wrapper {
  animation: fadeInLeft 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Mobile ≤768px */
@media (max-width: 768px) {
  .about {
    padding: 4rem 0;
  }
  
  .about-grid {
    gap: 2.5rem;
  }
  
  .image-wrapper {
    max-width: 280px;
  }
  
  .section-title {
    font-size: 1.9rem;
  }
  
  .story-text.featured {
    font-size: 1.05rem;
    padding: 1.3rem;
  }
  
  .section-main-title {
    font-size: 2rem;
  }
  
  /* Responsive CTA Grid - Single Column Mobile */
  .cta-container {
    padding: 1.5rem;
    margin: 1.5rem 1rem 0;
  }
  
  .cta-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .cta-column {
    order: -1; /* CTA primero en mobile */
  }
  
  .benefits-list {
    gap: 0.6rem;
  }
  
  .benefit-item {
    font-size: 0.9rem;
  }
  
  .btn-about {
    font-size: 0.9rem;
    padding: 0.8rem 1.2rem;
    white-space: normal;
    line-height: 1.2;
    text-align: center;
    max-width: 200px;
  }
}

/* Tablet 768-992px */
@media (min-width: 769px) and (max-width: 992px) {
  .about {
    padding: 5rem 0;
  }
  
  .about-grid {
    gap: 3rem;
  }
  
  .image-wrapper {
    max-width: 320px;
  }
  
  .section-title {
    font-size: 2.1rem;
  }
  
  .about-text p {
    font-size: 1.05rem;
  }
  
  .story-text.featured {
    font-size: 1.15rem;
    padding: 1.4rem;
  }
  
  .section-main-title {
    font-size: 2.3rem;
  }
  
  /* Tablet CTA Adjustments */
  .cta-container {
    padding: 1.8rem;
    margin: 2rem 1.5rem 0;
  }
  
  .cta-grid {
    gap: 1.8rem;
  }
  
  .benefits-column h3 {
    font-size: 1.1rem;
  }
  
  .benefit-item {
    font-size: 0.9rem;
  }
}

/* Desktop >992px */
@media (min-width: 993px) {
  .about {
    padding: 6rem 0;
  }
  
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 4rem;
    text-align: left;
    align-items: flex-start;
  }
  
  .content-wrapper {
    max-width: 600px;
  }
  
  .section-title {
    font-size: 2.5rem;
    text-align: left;
  }
  
  .section-subtitle {
    font-size: 1.2rem;
    text-align: left;
  }
  
  .cta-container {
    text-align: left;
  }
  
  .image-wrapper {
    max-width: 400px;
  }
  
  .about-text p {
    font-size: 1.1rem;
  }
  
  .story-text.featured {
    font-size: 1.2rem;
    padding: 1.5rem;
  }
  
  .section-main-title {
    font-size: 2.8rem;
  }
  
  /* Desktop CTA Optimizations */
  .cta-container {
    padding: 2.5rem;
    margin: 2.5rem auto 0;
  }
  
  .cta-grid {
    gap: 2.5rem;
  }
  
  .benefits-column h3 {
    font-size: 1.3rem;
  }
  
  .benefit-item {
    font-size: 1rem;
  }
  
  .cta-highlight {
    padding: 2rem;
  }
  
  .about::before {
    width: 40%;
    height: 100%;
    top: 0;
    right: 0;
  }
}
</style>
