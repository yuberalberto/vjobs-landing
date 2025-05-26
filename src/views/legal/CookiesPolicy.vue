<template>
  <article class="legal-document">
    <h1>Cookies Policy</h1>
    <p class="last-updated">Last updated: May 26, 2024</p>
    
    <section>
      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files that are placed on your computer by websites that you visit. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.</p>
    </section>
    
    <section>
      <h2>2. How We Use Cookies</h2>
      <p>We use cookies for the following purposes:</p>
      <ul>
        <li><strong>Essential Cookies:</strong> These are cookies that are required for the operation of our website.</li>
        <li><strong>Analytical/Performance Cookies:</strong> These allow us to recognize and count the number of visitors and to see how visitors move around our website when they are using it.</li>
        <li><strong>Functionality Cookies:</strong> These are used to recognize you when you return to our website.</li>
        <li><strong>Targeting Cookies:</strong> These cookies record your visit to our website, the pages you have visited, and the links you have followed.</li>
      </ul>
    </section>
    
    <section>
      <h2>3. Third-Party Cookies</h2>
      <p>We also use third-party cookies which help us analyze and understand how you use this website. These cookies will be stored in your browser only with your consent.</p>
    </section>
    
    <section>
      <h2>4. Managing Cookies</h2>
      <p>You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.</p>
    </section>
    
    <section>
      <h2>5. Changes to This Policy</h2>
      <p>We may update our Cookies Policy from time to time. We will notify you of any changes by posting the new Cookies Policy on this page.</p>
    </section>
    
    <section>
      <h2>6. Contact Us</h2>
      <p>If you have any questions about our use of cookies, please contact us at privacy@vjobs.ca</p>
    </section>
  </article>
</template>

<script>
export default {
  name: 'CookiesPolicy',
  mounted() {
    document.title = 'Cookies Policy | VJobs';
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

strong {
  color: var(--primary-color);
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
