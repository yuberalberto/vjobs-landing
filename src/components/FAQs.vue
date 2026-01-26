<template>
  <section class="faqs" id="faqs">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">FAQs</span>
        <h2>Preguntas Frecuentes</h2>
      </div>
      <p class="section-subtitle">Encuentra respuestas a las preguntas más comunes sobre VJobs</p>

      <div class="faqs-grid">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <span class="toggle-icon" :class="{ 'is-open': faq.isOpen }">+</span>
          </div>
          <div class="faq-answer" :class="{ 'is-open': faq.isOpen }">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: "¿Cómo me ayuda VJobs a encontrar trabajo?",
    answer: "Nuestro algoritmo avanzado analiza tus habilidades, experiencia y preferencias para coincidirte con las oportunidades laborales más relevantes. Consideramos factores como ubicación, expectativas salariales y cultura empresarial para asegurar el mejor ajuste.",
    isOpen: false
  },
  {
    question: "¿Es gratis usar VJobs?",
    answer: "Sí, VJobs ofrece una cuenta básica gratuita que te permite buscar y aplicar a trabajos. También ofrecemos funciones premium para usuarios que quieren beneficios adicionales como filtros de búsqueda avanzados y procesamiento prioritario de aplicaciones.",
    isOpen: false
  },
  {
    question: "¿Cómo puedo mejorar la visibilidad de mi perfil?",
    answer: "Para aumentar la visibilidad de tu perfil, asegúrate de completarlo con información detallada sobre tus habilidades y experiencia. Actualiza tu perfil regularmente, agrega certificaciones relevantes y mantén una presencia activa en la plataforma.",
    isOpen: false
  },
  {
    question: "¿Pueden los empleadores contactarme directamente?",
    answer: "Sí, los empleadores pueden contactarte directamente a través de nuestro sistema de mensajería si están interesados en tu perfil. Puedes controlar tu configuración de privacidad para administrar quién puede contactarte.",
    isOpen: false
  }
])

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen
}
</script>

<style scoped>
.faqs {
  padding: 6rem 0;
  background-color: white;
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

.section-header {
  text-align: center;
  margin-bottom: 1rem;
}

.section-header h2 {
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

.faqs-grid {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  padding: 1.5rem;
  background-color: #f8f9fa;
  cursor: not-allowed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: none;
  opacity: 0.6;
}

.faq-question h3 {
  color: var(--primary-color);
  font-size: 1.1rem;
  margin: 0;
}

.toggle-icon {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.3s ease;
}

.toggle-icon.is-open {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-answer.is-open {
  padding: 1.5rem;
  max-height: 500px;
}

.faq-answer p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}
</style> 