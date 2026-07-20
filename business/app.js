/* VelvetBite Studio - ₹7,999 Business Plan Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Banner Close Trigger
    const closeDemoBanner = document.getElementById('closeDemoBanner');
    const clientDemoBanner = document.getElementById('clientDemoBanner');
    if (closeDemoBanner && clientDemoBanner) {
        closeDemoBanner.addEventListener('click', () => {
            clientDemoBanner.style.display = 'none';
        });
    }

    // 2. Dark/Light Mode Toggle
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggleBtn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // 3. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 4. Video Reel Cards Handler
    const videoReelCards = document.querySelectorAll('.video-reel-card');
    videoReelCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title') || 'Restaurant Tour Video';
            alert(`▶ Playing High-Definition Video Reel: "${title}"\n\n(In full production, this opens a 1080p full-screen video lightbox modal).`);
        });
    });

    // 5. Table Reservation Dining Zone Selector
    const bookingZoneCards = document.querySelectorAll('.booking-zone-card');
    let selectedZone = 'Garden Terrace';
    bookingZoneCards.forEach(card => {
        card.addEventListener('click', () => {
            bookingZoneCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
            selectedZone = card.getAttribute('data-zone') || 'Garden Terrace';
            
            const statusBoxText = document.getElementById('statusBoxText');
            const dateVal = document.getElementById('resDate')?.value || 'today';
            const timeVal = document.getElementById('resTime')?.value || '07:00 PM';

            if (statusBoxText) {
                statusBoxText.textContent = `✨ Premium table for your party is reserved in ${selectedZone} on ${dateVal} at ${timeVal}!`;
            }
        });
    });

    // 6. Direct WhatsApp Table Reservation Submit
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

            const msg = `Hi VelvetBite Business Team, I would like to book a table at your restaurant:\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🏛️ Zone: ${selectedZone}\n📅 Date: ${date}\n⏰ Time: ${time}\n👥 Guests: ${guests}\n📝 Special Requests: ${notes}`;

            window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // 7. Star Review Submission Handler
    const starOpts = document.querySelectorAll('.star-opt');
    let userRating = 5;
    starOpts.forEach(star => {
        star.addEventListener('click', () => {
            userRating = parseInt(star.getAttribute('data-rating') || '5', 10);
            starOpts.forEach(s => {
                const r = parseInt(s.getAttribute('data-rating') || '0', 10);
                if (r <= userRating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
        });
    });

    const reviewForm = document.getElementById('businessReviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('revName')?.value || 'Dining Guest';
            const comment = document.getElementById('revComment')?.value || '';
            const reviewsGrid = document.getElementById('reviewsGrid');

            if (reviewsGrid) {
                const newCard = document.createElement('div');
                newCard.className = 'glow-card';
                newCard.innerHTML = `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem;">
                        <h4 style="font-size:1.05rem; font-weight:700; color:var(--color-text-dark);">${name}</h4>
                        <span style="color:#ffc107; font-weight:700; font-size:0.85rem;"><i class="fa-solid fa-star"></i> ${userRating}.0</span>
                    </div>
                    <p style="font-size:0.9rem; line-height:1.5; color:var(--color-text-muted);">${comment}</p>
                    <span style="font-size:0.75rem; color:#4caf50; font-weight:600; display:block; margin-top:0.8rem;"><i class="fa-solid fa-circle-check"></i> Verified Diner Review</span>
                `;
                reviewsGrid.prepend(newCard);
                reviewForm.reset();
                alert('✨ Thank you! Your star review has been verified and added to the patron feedback feed.');
            }
        });
    }

});
