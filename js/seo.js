document.addEventListener('DOMContentLoaded', () => {
    // --- 3. Interactive Local SEO Growth Simulator ---
    const btnRunSeoAudit = document.getElementById('btnRunSeoAudit');
    const seoResultInitial = document.getElementById('seoResultInitial');
    const seoResultLoading = document.getElementById('seoResultLoading');
    const seoResultSuccess = document.getElementById('seoResultSuccess');
    const seoLoadingStep = document.getElementById('seoLoadingStep');
    const seoLoadingProgress = document.getElementById('seoLoadingProgress');

    // Mocks values
    const seoRestNameInput = document.getElementById('seoRestName');
    const seoCityNameInput = document.getElementById('seoCityName');
    const seoCategoryInput = document.getElementById('seoCategory');

    const googleQueryVal = document.getElementById('googleQueryVal');
    const mockMapRestName = document.getElementById('mockMapRestName');
    const mockMapCat = document.getElementById('mockMapCat');
    const mockMapAddress = document.getElementById('mockMapAddress');
    const mockOrganicUrl = document.getElementById('mockOrganicUrl');
    const mockOrganicTitle = document.getElementById('mockOrganicTitle');
    const mockSnippetRestName = document.getElementById('mockSnippetRestName');
    const mockSnippetCat = document.getElementById('mockSnippetCat');
    const mockSnippetCity = document.getElementById('mockSnippetCity');

    if (btnRunSeoAudit) {
        btnRunSeoAudit.addEventListener('click', () => {
            const name = seoRestNameInput.value.trim() || 'Spice Symphony';
            const city = seoCityNameInput.value.trim() || 'Gurugram';
            const category = seoCategoryInput.value || 'Indian Restaurant';

            // Reset view to loading
            seoResultInitial.style.display = 'none';
            seoResultLoading.style.display = 'block';
            seoResultSuccess.style.display = 'none';
            
            // Loading Sequence Timeline
            const steps = [
                { prg: 20, txt: "Scanning competitor keyword mappings..." },
                { prg: 45, txt: "Checking site speed performance index ratio..." },
                { prg: 70, txt: "Configuring schema microdata profiles..." },
                { prg: 90, txt: "Validating Google Search Console schemas..." },
                { prg: 100, txt: "Generating rankings forecast metrics..." }
            ];

            let stepIdx = 0;
            function runLoaderStep() {
                if (stepIdx < steps.length) {
                    let step = steps[stepIdx];
                    seoLoadingProgress.style.width = step.prg + '%';
                    seoLoadingStep.textContent = step.txt;
                    stepIdx++;
                    setTimeout(runLoaderStep, 500);
                } else {
                    // Show success mock-ups
                    seoResultLoading.style.display = 'none';
                    seoResultSuccess.style.display = 'block';

                    // Update mockup text elements customized to search data
                    const query = `best ${category.toLowerCase()} in ${city.toLowerCase()}`;
                    const urlSlug = name.toLowerCase().replace(/[^a-z]/g, '');

                    if (googleQueryVal) googleQueryVal.textContent = query;
                    if (mockMapRestName) mockMapRestName.textContent = name;
                    if (mockMapCat) mockMapCat.textContent = category;
                    if (mockMapAddress) mockMapAddress.textContent = `Cyber City, ${city}`;
                    if (mockOrganicUrl) mockOrganicUrl.textContent = urlSlug;
                    if (mockOrganicTitle) mockOrganicTitle.textContent = `Best ${category} in ${city} | ${name} - Book Online`;
                    if (mockSnippetRestName) mockSnippetRestName.textContent = name;
                    if (mockSnippetCat) mockSnippetCat.textContent = category;
                    if (mockSnippetCity) mockSnippetCity.textContent = city;

                    // Animate comparison bars
                    setTimeout(() => {
                        const barFills = seoResultSuccess.querySelectorAll('.seo-bars .bar-fill');
                        barFills.forEach(bar => {
                            if (bar.classList.contains('green-fill')) bar.style.width = '18%';
                            if (bar.classList.contains('red-fill')) bar.style.width = '95%';
                        });
                    }, 100);
                }
            }

            runLoaderStep();
        });
    }

});