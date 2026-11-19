/**
 * ChronoAge Pro - Main Application Orchestrator
 */
document.addEventListener('DOMContentLoaded', () => {
    // Application State
    const state = {
        currentTab: 'calculator',
        theme: localStorage.getItem('chrono_theme') || 'dark',
        soundEnabled: localStorage.getItem('chrono_sound') !== 'false',
        liveTimer: null,
        lastCalculatedBirth: null,
        userName: '',
        profiles: []
    };

    // Cache DOM Elements
    const elements = {
        // Theme & Controls
        themeToggleBtn: document.getElementById('themeToggleBtn'),
        soundToggleBtn: document.getElementById('soundToggleBtn'),
        tabButtons: document.querySelectorAll('.nav-tab-btn'),
        tabPanels: document.querySelectorAll('.tab-panel'),

        // Tab 1: Main Calculator
        birthDateInput: document.getElementById('birthDateInput'),
        birthTimeInput: document.getElementById('birthTimeInput'),
        targetDateInput: document.getElementById('targetDateInput'),
        targetTimeInput: document.getElementById('targetTimeInput'),
        userNameInput: document.getElementById('userNameInput'),
        calculateBtn: document.getElementById('calculateBtn'),
        resetBtn: document.getElementById('resetBtn'),
        todayPresetBtn: document.getElementById('todayPresetBtn'),
        liveTickToggle: document.getElementById('liveTickToggle'),
        celebrateBtn: document.getElementById('celebrateBtn'),
        shareSummaryBtn: document.getElementById('shareSummaryBtn'),
        printCertBtn: document.getElementById('printCertBtn'),
        saveProfileBtn: document.getElementById('saveProfileBtn'),

        // Results Container
        resultsSection: document.getElementById('resultsSection'),
        emptyStateSection: document.getElementById('emptyStateSection'),

        // Core Age Displays
        yearsDisplay: document.getElementById('yearsDisplay'),
        monthsDisplay: document.getElementById('monthsDisplay'),
        daysDisplay: document.getElementById('daysDisplay'),
        hoursDisplay: document.getElementById('hoursDisplay'),
        minutesDisplay: document.getElementById('minutesDisplay'),
        secondsDisplay: document.getElementById('secondsDisplay'),
        liveBadge: document.getElementById('liveBadge'),

        // Totals Grid
        totalMonths: document.getElementById('totalMonths'),
        totalWeeks: document.getElementById('totalWeeks'),
        totalDays: document.getElementById('totalDays'),
        totalHours: document.getElementById('totalHours'),
        totalMinutes: document.getElementById('totalMinutes'),
        totalSeconds: document.getElementById('totalSeconds'),

        // Next Birthday Card
        nextBdayDays: document.getElementById('nextBdayDays'),
        nextBdayHours: document.getElementById('nextBdayHours'),
        nextBdayMinutes: document.getElementById('nextBdayMinutes'),
        nextBdaySeconds: document.getElementById('nextBdaySeconds'),
        nextBdayDateText: document.getElementById('nextBdayDateText'),
        nextBdayDayOfWeek: document.getElementById('nextBdayDayOfWeek'),
        nextBdayTurningAge: document.getElementById('nextBdayTurningAge'),
        halfBdayDateText: document.getElementById('halfBdayDateText'),
        halfBdayDaysText: document.getElementById('halfBdayDaysText'),
        bornDayOfWeekBadge: document.getElementById('bornDayOfWeekBadge'),

        // Astrology & Heritage
        westernSignName: document.getElementById('westernSignName'),
        westernSignSymbol: document.getElementById('westernSignSymbol'),
        westernSignElement: document.getElementById('westernSignElement'),
        westernSignRuler: document.getElementById('westernSignRuler'),
        westernSignTraits: document.getElementById('westernSignTraits'),
        chineseZodiacTitle: document.getElementById('chineseZodiacTitle'),
        chineseZodiacEmoji: document.getElementById('chineseZodiacEmoji'),
        chineseZodiacTraits: document.getElementById('chineseZodiacTraits'),
        generationName: document.getElementById('generationName'),
        generationEra: document.getElementById('generationEra'),
        generationDesc: document.getElementById('generationDesc'),
        birthstoneName: document.getElementById('birthstoneName'),
        birthstoneMeaning: document.getElementById('birthstoneMeaning'),
        birthFlowerName: document.getElementById('birthFlowerName'),
        birthFlowerMeaning: document.getElementById('birthFlowerMeaning'),
        moonPhaseEmoji: document.getElementById('moonPhaseEmoji'),
        moonPhaseName: document.getElementById('moonPhaseName'),
        moonPhaseDesc: document.getElementById('moonPhaseDesc'),

        // Life Stats
        statHeartbeats: document.getElementById('statHeartbeats'),
        statBreaths: document.getElementById('statBreaths'),
        statSleepHours: document.getElementById('statSleepHours'),
        statMeals: document.getElementById('statMeals'),
        statBlinks: document.getElementById('statBlinks'),
        statSunKm: document.getElementById('statSunKm'),
        statSunMiles: document.getElementById('statSunMiles'),
        statEarthRotKm: document.getElementById('statEarthRotKm'),
        statLaughs: document.getElementById('statLaughs'),
        statHairGrowth: document.getElementById('statHairGrowth'),

        // Tab 2: Date Difference
        diffStartDate: document.getElementById('diffStartDate'),
        diffStartTime: document.getElementById('diffStartTime'),
        diffEndDate: document.getElementById('diffEndDate'),
        diffEndTime: document.getElementById('diffEndTime'),
        diffCalcBtn: document.getElementById('diffCalcBtn'),
        diffResultContainer: document.getElementById('diffResultContainer'),

        // Tab 3: Comparison
        compNameA: document.getElementById('compNameA'),
        compDateA: document.getElementById('compDateA'),
        compNameB: document.getElementById('compNameB'),
        compDateB: document.getElementById('compDateB'),
        compCalcBtn: document.getElementById('compCalcBtn'),
        compResultContainer: document.getElementById('compResultContainer'),

        // Tab 4: Time Machine
        tmBirthDate: document.getElementById('tmBirthDate'),
        tmTargetDate: document.getElementById('tmTargetDate'),
        tmFutureCalcBtn: document.getElementById('tmFutureCalcBtn'),
        tmFutureResult: document.getElementById('tmFutureResult'),
        tmMilestonesList: document.getElementById('tmMilestonesList'),

        // Tab 5: Planetary & Pets
        planetsGrid: document.getElementById('planetsGrid'),
        petsGrid: document.getElementById('petsGrid'),

        // Tab 6: Profiles
        profilesList: document.getElementById('profilesList'),
        newProfileName: document.getElementById('newProfileName'),
        newProfileDate: document.getElementById('newProfileDate'),
        newProfileTime: document.getElementById('newProfileTime'),
        newProfileNote: document.getElementById('newProfileNote'),
        addProfileBtn: document.getElementById('addProfileBtn'),

        // Modal Certificate
        certificateModal: document.getElementById('certificateModal'),
        closeCertModalBtn: document.getElementById('closeCertModalBtn'),
        certPrintBtn: document.getElementById('certPrintBtn'),
        certName: document.getElementById('certName'),
        certBirthDate: document.getElementById('certBirthDate'),
        certExactAge: document.getElementById('certExactAge'),
        certTotalDays: document.getElementById('certTotalDays'),
        certBornDay: document.getElementById('certBornDay'),
        certZodiac: document.getElementById('certZodiac'),
        certGen: document.getElementById('certGen'),
        certDateIssued: document.getElementById('certDateIssued'),

        // Confetti Canvas
        confettiCanvas: document.getElementById('confettiCanvas'),
        toast: document.getElementById('toastNotification')
    };

    // Initialize Theme
    function initTheme() {
        document.documentElement.setAttribute('data-theme', state.theme);
        updateThemeIcon();
    }

    function toggleTheme() {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('chrono_theme', state.theme);
        document.documentElement.setAttribute('data-theme', state.theme);
        updateThemeIcon();
        playSound('click');
    }

    function updateThemeIcon() {
        if (!elements.themeToggleBtn) return;
        elements.themeToggleBtn.innerHTML = state.theme === 'dark' 
            ? '<span>☀️ Light Mode</span>' 
            : '<span>🌙 Dark Mode</span>';
    }

    // Sound Synthesizer via Web Audio API
    let audioCtx = null;
    function playSound(type = 'chime') {
        if (!state.soundEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;

            if (type === 'chime' || type === 'celebrate') {
                // Happy high chime
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
                osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
                osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
                osc.start(now);
                osc.stop(now + 0.8);
            } else if (type === 'click') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            }
        } catch (e) {
            // Audio context not allowed or blocked
        }
    }

    function toggleSound() {
        state.soundEnabled = !state.soundEnabled;
        localStorage.setItem('chrono_sound', state.soundEnabled);
        if (elements.soundToggleBtn) {
            elements.soundToggleBtn.innerHTML = state.soundEnabled ? '🔔 Sound ON' : '🔕 Sound OFF';
        }
        showToast(state.soundEnabled ? 'Audio enabled' : 'Audio muted');
    }

    // Toast Notification
    function showToast(message, duration = 3000) {
        if (!elements.toast) return;
        elements.toast.textContent = message;
        elements.toast.classList.add('show');
        setTimeout(() => {
            elements.toast.classList.remove('show');
        }, duration);
    }

    // Navigation Tabs
    function initTabs() {
        elements.tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabTarget = btn.getAttribute('data-tab');
                switchTab(tabTarget);
            });
        });
    }

    function switchTab(tabId) {
        state.currentTab = tabId;
        elements.tabButtons.forEach(btn => {
            if (btn.getAttribute('data-tab') === tabId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        elements.tabPanels.forEach(panel => {
            if (panel.id === `tab-${tabId}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });
        playSound('click');
    }

    // Set default dates
    function initDefaultDates() {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const hh = String(today.getHours()).padStart(2, '0');
        const min = String(today.getMinutes()).padStart(2, '0');

        if (elements.targetDateInput) elements.targetDateInput.value = `${yyyy}-${mm}-${dd}`;
        if (elements.targetTimeInput) elements.targetTimeInput.value = `${hh}:${min}`;
        if (elements.birthTimeInput && !elements.birthTimeInput.value) elements.birthTimeInput.value = '12:00';

        // Difference tab defaults
        if (elements.diffStartDate) elements.diffStartDate.value = `${yyyy - 1}-${mm}-${dd}`;
        if (elements.diffEndDate) elements.diffEndDate.value = `${yyyy}-${mm}-${dd}`;

        // Comparison tab defaults
        if (elements.compDateA) elements.compDateA.value = '1995-05-15';
        if (elements.compDateB) elements.compDateB.value = '1998-09-22';

        // Time Machine defaults
        if (elements.tmBirthDate) elements.tmBirthDate.value = '2000-01-01';
        if (elements.tmTargetDate) elements.tmTargetDate.value = '2050-01-01';

        // Set sample default birthday for instant engagement (e.g. 2000-01-01)
        if (elements.birthDateInput && !elements.birthDateInput.value) {
            elements.birthDateInput.value = '2000-01-01';
        }
    }

    // Main Age Calculation
    function calculateMainAge(isTick = false) {
        const birthDateVal = elements.birthDateInput.value;
        const birthTimeVal = elements.birthTimeInput.value || '00:00';
        const targetDateVal = elements.targetDateInput.value;
        const targetTimeVal = elements.targetTimeInput.value || '00:00';

        if (!birthDateVal) {
            if (!isTick) showToast('Please enter your birth date');
            return;
        }

        const birthDateTime = new Date(`${birthDateVal}T${birthTimeVal}:00`);
        let targetDateTime = targetDateVal ? new Date(`${targetDateVal}T${targetTimeVal}:00`) : new Date();

        if (isNaN(birthDateTime.getTime())) {
            if (!isTick) showToast('Invalid birth date');
            return;
        }

        state.lastCalculatedBirth = birthDateTime;
        state.userName = (elements.userNameInput.value || '').trim();

        // Perform Calculations
        const ageResult = AgeEngine.calculateAge(birthDateTime, targetDateTime);
        const astrologyWestern = AstrologyEngine.getWesternZodiac(birthDateTime);
        const astrologyChinese = AstrologyEngine.getChineseZodiac(birthDateTime);
        const generation = AstrologyEngine.getGeneration(birthDateTime);
        const birthGems = AstrologyEngine.getBirthGemsAndFlowers(birthDateTime);
        const lifeStats = LifeStatsEngine.calculateStats(ageResult, birthDateTime);
        const milestones = MilestonesEngine.getLifeMilestones(birthDateTime, targetDateTime);
        const planetaryAges = MilestonesEngine.getPlanetaryAges(ageResult.total.days, birthDateTime, targetDateTime);
        const petAges = MilestonesEngine.getPetAges(ageResult.total.years);

        // Update UI displays
        renderCoreAge(ageResult);
        renderNextBirthday(ageResult);
        renderAstrology(astrologyWestern, astrologyChinese, generation, birthGems, lifeStats.moonPhase);
        renderLifeStats(lifeStats);
        renderMilestones(milestones);
        renderPlanets(planetaryAges);
        renderPets(petAges);

        // Show Results container
        if (elements.emptyStateSection) elements.emptyStateSection.style.display = 'none';
        if (elements.resultsSection) elements.resultsSection.style.display = 'block';

        // Check Birthday Celebration
        if (!isTick) {
            if (ageResult.nextBirthday.isToday) {
                triggerConfetti();
                playSound('celebrate');
                showToast(`🎉 HAPPY BIRTHDAY! Turning ${ageResult.nextBirthday.turningAge} today! 🎂`);
            } else {
                playSound('chime');
            }
        }
    }

    function renderCoreAge(res) {
        if (elements.yearsDisplay) elements.yearsDisplay.textContent = res.years;
        if (elements.monthsDisplay) elements.monthsDisplay.textContent = res.months;
        if (elements.daysDisplay) elements.daysDisplay.textContent = res.days;
        if (elements.hoursDisplay) elements.hoursDisplay.textContent = String(res.hours).padStart(2, '0');
        if (elements.minutesDisplay) elements.minutesDisplay.textContent = String(res.minutes).padStart(2, '0');
        if (elements.secondsDisplay) elements.secondsDisplay.textContent = String(res.seconds).padStart(2, '0');

        if (elements.totalMonths) elements.totalMonths.textContent = res.total.months.toLocaleString();
        if (elements.totalWeeks) elements.totalWeeks.textContent = `${res.total.weeks.toLocaleString()} w, ${res.total.remainingDaysInWeek} d`;
        if (elements.totalDays) elements.totalDays.textContent = res.total.days.toLocaleString();
        if (elements.totalHours) elements.totalHours.textContent = res.total.hours.toLocaleString();
        if (elements.totalMinutes) elements.totalMinutes.textContent = res.total.minutes.toLocaleString();
        if (elements.totalSeconds) elements.totalSeconds.textContent = res.total.seconds.toLocaleString();

        if (elements.bornDayOfWeekBadge) {
            elements.bornDayOfWeekBadge.textContent = `Born on a ${res.birthDayOfWeek}`;
        }
    }

    function renderNextBirthday(res) {
        const nb = res.nextBirthday;
        if (elements.nextBdayDays) elements.nextBdayDays.textContent = nb.daysRemaining;
        if (elements.nextBdayHours) elements.nextBdayHours.textContent = String(nb.hoursRemaining).padStart(2, '0');
        if (elements.nextBdayMinutes) elements.nextBdayMinutes.textContent = String(nb.minutesRemaining).padStart(2, '0');
        if (elements.nextBdaySeconds) elements.nextBdaySeconds.textContent = String(nb.secondsRemaining).padStart(2, '0');

        if (elements.nextBdayDateText) {
            elements.nextBdayDateText.textContent = nb.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
        if (elements.nextBdayDayOfWeek) elements.nextBdayDayOfWeek.textContent = nb.dayOfWeek;
        if (elements.nextBdayTurningAge) elements.nextBdayTurningAge.textContent = `Turning ${nb.turningAge}`;

        if (elements.halfBdayDateText) {
            elements.halfBdayDateText.textContent = res.halfBirthday.date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            });
        }
        if (elements.halfBdayDaysText) elements.halfBdayDaysText.textContent = `in ${res.halfBirthday.daysRemaining} days`;
    }

    function renderAstrology(western, chinese, gen, gem, moon) {
        if (elements.westernSignName) elements.westernSignName.textContent = western.name;
        if (elements.westernSignSymbol) elements.westernSignSymbol.textContent = western.symbol;
        if (elements.westernSignElement) elements.westernSignElement.textContent = `${western.element} • ${western.quality}`;
        if (elements.westernSignRuler) elements.westernSignRuler.textContent = `Ruler: ${western.ruler}`;
        if (elements.westernSignTraits) elements.westernSignTraits.textContent = western.traits;

        if (elements.chineseZodiacTitle) elements.chineseZodiacTitle.textContent = chinese.title;
        if (elements.chineseZodiacEmoji) elements.chineseZodiacEmoji.textContent = chinese.emoji;
        if (elements.chineseZodiacTraits) elements.chineseZodiacTraits.textContent = chinese.traits;

        if (elements.generationName) elements.generationName.textContent = gen.name;
        if (elements.generationEra) elements.generationEra.textContent = gen.era;
        if (elements.generationDesc) elements.generationDesc.textContent = gen.description;

        if (elements.birthstoneName) elements.birthstoneName.textContent = gem.stone;
        if (elements.birthstoneMeaning) elements.birthstoneMeaning.textContent = gem.stoneMeaning;
        if (elements.birthFlowerName) elements.birthFlowerName.textContent = gem.flower;
        if (elements.birthFlowerMeaning) elements.birthFlowerMeaning.textContent = gem.flowerMeaning;

        if (elements.moonPhaseEmoji) elements.moonPhaseEmoji.textContent = moon.emoji;
        if (elements.moonPhaseName) elements.moonPhaseName.textContent = moon.name;
        if (elements.moonPhaseDesc) elements.moonPhaseDesc.textContent = `${moon.description} (${moon.illumination}% lit)`;
    }

    function renderLifeStats(stats) {
        if (elements.statHeartbeats) elements.statHeartbeats.textContent = stats.heartbeats.toLocaleString();
        if (elements.statBreaths) elements.statBreaths.textContent = stats.breaths.toLocaleString();
        if (elements.statSleepHours) elements.statSleepHours.textContent = `${stats.hoursSlept.toLocaleString()} hrs (${stats.daysSlept.toLocaleString()} days)`;
        if (elements.statMeals) elements.statMeals.textContent = `${stats.meals.toLocaleString()} meals (${stats.waterLiters.toLocaleString()} L water)`;
        if (elements.statBlinks) elements.statBlinks.textContent = stats.blinks.toLocaleString();
        if (elements.statSunKm) elements.statSunKm.textContent = `${stats.distanceAroundSunKm.toLocaleString()} km`;
        if (elements.statSunMiles) elements.statSunMiles.textContent = `(${stats.distanceAroundSunMiles.toLocaleString()} miles)`;
        if (elements.statEarthRotKm) elements.statEarthRotKm.textContent = `${stats.rotationDistanceKm.toLocaleString()} km`;
        if (elements.statLaughs) elements.statLaughs.textContent = `${stats.laughs.toLocaleString()} chuckles`;
        if (elements.statHairGrowth) elements.statHairGrowth.textContent = `${stats.hairGrowthCm} cm hair (${stats.nailGrowthCm} cm nails)`;
    }

    function renderMilestones(milestones) {
        if (!elements.tmMilestonesList) return;
        elements.tmMilestonesList.innerHTML = milestones.map(m => `
            <div class="milestone-card ${m.isAchieved ? 'achieved' : 'upcoming'}">
                <div class="milestone-icon">${m.icon}</div>
                <div class="milestone-info">
                    <h4>${m.label}</h4>
                    <p class="milestone-date">${m.formattedDate}</p>
                </div>
                <div class="milestone-status">
                    ${m.isAchieved 
                        ? `<span class="badge badge-success">✓ Achieved (${m.daysPassed.toLocaleString()} days ago)</span>` 
                        : `<span class="badge badge-pending">⏳ In ${m.daysRemaining.toLocaleString()} days</span>`}
                </div>
            </div>
        `).join('');
    }

    function renderPlanets(planets) {
        if (!elements.planetsGrid) return;
        elements.planetsGrid.innerHTML = planets.map(p => `
            <div class="planet-card" style="border-top: 3px solid ${p.color};">
                <div class="planet-header">
                    <span class="planet-icon">${p.icon}</span>
                    <h3>${p.name}</h3>
                </div>
                <div class="planet-age">
                    <span class="planet-age-value">${p.years}</span>
                    <span class="planet-age-unit">${p.name} years</span>
                </div>
                <p class="planet-next-bday">Next B-Day: <strong>${p.nextBirthdayDate}</strong> (in ${p.daysUntilNextBday} Earth days)</p>
                <p class="planet-fact">💡 ${p.funFact}</p>
            </div>
        `).join('');
    }

    function renderPets(pets) {
        if (!elements.petsGrid) return;
        elements.petsGrid.innerHTML = pets.map(pet => `
            <div class="pet-card">
                <div class="pet-header">
                    <span class="pet-emoji">${pet.emoji}</span>
                    <h4>${pet.species}</h4>
                </div>
                <div class="pet-age-value">${pet.age} <small>years</small></div>
                <p class="pet-note">${pet.note}</p>
            </div>
        `).join('');
    }

    // Real-Time Live Ticker
    function startLiveTicker() {
        if (state.liveTimer) clearInterval(state.liveTimer);
        state.liveTimer = setInterval(() => {
            if (elements.liveTickToggle && elements.liveTickToggle.checked) {
                // If target date is today/now, update the target time to real-time current second
                const now = new Date();
                const yyyy = now.getFullYear();
                const mm = String(now.getMonth() + 1).padStart(2, '0');
                const dd = String(now.getDate()).padStart(2, '0');
                const hh = String(now.getHours()).padStart(2, '0');
                const min = String(now.getMinutes()).padStart(2, '0');

                if (elements.targetDateInput.value === `${yyyy}-${mm}-${dd}`) {
                    elements.targetTimeInput.value = `${hh}:${min}`;
                }

                if (state.lastCalculatedBirth) {
                    calculateMainAge(true);
                }
            }
        }, 1000);
    }

    // Confetti Animation Engine
    function triggerConfetti() {
        const canvas = elements.confettiCanvas;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

        for (let i = 0; i < 150; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                w: Math.random() * 10 + 5,
                h: Math.random() * 8 + 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 16,
                vy: (Math.random() - 0.7) * 18,
                rot: Math.random() * 360,
                vRot: (Math.random() - 0.5) * 10,
                gravity: 0.35,
                opacity: 1
            });
        }

        let animationFrame;
        const startTime = Date.now();

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += p.gravity;
                p.rot += p.vRot;
                p.opacity -= 0.008;

                if (p.opacity > 0) {
                    alive = true;
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rot * Math.PI) / 180);
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    ctx.restore();
                }
            });

            if (alive && Date.now() - startTime < 4000) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                cancelAnimationFrame(animationFrame);
            }
        }
        animate();
    }

    // Date Difference Tab Calculator
    function calculateDifference() {
        const startVal = elements.diffStartDate.value;
        const startTimeVal = elements.diffStartTime.value || '00:00';
        const endVal = elements.diffEndDate.value;
        const endTimeVal = elements.diffEndTime.value || '00:00';

        if (!startVal || !endVal) {
            showToast('Please select both start and end dates');
            return;
        }

        const startDate = new Date(`${startVal}T${startTimeVal}:00`);
        const endDate = new Date(`${endVal}T${endTimeVal}:00`);

        const diff = AgeEngine.calculateAge(startDate, endDate);
        elements.diffResultContainer.innerHTML = `
            <div class="diff-card">
                <h3>Duration Between Selected Dates</h3>
                <div class="diff-hero-grid">
                    <div class="diff-unit"><span class="number">${diff.years}</span><span class="label">Years</span></div>
                    <div class="diff-unit"><span class="number">${diff.months}</span><span class="label">Months</span></div>
                    <div class="diff-unit"><span class="number">${diff.days}</span><span class="label">Days</span></div>
                    <div class="diff-unit"><span class="number">${diff.hours}</span><span class="label">Hours</span></div>
                    <div class="diff-unit"><span class="number">${diff.minutes}</span><span class="label">Minutes</span></div>
                    <div class="diff-unit"><span class="number">${diff.seconds}</span><span class="label">Seconds</span></div>
                </div>
                <div class="diff-totals-list">
                    <p>Total Days: <strong>${diff.total.days.toLocaleString()}</strong></p>
                    <p>Total Weeks: <strong>${diff.total.weeks.toLocaleString()} weeks, ${diff.total.remainingDaysInWeek} days</strong></p>
                    <p>Total Hours: <strong>${diff.total.hours.toLocaleString()} hours</strong></p>
                    <p>Total Minutes: <strong>${diff.total.minutes.toLocaleString()} minutes</strong></p>
                    <p>Total Seconds: <strong>${diff.total.seconds.toLocaleString()} seconds</strong></p>
                </div>
            </div>
        `;
        playSound('chime');
    }

    // Age Comparison Tab Calculator
    function calculateComparison() {
        const nameA = elements.compNameA.value || 'Person A';
        const dateAVal = elements.compDateA.value;
        const nameB = elements.compNameB.value || 'Person B';
        const dateBVal = elements.compDateB.value;

        if (!dateAVal || !dateBVal) {
            showToast('Please provide birth dates for both individuals');
            return;
        }

        const dateA = new Date(`${dateAVal}T12:00:00`);
        const dateB = new Date(`${dateBVal}T12:00:00`);

        const comp = AgeEngine.compareAges({ name: nameA, birthDate: dateA }, { name: nameB, birthDate: dateB });

        elements.compResultContainer.innerHTML = `
            <div class="comp-card">
                <h3>Age Comparison Result</h3>
                <div class="comp-verdict">
                    ${comp.isEqual 
                        ? `<p class="verdict-banner">✨ Both individuals were born on the exact same date!</p>` 
                        : `<p class="verdict-banner">🏆 <strong>${comp.older}</strong> is older than <strong>${comp.younger}</strong> by <strong>${comp.gapYears} years, ${comp.gapMonths} months, and ${comp.gapDays} days</strong> (${comp.gapTotalDays.toLocaleString()} days difference)!</p>`
                    }
                </div>
                <div class="comp-columns">
                    <div class="comp-col">
                        <h4>${nameA}</h4>
                        <p class="comp-age">${comp.ageA.years} yrs, ${comp.ageA.months} mos, ${comp.ageA.days} days</p>
                        <p class="comp-days">Total Days: ${comp.ageA.total.days.toLocaleString()} days</p>
                        <p>Zodiac: ${AstrologyEngine.getWesternZodiac(dateA).name}</p>
                    </div>
                    <div class="comp-col">
                        <h4>${nameB}</h4>
                        <p class="comp-age">${comp.ageB.years} yrs, ${comp.ageB.months} mos, ${comp.ageB.days} days</p>
                        <p class="comp-days">Total Days: ${comp.ageB.total.days.toLocaleString()} days</p>
                        <p>Zodiac: ${AstrologyEngine.getWesternZodiac(dateB).name}</p>
                    </div>
                </div>
            </div>
        `;
        playSound('chime');
    }

    // Time Machine / Future Age Calculator
    function calculateTimeMachine() {
        const birthVal = elements.tmBirthDate.value;
        const targetVal = elements.tmTargetDate.value;

        if (!birthVal || !targetVal) {
            showToast('Please set both birth and future date');
            return;
        }

        const bDate = new Date(`${birthVal}T12:00:00`);
        const tDate = new Date(`${targetVal}T12:00:00`);

        const res = AgeEngine.calculateAge(bDate, tDate);
        const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][tDate.getDay()];

        elements.tmFutureResult.innerHTML = `
            <div class="future-result-card">
                <h4>Age on ${tDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} (${dayOfWeek}):</h4>
                <div class="future-age-hero">${res.years} Years, ${res.months} Months, ${res.days} Days</div>
                <p>On this day, you will have lived exactly <strong>${res.total.days.toLocaleString()} days</strong> (or <strong>${res.total.weeks.toLocaleString()} weeks</strong>).</p>
            </div>
        `;
        playSound('chime');
    }

    // Profile Management
    function loadProfiles() {
        state.profiles = ProfilesEngine.getProfiles();
        renderProfilesList();
    }

    function renderProfilesList() {
        if (!elements.profilesList) return;
        if (state.profiles.length === 0) {
            elements.profilesList.innerHTML = `<p class="empty-note">No profiles saved yet. Add your family and friends!</p>`;
            return;
        }

        elements.profilesList.innerHTML = state.profiles.map(p => `
            <div class="profile-card">
                <div class="profile-main">
                    <h4>${p.name}</h4>
                    <p class="profile-meta">🎂 ${p.date} ${p.time ? `at ${p.time}` : ''} ${p.note ? `• <em>${p.note}</em>` : ''}</p>
                </div>
                <div class="profile-actions">
                    <button class="btn btn-sm btn-primary load-profile-btn" data-id="${p.id}">Load</button>
                    <button class="btn btn-sm btn-outline-danger delete-profile-btn" data-id="${p.id}">Delete</button>
                </div>
            </div>
        `).join('');

        // Attach action listeners
        elements.profilesList.querySelectorAll('.load-profile-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const profile = state.profiles.find(x => x.id === id);
                if (profile) {
                    elements.userNameInput.value = profile.name;
                    elements.birthDateInput.value = profile.date;
                    if (profile.time) elements.birthTimeInput.value = profile.time;
                    switchTab('calculator');
                    calculateMainAge();
                    showToast(`Loaded profile for ${profile.name}`);
                }
            });
        });

        elements.profilesList.querySelectorAll('.delete-profile-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                state.profiles = ProfilesEngine.deleteProfile(id);
                renderProfilesList();
                showToast('Profile deleted');
            });
        });
    }

    function handleAddProfile() {
        const name = elements.newProfileName.value;
        const date = elements.newProfileDate.value;
        const time = elements.newProfileTime.value;
        const note = elements.newProfileNote.value;

        if (!name || !date) {
            showToast('Please enter both name and birthdate');
            return;
        }

        ProfilesEngine.addProfile(name, date, time, note);
        elements.newProfileName.value = '';
        elements.newProfileDate.value = '';
        elements.newProfileNote.value = '';
        loadProfiles();
        showToast(`Profile saved for ${name}!`);
    }

    // Modal Certificate Rendering
    function openCertificate() {
        if (!state.lastCalculatedBirth) {
            calculateMainAge();
        }

        const birthDate = state.lastCalculatedBirth;
        const name = state.userName || 'Distinguished Individual';
        const now = new Date();
        const age = AgeEngine.calculateAge(birthDate, now);
        const zodiac = AstrologyEngine.getWesternZodiac(birthDate);
        const gen = AstrologyEngine.getGeneration(birthDate);

        if (elements.certName) elements.certName.textContent = name;
        if (elements.certBirthDate) elements.certBirthDate.textContent = birthDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        if (elements.certExactAge) elements.certExactAge.textContent = `${age.years} Years, ${age.months} Months, ${age.days} Days`;
        if (elements.certTotalDays) elements.certTotalDays.textContent = `${age.total.days.toLocaleString()} Days (${age.total.seconds.toLocaleString()} Seconds)`;
        if (elements.certBornDay) elements.certBornDay.textContent = age.birthDayOfWeek;
        if (elements.certZodiac) elements.certZodiac.textContent = `${zodiac.symbol} ${zodiac.name} (${zodiac.element} Sign)`;
        if (elements.certGen) elements.certGen.textContent = `${gen.name} (${gen.era})`;
        if (elements.certDateIssued) elements.certDateIssued.textContent = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        if (elements.certificateModal) {
            elements.certificateModal.classList.add('show');
        }
        playSound('chime');
    }

    function closeCertificate() {
        if (elements.certificateModal) {
            elements.certificateModal.classList.remove('show');
        }
    }

    // Share Summary
    async function shareSummary() {
        if (!state.lastCalculatedBirth) return;
        const ageResult = AgeEngine.calculateAge(state.lastCalculatedBirth);
        const astrologyWestern = AstrologyEngine.getWesternZodiac(state.lastCalculatedBirth);
        const astrologyChinese = AstrologyEngine.getChineseZodiac(state.lastCalculatedBirth);
        const generation = AstrologyEngine.getGeneration(state.lastCalculatedBirth);
        const birthGems = AstrologyEngine.getBirthGemsAndFlowers(state.lastCalculatedBirth);
        const lifeStats = LifeStatsEngine.calculateStats(ageResult, state.lastCalculatedBirth);

        const summary = ExportEngine.generateSummaryText(state.userName, ageResult, {
            western: astrologyWestern,
            chinese: astrologyChinese,
            generation,
            birthGem: birthGems
        }, lifeStats);

        const ok = await ExportEngine.copyToClipboard(summary);
        if (ok) {
            showToast('📋 Detailed Life Summary copied to clipboard!');
            playSound('chime');
        } else {
            showToast('Unable to copy to clipboard.');
        }
    }

    // Parse URL Parameters (e.g. ?name=Alex&dob=1995-08-15)
    function parseUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const dob = params.get('dob') || params.get('birth');
        const name = params.get('name');

        if (dob) {
            elements.birthDateInput.value = dob;
            if (name) elements.userNameInput.value = name;
            setTimeout(() => {
                calculateMainAge();
            }, 300);
        }
    }

    // Event Listeners
    function attachEventListeners() {
        if (elements.themeToggleBtn) elements.themeToggleBtn.addEventListener('click', toggleTheme);
        if (elements.soundToggleBtn) elements.soundToggleBtn.addEventListener('click', toggleSound);

        if (elements.calculateBtn) elements.calculateBtn.addEventListener('click', () => calculateMainAge());
        if (elements.resetBtn) elements.resetBtn.addEventListener('click', () => {
            elements.birthDateInput.value = '';
            elements.userNameInput.value = '';
            if (elements.resultsSection) elements.resultsSection.style.display = 'none';
            if (elements.emptyStateSection) elements.emptyStateSection.style.display = 'block';
            playSound('click');
        });

        if (elements.todayPresetBtn) elements.todayPresetBtn.addEventListener('click', () => {
            const today = new Date();
            elements.targetDateInput.value = today.toISOString().split('T')[0];
            calculateMainAge();
        });

        if (elements.celebrateBtn) elements.celebrateBtn.addEventListener('click', () => {
            triggerConfetti();
            playSound('celebrate');
            showToast('🎉 Hip Hip Hooray! Celebrating your existence! 🎂');
        });

        if (elements.shareSummaryBtn) elements.shareSummaryBtn.addEventListener('click', shareSummary);
        if (elements.printCertBtn) elements.printCertBtn.addEventListener('click', openCertificate);
        if (elements.closeCertModalBtn) elements.closeCertModalBtn.addEventListener('click', closeCertificate);
        if (elements.certPrintBtn) elements.certPrintBtn.addEventListener('click', () => ExportEngine.printCertificate());

        if (elements.saveProfileBtn) elements.saveProfileBtn.addEventListener('click', () => {
            const name = elements.userNameInput.value || 'Me';
            const date = elements.birthDateInput.value;
            const time = elements.birthTimeInput.value;
            if (date) {
                ProfilesEngine.addProfile(name, date, time, 'Saved from calculator');
                loadProfiles();
                showToast(`Saved ${name}'s profile!`);
            }
        });

        // Tab calculations
        if (elements.diffCalcBtn) elements.diffCalcBtn.addEventListener('click', calculateDifference);
        if (elements.compCalcBtn) elements.compCalcBtn.addEventListener('click', calculateComparison);
        if (elements.tmFutureCalcBtn) elements.tmFutureCalcBtn.addEventListener('click', calculateTimeMachine);
        if (elements.addProfileBtn) elements.addProfileBtn.addEventListener('click', handleAddProfile);

        // Window click for modal backdrop closing
        window.addEventListener('click', (e) => {
            if (e.target === elements.certificateModal) {
                closeCertificate();
            }
        });
    }

    // Initialize Application
    initTheme();
    initTabs();
    initDefaultDates();
    attachEventListeners();
    loadProfiles();
    startLiveTicker();
    parseUrlParams();

    // Perform initial calculation if birthdate has preset value
    if (elements.birthDateInput && elements.birthDateInput.value) {
        calculateMainAge();
    }
});
