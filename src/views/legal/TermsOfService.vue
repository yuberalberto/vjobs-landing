<template>
  <article class="legal-document">
    <h1>Terms of Service</h1>
    <p class="last-updated">Last updated: May 26, 2024</p>
    
    <section>
      <h2>1. Introduction</h2>
      <p>Welcome to VJobs. These Terms of Service ("Terms") govern your access to and use of our website and services.</p>
    </section>
    
    <section>
      <h2>2. Use of Our Services</h2>
      <p>You agree to use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services:</p>
      <ul>
        <li>In any way that violates any applicable law or regulation</li>
        <li>To transmit any advertising or promotional material without our prior written consent</li>
        <li>To impersonate or attempt to impersonate VJobs, a VJobs employee, another user, or any other person or entity</li>
      </ul>
    </section>
    
    <section>
      <h2>3. Intellectual Property</h2>
      <p>The Service and its original content, features, and functionality are and will remain the exclusive property of VJobs and its licensors.</p>
    </section>
    
    <section>
      <h2>4. Limitation of Liability</h2>
      <p>In no event shall VJobs, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
    </section>
    
    <section>
      <h2>5. Changes to Terms</h2>
      <p>We reserve the right to modify these Terms at any time. We will provide notice of any changes by updating the "Last updated" date of these Terms.</p>
    </section>
    
    <section>
      <h2>6. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at legal@vjobs.ca</p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'TermsOfService',
  mounted() {
    document.title = 'Terms of Service | VJobs';
  }
}
</script>

<style scoped>
.legal-document {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h1 {
  color: var(--primary-color);
  margin-bottom: 0.5rem;
}

.last-updated {
  color: #666;
  margin-bottom: 2rem;
  font-style: italic;
}

h2 {
  color: var(--primary-color);
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
}

p, li {
  line-height: 1.6;
  color: #333;
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;
  margin: 1rem 0;
}

li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .legal-document {
    padding: 1rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  h2 {
    font-size: 1.3rem;
  }
}
</style>
