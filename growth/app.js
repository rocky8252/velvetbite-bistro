/* Komorebi Cafe - Main App Scripts */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme Toggle System (Dark / Light Mode) ---
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Check and apply stored preference
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

    // --- 2. Header Scroll Effect ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- 3. QR Code Scanner Popup Modal & Tabletop Standee Builder (on Home Page) ---
    const qrModal = document.getElementById('qrModal');
    const qrModalClose = document.getElementById('qrModalClose');
    const heroQrTrigger = document.getElementById('heroQrTrigger');
    const tableQrTrigger = document.getElementById('tableQrTrigger');
    const standeeQrImg = document.getElementById('standeeQrImg');
    const standeeTableNumber = document.getElementById('standeeTableNumber');
    const standeeTableSelector = document.getElementById('standeeTableSelector');
    const downloadQrBtn = document.getElementById('downloadQrBtn');
    const printStandeeBtn = document.getElementById('printStandeeBtn');

    // Compile dynamic menu URL containing table number parameters
    function getMenuUrl(tableNum) {
        const currentOrigin = window.location.origin;
        let path = window.location.pathname;
        if (path.endsWith('index.html')) {
            path = path.slice(0, -10);
        }
        if (!path.endsWith('/')) {
            path += '/';
        }
        return `${currentOrigin}${path}menu.html?table=${tableNum}`;
    }

    // Update QR image src and Standee table label
    function refreshQrCode() {
        const tableNum = standeeTableSelector ? standeeTableSelector.value : "04";
        const targetUrl = getMenuUrl(tableNum);
        
        if (standeeQrImg) {
            standeeQrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(targetUrl)}`;
        }
        if (standeeTableNumber) {
            standeeTableNumber.textContent = tableNum;
        }

        // Keep the inline mockup card on index page pointed to default Table 04
        const staticQrImages = document.querySelectorAll('.qr-code-box img:not(#standeeQrImg)');
        staticQrImages.forEach(img => {
            img.src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(getMenuUrl("04"))}`;
        });
    }

    // Initialize QR Code source settings
    if (document.querySelectorAll('.qr-code-box img').length > 0) {
        refreshQrCode();

        // Listen for table dropdown choices
        if (standeeTableSelector) {
            standeeTableSelector.addEventListener('change', refreshQrCode);
        }

        // Download QR Code PNG button trigger
        if (downloadQrBtn) {
            downloadQrBtn.addEventListener('click', () => {
                const qrImg = document.getElementById('standeeQrImg');
                if (qrImg && qrImg.src) {
                    const tableNum = standeeTableSelector ? standeeTableSelector.value : "04";
                    // Download via Blob conversion to bypass default browser navigation locks
                    fetch(qrImg.src)
                        .then(res => res.blob())
                        .then(blob => {
                            const blobUrl = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = blobUrl;
                            link.download = `komorebi_qr_menu_table_${tableNum}.png`;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(blobUrl);
                        })
                        .catch(err => {
                            console.error("CORS fetch failed, redirecting to raw image: ", err);
                            window.open(qrImg.src, '_blank');
                        });
                }
            });
        }

        // Print Standee card button trigger
        if (printStandeeBtn) {
            printStandeeBtn.addEventListener('click', () => {
                window.print();
            });
        }

        // Local network testing notice injection
        const hostname = window.location.hostname;
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            const qrBoxes = document.querySelectorAll('.qr-code-box');
            qrBoxes.forEach(box => {
                const hintDiv = document.createElement('div');
                hintDiv.className = 'qr-local-hint';
                hintDiv.style.marginTop = '1rem';
                hintDiv.style.padding = '0.6rem 0.8rem';
                hintDiv.style.backgroundColor = 'rgba(194, 150, 97, 0.08)';
                hintDiv.style.border = '1px solid rgba(194, 150, 97, 0.2)';
                hintDiv.style.borderRadius = '8px';
                hintDiv.style.fontSize = '0.78rem';
                hintDiv.style.lineHeight = '1.4';
                hintDiv.style.color = 'var(--color-accent)';
                hintDiv.innerHTML = `<i class="fa-solid fa-circle-info"></i> For mobile scanning to work, open this site using your computer's local IP address: <br><a href="http://192.168.1.9:8000/growth/index.html" target="_blank" style="text-decoration: underline; font-weight: 700; color: var(--color-primary);">http://192.168.1.9:8000/growth/index.html</a>`;
                box.appendChild(hintDiv);
            });
        }
    }

    if (qrModal && qrModalClose) {
        const openQrModal = () => {
            qrModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // lock scroll
        };

        const closeQrModal = () => {
            qrModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (heroQrTrigger) heroQrTrigger.addEventListener('click', openQrModal);
        if (tableQrTrigger) tableQrTrigger.addEventListener('click', openQrModal);

        qrModalClose.addEventListener('click', closeQrModal);
        
        qrModal.addEventListener('click', (e) => {
            if (e.target === qrModal) {
                closeQrModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && qrModal.classList.contains('active')) {
                closeQrModal();
            }
        });
    }

    // --- 4. Lightbox Zoom Gallery Modal (on Gallery Page) ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryGridItems = document.querySelectorAll('.gallery-grid-item');

    if (lightboxModal && lightboxImage && lightboxClose) {
        galleryGridItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgUrl = item.getAttribute('data-image');
                if (imgUrl) {
                    lightboxImage.src = imgUrl;
                    lightboxModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                lightboxImage.src = '';
            }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // --- 5. Menu Details Pop-up Modal (Inherited Starter Feature) ---
    const menuDetailsModal = document.getElementById('menuDetailsModal');
    const menuModalImage = document.getElementById('menuModalImage');
    const menuModalBadge = document.getElementById('menuModalBadge');
    const menuModalTitle = document.getElementById('menuModalTitle');
    const menuModalPrice = document.getElementById('menuModalPrice');
    const menuModalDesc = document.getElementById('menuModalDesc');
    const menuModalWaBtn = document.getElementById('menuModalWaBtn');
    const menuModalClose = document.getElementById('menuModalClose');
    const menuItemCards = document.querySelectorAll('.menu-item-card');

    if (menuDetailsModal && menuModalClose && menuItemCards.length > 0) {
        menuItemCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent trigger if the WhatsApp link inside menu-item-action was clicked directly
                if (e.target.closest('.menu-item-action')) {
                    return;
                }

                const imgUrl = card.querySelector('.menu-item-img img').src;
                const badge = card.querySelector('.badge-tag');
                const badgeText = badge.textContent.trim();
                const title = card.querySelector('.item-title').textContent.trim();
                const price = card.querySelector('.item-price').textContent.trim();
                const desc = card.querySelector('.item-desc').textContent.trim();

                // Inject values into overlay
                menuModalImage.src = imgUrl;
                menuModalTitle.textContent = title;
                menuModalPrice.textContent = price;
                menuModalDesc.textContent = desc;

                // Sync badge
                menuModalBadge.textContent = badgeText;
                menuModalBadge.className = badge.className;

                // Customize WhatsApp order message link
                const orderText = `Hi Komorebi Cafe, I want to order:\n• *${title}* (${price})\n\nPlease confirm my order request.`;
                menuModalWaBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(orderText)}`;

                // Show modal overlay
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

    // --- 6. Zen Table Booking Logic ---
    const zenBookingForm = document.getElementById('zenBookingForm');
    const bookingZoneCards = document.querySelectorAll('.booking-zone-card');
    const bookZoneInput = document.getElementById('bookZone');
    
    const bookName = document.getElementById('bookName');
    const bookPhone = document.getElementById('bookPhone');
    const bookDate = document.getElementById('bookDate');
    const bookTime = document.getElementById('bookTime');
    const bookGuests = document.getElementById('bookGuests');
    const bookNotes = document.getElementById('bookNotes');
    
    const bookingStatusText = document.getElementById('bookingStatusText');
    const bookingStatusBox = document.getElementById('bookingStatusBox');

    if (bookingZoneCards.length > 0) {
        bookingZoneCards.forEach(card => {
            card.addEventListener('click', () => {
                bookingZoneCards.forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                
                const zoneVal = card.getAttribute('data-zone');
                if (bookZoneInput) {
                    bookZoneInput.value = zoneVal;
                }
                updateBookingStatus();
            });
        });
    }

    function updateBookingStatus() {
        if (!bookingStatusText || !bookDate || !bookTime) return;
        
        const dateVal = bookDate.value;
        const timeVal = bookTime.value;
        const guestsVal = bookGuests ? bookGuests.value : '2';
        const zoneVal = bookZoneInput ? bookZoneInput.value : 'Garden Terrace';

        if (dateVal && timeVal) {
            bookingStatusText.textContent = `✨ Tranquil table for ${guestsVal} is available in ${zoneVal} on ${dateVal} at ${timeVal}!`;
            if (bookingStatusBox) {
                bookingStatusBox.style.backgroundColor = 'rgba(76, 175, 80, 0.08)';
                bookingStatusBox.style.borderColor = 'rgba(76, 175, 80, 0.15)';
            }
        }
    }

    if (bookDate && bookTime) {
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const yyyy = tomorrow.getFullYear();
        const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const dd = String(tomorrow.getDate()).padStart(2, '0');
        bookDate.value = `${yyyy}-${mm}-${dd}`;
        bookDate.min = `${yyyy}-${mm}-${dd}`; // Prevent past bookings

        // Bind update triggers
        [bookDate, bookTime, bookGuests].forEach(input => {
            if (input) input.addEventListener('change', updateBookingStatus);
        });

        // Trigger initial status
        updateBookingStatus();
    }

    if (zenBookingForm) {
        zenBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = bookName.value.trim();
            const phone = bookPhone.value.trim();
            const date = bookDate.value;
            const time = bookTime.value;
            const guests = bookGuests.value;
            const zone = bookZoneInput.value;
            const notes = bookNotes ? bookNotes.value.trim() : '';

            // Construct WhatsApp Message
            let msg = `Hi Komorebi Cafe, I'd like to reserve a table:\n\n` +
                      `• Name: ${name}\n` +
                      `• Phone: ${phone}\n` +
                      `• Guests: ${guests} Person(s)\n` +
                      `• Date: ${date}\n` +
                      `• Time: ${time}\n` +
                      `• Preferred Zone: ${zone}`;
            
            if (notes) {
                msg += `\n• Special Request: ${notes}`;
            }
            msg += `\n\nPlease confirm availability. Thank you!`;

            // Open WhatsApp link
            const waUrl = `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
            window.open(waUrl, '_blank');
        });
    }

    // --- 7. Digital Menu Multi-Filter & Live Search Controller ---
    const menuFilterBtns = document.querySelectorAll('.menu-filter-btn');
    const dietFilterBtns = document.querySelectorAll('.diet-filter-btn');
    const menuSearchInput = document.getElementById('menuSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');
    const menuResultsCount = document.getElementById('menuResultsCount');
    const resetFiltersLink = document.getElementById('resetFiltersLink');
    const menuEmptyState = document.getElementById('menuEmptyState');
    const emptyStateResetBtn = document.getElementById('emptyStateResetBtn');
    const menuCategoryGroups = document.querySelectorAll('.menu-category-group');
    const filterMenuItemCards = document.querySelectorAll('.menu-item-card');

    if (filterMenuItemCards.length > 0) {
        let selectedCategory = 'all';
        let selectedDiet = 'all';
        let searchQuery = '';

        const applyMenuFilters = () => {
            let visibleCount = 0;

            filterMenuItemCards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                const cardDiet = card.getAttribute('data-diet');
                const cardSearch = (card.getAttribute('data-search') || '').toLowerCase();

                const matchCat = (selectedCategory === 'all' || cardCat === selectedCategory);
                const matchDiet = (selectedDiet === 'all' || cardDiet === selectedDiet);
                const matchSearch = (searchQuery === '' || cardSearch.includes(searchQuery.toLowerCase()));

                if (matchCat && matchDiet && matchSearch) {
                    card.classList.remove('is-hidden');
                    visibleCount++;
                } else {
                    card.classList.add('is-hidden');
                }
            });

            // Update category headers visibility
            menuCategoryGroups.forEach(group => {
                const groupCards = group.querySelectorAll('.menu-item-card:not(.is-hidden)');
                if (groupCards.length === 0) {
                    group.style.display = 'none';
                } else {
                    group.style.display = 'block';
                }
            });

            // Update results counter & empty state
            if (menuResultsCount) {
                if (selectedCategory === 'all' && selectedDiet === 'all' && searchQuery === '') {
                    menuResultsCount.textContent = `Showing all ${visibleCount} signature handcrafted creations`;
                    if (resetFiltersLink) resetFiltersLink.style.display = 'none';
                } else {
                    menuResultsCount.textContent = `Showing ${visibleCount} signature item${visibleCount === 1 ? '' : 's'} matching your selection`;
                    if (resetFiltersLink) resetFiltersLink.style.display = 'inline-block';
                }
            }

            if (menuEmptyState) {
                if (visibleCount === 0) {
                    menuEmptyState.style.display = 'block';
                } else {
                    menuEmptyState.style.display = 'none';
                }
            }

            if (clearSearchBtn) {
                clearSearchBtn.style.display = searchQuery !== '' ? 'block' : 'none';
            }
        };

        // Category Tab Listeners
        menuFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                menuFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedCategory = btn.getAttribute('data-cat');
                applyMenuFilters();
            });
        });

        // Diet Pill Listeners
        dietFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dietFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedDiet = btn.getAttribute('data-diet');
                applyMenuFilters();
            });
        });

        // Live Search Input Listener
        if (menuSearchInput) {
            menuSearchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                applyMenuFilters();
            });
        }

        // Clear Search Trigger
        if (clearSearchBtn) {
            clearSearchBtn.addEventListener('click', () => {
                if (menuSearchInput) menuSearchInput.value = '';
                searchQuery = '';
                applyMenuFilters();
            });
        }

        // Reset All Filters Handlers
        const resetAllFilters = () => {
            selectedCategory = 'all';
            selectedDiet = 'all';
            searchQuery = '';
            if (menuSearchInput) menuSearchInput.value = '';
            
            menuFilterBtns.forEach(b => b.classList.remove('active'));
            const catAll = document.querySelector('.menu-filter-btn[data-cat="all"]');
            if (catAll) catAll.classList.add('active');

            dietFilterBtns.forEach(b => b.classList.remove('active'));
            const dietAll = document.querySelector('.diet-filter-btn[data-diet="all"]');
            if (dietAll) dietAll.classList.add('active');

            applyMenuFilters();
        };

        if (resetFiltersLink) resetFiltersLink.addEventListener('click', resetAllFilters);
        if (emptyStateResetBtn) emptyStateResetBtn.addEventListener('click', resetAllFilters);
    }

    // Close Demo Preview Banner Handler
    const clientDemoBanner = document.getElementById('clientDemoBanner');
    const closeDemoBanner = document.getElementById('closeDemoBanner');
    if (clientDemoBanner && closeDemoBanner) {
        closeDemoBanner.addEventListener('click', () => {
            clientDemoBanner.style.display = 'none';
        });
    }

    console.log("Komorebi Cafe scripts successfully loaded.");
});
