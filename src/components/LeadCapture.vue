<template>
  <section class="lead-capture">
    <div class="container">
      <div class="lead-content">
        <h2>Get Job Alerts</h2>
        <p>Subscribe to receive the latest job opportunities matching your preferences</p>
        <form @submit.prevent="handleSubmit" class="lead-form">
          <div class="form-group">
            <input 
              type="email" 
              v-model="email" 
              placeholder="Enter your email"
              required
            />
          </div>
          <div class="form-group">
            <select v-model="jobType" required>
              <option value="">Select job type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <button type="submit" class="btn btn-large">Subscribe</button>
        </form>
        <p class="privacy-note">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const jobType = ref('')

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', { email: email.value, jobType: jobType.value })
  // Reset form
  email.value = ''
  jobType.value = ''
}
</script>

<style scoped>
.lead-capture {
  padding: 4rem 0;
  background-color: var(--accent-color);
  color: white;
}

.lead-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.lead-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.lead-content p {
  margin-bottom: 2rem;
  opacity: 0.9;
}

.lead-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  width: 100%;
}

input, select {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: 2px solid var(--primary-color);
}

.privacy-note {
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (min-width: 768px) {
  .lead-form {
    flex-direction: row;
  }

  .form-group {
    flex: 1;
  }
}
</style> 