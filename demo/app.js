/* ==========================================================================
   VELVETBITE DEMO RESTAURANT TEMPLATE INTERACTIVE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. BroadcastChannel Initialization ---
    let syncChannel;
    try {
        syncChannel = new BroadcastChannel('velvetbite_sync');
    } catch (e) {
        console.warn("BroadcastChannel not supported or blocked in this context.", e);
    }

    function sendSyncMessage(type, data) {
        if (syncChannel) {
            syncChannel.postMessage({ type, data });
        }
    }

    // --- 2. Dynamic Theme Config & Data ---
    let activeTheme = 'luxury';

    const themeDetails = {
        luxury: {
            logo: "L'Étoile Noir",
            heroSub: "Michelin Starred Fine Dining",
            heroTitle: "Gastronomy Perfected",
            heroDesc: "Experience modern French dining and degustation curated by culinary director Arthur Laurent in an elegant interior setting.",
            copyright: "© 2026 L'Étoile Noir. Meticulously designed by VelvetBite Studio.",
            dishes: [
                { id: "lux_1", name: "Truffle Infused Caviar", category: "appetizers", desc: "White sturgeon caviar with sour creme fraiche on buckwheat blinis.", price: 1950, img: "../assets/pizza_premium.png" },
                { id: "lux_2", name: "Foie Gras Torchon", category: "appetizers", desc: "Spiced fig compote, warm toasted brioche, fleur de sel.", price: 1150, img: "../assets/dessert_premium.png" },
                { id: "lux_3", name: "Seared Wagyu Ribeye", category: "mains", desc: "Grade A5 Japanese Wagyu served with micro herbs and aged balsamic glaze.", price: 2800, img: "../assets/steak_gourmet.png" },
                { id: "lux_4", name: "Atlantic Lobster Tail", category: "mains", desc: "Butter poached lobster, sweet corn puree, saffron emulsion.", price: 2100, img: "../assets/cocktail_luxury.png" },
                { id: "lux_5", name: "Grand Chocolate Sizzler", category: "desserts", desc: "Decadent dark chocolate dome with hot chocolate sauce glaze.", price: 450, img: "../assets/dessert_premium.png" }
            ],
            reviews: [
                { author: "Nisha K.", rating: 5, text: "The Truffle Caviar blinis was absolutely outstanding. Perfect ambience!" },
                { author: "Siddharth G.", rating: 5, text: "Excellent customer service and chef recommendation pairings." }
            ]
        },
        pizza: {
            logo: "Ciao Bella Pizza",
            heroSub: "Wood-Fired Sourdough Napoli Pizza",
            heroTitle: "Naples in Your Town",
            heroDesc: "Authentic sourdough pizzas baked to crispy leopard-crust perfection under 90 seconds in a 450°C wood fired oven.",
            copyright: "© 2026 Ciao Bella Pizza. Meticulously designed by VelvetBite Studio.",
            dishes: [
                { id: "piz_1", name: "Classic Margherita D.O.P.", category: "mains", desc: "San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil.", price: 650, img: "../assets/pizza_premium.png" },
                { id: "piz_2", name: "Truffle & Prosciutto Sourdough", category: "mains", desc: "White cream base, mozzarella, Parma ham, white truffle oil, shaved parmesan.", price: 820, img: "../assets/pizza_premium.png" },
                { id: "piz_3", name: "Spicy Diavola", category: "mains", desc: "Tomato sauce, mozzarella, spicy Calabrian salami, chili flakes, hot honey.", price: 720, img: "../assets/pizza_premium.png" },
                { id: "piz_4", name: "Burrata & Basil Pesto Flatbread", category: "appetizers", desc: "Sourdough crust topped with fresh creamy burrata, basil pesto, toasted pine nuts.", price: 850, img: "../assets/pizza_premium.png" },
                { id: "piz_5", name: "Warm Nutella Calzone", category: "desserts", desc: "Fluffy dough pocket stuffed with creamy Nutella chocolate, hazelnut crumble.", price: 350, img: "../assets/dessert_premium.png" }
            ],
            reviews: [
                { author: "Marco R.", rating: 5, text: "Sourdough crust was perfect. Tastes like real wood-fired pizza from Napoli!" },
                { author: "Ananya S.", rating: 5, text: "Diavola with hot honey is out of this world. Highly recommend!" }
            ]
        },
        coffee: {
            logo: "Brew & Co.",
            heroSub: "Specialty Coffee Roastery & Bakery",
            heroTitle: "Crafted Coffee Rituals",
            heroDesc: "Ethically sourced single-origin Arabica roasts, brewed precisely by expert baristas, paired with fresh artisanal baked pastries.",
            copyright: "© 2026 Brew & Co. Meticulously designed by VelvetBite Studio.",
            dishes: [
                { id: "cof_1", name: "Madagascar Vanilla Latte", category: "mains", desc: "Double shot espresso with steamed organic oat milk and natural vanilla pod syrup.", price: 380, img: "../assets/cocktail_luxury.png" },
                { id: "cof_2", name: "Single-Origin Cold Brew", category: "mains", desc: "18-hour cold steeped Colombian beans, served over block ice with citrus notes.", price: 320, img: "../assets/cocktail_luxury.png" },
                { id: "cof_3", name: "Artisanal Almond Croissant", category: "appetizers", desc: "Flaky, buttery double-baked French pastry filled with sweet almond frangipane.", price: 280, img: "../assets/dessert_premium.png" },
                { id: "cof_4", name: "Avocado Sourdough Toast", category: "appetizers", desc: "Crushed Hass avocado, cherry tomatoes, feta crumbles, toasted pumpkin seeds.", price: 450, img: "../assets/steak_gourmet.png" },
                { id: "cof_5", name: "Pistachio Glazed Cinnamon Roll", category: "desserts", desc: "Fresh baked sweet cinnamon dough topped with creamy pistachio cream.", price: 290, img: "../assets/dessert_premium.png" }
            ],
            reviews: [
                { author: "Elena V.", rating: 5, text: "Outstanding pour over coffee notes. The cozy corners are perfect for remote work." },
                { author: "Rohan M.", rating: 4.8, text: "Best croissants in the city. Steaming oat milk latte is super smooth." }
            ]
        }
    };

    // --- 3. DOM Elements ---
    const themeCustomizer = document.getElementById('themeCustomizer');
    const customizerToggle = document.getElementById('customizerToggle');
    const brandLogo = document.getElementById('brandLogo');
    const heroSub = document.getElementById('heroSub');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const footerCopyright = document.getElementById('footerCopyright');
    const menuGrid = document.getElementById('menuGrid');
    const menuTabs = document.getElementById('menuTabs');
    const reviewsGrid = document.getElementById('reviewsGrid');
    const reservationForm = document.getElementById('reservationForm');
    const reviewForm = document.getElementById('reviewForm');
    const starRatingSelector = document.getElementById('starRatingSelector');

    // Cart Elements
    const cartTrigger = document.getElementById('cartTrigger');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCartBtn = document.getElementById('closeCartBtn');
    const cartItemsList = document.getElementById('cartItemsList');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartCount = document.getElementById('cartCount');
    const checkoutBtn = document.getElementById('checkoutBtn');

    // Notification toast elements
    const syncNotification = document.getElementById('syncNotification');
    const toastTitle = document.getElementById('toastTitle');
    const toastDesc = document.getElementById('toastDesc');

    // State Variables
    let cart = [];
    let activeCategory = 'all';
    let currentRatingSelected = 5;

    // --- 4. Customizer Panel Trigger ---
    if (customizerToggle && themeCustomizer) {
        customizerToggle.addEventListener('click', () => {
            themeCustomizer.classList.toggle('active');
        });
    }

    // --- 5. Theme Swapping Handler ---
    const optBtns = document.querySelectorAll('.opt-btn');
    optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            optBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const theme = btn.getAttribute('data-theme');
            activeTheme = theme;
            
            // Switch body classes
            document.body.className = `theme-${theme}`;

            // Sync layout labels
            const config = themeDetails[theme];
            brandLogo.textContent = config.logo;
            heroSub.textContent = config.heroSub;
            heroTitle.textContent = config.heroTitle;
            heroDesc.textContent = config.heroDesc;
            footerCopyright.textContent = config.copyright;

            // Reset cart on brand theme switch to avoid cross-concept ordering
            cart = [];
            updateCartUI();

            // Re-render components
            renderMenu();
            renderReviewsList();
            
            // Close customizer panel on mobile
            if (window.innerWidth < 768) {
                themeCustomizer.classList.remove('active');
            }
        });
    });

    // --- 6. Category Menu Filters ---
    if (menuTabs) {
        const tabButtons = menuTabs.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                tabButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                activeCategory = btn.getAttribute('data-category');
                renderMenu();
            });
        });
    }

    // --- 7. Menu Rendering ---
    function renderMenu() {
        if (!menuGrid) return;
        const config = themeDetails[activeTheme];
        
        let filteredDishes = config.dishes;
        if (activeCategory !== 'all') {
            filteredDishes = config.dishes.filter(dish => dish.category === activeCategory);
        }

        if (filteredDishes.length === 0) {
            menuGrid.innerHTML = `<div style="text-align:center; grid-column:1/-1; padding:3rem; color:var(--text-secondary);">No specialties available in this category.</div>`;
            return;
        }

        menuGrid.innerHTML = filteredDishes.map(dish => `
            <div class="menu-card">
                <div class="menu-card-img">
                    <img src="${dish.img}" alt="${dish.name}">
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-header">
                        <h4 class="menu-card-title">${dish.name}</h4>
                        <span class="menu-card-price">₹${dish.price.toLocaleString('en-IN')}</span>
                    </div>
                    <p class="menu-card-desc">${dish.desc}</p>
                    <div class="menu-card-actions">
                        <button class="btn-add-cart" onclick="addToCart('${dish.id}')">
                            <i class="fa-solid fa-cart-plus"></i> Add to Order
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- 8. Star Rating Selector ---
    if (starRatingSelector) {
        const starOpts = starRatingSelector.querySelectorAll('.star-opt');
        starOpts.forEach(opt => {
            opt.addEventListener('click', () => {
                starOpts.forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                currentRatingSelected = parseInt(opt.getAttribute('data-rating'));
            });
        });
    }

    // --- 9. Reviews System Rendering ---
    function renderReviewsList() {
        if (!reviewsGrid) return;
        const config = themeDetails[activeTheme];

        reviewsGrid.innerHTML = config.reviews.map(rev => `
            <div class="review-feed-card">
                <div class="review-feed-header">
                    <span class="review-feed-author">${rev.author}</span>
                    <div class="review-feed-stars">
                        ${Array.from({ length: 5 }, (_, i) => `<i class="fa-${i < Math.floor(rev.rating) ? 'solid' : 'regular'} fa-star"></i>`).join('')}
                    </div>
                </div>
                <p class="review-feed-text">"${rev.text}"</p>
            </div>
        `).join('');
    }

    // Submit new review
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const authorVal = document.getElementById('revAuthor').value.trim();
            const textVal = document.getElementById('revText').value.trim();

            if (!authorVal || !textVal) return;

            // Push to local array
            themeDetails[activeTheme].reviews.push({
                author: authorVal,
                rating: currentRatingSelected,
                text: textVal
            });

            // Re-render
            renderReviewsList();
            
            // Pop success toast
            showToast("Review Posted", "Thank you for sharing your experience!");

            // Reset form
            reviewForm.reset();
            const starOpts = starRatingSelector.querySelectorAll('.star-opt');
            starOpts.forEach(o => o.classList.remove('active'));
            starOpts[0].classList.add('active');
            currentRatingSelected = 5;
        });
    }

    // --- 10. Table Reservations Booking Form ---
    if (reservationForm) {
        // Set default date to today
        const dateInput = document.getElementById('resDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
            dateInput.value = today;
        }

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('resName').value.trim();
            const date = document.getElementById('resDate').value;
            const slot = document.getElementById('resSlot').value;
            const guests = parseInt(document.getElementById('resGuests').value) || 2;
            const area = document.getElementById('resArea').value;

            // Broadcast booking message
            sendSyncMessage('NEW_BOOKING', {
                guest: name,
                date: `${date}, ${slot}`,
                count: guests,
                area: area
            });

            // Toast notification
            showToast("Reservation Request Sent", "Your table booking request has been logged and synchronized!");

            // Reset form
            reservationForm.reset();
            if (dateInput) {
                dateInput.value = new Date().toISOString().split('T')[0];
            }
        });
    }

    // --- 11. Shopping Cart Drawer System ---
    window.addToCart = function(dishId) {
        const config = themeDetails[activeTheme];
        const dish = config.dishes.find(d => d.id === dishId);
        if (!dish) return;

        // Check if already in cart
        const cartItem = cart.find(item => item.id === dishId);
        if (cartItem) {
            cartItem.qty += 1;
        } else {
            cart.push({
                id: dish.id,
                name: dish.name,
                price: dish.price,
                qty: 1
            });
        }

        updateCartUI();
        showToast("Added to Cart", `${dish.name} added to your basket.`);
    };

    window.updateItemQty = function(id, change) {
        const item = cart.find(i => i.id === id);
        if (item) {
            item.qty += change;
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== id);
            }
            updateCartUI();
        }
    };

    window.removeItemFromCart = function(id) {
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
    };

    function updateCartUI() {
        if (!cartItemsList || !cartSubtotal || !cartCount) return;

        // Count sum quantity
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCount.textContent = totalItems;

        // Render rows
        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty-message">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>Your basket is currently empty.</p>
                </div>
            `;
            cartSubtotal.textContent = "₹0";
            checkoutBtn.disabled = true;
            return;
        }

        checkoutBtn.disabled = false;

        cartItemsList.innerHTML = cart.map(item => `
            <div class="cart-item-row">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                </div>
                <div class="cart-item-qty-controls">
                    <button class="qty-btn" onclick="updateItemQty('${item.id}', -1)">-</button>
                    <span class="qty-val">${item.qty}</span>
                    <button class="qty-btn" onclick="updateItemQty('${item.id}', 1)">+</button>
                </div>
                <i class="fa-solid fa-trash cart-item-remove" onclick="removeItemFromCart('${item.id}')"></i>
            </div>
        `).join('');

        // Calculate subtotal
        const totalCost = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        cartSubtotal.textContent = `₹${totalCost.toLocaleString('en-IN')}`;
    }

    // Checkout handler
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            const primaryItem = cart[0];
            const orderDishName = primaryItem.name + (cart.length > 1 ? ` & ${cart.length - 1} other item(s)` : '');
            const totalCost = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
            const simulatedId = Math.floor(Math.random() * 900) + 1100;

            // Broadcast checkout order message
            sendSyncMessage('NEW_ORDER', {
                id: simulatedId,
                dish: orderDishName,
                cost: totalCost
            });

            // Local Toast notification
            showToast("Order Placed Successfully", `Order #${simulatedId} confirmed! Details synchronized to Dashboard.`);

            // Reset cart
            cart = [];
            updateCartUI();
            
            // Close drawer
            cartOverlay.classList.remove('active');
        });
    }

    // Drawer toggles
    if (cartTrigger) {
        cartTrigger.addEventListener('click', () => {
            cartOverlay.classList.add('active');
        });
    }
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => {
            cartOverlay.classList.remove('active');
        });
    }
    if (cartOverlay) {
        cartOverlay.addEventListener('click', (e) => {
            if (e.target === cartOverlay) {
                cartOverlay.classList.remove('active');
            }
        });
    }

    // --- 12. Helper notification toast ---
    let toastTimeout;
    function showToast(title, desc) {
        if (!syncNotification || !toastTitle || !toastDesc) return;
        
        clearInterval(toastTimeout);
        toastTitle.textContent = title;
        toastDesc.textContent = desc;

        syncNotification.classList.add('active');

        toastTimeout = setTimeout(() => {
            syncNotification.classList.remove('active');
        }, 3500);
    }

    // --- 13. Initial Load Sequence ---
    renderMenu();
    renderReviewsList();
    updateCartUI();
});
