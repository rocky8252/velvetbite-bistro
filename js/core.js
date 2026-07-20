// VelvetBite core namespace definitions
window.cursor = null;
window.currentMockTheme = 'luxury';
window.playDashboardSound = null;
window.dashState = null;
window.syncDashStats = null;
window.renderDashPanel = null;
window.addSimLog = null;
window.triggerDashboardToast = null;

document.addEventListener('DOMContentLoaded', () => {
    // Select custom cursor and bind to window
    window.cursor = document.getElementById('customCursor');

    // 1. Loader Logic
    const preloader = document.getElementById('preloader');
    const progress = document.getElementById('preloaderProgress');
    let width = 0;
    
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Trigger hero reveal
                    triggerHeroReveal();
                }, 600);
            }, 300);
        } else {
            width += Math.floor(Math.random() * 15) + 5;
            if (width > 100) width = 100;
            progress.style.width = width + '%';
        }
    }, 80);

    // 2. Custom Cursor & Glow
    const cursor = document.getElementById('customCursor');
    const dot = document.getElementById('customCursorDot');
    const glow = document.getElementById('mouseGlow');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        // Custom cursor placement
        cursor.style.left = x + 'px';
        cursor.style.top = y + 'px';
        dot.style.left = x + 'px';
        dot.style.top = y + 'px';

        // Mouse glow placement (smooth damping)
        glow.style.transform = `translate(${x}px, ${y}px)`;
    });

    // Cursor hover enlargements
    const hoverElements = document.querySelectorAll('a, button, .mockup-tab-btn, .faq-question, .benefit-card, .upgrade-card, .pricing-card');
    hoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        elem.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // Hide cursor when leaving viewport
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        dot.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        dot.style.opacity = '1';
    });

    // 3. Feature Card Mouse Coord Glows (Vercel Grid Style)
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 3b. Feature Showcase Category Switcher
    const catBtns = document.querySelectorAll('.feature-cat-btn');
    const gridPanels = document.querySelectorAll('.features-grid-panel');

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCat = btn.getAttribute('data-cat');
            gridPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === targetCat) {
                    panel.classList.add('active');
                }
            });

            // Scroll trigger refresh
            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    });

    // 3c. Dashboard Showcase Category Switcher
    const dashCatBtns = document.querySelectorAll('.dash-cat-btn');
    const dashGridPanels = document.querySelectorAll('.dashboard-grid-panel');

    dashCatBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dashCatBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetCat = btn.getAttribute('data-dashcat');
            dashGridPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('id') === targetCat) {
                    panel.classList.add('active');
                }
            });

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        });
    });

    // 4. Parallax Floating Food Cards
    document.addEventListener('mousemove', (e) => {
        const floatingItems = document.querySelectorAll('.floating-food');
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;

        floatingItems.forEach(item => {
            const speed = parseFloat(item.getAttribute('data-speed')) || 1;
            const x = (dx * speed) / 35;
            const y = (dy * speed) / 35;
            item.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // 5. Mobile Toggle Navigation
    const toggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    toggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        toggle.classList.toggle('active');
        // Toggle mobile nav button lines animation
        const spans = toggle.querySelectorAll('span');
        if (mobileNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Header scroll background modification
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 6. FAQ Accordion Mechanics
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 7. GSAP Visual Reveals & Scroll Animations
    function triggerHeroReveal() {
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Global defaults to prevent CSS transitions from conflicting with GSAP inline styling
            gsap.defaults({
                onStart: function() {
                    const targets = this.targets();
                    if (targets && targets.length) {
                        targets.forEach(el => {
                            if (el instanceof HTMLElement) el.classList.add('no-transition');
                        });
                    }
                },
                onComplete: function() {
                    const targets = this.targets();
                    if (targets && targets.length) {
                        targets.forEach(el => {
                            if (el instanceof HTMLElement) el.classList.remove('no-transition');
                        });
                    }
                }
            });

            // Hero reveals
            gsap.from('.reveal-fade', {
                opacity: 0,
                y: 30,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // Trust badge bar delay reveal
            gsap.from('.trust-badge', {
                opacity: 0,
                y: 10,
                duration: 0.8,
                stagger: 0.08,
                delay: 0.8,
                ease: 'power2.out'
            });

            // Benefits cards scroll trigger
            gsap.from('.benefit-card', {
                scrollTrigger: {
                    trigger: '.benefits-grid',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Mockup frame scroll trigger zoom
            gsap.from('.device-frame', {
                scrollTrigger: {
                    trigger: '.device-frame',
                    start: 'top 80%',
                },
                scale: 0.9,
                opacity: 0,
                duration: 1.2,
                ease: 'power3.out'
            });

            // Feature cards reveal
            gsap.from('#basic-website .feature-card', {
                scrollTrigger: {
                    trigger: '.features-showcase-layout',
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.out'
            });

            // Pricing cards reveals
            gsap.from('.pricing-card', {
                scrollTrigger: {
                    trigger: '.pricing-grid',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Comparison table reveal
            gsap.from('.comparison-table-wrapper', {
                scrollTrigger: {
                    trigger: '.comparison-container',
                    start: 'top 80%',
                },
                opacity: 0,
                y: 30,
                scale: 0.98,
                duration: 1,
                ease: 'power2.out'
            });

            // Why upgrade cards reveals
            gsap.from('.upgrade-card', {
                scrollTrigger: {
                    trigger: '.why-upgrade-grid',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Free demo banner reveal
            gsap.from('.free-demo-banner', {
                scrollTrigger: {
                    trigger: '.free-demo-banner',
                    start: 'top 85%',
                },
                opacity: 0,
                scale: 0.95,
                y: 40,
                duration: 1.2,
                ease: 'power3.out'
            });

            // FAQ panel reveals
            gsap.from('.faq-item', {
                scrollTrigger: {
                    trigger: '.faq-list',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // CTA container reveal
            gsap.from('.cta-card', {
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 40,
                scale: 0.95,
                duration: 1.2,
                ease: 'power3.out'
            });

            // Why Choose Us cards reveal
            gsap.from('.choose-card', {
                scrollTrigger: {
                    trigger: '.why-choose-grid',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.08,
                ease: 'power2.out'
            });

            // Portfolio cards reveal
            gsap.from('.portfolio-card', {
                scrollTrigger: {
                    trigger: '.portfolio-grid',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Work Process steps reveal
            gsap.from('.process-step', {
                scrollTrigger: {
                    trigger: '.process-timeline',
                    start: 'top 80%',
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power2.out'
            });

            // Testimonials wrapper reveal
            gsap.from('.testimonials-carousel-wrapper', {
                scrollTrigger: {
                    trigger: '.testimonials-section',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 30,
                scale: 0.98,
                duration: 1,
                ease: 'power2.out'
            });

            // Free demo section call to action banner reveal
            gsap.from('.free-demo-cta', {
                scrollTrigger: {
                    trigger: '.free-demo-section',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 40,
                scale: 0.96,
                duration: 1.2,
                ease: 'power3.out'
            });

            // Contact details cards reveal
            gsap.from('.contact-card', {
                scrollTrigger: {
                    trigger: '.contact-layout',
                    start: 'top 85%',
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Contact form container reveal
            gsap.from('.contact-form-container', {
                scrollTrigger: {
                    trigger: '.contact-layout',
                    start: 'top 80%',
                },
                opacity: 0,
                x: 30,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }

    // 12. Dashboard Mockup Reveal Animation
    const dashMockup = document.querySelector('.dashboard-mockup-frame');
    if (dashMockup) {
        const dashObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    dashMockup.style.opacity = '1';
                    dashMockup.style.transform = 'translateY(0) scale(1)';
                    // Animate chart bars sequentially
                    const chartBars = document.querySelectorAll('.dash-mini-chart .chart-bar');
                    chartBars.forEach((bar, i) => {
                        const h = bar.style.height;
                        bar.style.height = '0%';
                        setTimeout(() => { bar.style.height = h; }, 300 + (i * 100));
                    });
                    dashObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        dashMockup.style.opacity = '0';
        dashMockup.style.transform = 'translateY(40px) scale(0.98)';
        dashMockup.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        dashObserver.observe(dashMockup);
    }

    // 13. Testimonials Carousel sliding mechanics
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(index) {
        testimonials.forEach(t => {
            t.classList.remove('active');
            t.style.opacity = '0';
        });
        dots.forEach(d => d.classList.remove('active'));

        currentTestimonial = index;
        const target = testimonials[currentTestimonial];
        const targetDot = dots[currentTestimonial];

        if (target) {
            target.classList.add('active');
            setTimeout(() => {
                target.style.opacity = '1';
            }, 50);
        }
        if (targetDot) {
            targetDot.classList.add('active');
        }
    }

    function nextTestimonial() {
        let nextIndex = currentTestimonial + 1;
        if (nextIndex >= testimonials.length) {
            nextIndex = 0;
        }
        showTestimonial(nextIndex);
    }

    function startTestimonialTimer() {
        testimonialInterval = setInterval(nextTestimonial, 4500);
    }

    function stopTestimonialTimer() {
        clearInterval(testimonialInterval);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            stopTestimonialTimer();
            const index = parseInt(dot.getAttribute('data-index')) || 0;
            showTestimonial(index);
            startTestimonialTimer();
        });
    });

    if (testimonials.length > 0) {
        startTestimonialTimer();
    }

    // Bind hover enlargement target selectors for new elements
    const newHoverElements = document.querySelectorAll('.portfolio-card, .carousel-dot, .contact-link, .form-control-input, .btn-portfolio, .btn-submit-inquiry');
    newHoverElements.forEach(elem => {
        elem.addEventListener('mouseenter', () => {
            if (cursor) cursor.classList.add('hovered');
        });
        elem.addEventListener('mouseleave', () => {
            if (cursor) cursor.classList.remove('hovered');
        });
    });

});