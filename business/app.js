/* ══════════════════════════════════════════════════════════════════════════
   VelvetBite Business Plan — Bulletproof Interactive Engine
   No opacity:0 issues. Everything always visible. All 19 features work.
   ══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Demo Banner Close ──
    const banner = document.getElementById('demoBanner');
    const bannerClose = document.getElementById('bannerClose');
    if (banner && bannerClose) {
        bannerClose.addEventListener('click', () => {
            banner.style.display = 'none';
            const header = document.getElementById('header');
            if (header) header.style.top = '0';
        });
    }

    // ── 2. Dark/Light Theme Toggle ──
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const dark = document.body.classList.contains('dark-theme');
            themeBtn.innerHTML = dark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // ── 3. Scroll Progress Bar ──
    const progress = document.getElementById('scrollProgress');
    if (progress) {
        window.addEventListener('scroll', () => {
            const top = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            progress.style.width = ((top / height) * 100) + '%';
        }, { passive: true });
    }

    // ── 4. Sticky Header Shadow ──
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 60);
        }, { passive: true });
    }

    // ── 5. Back to Top ──
    const backTop = document.getElementById('backTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.classList.toggle('show', window.scrollY > 500);
        }, { passive: true });
        backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // ── 6. FAQ Accordion ──
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-q');
        if (q) {
            q.addEventListener('click', () => {
                const wasActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                if (!wasActive) item.classList.add('active');
            });
        }
    });

    // ── 7. Menu Search & Filters ──
    const searchInput = document.getElementById('menuSearch');
    const menuCards = document.querySelectorAll('.menu-card');
    const catBtns = document.querySelectorAll('[data-cat]');
    const dietBtns = document.querySelectorAll('[data-diet]');
    const pillBtns = document.querySelectorAll('[data-pill]');
    const countEl = document.getElementById('menuCount');
    let curCat = 'all', curDiet = 'all';

    function filterMenu() {
        const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
        let count = 0;
        menuCards.forEach(card => {
            const cat = card.dataset.category || '';
            const diet = card.dataset.diettype || '';
            const text = (card.dataset.search || '') + ' ' + card.textContent;
            const ok = (curCat === 'all' || cat === curCat)
                    && (curDiet === 'all' || diet === curDiet)
                    && (!q || text.toLowerCase().includes(q));
            card.style.display = ok ? '' : 'none';
            if (ok) count++;
        });
        if (countEl) countEl.textContent = `Showing ${count} items`;
    }

    if (searchInput) searchInput.addEventListener('input', filterMenu);

    catBtns.forEach(btn => btn.addEventListener('click', () => {
        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        curCat = btn.dataset.cat;
        filterMenu();
    }));

    dietBtns.forEach(btn => btn.addEventListener('click', () => {
        dietBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        curDiet = btn.dataset.diet;
        filterMenu();
    }));

    pillBtns.forEach(btn => btn.addEventListener('click', () => {
        if (searchInput) { searchInput.value = btn.dataset.pill; filterMenu(); }
    }));

    // ── 7.5 Menu Details Popup Modal ──
    const modal = document.getElementById('menuDetailsModal');
    if (modal) {
        const modalImg = document.getElementById('menuModalImage');
        const modalBadge = document.getElementById('menuModalBadge');
        const modalTitle = document.getElementById('menuModalTitle');
        const modalPrice = document.getElementById('menuModalPrice');
        const modalDesc = document.getElementById('menuModalDesc');
        const modalWaBtn = document.getElementById('menuModalWaBtn');
        const modalClose = document.getElementById('menuModalClose');

        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('a') || e.target.closest('button')) return;

                const imgUrl = card.querySelector('img')?.src || '';
                const title = card.querySelector('.card-title')?.textContent.trim() || '';
                const price = card.querySelector('.price-tag')?.textContent.trim() || '';
                const desc = card.querySelector('.card-text')?.textContent.trim() || '';
                const badgeEl = card.querySelector('.diet-tag');
                const badgeText = badgeEl ? badgeEl.textContent.trim() : 'Special';

                if (modalImg) modalImg.src = imgUrl;
                if (modalTitle) modalTitle.textContent = title;
                if (modalPrice) modalPrice.textContent = price;
                if (modalDesc) modalDesc.textContent = desc;
                if (modalBadge) {
                    modalBadge.textContent = badgeText;
                    modalBadge.className = 'diet-tag ' + (badgeEl ? badgeEl.classList.contains('veg') ? 'veg' : badgeEl.classList.contains('vegan') ? 'vegan' : 'nonveg' : 'veg');
                }

                if (modalWaBtn) {
                    const orderText = `Hi VelvetBite Bistro, I want to order:\n• *${title}* (${price})\n\nPlease confirm my order.`;
                    modalWaBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(orderText)}`;
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (modalClose) modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // ── 8. Photo Gallery Lightbox ──
    document.querySelectorAll('.photo-item').forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (!img) return;
            const lb = document.createElement('div');
            lb.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;cursor:zoom-out;animation:fadeIn 0.3s ease;';
            lb.innerHTML = `<img src="${img.src}" style="max-width:90%;max-height:90%;border-radius:16px;box-shadow:0 20px 60px rgba(0,0,0,0.6);">`;
            lb.addEventListener('click', () => lb.remove());
            document.body.appendChild(lb);
        });
    });

    // ── 9. Video Reel Cards ──
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            alert(`▶ Playing: "${card.dataset.title || 'Video Reel'}"\n\n(Production opens 1080p lightbox player)`);
        });
    });

    // ── 10. Booking Zone Selector ──
    const zoneCards = document.querySelectorAll('.zone-card');
    let selectedZone = 'Garden Terrace';
    zoneCards.forEach(card => {
        card.addEventListener('click', () => {
            zoneCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedZone = card.dataset.zone || 'Garden Terrace';
            const sb = document.getElementById('statusText');
            if (sb) sb.textContent = `✨ Premium table reserved in ${selectedZone}! Complete the form below.`;
        });
    });

    // ── 11. Table Reservation WhatsApp Submit ──
    const resForm = document.getElementById('resForm');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const v = id => document.getElementById(id)?.value || '';
            const msg = `🍽️ *VelvetBite Table Reservation*\n\n👤 Name: ${v('resName')}\n📞 Phone: ${v('resPhone')}\n🏛️ Zone: ${selectedZone}\n📅 Date: ${v('resDate')}\n⏰ Time: ${v('resTime')}\n👥 Guests: ${v('resGuests')}\n📝 Notes: ${v('resNotes')}`;
            window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // ── 12. Star Rating Selector ──
    const stars = document.querySelectorAll('.star-select i');
    let userRating = 5;
    stars.forEach(star => {
        star.addEventListener('click', () => {
            userRating = parseInt(star.dataset.r || '5', 10);
            stars.forEach(s => {
                s.classList.toggle('active', parseInt(s.dataset.r || '0', 10) <= userRating);
            });
        });
    });

    // ── 13. Review Form Submit ──
    const revForm = document.getElementById('revForm');
    if (revForm) {
        revForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('revName')?.value || 'Guest';
            const comment = document.getElementById('revComment')?.value || '';
            const grid = document.getElementById('reviewsGrid');
            if (grid) {
                const card = document.createElement('div');
                card.className = 'review-card anim-up';
                card.innerHTML = `
                    <div class="review-header">
                        <span class="review-name">${name}</span>
                        <span class="star-rating"><i class="fa-solid fa-star"></i> ${userRating}.0</span>
                    </div>
                    <p class="review-text">${comment}</p>
                    <span class="review-verified"><i class="fa-solid fa-circle-check"></i> Verified — Just Now</span>`;
                grid.prepend(card);
                revForm.reset();
                stars.forEach(s => s.classList.add('active'));
            }
        });
    }

    // ── 14. Email Contact Form ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const v = id => document.getElementById(id)?.value || '';
            alert(`📧 Email Inquiry Submitted!\n\n👤 ${v('cName')}\n✉️ ${v('cEmail')}\n💬 ${v('cMsg')}\n\n(In production, this sends to your email endpoint)`);
            contactForm.reset();
        });
    }

    // ── 15. Festival Countdown Timer ──
    const countdown = document.getElementById('countdown');
    if (countdown) {
        function tick() {
            const now = new Date();
            const end = new Date(now); end.setHours(23, 59, 59, 0);
            const d = end - now;
            const h = Math.floor(d / 3600000);
            const m = Math.floor((d % 3600000) / 60000);
            const s = Math.floor((d % 60000) / 1000);
            countdown.textContent = `${h}h ${m}m ${s}s`;
        }
        tick(); setInterval(tick, 1000);
    }
});
