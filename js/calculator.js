document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Dynamic Pricing Calculator & ROI Toggle Logic ---
    const pricingTogglePlans = document.getElementById('pricingTogglePlans');
    const pricingToggleCalc = document.getElementById('pricingToggleCalc');
    const pricingToggleRoi = document.getElementById('pricingToggleRoi');
    const pricingPlansWrapper = document.getElementById('pricingPlansWrapper');
    const pricingCalcWrapper = document.getElementById('pricingCalcWrapper');
    const pricingRoiWrapper = document.getElementById('pricingRoiWrapper');

    if (pricingTogglePlans && pricingToggleCalc && pricingToggleRoi && pricingPlansWrapper && pricingCalcWrapper && pricingRoiWrapper) {
        pricingTogglePlans.addEventListener('click', () => {
            pricingTogglePlans.classList.add('active');
            pricingToggleCalc.classList.remove('active');
            pricingToggleRoi.classList.remove('active');
            pricingPlansWrapper.style.display = 'block';
            pricingCalcWrapper.style.display = 'none';
            pricingRoiWrapper.style.display = 'none';
        });

        pricingToggleCalc.addEventListener('click', () => {
            pricingToggleCalc.classList.add('active');
            pricingTogglePlans.classList.remove('active');
            pricingToggleRoi.classList.remove('active');
            pricingPlansWrapper.style.display = 'none';
            pricingCalcWrapper.style.display = 'block';
            pricingRoiWrapper.style.display = 'none';
        });

        pricingToggleRoi.addEventListener('click', () => {
            pricingToggleRoi.classList.add('active');
            pricingTogglePlans.classList.remove('active');
            pricingToggleCalc.classList.remove('active');
            pricingPlansWrapper.style.display = 'none';
            pricingCalcWrapper.style.display = 'none';
            pricingRoiWrapper.style.display = 'block';
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

    // --- 2. Zomato/Swiggy ROI Calculator Logic ---
    const roiOrdersRange = document.getElementById('roiOrdersRange');
    const roiAovRange = document.getElementById('roiAovRange');
    const roiCommRange = document.getElementById('roiCommRange');

    const roiOrdersLabel = document.getElementById('roiOrdersLabel');
    const roiAovLabel = document.getElementById('roiAovLabel');
    const roiCommLabel = document.getElementById('roiCommLabel');

    const roiMonthlyLoss = document.getElementById('roiMonthlyLoss');
    const roiYearlyLoss = document.getElementById('roiYearlyLoss');
    const roiNetSavings = document.getElementById('roiNetSavings');
    const roiPaybackSpeed = document.getElementById('roiPaybackSpeed');
    const roiWhatsAppBtn = document.getElementById('roiWhatsAppBtn');

    function updateRoiCalculator() {
        if (!roiOrdersRange || !roiMonthlyLoss) return;

        const orders = parseInt(roiOrdersRange.value);
        const aov = parseInt(roiAovRange.value);
        const comm = parseInt(roiCommRange.value);

        // Update labels
        roiOrdersLabel.textContent = `${orders} Order${orders > 1 ? 's' : ''}/day`;
        roiAovLabel.textContent = `₹${aov}`;
        roiCommLabel.textContent = `${comm}%`;

        // Compute math
        const monthlyOrders = orders * 30.4;
        const monthlyRev = monthlyOrders * aov;
        const monthlyCommissionPaid = Math.round(monthlyRev * (comm / 100));
        const yearlyCommissionPaid = Math.round(monthlyCommissionPaid * 12);
        
        const growthPlanCost = 4999;
        const netProfitRecovered = yearlyCommissionPaid - growthPlanCost;

        // Calculate payback speed in days
        const dailyRevenue = orders * aov;
        const dailyCommission = dailyRevenue * (comm / 100);
        const paybackDays = Math.ceil(growthPlanCost / dailyCommission);

        // Update text counters
        animateNumberCounter(roiMonthlyLoss, monthlyCommissionPaid, '₹');
        animateNumberCounter(roiYearlyLoss, yearlyCommissionPaid, '₹');
        animateNumberCounter(roiNetSavings, netProfitRecovered > 0 ? netProfitRecovered : 0, '₹');

        // Update payback speed label
        if (paybackDays <= 1) {
            roiPaybackSpeed.innerHTML = `<i class="fa-solid fa-bolt" style="color: #ffc107;"></i> Paid back in less than 1 day of orders!`;
        } else {
            roiPaybackSpeed.innerHTML = `<i class="fa-solid fa-bolt" style="color: #ffc107;"></i> Paid back in just ${paybackDays} days of orders!`;
        }

        // WhatsApp message trigger text prefilled
        const msg = `Hi VelvetBite, I ran your aggregator savings calculator for my restaurant:\n\n` +
                    `• Daily Orders: ${orders}\n` +
                    `• Avg Order Value: ₹${aov}\n` +
                    `• Aggregator Commission: ${comm}%\n\n` +
                    `• Monthly Lost Profit: ₹${monthlyCommissionPaid.toLocaleString('en-IN')}\n` +
                    `• Yearly Lost Profit: ₹${yearlyCommissionPaid.toLocaleString('en-IN')}\n` +
                    `• Cost of VelvetBite Website: ₹4,999 (one-time Growth plan)\n\n` +
                    `Estimated Annual Savings: ₹${netProfitRecovered.toLocaleString('en-IN')}\n` +
                    `I want to claim my direct ordering website. Please guide me on next steps.`;
        
        roiWhatsAppBtn.href = `https://wa.me/919999999999?text=${encodeURIComponent(msg)}`;
    }

    // Reuse counter animator with generic element helper
    function animateNumberCounter(element, targetVal, prefix = '') {
        if (!element) return;
        let currentText = element.textContent.replace(/[^\d]/g, '');
        let current = parseInt(currentText) || 0;
        let step = Math.ceil((targetVal - current) / 10);
        
        if (step === 0) {
            element.textContent = `${prefix}${targetVal.toLocaleString('en-IN')}`;
            return;
        }

        // Use custom interval property on element to prevent cross-talking animations
        if (element.counterInterval) clearInterval(element.counterInterval);
        
        element.counterInterval = setInterval(() => {
            current += step;
            if ((step > 0 && current >= targetVal) || (step < 0 && current <= targetVal)) {
                current = targetVal;
                clearInterval(element.counterInterval);
            }
            element.textContent = `${prefix}${current.toLocaleString('en-IN')}`;
        }, 20);
    }

    if (roiOrdersRange) {
        [roiOrdersRange, roiAovRange, roiCommRange].forEach(input => {
            input.addEventListener('input', updateRoiCalculator);
        });
        updateRoiCalculator();
    }

});