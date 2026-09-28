/**
 * AURA INVITATIONS - BILINGUAL PURE WHITE & GOLD WEDDING EDITION
 * Arabic & English Dynamic Switcher
 */

const weddingData = {
    targetDate: "October 3, 2026 21:00:00",
    firebaseDbUrl: "https://wedding-apps-cc913-default-rtdb.firebaseio.com"
};

// قاموس الترجمة بين العربي والإنجليزي
const translations = {
    ar: {
        docTitle: "أحمد & نورهان | حفل الزفاف",
        langBtn: "EN",
        musicText: "الموسيقى",
        envTag: "دعوة حفل زفاف",
        envNames: "أحمد & نورهان",
        envSub: "نتشرف بحضوركم لمشاركتنا فرحتنا",
        sealMonogram: "أ&ن",
        openingTagline: "أنتم مدعوون بكل مودة لمشاركتنا حفل زفافنا",
        openingTitleNames: "أحمد & نورهان",
        btnOpen: "افتح الدعوة",
        heroSubtitle: "بمشاركة عائلتينا، نتشرف بدعوتكم لحضور حفل زفافنا",
        groom: "أحمد",
        bride: "نورهان",
        heroDate: "السبت ٣ أكتوبر ٢٠٢٦",
        btnDetails: "تفاصيل المكان والموعد",
        scrollText: "اسحب للأسفل",
        cdTag: "نحو اليوم الموعود",
        cdTitle: "العد التنازلي لحفل الزفاف",
        lblDays: "يوم",
        lblHours: "ساعة",
        lblMinutes: "دقيقة",
        lblSeconds: "ثانية",
        cdFinished: "بدأ حفل الزفاف المبارك",
        venueTag: "المكان والموعد",
        venueTitle: "موقع حفل الزفاف",
        venueName: "قاعة حفل الزفاف",
        venueHall: "قاعة الاحتفال الكبرى",
        venueTime: "السبت ٣-١٠-٢٠٢٦ • من ٩:٠٠ مساءً حتى ١٢:٠٠ منتصف الليل",
        btnMap: "موقع القاعة على الخريطة",
        wishesTag: "أطيب الأمنيات",
        wishesTitle: "سجل المباركات والتهاني",
        inputNamePlaceholder: "اسمك الكريم",
        inputMsgPlaceholder: "اكتب تهنئة أو دعوة طيبة لأحمد ونورهان...",
        btnSendWish: "إرسال التهنئة",
        btnSending: "جاري الإرسال...",
        loadingWishes: "جاري تحميل المباركات...",
        emptyWishesAuthor: "أحمد ونورهان",
        emptyWishesMsg: "كن أول من يشاركنا دعواته وأمنياته الطيبة!",
        emptyWishesDate: "يوم الزفاف",
        footerNames: "أحمد & نورهان",
        footerMsg: "بقلوب يملؤها الفرح والمحبة، نتشرف بدعوتكم لمشاركتنا فرحة يوم زفافنا.<br>حضوركم يكتمل به سرورنا ونحن نخطو أولى خطوات حياتنا معاً 🤍",
        footerDate: "السبت ٣ أكتوبر ٢٠٢٦ • ٩:٠٠ م – ١٢:٠٠ ص"
    },
    en: {
        docTitle: "Ahmed & Nourhan | The Wedding Celebration",
        langBtn: "عربي",
        musicText: "MUSIC",
        envTag: "WEDDING INVITATION",
        envNames: "Ahmed & Nourhan",
        envSub: "The Honor of Your Presence is Requested",
        sealMonogram: "A&N",
        openingTagline: "YOU ARE CORDIALLY INVITED TO CELEBRATE OUR WEDDING",
        openingTitleNames: "Ahmed & Nourhan",
        btnOpen: "OPEN INVITATION",
        heroSubtitle: "Together with our families, we invite you to celebrate our wedding",
        groom: "Ahmed",
        bride: "Nourhan",
        heroDate: "Saturday, October 3, 2026",
        btnDetails: "VENUE & TIME DETAILS",
        scrollText: "SCROLL TO EXPLORE",
        cdTag: "COUNTING DOWN",
        cdTitle: "The Wedding Countdown",
        lblDays: "DAYS",
        lblHours: "HOURS",
        lblMinutes: "MINUTES",
        lblSeconds: "SECONDS",
        cdFinished: "THE CELEBRATION HAS BEGUN",
        venueTag: "VENUE & TIME",
        venueTitle: "Wedding Venue & Details",
        venueName: "Wedding Celebration Hall",
        venueHall: "Grand Celebration Ballroom",
        venueTime: "Saturday 3/10/2026 • From 9:00 PM to 12:00 AM",
        btnMap: "THE LOCATION ON MAP",
        wishesTag: "WARM BLESSINGS",
        wishesTitle: "Send Your Wishes",
        inputNamePlaceholder: "Your Name",
        inputMsgPlaceholder: "Leave a heartfelt blessing for Ahmed & Nourhan...",
        btnSendWish: "SEND BLESSING",
        btnSending: "SENDING...",
        loadingWishes: "Loading blessings...",
        emptyWishesAuthor: "Ahmed & Nourhan",
        emptyWishesMsg: "Be the first to share your warm wishes and blessings with us!",
        emptyWishesDate: "Wedding Day",
        footerNames: "Ahmed & Nourhan",
        footerMsg: "With hearts full of joy and love, we warmly invite you to celebrate our wedding day.<br>Your presence will make our celebration complete as we step into our new life together 🤍",
        footerDate: "Saturday, October 3, 2026 • 9:00 PM – 12:00 AM"
    }
};

let currentLang = 'ar';

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initOpeningAnimation();
    initAudioSystem();
    initCountdown();
    initScrollAnimations();
    initLanguageSwitcher();
    initWishesSystem();
});

// 1. DYNAMIC GOLD PARTICLES CANVAS
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 0.8,
            speedY: Math.random() * 0.4 + 0.15,
            speedX: (Math.random() - 0.5) * 0.25,
            opacity: Math.random() * 0.6 + 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = '#C59D42';

        particles.forEach(p => {
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();

            p.y -= p.speedY;
            p.x += p.speedX;

            if (p.y < -10) {
                p.y = height + 10;
                p.x = Math.random() * width;
            }
        });

        requestAnimationFrame(animate);
    }
    animate();
}

// 2. OPENING ENVELOPE
function initOpeningAnimation() {
    const btnOpen = document.getElementById('btnOpenInvitation');
    const envelope = document.getElementById('envelope');
    const waxSeal = document.getElementById('waxSeal');
    const openingScreen = document.getElementById('opening');
    const mainContent = document.getElementById('mainContent');

    const triggerOpen = () => {
        envelope.classList.add('open');
        setTimeout(() => {
            openingScreen.style.opacity = '0';
            openingScreen.style.transform = 'scale(1.05)';
            mainContent.classList.remove('hidden');
            setTimeout(() => {
                openingScreen.style.display = 'none';
                triggerHeroTextAnimations();
            }, 1000);
        }, 1200);

        playAudio();
    };

    btnOpen.addEventListener('click', triggerOpen);
    waxSeal.addEventListener('click', triggerOpen);
}

// 3. AUDIO PLAYER
let isPlaying = false;
function initAudioSystem() {
    const audio = document.getElementById('weddingAudio');
    const btnMusic = document.getElementById('btnMusicToggle');

    btnMusic.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            btnMusic.classList.add('paused');
            isPlaying = false;
        } else {
            playAudio();
        }
    });
}

function playAudio() {
    const audio = document.getElementById('weddingAudio');
    const btnMusic = document.getElementById('btnMusicToggle');
    audio.play().then(() => {
        isPlaying = true;
        btnMusic.classList.remove('paused');
    }).catch(err => console.log("Audio playback deferred:", err));
}

// 4. COUNTDOWN TIMER
function initCountdown() {
    const target = new Date(weddingData.targetDate).getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            document.getElementById('cdDays').textContent = String(days).padStart(2, '0');
            document.getElementById('cdHours').textContent = String(hours).padStart(2, '0');
            document.getElementById('cdMinutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('cdSeconds').textContent = String(seconds).padStart(2, '0');
        } else {
            document.getElementById('countdownTimer').innerHTML = `<p class="section-title">${translations[currentLang].cdFinished}</p>`;
        }
    };

    updateTimer();
    setInterval(updateTimer, 1000);
}

// 5. SCROLL REVEAL ANIMATIONS
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));
}

function triggerHeroTextAnimations() {
    document.querySelectorAll('#hero .reveal-text').forEach((el, index) => {
        setTimeout(() => el.classList.add('visible'), index * 200);
    });
}

// 6. LANGUAGE SWITCHER SYSTEM (عربي / English)
function initLanguageSwitcher() {
    const btnLang = document.getElementById('btnLangToggle');
    btnLang.addEventListener('click', () => {
        currentLang = currentLang === 'ar' ? 'en' : 'ar';
        applyLanguage(currentLang);
    });
}

function applyLanguage(lang) {
    const t = translations[lang];
    const htmlEl = document.documentElement;

    htmlEl.setAttribute('lang', lang);
    htmlEl.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.title = t.docTitle;

    // زر التبديل والموسيقى
    document.getElementById('langLabel').textContent = t.langBtn;
    document.getElementById('musicText').textContent = t.musicText;

    // الأسماء والظرف
    document.getElementById('envNames').textContent = t.envNames;
    document.getElementById('sealMonogram').textContent = t.sealMonogram;
    document.getElementById('openingTitleNames').textContent = t.openingTitleNames;
    document.getElementById('groomName').textContent = t.groom;
    document.getElementById('brideName').textContent = t.bride;
    document.getElementById('footerMonogram').textContent = t.footerNames;

    // placeholders
    document.getElementById('wishName').placeholder = t.inputNamePlaceholder;
    document.getElementById('wishMessage').placeholder = t.inputMsgPlaceholder;

    // باقي النصوص المعلمة بـ data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.innerHTML = t[key];
        }
    });

    // إعادة تحميل قائمة المباركات لتحديث النصوص الثابتة
    if (typeof window.reloadWishes === 'function') {
        window.reloadWishes();
    }
}

// 7. FIREBASE WISHES SYSTEM (بالوقت والثانية ومسار مستقل)
function initWishesSystem() {
    const form = document.getElementById('wishesForm');
    const list = document.getElementById('wishesList');
    const submitBtn = document.getElementById('wishSubmitBtn');

    const endpoint = `${weddingData.firebaseDbUrl}/wishes_ahmed_nourhan.json`;

    const renderWishes = async () => {
        const t = translations[currentLang];
        list.innerHTML = `<p style="text-align:center; color: var(--color-gold); font-size: 0.85rem;">${t.loadingWishes}</p>`;

        try {
            const res = await fetch(endpoint);
            
            if (res.status === 401 || res.status === 403) {
                list.innerHTML = `<p style="text-align:center; color: var(--color-gold-dark); font-size: 0.85rem;">يرجى التحقق من قواعد Firebase (Rules -> Publish).</p>`;
                return;
            }

            const data = await res.json();

            if (!data || Object.keys(data).length === 0) {
                list.innerHTML = `
                    <div class="wish-note">
                        <div class="wish-author">${t.emptyWishesAuthor}</div>
                        <div class="wish-message">"${t.emptyWishesMsg}"</div>
                        <div class="wish-date"><i class="fa-regular fa-clock"></i> ${t.emptyWishesDate}</div>
                    </div>`;
                return;
            }

            const wishesArray = Object.values(data)
                .filter(item => item && (item.name || item.message))
                .reverse();

            if (wishesArray.length === 0) {
                list.innerHTML = `
                    <div class="wish-note">
                        <div class="wish-author">${t.emptyWishesAuthor}</div>
                        <div class="wish-message">"${t.emptyWishesMsg}"</div>
                        <div class="wish-date"><i class="fa-regular fa-clock"></i> ${t.emptyWishesDate}</div>
                    </div>`;
                return;
            }

            list.innerHTML = wishesArray.map(item => `
                <div class="wish-note">
                    <div class="wish-author">${escapeHtml(item.name || "Guest")}</div>
                    <div class="wish-message">"${escapeHtml(item.message || "")}"</div>
                    <div class="wish-date"><i class="fa-regular fa-clock"></i> ${escapeHtml(item.fullDateTime || item.date || "Just now")}</div>
                </div>
            `).join('');

        } catch (err) {
            console.error("Firebase fetch error:", err);
            list.innerHTML = `<p style="text-align:center; color: var(--color-text-muted); font-size: 0.85rem;">Could not connect to database.</p>`;
        }
    };

    window.reloadWishes = renderWishes;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('wishName').value.trim();
        const message = document.getElementById('wishMessage').value.trim();

        if (!name || !message) return;

        const t = translations[currentLang];
        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = t.btnSending;

        const now = new Date();
        const formattedDateTime = now.toLocaleString(currentLang === 'ar' ? 'ar-EG' : 'en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const newWish = {
            name: name,
            message: message,
            fullDateTime: formattedDateTime,
            timestamp: now.toISOString()
        };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newWish)
            });

            if (!res.ok) throw new Error("Permission denied or database error");

            form.reset();
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = t.btnSendWish;
            renderWishes();
        } catch (err) {
            console.error("Firebase save error:", err);
            alert("Could not post blessing. Check Firebase rules.");
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = t.btnSendWish;
        }
    });

    renderWishes();
}

function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}