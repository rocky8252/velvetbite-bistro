/* ==========================================================================
   VelvetBite Business Plan (₹7,999) — Complete Interactive Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. Banner Close ----
    const closeDemoBanner = document.getElementById('closeDemoBanner');
    const clientDemoBanner = document.getElementById('clientDemoBanner');
    if (closeDemoBanner && clientDemoBanner) {
        closeDemoBanner.addEventListener('click', () => { clientDemoBanner.style.display = 'none'; });
    }

    // ---- 2. Dark/Light Mode Toggle ----
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // ---- 3. Premium Scroll Animations (IntersectionObserver) ----
    const animatedEls = document.querySelectorAll('.fade-up, .scale-in');
    if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        animatedEls.forEach(el => observer.observe(el));
    }

    // ---- 4. Scroll Progress Bar ----
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (scrollTop / scrollHeight) * 100;
            scrollProgress.style.width = progress + '%';
        });
    }

    // ---- 5. Sticky Header Shadow ----
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ---- 6. Back to Top Button ----
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            backToTop.classList.toggle('visible', window.scrollY > 600);
        });
        backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    // ---- 7. FAQ Accordion Toggle ----
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) item.classList.add('active');
            });
        }
    });

    // ---- 8. Menu Search & Filters ----
    const menuSearchInput = document.getElementById('menuSearchInput');
    const menuCards = document.querySelectorAll('.menu-item-card');
    const catBtns = document.querySelectorAll('.menu-filter-btn');
    const dietBtns = document.querySelectorAll('.diet-filter-btn');
    const pillBtns = document.querySelectorAll('.quick-pill-btn');
    const resultCount = document.getElementById('menuResultsCount');
    let activeCat = 'all', activeDiet = 'all';

    function filterMenu() {
        const query = menuSearchInput ? menuSearchInput.value.toLowerCase().trim() : '';
        let visible = 0;
        menuCards.forEach(card => {
            const cat = card.dataset.category || '';
            const diet = card.dataset.diet || '';
            const search = (card.dataset.search || '') + ' ' + (card.textContent || '');
            const matchCat = (activeCat === 'all' || cat === activeCat);
            const matchDiet = (activeDiet === 'all' || diet === activeDiet);
            const matchSearch = (!query || search.toLowerCase().includes(query));
            const show = matchCat && matchDiet && matchSearch;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });
        if (resultCount) resultCount.textContent = `Showing ${visible} signature creations`;
    }

    if (menuSearchInput) menuSearchInput.addEventListener('input', filterMenu);
    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCat = btn.dataset.cat || 'all';
            filterMenu();
        });
    });
    dietBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dietBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeDiet = btn.dataset.diet || 'all';
            filterMenu();
        });
    });
    pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (menuSearchInput) {
                menuSearchInput.value = btn.dataset.query || '';
                filterMenu();
            }
        });
    });

    // ---- 9. Video Reel Cards Handler ----
    document.querySelectorAll('.video-reel-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title || 'Restaurant Tour';
            alert(`▶ Playing: "${title}"\n\n(Full production opens 1080p lightbox player)`);
        });
    });

    // ---- 10. Photo Gallery Lightbox ----
    document.querySelectorAll('.photo-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                const lightbox = document.createElement('div');
                lightbox.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
                lightbox.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:12px;box-shadow:0 20px 60px rgba(0,0,0,0.5);">`;
                lightbox.addEventListener('click', () => lightbox.remove());
                document.body.appendChild(lightbox);
            }
        });
    });

    // ---- 11. Booking Zone Selector ----
    const bookingZoneCards = document.querySelectorAll('.booking-zone-card');
    let selectedZone = 'Garden Terrace';
    bookingZoneCards.forEach(card => {
        card.addEventListener('click', () => {
            bookingZoneCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedZone = card.dataset.zone || 'Garden Terrace';
            const statusBox = document.getElementById('statusBoxText');
            if (statusBox) statusBox.textContent = `✨ Premium table reserved in ${selectedZone}! Complete the form to confirm.`;
        });
    });

    // ---- 12. WhatsApp Table Reservation Submit ----
    const resForm = document.getElementById('businessResForm');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('resName')?.value || 'Guest';
            const phone = document.getElementById('resPhone')?.value || '';
            const date = document.getElementById('resDate')?.value || '';
            const time = document.getElementById('resTime')?.value || '';
            const guests = document.getElementById('resGuests')?.value || '2';
            const notes = document.getElementById('resNotes')?.value || 'None';
            const msg = `🍽️ *VelvetBite Table Reservation*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🏛️ Zone: ${selectedZone}\n📅 Date: ${date}\n⏰ Time: ${time}\n👥 Guests: ${guests}\n📝 Notes: ${notes}`;
            window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // ---- 13. Star Review Submission ----
    const starOpts = document.querySelectorAll('.star-opt');
    let userRating = 5;
    starOpts.forEach(star => {
        star.addEventListener('click', () => {
            userRating = parseInt(star.dataset.rating || '5', 10);
            starOpts.forEach(s => {
                const r = parseInt(s.dataset.rating || '0', 10);
                s.classList.toggle('active', r <= userRating);
            });
        });
    });

    const reviewForm = document.getElementById('businessReviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('revName')?.value || 'Guest';
            const comment = document.getElementById('revComment')?.value || '';
            const grid = document.getElementById('reviewsGrid');
            if (grid) {
                const card = document.createElement('div');
                card.className = 'glow-card fade-up visible';
                card.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;">
                        <h4 style="font-size:1.05rem;font-weight:700;color:var(--color-text-dark);">${name}</h4>
                        <span style="color:#ffc107;font-weight:700;font-size:0.85rem;"><i class="fa-solid fa-star"></i> ${userRating}.0</span>
                    </div>
                    <p style="font-size:0.9rem;line-height:1.5;color:var(--color-text-muted);">${comment}</p>
                    <span style="font-size:0.75rem;color:#4caf50;font-weight:600;display:block;margin-top:0.8rem;"><i class="fa-solid fa-circle-check"></i> Verified Diner Review — Just Now</span>`;
                grid.prepend(card);
                reviewForm.reset();
                starOpts.forEach(s => s.classList.add('active'));
                alert('✨ Your verified star review has been published to the patron feedback feed!');
            }
        });
    }

    // ---- 14. Email Contact Form ----
    const contactForm = document.getElementById('emailContactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName')?.value || '';
            const email = document.getElementById('contactEmail')?.value || '';
            const msg = document.getElementById('contactMessage')?.value || '';
            alert(`📧 Email Inquiry Submitted!\n\n👤 ${name}\n✉️ ${email}\n💬 ${msg}\n\n(In production, this submits to your configured email endpoint)`);
            contactForm.reset();
        });
    }

    // ---- 15. Festival Offer Timer Countdown ----
    const countdownEl = document.getElementById('festivalCountdown');
    if (countdownEl) {
        function updateCountdown() {
            const now = new Date();
            const endOfDay = new Date(now);
            endOfDay.setHours(23, 59, 59, 0);
            const diff = endOfDay - now;
            const hours = Math.floor(diff / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            countdownEl.textContent = `${hours}h ${mins}m ${secs}s`;
        }
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
