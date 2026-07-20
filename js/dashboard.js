document.addEventListener('DOMContentLoaded', () => {
    // Expose dashboard logic and sounds to window so other components can trigger them

    // --- 2. Interactive Admin Dashboard Simulation ---
    // Synthersize audio using Web Audio API
    window.playDashboardSound = function() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5 Note
            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
            
            osc.start();
            osc.stop(audioCtx.currentTime + 0.3);
            
            setTimeout(() => {
                const osc2 = audioCtx.createOscillator();
                const gain2 = audioCtx.createGain();
                osc2.connect(gain2);
                gain2.connect(audioCtx.destination);
                
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(880.00, audioCtx.currentTime); // A5 Note
                gain2.gain.setValueAtTime(0, audioCtx.currentTime);
                gain2.gain.linearRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
                
                osc2.start();
                osc2.stop(audioCtx.currentTime + 0.3);
            }, 80);
        } catch (e) {
            console.log("Audio API blocked or not supported", e);
        }
    }

    // Dashboard State
    window.dashState = {
        revenue: 24580,
        ordersCount: 42,
        reservationsCount: 18,
        customersCount: 156,
        activeTab: 'overview',
        ordersList: [
            { id: 1042, dish: "Butter Chicken x2", status: "Completed", class: "dash-badge-green" },
            { id: 1041, dish: "Paneer Tikka", status: "Preparing", class: "dash-badge-yellow" },
            { id: 1040, dish: "Biryani Family Pack", status: "Pending", class: "dash-badge-blue" },
            { id: 1039, dish: "Tandoori Platter", status: "Completed", class: "dash-badge-green" }
        ],
        menuItems: [
            { name: "Kadhai Paneer Special", price: 320, veg: true, stock: true },
            { name: "Murg Makhani Butter", price: 380, veg: false, stock: true },
            { name: "Garlic Butter Naan", price: 60, veg: true, stock: true },
            { name: "Chocolate Lava Sizzler", price: 180, veg: true, stock: false }
        ],
        bookings: [
            { guest: "Harish Sharma", date: "Today, 08:30 PM", count: 4, status: "Awaiting Confirmation" },
            { guest: "Aanchal Mehta", date: "Today, 07:00 PM", count: 2, status: "Confirmed" }
        ]
    };

    // DOM Nodes references
    const dashInnerContent = document.getElementById('dashInnerContent');
    const dashStatRevenue = document.getElementById('dashStatRevenue');
    const dashStatOrders = document.getElementById('dashStatOrders');
    const dashStatReservations = document.getElementById('dashStatReservations');
    const dashStatCustomers = document.getElementById('dashStatCustomers');
    const simValOrders = document.getElementById('simValOrders');
    const simValRevenue = document.getElementById('simValRevenue');
    const btnSimulateOrder = document.getElementById('btnSimulateOrder');
    const btnSimulateBooking = document.getElementById('btnSimulateBooking');
    const simulatorLogLines = document.getElementById('simulatorLogLines');
    const dashNotifIcon = document.getElementById('dashNotifIcon');
    const dashMockupFrame = document.querySelector('.dashboard-mockup-frame');

    // Helper to log actions
    window.addSimLog = function(text, type = '') {
        if (!simulatorLogLines) return;
        const now = new Date();
        const timeStr = now.toTimeString().split(' ')[0];
        let colorClass = '';
        if (type === 'green') colorClass = 'text-green';
        if (type === 'yellow') colorClass = 'text-yellow';
        if (type === 'red') colorClass = 'text-red';
        if (type === 'blue') colorClass = 'text-blue';

        simulatorLogLines.innerHTML += `<div class="log-line ${colorClass}">[${timeStr}] ${text}</div>`;
        simulatorLogLines.scrollTop = simulatorLogLines.scrollHeight;
    }

    // Helper to sync stats displays
    window.syncDashStats = function() {
        if (dashStatRevenue) dashStatRevenue.textContent = `₹${dashState.revenue.toLocaleString('en-IN')}`;
        if (dashStatOrders) dashStatOrders.textContent = dashState.ordersCount;
        if (dashStatReservations) dashStatReservations.textContent = dashState.reservationsCount;
        if (dashStatCustomers) dashStatCustomers.textContent = dashState.customersCount;
        
        if (simValOrders) simValOrders.textContent = dashState.ordersCount;
        if (simValRevenue) simValRevenue.textContent = `₹${dashState.revenue.toLocaleString('en-IN')}`;
    }

    // Render Dashboard Inside Panels
    window.renderDashPanel = function() {
        if (!dashInnerContent) return;

        let html = '';
        switch(dashState.activeTab) {
            case 'overview':
                html = `
                    <div class="dash-content-row">
                        <div class="dash-chart-card">
                            <div class="dash-card-title">Weekly Revenue <span class="dash-badge-green">+12%</span></div>
                            <div class="dash-mini-chart">
                                <div class="chart-bar" style="height:40%"><span>Mon</span></div>
                                <div class="chart-bar" style="height:65%"><span>Tue</span></div>
                                <div class="chart-bar" style="height:50%"><span>Wed</span></div>
                                <div class="chart-bar" style="height:80%"><span>Thu</span></div>
                                <div class="chart-bar active" style="height:95%"><span>Fri</span></div>
                                <div class="chart-bar" style="height:70%"><span>Sat</span></div>
                                <div class="chart-bar" style="height:60%"><span>Sun</span></div>
                            </div>
                        </div>
                        <div class="dash-orders-card">
                            <div class="dash-card-title">Recent Orders</div>
                            <div class="dash-orders-list">
                                ${dashState.ordersList.map(order => `
                                    <div class="dash-order-row">
                                        <span class="dash-order-id">#${order.id}</span>
                                        <span>${order.dish}</span>
                                        <span class="${order.class}">${order.status}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'menu':
                html = `
                    <div class="dash-orders-card" style="width: 100%;">
                        <div class="dash-card-title">Digital Menu Management</div>
                        <div class="dash-menu-manager">
                            ${dashState.menuItems.map((item, idx) => `
                                <div class="dash-menu-row">
                                    <div class="menu-row-info">
                                        <span class="menu-row-badge ${item.veg ? 'veg' : 'nonveg'}"></span>
                                        <span class="menu-row-name">${item.name}</span>
                                    </div>
                                    <div class="menu-row-controls">
                                        <div class="stock-toggle-wrapper">
                                            <span>Price:</span>
                                            <input type="text" class="menu-row-price" value="₹${item.price}" onchange="updateSimMenuPrice(${idx}, this.value)">
                                        </div>
                                        <div class="stock-toggle-wrapper">
                                            <span>Stock:</span>
                                            <label class="mini-switch">
                                                <input type="checkbox" ${item.stock ? 'checked' : ''} onchange="toggleSimMenuStock(${idx}, this.checked)">
                                                <span class="mini-slider"></span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'orders':
                html = `
                    <div class="dash-orders-card" style="width: 100%;">
                        <div class="dash-card-title">Incoming Customer Orders Queue</div>
                        <div class="dash-orders-list">
                            ${dashState.ordersList.map(order => `
                                <div class="dash-order-row" style="padding: 0.8rem;">
                                    <span class="dash-order-id">#${order.id}</span>
                                    <span style="font-weight:600;">${order.dish}</span>
                                    <div style="display:flex; align-items:center; gap: 0.8rem;">
                                        <span class="${order.class}">${order.status}</span>
                                        ${order.status === 'Pending' ? `
                                            <div class="dash-order-actions">
                                                <button class="dash-btn-mini btn-accept" onclick="acceptSimOrder(${order.id})">Accept</button>
                                                <button class="dash-btn-mini btn-decline" onclick="rejectSimOrder(${order.id})">Reject</button>
                                            </div>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'reservations':
                html = `
                    <div class="dash-orders-card" style="width: 100%;">
                        <div class="dash-card-title">Table Booking Log</div>
                        <div class="dash-orders-list">
                            ${dashState.bookings.map((book, idx) => `
                                <div class="dash-order-row" style="padding: 0.8rem;">
                                    <div>
                                        <div style="font-weight:700; font-size:0.8rem;">${book.guest}</div>
                                        <div style="font-size:0.65rem; color:var(--text-secondary); margin-top:0.15rem;"><i class="fa-solid fa-clock"></i> ${book.date} • ${book.count} Guests</div>
                                    </div>
                                    <div style="display:flex; align-items:center; gap:0.6rem;">
                                        <span class="${book.status === 'Confirmed' ? 'dash-badge-green' : 'dash-badge-blue'}">${book.status}</span>
                                        ${book.status === 'Awaiting Confirmation' ? `
                                            <button class="dash-btn-mini btn-accept" onclick="confirmSimBooking(${idx})">Confirm</button>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;
            case 'analytics':
                html = `
                    <div class="dash-content-row">
                        <div class="dash-chart-card" style="width: 100%;">
                            <div class="dash-card-title">Performance Analytics</div>
                            <div class="dash-mini-chart" style="margin-top: 1.5rem;">
                                <div class="chart-bar" style="height:55%"><span>May</span></div>
                                <div class="chart-bar" style="height:70%"><span>Jun</span></div>
                                <div class="chart-bar active" style="height:90%"><span>Jul</span></div>
                            </div>
                            <div style="font-size:0.7rem; color:var(--text-muted); margin-top: 1.2rem; text-align:center;">
                                Organic visitor queries increased by <strong>+140%</strong> since launching custom local SEO profiles.
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'settings':
                html = `
                    <div class="dash-orders-card" style="width: 100%;">
                        <div class="dash-card-title">System Settings</div>
                        <div style="display:flex; flex-direction:column; gap: 1rem; margin-top:0.8rem;">
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.6rem;">
                                <span>SSL Encryption Status</span>
                                <span class="dash-badge-green">Secured Ready</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:0.6rem;">
                                <span>WhatsApp Notification Router</span>
                                <span class="dash-badge-green">Connected</span>
                            </div>
                            <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; padding-bottom:0.6rem;">
                                <span>SEO Schema Profiles</span>
                                <span class="dash-badge-green">Indexed</span>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        dashInnerContent.innerHTML = html;
        // Bind hover effects inside mockup
        const links = dashInnerContent.querySelectorAll('button, input, select');
        links.forEach(elem => {
            elem.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            elem.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    }

    // Sidebar navigation click routing
    const dashNavItems = document.querySelectorAll('.dash-sidebar-nav .dash-nav-item');
    dashNavItems.forEach(item => {
        item.addEventListener('click', () => {
            dashNavItems.forEach(b => b.classList.remove('active'));
            item.classList.add('active');
            dashState.activeTab = item.getAttribute('data-dashnav');
            renderDashPanel();
        });
    });

    // Accept/Reject order actions inside mock
    window.acceptSimOrder = function(orderId) {
        playDashboardSound();
        const o = dashState.ordersList.find(ord => ord.id === orderId);
        if (o) {
            o.status = "Preparing";
            o.class = "dash-badge-yellow";
            addSimLog(`[Order #${orderId}] Accepted by kitchen. Status updated to Preparing.`, 'yellow');
            renderDashPanel();
        }
    };
    window.rejectSimOrder = function(orderId) {
        const o = dashState.ordersList.find(ord => ord.id === orderId);
        if (o) {
            o.status = "Rejected";
            o.class = "dash-badge-red";
            addSimLog(`[Order #${orderId}] Rejected by dashboard staff.`, 'red');
            renderDashPanel();
        }
    };

    // Reservation confirmation inside mock
    window.confirmSimBooking = function(idx) {
        playDashboardSound();
        const b = dashState.bookings[idx];
        if (b) {
            b.status = "Confirmed";
            addSimLog(`[Booking] Confirmed table request for ${b.guest}. WhatsApp notification sent.`, 'green');
            renderDashPanel();
        }
    };

    // Menu editing inside mock
    window.toggleSimMenuStock = function(idx, checked) {
        const m = dashState.menuItems[idx];
        if (m) {
            m.stock = checked;
            addSimLog(`[Menu] Toggled ${m.name} availability: ${checked ? 'In Stock' : 'Out of Stock'}`, 'blue');
        }
    };
    window.updateSimMenuPrice = function(idx, val) {
        const m = dashState.menuItems[idx];
        if (m) {
            const price = parseInt(val.replace(/[^\d]/g, '')) || 0;
            m.price = price;
            addSimLog(`[Menu] Updated price of ${m.name} to ₹${price}`, 'blue');
        }
    };

    // Trigger toast notification inside mockup
    window.triggerDashboardToast = function(title, body) {
        if (!dashMockupFrame) return;

        // Show bell dot
        if (dashNotifIcon) {
            const dot = dashNotifIcon.querySelector('.notif-dot');
            if (dot) dot.style.display = 'block';
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'dash-toast-notification';
        toast.innerHTML = `
            <i class="fa-solid fa-bell-concierge dash-toast-icon"></i>
            <div class="dash-toast-body">
                <h5>${title}</h5>
                <p>${body}</p>
            </div>
        `;
        
        dashMockupFrame.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-10px)';
            setTimeout(() => toast.remove(), 400);
        }, 3200);
    }

    // Trigger Simulator click events
    if (btnSimulateOrder) {
        btnSimulateOrder.addEventListener('click', () => {
            playDashboardSound();
            
            // Randomize order items
            const foods = ["Butter Chicken Full", "Paneer Tikka Roll", "Special Thali Meal", "Assorted Naan Basket", "Shahi Paneer x2"];
            const chosenFood = foods[Math.floor(Math.random() * foods.length)];
            const orderCost = Math.floor(Math.random() * 500) + 200;
            const newOrderId = dashState.ordersList.length > 0 ? dashState.ordersList[0].id + 1 : 1001;

            // Update stats
            dashState.ordersCount += 1;
            dashState.revenue += orderCost;
            dashState.customersCount += 1;

            // Add to lists
            dashState.ordersList.unshift({
                id: newOrderId,
                dish: chosenFood,
                status: "Pending",
                class: "dash-badge-blue"
            });

            // Log event & Toast
            addSimLog(`[Simulation] Customer placed order #${newOrderId}: ${chosenFood} (₹${orderCost})`, 'green');
            triggerDashboardToast(`New Website Order #${newOrderId}`, `${chosenFood} - ₹${orderCost} received online.`);
            
            syncDashStats();
            renderDashPanel();
        });
    }

    if (btnSimulateBooking) {
        btnSimulateBooking.addEventListener('click', () => {
            playDashboardSound();

            const guests = ["Anoop Verma", "Siddharth Goel", "Preeti Kashyap", "Vikram Rathore"];
            const chosenGuest = guests[Math.floor(Math.random() * guests.length)];
            const partyCount = Math.floor(Math.random() * 6) + 2;
            const slots = ["08:00 PM", "09:30 PM", "07:30 PM", "10:00 PM"];
            const chosenSlot = slots[Math.floor(Math.random() * slots.length)];

            dashState.reservationsCount += 1;

            dashState.bookings.unshift({
                guest: chosenGuest,
                date: `Today, ${chosenSlot}`,
                count: partyCount,
                status: "Awaiting Confirmation"
            });

            addSimLog(`[Simulation] Customer requested table booking: ${chosenGuest} (${partyCount} guests @ ${chosenSlot})`, 'blue');
            triggerDashboardToast("Table Booking Request", `${chosenGuest} requested table for ${partyCount} guests.`);
            
            syncDashStats();
            renderDashPanel();
        });
    }

    // Initialize stats and default dashboard layout on mockup load
    if (dashInnerContent) {
        syncDashStats();
        renderDashPanel();
    }

});