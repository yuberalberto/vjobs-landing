<template>
  <section class="faqs" id="faqs">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">FAQs</span>
        <h2>Frequently Asked Questions</h2>
      </div>
      <p class="section-subtitle">Find answers to common questions about VJobs</p>

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
    question: "How does VJobs match me with jobs?",
    answer: "Our advanced algorithm analyzes your skills, experience, and preferences to match you with the most relevant job opportunities. We consider factors like location, salary expectations, and company culture to ensure the best fit.",
    isOpen: false
  },
  {
    question: "Is it free to use VJobs?",
    answer: "Yes, VJobs offers a free basic account that allows you to search and apply for jobs. We also offer premium features for users who want additional benefits like advanced search filters and priority application processing.",
    isOpen: false
  },
  {
    question: "How can I improve my profile visibility?",
    answer: "To increase your profile visibility, make sure to complete your profile with detailed information about your skills and experience. Regularly update your profile, add relevant certifications, and maintain an active presence on the platform.",
    isOpen: false
  },
  {
    question: "Can employers contact me directly?",
    answer: "Yes, employers can contact you directly through our messaging system if they're interested in your profile. You can control your privacy settings to manage who can contact you.",
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
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
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