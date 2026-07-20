document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dynamic Pricing Calculator Logic ---
    const pricingTogglePlans = document.getElementById('pricingTogglePlans');
    const pricingToggleCalc = document.getElementById('pricingToggleCalc');
    const pricingPlansWrapper = document.getElementById('pricingPlansWrapper');
    const pricingCalcWrapper = document.getElementById('pricingCalcWrapper');

    if (pricingTogglePlans && pricingToggleCalc && pricingPlansWrapper && pricingCalcWrapper) {
        pricingTogglePlans.addEventListener('click', () => {
            pricingTogglePlans.classList.add('active');
            pricingToggleCalc.classList.remove('active');
            pricingPlansWrapper.style.display = 'block';
            pricingCalcWrapper.style.display = 'none';
        });

        pricingToggleCalc.addEventListener('click', () => {
            pricingToggleCalc.classList.add('active');
            pricingTogglePlans.classList.remove('active');
            pricingPlansWrapper.style.display = 'none';
            pricingCalcWrapper.style.display = 'block';
        });
    }

    // Calculator inputs & fields
    const calcPlanRange = document.getElementById('calcPlanRange');
    const calcPagesRange = document.getElementById('calcPagesRange');
    const calcSupportRange = document.getElementById('calcSupportRange');
    const calcAddonChecks = document.querySelectorAll('.calc-addon-check');

    const calcBaseLabel = document.getElementById('calcBaseLabel');
    const calcPagesLabel = document.getElementById('calcPagesLabel');
    const calcSupportLabel = document.getElementById('calcSupportLabel');
    const calcBreakdown = document.getElementById('calcBreakdown');
    const calcTotalPrice = document.getElementById('calcTotalPrice');
    const calcWhatsAppBtn = document.getElementById('calcWhatsAppBtn');

    // Base Plan Data
    const basePlans = {
        1: { name: "Starter", price: 2999, pages: 1, support: 1, desc: "Starter Base Plan" },
        2: { name: "Growth", price: 4999, pages: 3, support: 2, desc: "Growth Base Plan" },
        3: { name: "Business", price: 7999, pages: 5, support: 3, desc: "Business Base Plan" },
        4: { name: "Professional", price: 9999, pages: 10, support: 6, desc: "Professional Base Plan" },
        5: { name: "Premium", price: 14999, pages: 15, support: 12, desc: "Premium Base Plan" }
    };

    function updateCalculator() {
        if (!calcPlanRange || !calcTotalPrice) return;

        const planVal = parseInt(calcPlanRange.value);
        const pagesVal = parseInt(calcPagesRange.value);
        const supportVal = parseInt(calcSupportRange.value);
        
        const base = basePlans[planVal];

        // 1. Base details labels
        calcBaseLabel.textContent = `${base.name} Plan (₹${base.price.toLocaleString('en-IN')})`;
        
        // Ensure pages range is realistic and update text
        calcPagesLabel.textContent = `${pagesVal} Page${pagesVal > 1 ? 's' : ''}`;
        
        // Support text label
        if (supportVal <= base.support) {
            calcSupportLabel.textContent = `${supportVal} Month${supportVal > 1 ? 's' : ''} (Free / Included)`;
        } else {
            calcSupportLabel.textContent = `${supportVal} Month${supportVal > 1 ? 's' : ''} (+${supportVal - base.support} Months Extra)`;
        }

        // Calculate Cost Breakdown
        let total = base.price;
        let breakdownHTML = `<div class="breakdown-item"><span>${base.name} Base Plan</span><span>₹${base.price.toLocaleString('en-IN')}</span></div>`;

        // Extra Pages Cost
        let extraPages = pagesVal - base.pages;
        if (extraPages > 0) {
            let extraPagesCost = extraPages * 500;
            total += extraPagesCost;
            breakdownHTML += `<div class="breakdown-item"><span>+${extraPages} Extra Page${extraPages > 1 ? 's' : ''} (₹500/page)</span><span>₹${extraPagesCost.toLocaleString('en-IN')}</span></div>`;
        } else {
            breakdownHTML += `<div class="breakdown-item"><span>${pagesVal} Page Design</span><span>Included</span></div>`;
        }

        // Extra Support Cost
        let extraSupport = supportVal - base.support;
        if (extraSupport > 0) {
            let extraSupportCost = extraSupport * 800;
            total += extraSupportCost;
            breakdownHTML += `<div class="breakdown-item"><span>+${extraSupport} Month${extraSupport > 1 ? 's' : ''} Support (₹800/mo)</span><span>₹${extraSupportCost.toLocaleString('en-IN')}</span></div>`;
        } else {
            breakdownHTML += `<div class="breakdown-item"><span>${supportVal} Month Maintenance</span><span>Included</span></div>`;
        }

        // Addons Cost
        let chosenAddons = [];
        calcAddonChecks.forEach(check => {
            if (check.checked) {
                let price = parseInt(check.getAttribute('data-price'));
                let name = check.closest('.addon-checkbox-card').querySelector('.addon-name').textContent.trim();
                total += price;
                chosenAddons.push(name);
                breakdownHTML += `<div class="breakdown-item"><span>+ ${name}</span><span>₹${price.toLocaleString('en-IN')}</span></div>`;
            }
        });

        // Set Breakdown HTML & Animate Price
        calcBreakdown.innerHTML = breakdownHTML;
        animatePriceCounter(total);

        // Update WhatsApp message link
        let messageText = `Hi VelvetBite, I've configured a custom website plan on your site:\n\n` +
                          `• Base Package: ${base.name} Plan (₹${base.price})\n` +
                          `• Total Pages: ${pagesVal}\n` +
                          `• Maintenance: ${supportVal} Months\n`;
        
        if (chosenAddons.length > 0) {
            messageText += `• Add-ons Selected:\n  - ` + chosenAddons.join('\n  - ') + `\n`;
        }
        messageText += `\nEstimated Price: ₹${total.toLocaleString('en-IN')}\n` +
                       `Please connect to discuss this implementation plan.`;

        calcWhatsAppBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(messageText)}`;
    }

    let priceCounterInterval;
    function animatePriceCounter(targetPrice) {
        if (!calcTotalPrice) return;
        
        clearInterval(priceCounterInterval);
        let currentText = calcTotalPrice.textContent.replace(/[^\d]/g, '');
        let current = parseInt(currentText) || 0;
        
        let step = Math.ceil((targetPrice - current) / 10);
        if (step === 0) {
            calcTotalPrice.textContent = `₹${targetPrice.toLocaleString('en-IN')}`;
            return;
        }

        priceCounterInterval = setInterval(() => {
            current += step;
            if ((step > 0 && current >= targetPrice) || (step < 0 && current <= targetPrice)) {
                current = targetPrice;
                clearInterval(priceCounterInterval);
            }
            calcTotalPrice.textContent = `₹${current.toLocaleString('en-IN')}`;
        }, 20);
    }

    if (calcPlanRange) {
        // Bind slider change events
        [calcPlanRange, calcPagesRange, calcSupportRange].forEach(input => {
            input.addEventListener('input', updateCalculator);
        });
        // Bind checkboxes
        calcAddonChecks.forEach(check => {
            check.addEventListener('change', updateCalculator);
        });
        
        // Initial run
        updateCalculator();
    }

});