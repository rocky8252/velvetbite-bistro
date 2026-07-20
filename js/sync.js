document.addEventListener('DOMContentLoaded', () => {
    // --- 5. BroadcastChannel Sync from Demo Website ---
    try {
        const syncChannel = new BroadcastChannel('velvetbite_sync');
        syncChannel.onmessage = function(event) {
            const msg = event.data;
            if (!msg) return;

            if (msg.type === 'NEW_ORDER') {
                if (window.playDashboardSound) window.playDashboardSound();
                
                // Update stats
                window.dashState.ordersCount += 1;
                window.dashState.revenue += msg.data.cost;
                window.dashState.customersCount += 1;

                // Add to order list
                window.dashState.ordersList.unshift({
                    id: msg.data.id,
                    dish: msg.data.dish,
                    status: "Pending",
                    class: "dash-badge-blue"
                });

                if (window.addSimLog) window.addSimLog(`[Sync API] Live Order #${msg.data.id} placed on Demo Website: ${msg.data.dish} (₹${msg.data.cost})`, 'green');
                if (window.triggerDashboardToast) window.triggerDashboardToast(`Live Demo Site Order #${msg.data.id}`, `${msg.data.dish} - ₹${msg.data.cost} received!`);
                
                if (window.syncDashStats) window.syncDashStats();
                if (window.renderDashPanel) window.renderDashPanel();
            }

            if (msg.type === 'NEW_BOOKING') {
                if (window.playDashboardSound) window.playDashboardSound();

                window.dashState.reservationsCount += 1;

                window.dashState.bookings.unshift({
                    guest: msg.data.guest,
                    date: msg.data.date,
                    count: msg.data.count,
                    status: "Awaiting Confirmation"
                });

                if (window.addSimLog) window.addSimLog(`[Sync API] Table request from Demo Website: ${msg.data.guest} (${msg.data.count} guests)`, 'blue');
                if (window.triggerDashboardToast) window.triggerDashboardToast("Live Demo Seating Request", `${msg.data.guest} requested table for ${msg.data.count} guests.`);

                if (window.syncDashStats) window.syncDashStats();
                if (window.renderDashPanel) window.renderDashPanel();
            }
        };
        if (window.addSimLog) window.addSimLog("BroadcastChannel sync listeners initialized.", "blue");
    } catch(e) {
        console.warn("BroadcastChannel not supported or blocked in this browser scope.", e);
    }
});