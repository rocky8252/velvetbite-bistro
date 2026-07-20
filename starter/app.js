/* L'Olivier Bistro - Main App Logic */

document.addEventListener('DOMContentLoaded', () => {

    // 0. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check local storage for theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            if (isDark) {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 1. Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Lightbox Gallery Modal
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (lightboxModal && lightboxImage && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgUrl = item.getAttribute('data-image');
                if (imgUrl) {
                    lightboxImage.src = imgUrl;
                    lightboxModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // prevent background scrolling
                }
            });
        });

        // Close functions
        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                lightboxImage.src = '';
            }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close on clicking overlay background
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
    // 3. Menu Category Filtering
    const menuTabBtns = document.querySelectorAll('.menu-tab-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    if (menuTabBtns.length > 0 && menuCards.length > 0) {
        menuTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active class on buttons
                menuTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                menuCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                    }
                });
            });
        });

        // Trigger default show state for 'all'
        const defaultActiveBtn = document.querySelector('.menu-tab-btn.active');
        if (defaultActiveBtn) {
            defaultActiveBtn.click();
        }
    }
    // 4. Menu Details Pop-up Modal
    const menuDetailsModal = document.getElementById('menuDetailsModal');
    const menuModalImage = document.getElementById('menuModalImage');
    const menuModalBadge = document.getElementById('menuModalBadge');
    const menuModalTitle = document.getElementById('menuModalTitle');
    const menuModalPrice = document.getElementById('menuModalPrice');
    const menuModalDesc = document.getElementById('menuModalDesc');
    const menuModalWaBtn = document.getElementById('menuModalWaBtn');
    const menuModalClose = document.getElementById('menuModalClose');

    if (menuDetailsModal && menuModalClose) {
        menuCards.forEach(card => {
            card.addEventListener('click', () => {
                const imgUrl = card.querySelector('.menu-card-img img').src;
                const badge = card.querySelector('.menu-card-badge');
                const badgeText = badge.textContent.trim();
                const title = card.querySelector('.menu-item-title').textContent.trim();
                const price = card.querySelector('.menu-item-price').textContent.trim();
                const desc = card.querySelector('.menu-item-desc').textContent.trim();

                // Set values
                menuModalImage.src = imgUrl;
                menuModalTitle.textContent = title;
                menuModalPrice.textContent = price;
                menuModalDesc.textContent = desc;

                // Handle badge tags
                menuModalBadge.textContent = badgeText;
                menuModalBadge.className = badge.className; // sync badge color classes

                // WhatsApp message trigger link
                const orderText = `Hi L'Olivier, I want to order:\n• *${title}* (${price})\n\nPlease confirm my order.`;
                menuModalWaBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(orderText)}`;

                // Show modal
                menuDetailsModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeMenuModal = () => {
            menuDetailsModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        menuModalClose.addEventListener('click', closeMenuModal);

        menuDetailsModal.addEventListener('click', (e) => {
            if (e.target === menuDetailsModal) {
                closeMenuModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menuDetailsModal.classList.contains('active')) {
                closeMenuModal();
            }
        });
    }
    
    // Close Demo Preview Banner Handler
    const clientDemoBanner = document.getElementById('clientDemoBanner');
    const closeDemoBanner = document.getElementById('closeDemoBanner');
    if (clientDemoBanner && closeDemoBanner) {
        closeDemoBanner.addEventListener('click', () => {
            clientDemoBanner.style.display = 'none';
        });
    }
    
    console.log("L'Olivier Bistro scripts successfully loaded.");
});
