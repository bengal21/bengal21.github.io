(function() {
            'use strict';

            // ===== Typewriter Effect =====
            const typewriterElement = document.getElementById('typewriter');
            const phrases = [
                'Python Developer',
                'Backend Engineer',
                'Full-Stack Enthusiast',
                'SQL & Data Lover',
                'Problem Solver'
            ];
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typewriterTimeout;

            function typewriter() {
                const currentPhrase = phrases[phraseIndex];
                const isComplete = charIndex === currentPhrase.length;

                if (isDeleting) {
                    typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    if (charIndex === 0) {
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                        typewriterTimeout = setTimeout(typewriter, 600);
                        return;
                    }
                    typewriterTimeout = setTimeout(typewriter, 40);
                } else {
                    typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    if (isComplete) {
                        typewriterTimeout = setTimeout(() => { isDeleting = true;
                            typewriter(); }, 2000);
                        return;
                    }
                    typewriterTimeout = setTimeout(typewriter, 70);
                }
            }

            typewriter();

            // ===== Navbar Scroll =====
            const navbar = document.getElementById('navbar');
            let lastScroll = 0;

            window.addEventListener('scroll', function() {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                if (currentScroll > 30) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                lastScroll = currentScroll;
            });

            // ===== Mobile Menu =====
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');

            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('open');
            });

            // Close menu on link click
            document.querySelectorAll('.nav-links a').forEach(function(link) {
                link.addEventListener('click', function() {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                });
            });

            // ===== Active Nav Link on Scroll =====
            const sections = document.querySelectorAll('section[id]');
            const navAnchors = document.querySelectorAll('.nav-links a');

            window.addEventListener('scroll', function() {
                let current = 'hero';
                sections.forEach(function(section) {
                    const sectionTop = section.offsetTop - 120;
                    if (window.pageYOffset >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navAnchors.forEach(function(anchor) {
                    anchor.classList.remove('active');
                    if (anchor.getAttribute('href') === '#' + current) {
                        anchor.classList.add('active');
                    }
                });
            });

            // ===== Scroll Animations (Intersection Observer) =====
            const fadeElements = document.querySelectorAll('.fade-up');

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // If it's a skill card with a bar, animate the bar
                        const barFill = entry.target.querySelector('.bar .fill');
                        if (barFill && barFill.dataset.width) {
                            const width = parseInt(barFill.dataset.width, 10);
                            setTimeout(function() {
                                barFill.style.width = width + '%';
                            }, 200);
                        }
                    }
                });
            }, {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            });

            fadeElements.forEach(function(el) {
                observer.observe(el);
            });

            // Also observe skill cards directly for bar animation
            document.querySelectorAll('.skill-card').forEach(function(card) {
                observer.observe(card);
            });

            // ===== Contact Form =====
            const contactForm = document.getElementById('contactForm');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const message = document.getElementById('message').value.trim();

                if (!name || !email || !message) {
                    alert('Пожалуйста, заполните все поля.');
                    return;
                }

                if (!email.includes('@') || !email.includes('.')) {
                    alert('Пожалуйста, введите корректный email.');
                    return;
                }

                // Simulate sending
                const btn = this.querySelector('.btn');
                const originalText = btn.textContent;
                btn.textContent = 'Отправка...';
                btn.disabled = true;

                setTimeout(function() {
                    alert('✅ Сообщение отправлено! Я свяжусь с вами в ближайшее время.');
                    contactForm.reset();
                    btn.textContent = originalText;
                    btn.disabled = false;
                }, 1200);
            });

            // ===== Smooth anchor scroll (fallback) =====
            document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const target = document.querySelector(targetId);
                    if (target) {
                        e.preventDefault();
                        const offsetTop = target.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // ===== Handle skill bars on load if already visible =====
            window.addEventListener('load', function() {
                document.querySelectorAll('.skill-card .bar .fill').forEach(function(fill) {
                    const rect = fill.closest('.skill-card').getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    if (isVisible && fill.dataset.width) {
                        const width = parseInt(fill.dataset.width, 10);
                        setTimeout(function() {
                            fill.style.width = width + '%';
                        }, 400);
                    }
                });
            });

        })();