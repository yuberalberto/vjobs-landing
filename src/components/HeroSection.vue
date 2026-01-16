<template>
  <section class="hero">
    <div class="hero-bg-shape"></div>
    <div class="container hero-container">
      <div class="hero-content">
        <div class="trust-badges">
          <span class="badge"><i class="fas fa-star"></i> Especialistas en Transición Laboral y Empleabilidad</span>
        </div>
        
        <h1>Te ayudo a definir <span class="highlight">una estrategia laboral clara y realista</span></h1>
        <p class="hero-subtitle">Tanto si buscas empleo en Canadá como si quieres transicionar a IT, te ayudo a tomar decisiones informadas que se alineen con tu perfil y las exigencias del mercado actual. <br>Solicita tu sesión diagnóstica gratuita aqui: </p>
        
        <div class="cta-section">
          <button @click="showModal = true" class="btn btn-primary btn-large btn-cta">
            <i class="fas fa-calendar-check"></i>
            Diagnostico Gratis
          </button>
          <p class="cta-subtext">Sin compromiso • Cupos limitados</p>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <h3>+500</h3>
            <p>Asesorías Profesionales Realizadas</p>
          </div>
          <div class="stat-item">
            <h3>+16</h3>
            <p>Profesionales Acompañados en América</p>
          </div>
        </div>
      </div>

      <div class="hero-profile">
        <div class="profile-image-wrapper">
          <img :src="aboutMeImage" alt="Vivian Castellanos - Especialista en Transición Laboral" class="profile-image" />
        </div>
        <div class="profile-message">
          <p class="intro-text">En VJobs creemos que el talento necesita estrategia para ser visible.</p>
          <p class="personal-message">Soy <strong>Vivian</strong>, profesional en Recursos Humanos y migrante como tú. Acompaño a profesionales latinos a definir una estrategia clara para comunicar su perfil y avanzar en el mercado laboral o en su transición al sector IT.</p>
        </div>
      </div>
    </div>

    <ContactModal 
      v-model="showModal"
      @submit="handleFormSubmit"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import ContactModal from './ContactModal.vue';
// Imagen desde la carpeta public
const aboutMeImage = '/aboutme_img.PNG';

const showModal = ref(false);

const handleFormSubmit = () => {
  // Aquí iría la lógica para procesar el formulario
  // Por ejemplo, enviar a un API, mostrar mensaje de éxito, etc.
};
</script>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--background-color);
  color: var(--text-color);
  position: relative;
  margin: 0;
  padding: 5rem 0 2rem;
  overflow: hidden;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  min-height: 80vh;
}

/* Estilos para la sección de perfil */
.hero-profile {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  text-align: center;
}

.profile-image-wrapper {
  border-radius: 0;
  overflow: visible;
  box-shadow: none;
  background: none;
  padding: 0;
  margin: 0 auto;
  max-width: 400px;
}

.profile-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
  object-fit: contain;
  opacity: 1; /* Aseguramos opacidad completa */
  filter: none; /* Eliminamos cualquier filtro que pueda afectar la opacidad */
  background: transparent;
  mix-blend-mode: normal; /* Desactivamos el blend mode */
  -webkit-backface-visibility: hidden; /* Previene problemas de renderizado en algunos navegadores */
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast; /* Mejora la nitidez */
  image-rendering: crisp-edges;
}

.profile-message {
  color: var(--text-color);
  line-height: 1.7;
  padding: 1rem 0;
}

.intro-text {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.personal-message {
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
}

.personal-message strong {
  color: var(--secondary-color);
  font-weight: 600;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 3rem;
    padding: 2rem;
  }
  
  .hero-content {
    max-width: 100%;
    margin: 0 auto;
    order: 0;
    text-align: center;
  }
  
  .trust-badges {
    justify-content: center;
  }
  
  .cta-section {
    text-align: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .btn-cta {
    margin: 0 auto;
  }
  
  .hero-subtitle {
    max-width: 100%;
    margin: 0 auto;
  }
  
  .search-box {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 2rem auto;
  }
  
  .hero-stats {
    max-width: 500px;
    margin: 2rem auto;
  }
  
  .hero-profile {
    order: 1;
  }
  
  .hero-image {
    order: 0;
  }
  
  .image-wrapper {
    margin: 0 auto;
    max-width: 90%;
  }
  
  .hero-bg-shape {
    width: 100%;
    height: 50%;
    border-radius: 0 0 50% 50%;
  }
}

.hero-bg-shape {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-color) 0%, var(--primary-color) 100%);
  opacity: 0.1;
  border-radius: 0 0 0 100%;
  z-index: 1;
}

.hero-content {
  max-width: 650px;
  padding: 2rem;
  margin: 0;
  position: relative;
  z-index: 2;
  animation: fadeInUp 0.8s ease-out;
}

.trust-badges {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.badge {
  background: rgba(var(--primary-rgb), 0.1);
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.badge i {
  color: var(--accent-color);
}

.badge span {
  font-size: 0.8rem;
  color: #666;
}

.cta-section {
  margin: 2rem 0;
}

.btn-cta {
  padding: 1.2rem 2rem;
  font-size: 1.1rem;
  width: auto;
  max-width: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  transition: transform 0.2s ease;
  margin: 0 auto;
}

.btn-cta:hover {
  transform: translateY(-2px);
}

.hero .cta-subtext {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.8rem;
  text-align: center;
}

.floating-card {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  animation: float 3s ease-in-out infinite;
}

.card-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.card-icon {
  font-size: 1.5rem;
  color: var(--accent-color);
}

.card-text {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

.card-text strong {
  color: var(--primary-color);
}

.card-text span {
  color: #666;
  font-size: 0.8rem;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.highlight {
  color: var(--accent-color);
  position: relative;
  display: inline-block;
}

.search-box {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin: 2rem 0;
}

.search-input {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input i {
  position: absolute;
  left: 1rem;
  color: var(--text-color);
  opacity: 0.5;
}

.search-input input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input input:focus {
  border-color: var(--accent-color);
  outline: none;
  box-shadow: 0 0 0 2px rgba(102, 154, 207, 0.2);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-top: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-item h3 {
  color: var(--primary-color);
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.hero-stats .stat-item p {
  color: var(--text-color);
  font-size: 0.9rem; 
  opacity: 0.8;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  line-height: 1.2;
  margin: 0 0 1.5rem 0;
  color: var(--primary-color);
  font-weight: 700;
  text-align: left;
  max-width: 15ch;
  text-wrap: balance;
  text-wrap: pretty;
}

.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  opacity: 0.9;
  max-width: 90%;
  text-align: left;
  margin: 0 0 0 0;
}

.hero p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1.1rem;
}

.image-wrapper {
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 4/3;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
}

.image-accent-shape {
  position: absolute;
  bottom: -20%;
  right: -20%;
  width: 60%;
  height: 60%;
  background: var(--accent-color);
  opacity: 0.1;
  border-radius: 50%;
  z-index: 1;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom right,
    rgba(102, 154, 207, 0.3) 0%,
    rgba(102, 154, 207, 0.2) 70%,
    rgba(214, 125, 9, 0.1) 100%
  );
  backdrop-filter: blur(1px);
  pointer-events: none;
  border-radius: 30px;
  margin: -2px;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
  .hero {
    padding: 5rem 0 3rem;
    padding-top: 1rem;
  }
  
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .hero p {
    font-size: 1.1rem;
  }
  
  .hero-content {
    padding: 0;
  }
  
  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-buttons .btn {
    width: 100%;
    text-align: center;
  }
  
  .hero-profile {
    max-width: 500px;
    margin: 0 auto;
  }
  
  .trust-badges {
    justify-content: center;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .profile-image-wrapper {
    max-width: 260px;
    margin: 0 auto;
  }
}
</style>