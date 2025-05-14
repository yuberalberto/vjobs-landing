<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="container">
        <h1>Conoce mi historia</h1>
        <p class="subtitle">De migrante a experta en reclutamiento tecnológico</p>
      </div>
    </section>
    
    <section class="about-content">
      <div class="container">
        <div class="about-grid">
          <div class="about-image">
            <img src="@/assets/aboutme_img.PNG" alt="Vivian Castellanos" class="profile-large" />
          </div>
          <div class="about-text">
            <h2>Hola, soy Vivian Castellanos</h2>
            <p>Como migrante y profesional en recursos humanos, entiendo los desafíos de buscar empleo en un nuevo país. Mi misión es ayudarte a destacar en el competitivo mercado laboral tecnológico.</p>
            
            <div class="experience">
              <h3>Mi experiencia</h3>
              <ul>
                <li>+5 años en reclutamiento tecnológico</li>
                <li>Especializada en perfiles de tecnología</li>
                <li>He ayudado a más de 1000 profesionales a encontrar su trabajo ideal</li>
              </ul>
            </div>
            
            <div class="cta-section">
              <h3>¿Listo para impulsar tu carrera?</h3>
              <router-link to="/contact" class="btn btn-primary">Agenda una consulta</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
}
</script>

<style scoped>
.about-page {
  padding-top: 0;
}

.about-hero {
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 3rem;
}

.about-hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.about-hero .subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: flex-start;
}

.about-image img {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.about-text h2 {
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.about-text p {
  margin-bottom: 2rem;
  line-height: 1.7;
}

.experience {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin: 2rem 0;
}

.experience h3 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
}

.experience ul {
  list-style: none;
  padding: 0;
}

.experience li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

.experience li:before {
  content: "•";
  color: var(--accent-color);
  font-weight: bold;
  position: absolute;
  left: 0;
}

.cta-section {
  text-align: center;
  margin-top: 2rem;
  padding: 2rem;
  background: var(--light-bg);
  border-radius: 8px;
}

.cta-section h3 {
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  
  .about-hero {
    padding: 3rem 1rem;
  }
  
  .about-hero h1 {
    font-size: 2rem;
  }
}
</style>