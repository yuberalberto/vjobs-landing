<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="@/assets/logo.png" alt="VJobs Logo" class="logo" />
          <p class="slogan">Impulsando tu carrera profesional en el mundo digital</p>
          <div class="social-links">
            <a href="https://www.linkedin.com/company/vjobs-hr-advisory/" target="_blank" rel="noopener" class="social-link" aria-label="LinkedIn">
              <i class="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com/vjobs.resume" target="_blank" rel="noopener" class="social-link" aria-label="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.youtube.com/@VJobs.Resume" target="_blank" rel="noopener" class="social-link" aria-label="YouTube">
              <i class="fab fa-youtube"></i>
            </a>
          </div>
        </div>

        <div class="footer-contact">
          <h4>Contacto</h4>
          <p><i class="fas fa-envelope"></i> contacto@vjobs.ca</p>
          <p><i class="fas fa-map-marker-alt"></i> Toronto, Canadá</p>
        </div>

        <div class="footer-newsletter">
          <h4>Suscríbete</h4>
          <p>Recibe consejos y ofertas exclusivas</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Tu correo electrónico" required />
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2025 VJobs. Todos los derechos reservados.</p>
        <div class="legal-links">
          <router-link to="/legal/terms" class="legal-link">Términos de Servicio</router-link>
          <span>|</span>
          <router-link to="/legal/privacy" class="legal-link">Política de Privacidad</router-link>
          <span>|</span>
          <router-link to="/legal/cookies" class="legal-link">Cookies</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.footer {
  background-color: var(--primary-color);
  color: white;
  padding: 4rem 0 2rem;
  position: relative;
  overflow: hidden;
  border-top: 4px solid var(--accent-color);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-color), #ff8a00, var(--accent-color));
  background-size: 200% auto;
  animation: gradient 3s linear infinite;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-bottom: 3rem;
  align-items: start;
}

.footer-logo .logo {
  height: 50px;
  margin-bottom: 1rem;
}

.slogan {
  margin-bottom: 1.5rem;
  opacity: 0.9;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, var(--accent-color), #ff8a00);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.social-link i {
  position: relative;
  z-index: 1;
}

.social-link:hover {
  border-color: transparent;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(255, 152, 0, 0.3);
}

.social-link:hover::before {
  opacity: 1;
}

h4 {
  color: white;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 0.5rem;
}

h4 {
  display: inline-block;
  padding-bottom: 0.75rem;
  position: relative;
}

h4::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-color), #ff8a00);
  transform: scaleX(0.3);
  transform-origin: left;
  transition: transform 0.3s ease;
}

h4:hover::after {
  transform: scaleX(1);
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 0.3rem 0;
}

.footer-link {
  position: relative;
  padding-left: 0;
  transition: all 0.3s ease;
  display: inline-block;
}

.footer-link::before {
  content: '→';
  position: absolute;
  left: -20px;
  color: var(--accent-color);
  opacity: 0;
  transition: all 0.3s ease;
}

.footer-link:hover {
  color: var(--accent-color);
  padding-left: 25px;
  transform: translateX(5px);
}

.footer-link:hover::before {
  opacity: 1;
  left: 0;
}

.footer-contact p {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.footer-contact i {
  color: var(--accent-color);
  width: 20px;
  text-align: center;
}

.newsletter-form {
  display: flex;
  margin-top: 1rem;
}

.newsletter-form input {
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid transparent;
  border-radius: 4px 0 0 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.newsletter-form input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.2);
  background: rgba(255, 255, 255, 0.1);
}

.newsletter-form input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.newsletter-form .btn {
  border-radius: 0 4px 4px 0;
  padding: 0 1.5rem;
  background: linear-gradient(45deg, var(--accent-color), #ff8a00);
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 152, 0, 0.2);
}

.newsletter-form .btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: 0.5s;
}

.newsletter-form .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 152, 0, 0.3);
}

.newsletter-form .btn:hover::before {
  left: 100%;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 3rem;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
  position: relative;
}

.footer-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color), #ff8a00);
  border-radius: 3px;
}

.legal-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.legal-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.2rem 0;
}

.legal-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.legal-link:hover {
  color: var(--accent-color);
  text-shadow: 0 0 5px rgba(255, 152, 0, 0.3);
}

.legal-link:hover::after {
  width: 100%;
}

.legal-links span {
  color: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .newsletter-form {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .newsletter-form input,
  .newsletter-form .btn {
    border-radius: 4px;
    width: 100%;
  }
}

</style>
