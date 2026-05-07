/* ============================================
   NELSON ART PRO - MAIN.JS
   Fonctionnalités globales :
   - Preloader
   - Navigation Header
   - Mobile Menu
   - Theme Toggle (Dark/Light)
   - Scroll Animations (Reveal)
   - Back to Top
   - Smooth Scroll
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Lancer les animations des éléments visibles
            revealOnScroll();
        }, 1000);
    });
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Ajouter la classe scrolled
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Cacher/afficher la navigation au scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScroll = currentScroll;
        
        // Back to top
        const backToTop = document.getElementById('back-to-top');
        if (currentScroll > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Révéler les éléments au scroll
        revealOnScroll();
    });
    
    // ===== MOBILE MENU =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav__link');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Fermer le menu au clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // ===== THEME TOGGLE (DARK/LIGHT MODE) =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIconMoon = document.getElementById('theme-icon-moon');
    const themeIconSun = document.getElementById('theme-icon-sun');
    const body = document.body;
    
    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('nelson-art-pro-theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeIconMoon.style.display = 'none';
        themeIconSun.style.display = 'block';
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeIconMoon.style.display = 'none';
            themeIconSun.style.display = 'block';
            localStorage.setItem('nelson-art-pro-theme', 'light');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeIconMoon.style.display = 'block';
            themeIconSun.style.display = 'none';
            localStorage.setItem('nelson-art-pro-theme', 'dark');
        }
    });
    
    // ===== SCROLL ANIMATIONS (REVEAL) =====
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // ===== BACK TO TOP =====
    const backToTop = document.getElementById('back-to-top');
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== SMOOTH SCROLL POUR LES ANCRES =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ===== PARTICULES HERO (Effet visuel optionnel) =====
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 6 + 6) + 's';
            heroSection.appendChild(particle);
        }
    }
    
    // ===== METTRE À JOUR L'ANNÉE DANS LE FOOTER =====
    const footerYear = document.querySelector('.footer__bottom p');
    if (footerYear) {
        const year = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', year);
    }
    
    // Exécuter revealOnScroll au chargement
    revealOnScroll();
});