document.addEventListener('DOMContentLoaded', () => {
    // --- 4. Floating WhatsApp Bot Simulator ---
    const whatsappBotWidget = document.getElementById('whatsappBotWidget');
    const whatsappBotToggle = document.getElementById('whatsappBotToggle');
    const whatsappChatBody = document.getElementById('whatsappChatBody');
    const whatsappQuickReplies = document.getElementById('whatsappQuickReplies');

    if (whatsappBotToggle && whatsappBotWidget) {
        whatsappBotToggle.addEventListener('click', () => {
            whatsappBotWidget.classList.toggle('active');
            
            // Remove notification dot
            const badge = whatsappBotToggle.querySelector('.notif-badge');
            if (badge) badge.style.display = 'none';

            // Scroll to bottom of chat
            if (whatsappChatBody) {
                setTimeout(() => whatsappChatBody.scrollTop = whatsappChatBody.scrollHeight, 100);
            }
        });
    }

    // Bot Dialogues trees configurations
    const botReplies = {
        menu: {
            user: "🍕 View Menu",
            bot: [
                "Absolutely! Here is our digital selection. You can click on items to view reviews or place direct orders:",
                `
                <div class="chat-card">
                    <img src="assets/pizza_premium.png" alt="Pizza">
                    <div class="chat-card-body">
                        <div class="chat-card-title">Artisan Truffle & Mozzarella Pizza</div>
                        <div class="chat-card-price">₹820</div>
                    </div>
                    <button class="chat-card-btn" onclick="whatsappBotAction('order_pizza')">Add to Order</button>
                </div>
                `,
                "Use the menu panel inside the main site preview phone mockups to test table bookings!"
            ]
        },
        book: {
            user: "📅 Book a Table",
            bot: [
                "Excellent choice. Let's arrange a table seating for you.",
                "Please select your time slot and guest count inside the site reservation preview form, and we'll instantly log and verify your details."
            ]
        },
        offers: {
            user: "🎁 Today's Offers",
            bot: [
                "Here are today's special campaigns and discount codes active for our dining guests:",
                `
                <div class="chat-card">
                    <div class="chat-card-body" style="padding:0.8rem; border-left:3px solid #25d366;">
                        <div style="font-weight:700; font-size:0.75rem; color:#121214;">FREE CHAMPAGNE FLIGHT</div>
                        <div style="font-size:0.65rem; color:var(--text-secondary); margin-top:0.15rem;">Get complimentary wine flights for tables of over 4 guests today. Use code: <strong>NOIR26</strong></div>
                    </div>
                </div>
                `
            ]
        }
    };

    window.whatsappBotAction = function(action) {
        if (action === 'order_pizza') {
            appendChatMsg("sent", "I'd like to order the Artisan Truffle Pizza");
            triggerBotTyping(() => {
                appendChatMsg("received", "Order request logged! A kitchen confirmation coupon check has been sent. Thank you for placing your request!");
            });
        }
    };

    function appendChatMsg(sender, htmlContent) {
        if (!whatsappChatBody) return;
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;
        msg.innerHTML = `<p>${htmlContent}</p>`;
        whatsappChatBody.appendChild(msg);
        whatsappChatBody.scrollTop = whatsappChatBody.scrollHeight;
    }

    function triggerBotTyping(callback) {
        if (!whatsappChatBody) return;
        
        // Disable choices
        const btns = whatsappQuickReplies.querySelectorAll('button');
        btns.forEach(b => b.disabled = true);

        // Typing dot card
        const typing = document.createElement('div');
        typing.className = 'typing-indicator-msg';
        typing.id = 'botTypingIndicator';
        typing.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
        whatsappChatBody.appendChild(typing);
        whatsappChatBody.scrollTop = whatsappChatBody.scrollHeight;

        setTimeout(() => {
            typing.remove();
            callback();
            btns.forEach(b => b.disabled = false);
        }, 1200);
    }

    if (whatsappQuickReplies) {
        const btns = whatsappQuickReplies.querySelectorAll('.quick-reply-btn');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const replyKey = btn.getAttribute('data-reply');
                const node = botReplies[replyKey];
                if (!node) return;

                // Send User msg
                appendChatMsg("sent", node.user);

                // Run sequence
                triggerBotTyping(() => {
                    let msgIdx = 0;
                    function sendNextBotMsg() {
                        if (msgIdx < node.bot.length) {
                            appendChatMsg("received", node.bot[msgIdx]);
                            msgIdx++;
                            if (msgIdx < node.bot.length) {
                                triggerBotTyping(sendNextBotMsg);
                            }
                        }
                    }
                    sendNextBotMsg();
                });
            });
        });
    }
});