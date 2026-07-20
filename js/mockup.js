document.addEventListener('DOMContentLoaded', () => {
    // Access mockup container elements
    const mockupScreen = document.getElementById('mockupScreen');
    const tabBtns = document.querySelectorAll('.mockup-tab-btn');
    if (!mockupScreen) return;

    const mockThemeData = {
        luxury: {
            brandName: "L'Étoile Noir",
            heroTitle: "Gastronomy Perfected",
            heroSub: "Experience standard-setting modern French cuisine. Meticulously curated menus by Michelin Chef Arthur Laurent.",
            dishes: [
                { name: "Truffle Infused Caviar", desc: "White sturgeon caviar with sour creme fraiche on buckwheat blinis.", price: "₹1,950" },
                { name: "Seared Wagyu Ribeye", desc: "Grade A5 Japanese Wagyu served with micro herbs and aged balsamic glaze.", price: "₹2,800" },
                { name: "Foie Gras Torchon", desc: "Spiced fig compote, warm brioche, fleur de sel.", price: "₹1,150" },
                { name: "Atlantic Lobster Tail", desc: "Butter poached lobster, sweet corn puree, saffron emulsion.", price: "₹2,100" }
            ],
            chefName: "Chef Arthur Laurent",
            chefQuote: '"Cooking is a luxury language that translates soil, work, fire and emotions into raw taste memories. We cook stories."',
            gallery: [
                { img: "assets/pizza_premium.png", label: "Artisan Pizza" },
                { img: "assets/steak_gourmet.png", label: "Premium Angus" },
                { img: "assets/cocktail_luxury.png", label: "Signature Cocktail" },
                { img: "assets/dessert_premium.png", label: "Chocolate Glaze" }
            ]
        },
        pizza: {
            brandName: "Ciao Bella Pizza",
            heroTitle: "Naples in Your Town",
            heroSub: "Authentic wood-fired sourdough pizzas baked to crispy leopard-crust perfection under 90 seconds. Imported San Marzano tomatoes.",
            dishes: [
                { name: "Margherita Extra D.O.P.", desc: "San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil.", price: "₹650" },
                { name: "Truffle & Prosciutto", desc: "White base, fresh mozzarella, Parma ham, white truffle oil, shaved parmesan.", price: "₹820" },
                { name: "Spicy Diavola", desc: "Tomato sauce, mozzarella, spicy Calabrian salami, chili flakes, hot honey.", price: "₹720" },
                { name: "Burrata & Pesto", desc: "Sourdough crust topped with fresh creamy burrata, basil pesto, pine nuts.", price: "₹850" }
            ],
            chefName: "Pizzaiolo Giovanni Rossi",
            chefQuote: '"Pizza making is an ancient craft of patience. Sourdough rising for 48 hours is what separates street food from fine art."',
            gallery: [
                { img: "assets/pizza_premium.png", label: "Wood-fired Oven" },
                { img: "assets/pizza_premium.png", label: "Fresh Burrata" },
                { img: "assets/pizza_premium.png", label: "Margherita" },
                { img: "assets/pizza_premium.png", label: "Hot Honey Drizzle" }
            ]
        },
        coffee: {
            brandName: "Brew & Co.",
            heroTitle: "Crafted Coffee Rituals",
            heroSub: "Specialty single-origin Arabica roasts sourced ethically and brewed precisely by expert baristas. Premium artisanal baked goods.",
            dishes: [
                { name: "Madagascar Vanilla Latte", desc: "Double shot espresso with steamed organic oat milk and natural vanilla pod syrup.", price: "₹380" },
                { name: "Single-Origin Cold Brew", desc: "18-hour cold steeped Colombian beans, served over block ice with citrus notes.", price: "₹320" },
                { name: "Almond Croissant", desc: "Flaky, buttery double-baked French pastry filled with sweet almond frangipane.", price: "₹280" },
                { name: "Avocado Sourdough Toast", desc: "Crushed Hass avocado, cherry tomatoes, feta crumbles, toasted pumpkin seeds.", price: "₹450" }
            ],
            chefName: "Roaster Elena Verna",
            chefQuote: '"Every bean holds a microclimate signature. Our job is to draw out the exact floral, fruity, and chocolate notes into your cup."',
            gallery: [
                { img: "assets/cocktail_luxury.png", label: "Espresso Pull" },
                { img: "assets/dessert_premium.png", label: "Fresh Pastries" },
                { img: "assets/cocktail_luxury.png", label: "Pour Over V60" },
                { img: "assets/dessert_premium.png", label: "Cozy Corners" }
            ]
        }
    };

    function getMockupPageHTML(pageName) {
        const theme = mockThemeData[currentMockTheme];
        switch(pageName) {
            case 'home':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-hero">
                        <h3>${theme.heroTitle}</h3>
                        <p>${theme.heroSub}</p>
                        <button class="mock-btn" onclick="switchMockupTab('reservation')">Book Table</button>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">Today's Specialties</h4>
                        <div class="mock-menu-grid">
                            <div class="mock-menu-item">
                                <div class="mock-dish-details">
                                    <div class="mock-dish-name">${theme.dishes[0].name}</div>
                                    <div class="mock-dish-desc">${theme.dishes[0].desc}</div>
                                </div>
                                <div class="mock-dish-price">${theme.dishes[0].price}</div>
                            </div>
                            <div class="mock-menu-item">
                                <div class="mock-dish-details">
                                    <div class="mock-dish-name">${theme.dishes[1].name}</div>
                                    <div class="mock-dish-desc">${theme.dishes[1].desc}</div>
                                </div>
                                <div class="mock-dish-price">${theme.dishes[1].price}</div>
                            </div>
                        </div>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'menu':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">Chef's Menu</h4>
                        <div class="mock-menu-grid">
                            ${theme.dishes.map(dish => `
                                <div class="mock-menu-item">
                                    <div class="mock-dish-details">
                                        <div class="mock-dish-name">${dish.name}</div>
                                        <div class="mock-dish-desc">${dish.desc}</div>
                                    </div>
                                    <div class="mock-dish-price">${dish.price}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'gallery':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">The Culinary Gallery</h4>
                        <div class="mock-gallery-grid">
                            ${theme.gallery.map(g => `
                                <div class="mock-gallery-card">
                                    <img src="${g.img}" alt="${g.label}">
                                    <div class="mock-gallery-label">${g.label}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'about':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">Our Master Mind</h4>
                        <div class="mock-chef-block">
                            <div class="mock-chef-avatar">
                                <i class="fa-solid fa-user-tie"></i>
                            </div>
                            <p class="mock-chef-quote">${theme.chefQuote}</p>
                            <h5 class="mock-chef-name">${theme.chefName}</h5>
                            <p style="font-size:0.65rem; color:var(--text-muted); margin-top:0.2rem;">Executive Director</p>
                        </div>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'offers':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">Seasonal Campaigns</h4>
                        <div class="mock-offer-card">
                            <span class="mock-offer-badge">Complimentary</span>
                            <h5 class="mock-offer-title">Premium Pairings Selection</h5>
                            <p class="mock-offer-desc">Receive custom beverage flights paired for tables booking over 4 guests on weekends.</p>
                        </div>
                        <div class="mock-offer-card">
                            <span class="mock-offer-badge">Special Discount</span>
                            <h5 class="mock-offer-title">Grand Brunch Specials</h5>
                            <p class="mock-offer-desc">Enjoy chef curated tastings every Sunday from 11:30 AM to 3:00 PM. Get 15% off bookings today.</p>
                        </div>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'contact':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">Locate Our Doors</h4>
                        <div class="mock-map-placeholder">
                            <i class="fa-solid fa-map-location-dot"></i>
                            <span>Map Coordinates API Loading...</span>
                        </div>
                        <ul class="mock-info-list">
                            <li><i class="fa-solid fa-phone"></i> +91 99999 88888</li>
                            <li><i class="fa-solid fa-envelope"></i> dining@${theme.brandName.toLowerCase().replace(/[^a-z]/g, '')}.com</li>
                            <li><i class="fa-solid fa-location-dot"></i> Cyber City, DLF Phase 3, Gurugram</li>
                        </ul>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'reservation':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box" id="mockReservationFormBlock">
                        <h4 class="mock-section-title">Secure a Table</h4>
                        <form id="mockBookingForm" onsubmit="event.preventDefault(); submitMockBooking();">
                            <div class="mock-form-group">
                                <label>Your Name</label>
                                <input type="text" class="mock-input" required placeholder="Guest Name">
                            </div>
                            <div class="mock-form-group">
                                <label>Date</label>
                                <input type="date" class="mock-input" required>
                            </div>
                            <div class="mock-form-group" style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem;">
                                <div>
                                    <label>Time Slot</label>
                                    <select class="mock-input">
                                        <option>07:00 PM</option>
                                        <option>08:30 PM</option>
                                        <option>10:00 PM</option>
                                    </select>
                                </div>
                                <div>
                                    <label>Guests</label>
                                    <input type="number" class="mock-input" min="1" max="10" value="2">
                                </div>
                            </div>
                            <button type="submit" class="mock-btn-submit">Confirm Reservation Request</button>
                        </form>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            case 'reviews':
                return `
                    <div class="mock-nav">
                        <span class="mock-logo">${theme.brandName}</span>
                        <span class="mock-menu-trigger"><i class="fa-solid fa-bars"></i></span>
                    </div>
                    <div class="mock-content-box">
                        <h4 class="mock-section-title">Critical Acclaims</h4>
                        <div class="mock-review-card">
                            <div class="mock-review-header">
                                <span class="mock-review-author">Nisha K. (Gourmet Critic)</span>
                                <span class="mock-review-stars">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </div>
                            <p class="mock-review-text">"Outstanding service and tasting menus. The online portal works seamlessly, which made our anniversary planning simple!"</p>
                        </div>
                        <div class="mock-review-card">
                            <div class="mock-review-header">
                                <span class="mock-review-author">Rohan M. (Delhi Digest)</span>
                                <span class="mock-review-stars">
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                    <i class="fa-solid fa-star"></i>
                                </span>
                            </div>
                            <p class="mock-review-text">"Lovely atmosphere and delicious courses. Highly recommend their Chef special selections."</p>
                        </div>
                    </div>
                    <div class="mock-footer">
                        <p>© 2026 ${theme.brandName}. All rights reserved.</p>
                    </div>
                `;
            default:
                return '';
        }
    }

    // Swapping function
    function loadMockupPage(pageName) {
        mockupScreen.innerHTML = getMockupPageHTML(pageName);
        // Re-bind hover elements inside mockup
        const internalLinks = mockupScreen.querySelectorAll('.mock-btn, .mock-btn-submit, input, select');
        internalLinks.forEach(elem => {
            elem.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            elem.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // Bind tab selectors
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const page = btn.getAttribute('data-tab');
            loadMockupPage(page);
        });
    });

    // Theme Selector clicks
    const themeBtns = document.querySelectorAll('.mockup-theme-selector .theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            themeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentMockTheme = btn.getAttribute('data-theme');
            
            // Toggle screen class
            mockupScreen.className = 'device-screen theme-' + currentMockTheme;
            
            // Re-render active tab
            const activeTab = document.querySelector('.mockup-tab-btn.active').getAttribute('data-tab');
            loadMockupPage(activeTab);
        });
    });

    // Default Load Page
    loadMockupPage('home');

    // Global binding helper for the reservation redirection button inside mockup
    window.switchMockupTab = function(tabName) {
        const matchBtn = document.querySelector(`.mockup-tab-btn[data-tab="${tabName}"]`);
        if (matchBtn) {
            matchBtn.click();
        }
    };

    // Booking simulator success handler
    window.submitMockBooking = function() {
        const formBlock = document.getElementById('mockReservationFormBlock');
        if (formBlock) {
            formBlock.innerHTML = `
                <div class="mock-booking-success">
                    <i class="fa-solid fa-circle-check"></i>
                    <h4 style="font-family:var(--font-heading); font-size:1.1rem; margin-bottom:0.5rem;">Booking Confirmed!</h4>
                    <p style="font-size:0.75rem; color:var(--text-secondary); line-height:1.4;">A WhatsApp check verification ticket has been sent to your guest mobile profile.</p>
                    <button class="mock-btn" style="margin-top:1.5rem;" onclick="switchMockupTab('home')">Return Home</button>
                </div>
            `;
        }
    };
});