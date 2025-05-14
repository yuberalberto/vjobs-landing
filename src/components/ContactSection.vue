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
          <div class="form-group">
            <input 
              type="text" 
              v-model="formData.name" 
              placeholder="Nombre completo" 
              required
            >
          </div>

          <div v-if="!showEmail" class="form-group">
            <input 
              type="tel" 
              v-model="formData.phone" 
              placeholder="Tu número para contactarte fácilmente" 
              required
            >
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
              required
            >
            <p class="contact-switch">
              <a href="#" @click.prevent="toggleContactMethod">
                Prefiero dejar mi número de teléfono
              </a>
            </p>
          </div>

          <div class="form-group">
            <select v-model="formData.stage" required>
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
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-large">
            <i class="fas fa-calendar-check"></i> Agendar mi sesión gratuita
          </button>

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
import { ref } from 'vue';

export default {
  setup() {
    const showEmail = ref(false);
    const formData = ref({
      name: '',
      phone: '',
      email: '',
      stage: '',
      message: ''
    });

    const toggleContactMethod = () => {
      showEmail.value = !showEmail.value;
      formData.value.phone = '';
      formData.value.email = '';
    };

    const submitForm = () => {
      console.log('Form submitted:', formData.value);
      // Aquí irá la lógica de envío del formulario
      formData.value = {
        name: '',
        phone: '',
        email: '',
        stage: '',
        message: ''
      };
    };

    return {
      showEmail,
      formData,
      toggleContactMethod,
      submitForm
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

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(102, 154, 207, 0.2);
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
