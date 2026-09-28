/**
 * AURA INVITATIONS - PURE WHITE & GOLD WEDDING EDITION
 * Connected to Firebase Realtime Database (/wishes_ahmed_nourhan.json)
 */

const weddingData = {
    groom: "Ahmed",
    bride: "Nourhan",
    targetDate: "October 3, 2026 21:00:00",
    firebaseDbUrl: "https://wedding-apps-cc913-default-rtdb.firebaseio.com"
};

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initOpeningAnimation();
    initAudioSystem();
    initCountdown();
    initScrollAnimations();
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

// 4. COUNTDOWN TIMER (3/10/2026 at 9:00 PM)
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
            document.getElementById('countdownTimer').innerHTML = `<p class="section-title">THE CELEBRATION HAS BEGUN</p>`;
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

// 6. FIREBASE WISHES SYSTEM (مسار نظيف ومنفصل لفرح أحمد ونورهان)
function initWishesSystem() {
    const form = document.getElementById('wishesForm');
    const list = document.getElementById('wishesList');
    const submitBtn = document.getElementById('wishSubmitBtn');

    // مسار مخصص جديد لتجنب ظهور أي داتا قديمة نهائياً
    const endpoint = `${weddingData.firebaseDbUrl}/wishes_ahmed_nourhan.json`;

    const renderWishes = async () => {
        list.innerHTML = `<p style="text-align:center; color: var(--color-gold); font-size: 0.85rem;">Loading blessings...</p>`;

        try {
            const res = await fetch(endpoint);
            
            if (res.status === 401 || res.status === 403) {
                list.innerHTML = `<p style="text-align:center; color: var(--color-gold-dark); font-size: 0.85rem;">يرجى تفعيل صلاحيات القراءة في Firebase (Rules -> Publish).</p>`;
                return;
            }

            const data = await res.json();

            // في حالة كانت قاعدة البيانات فارغة وجديدة
            if (!data || Object.keys(data).length === 0) {
                list.innerHTML = `
                    <div class="wish-note">
                        <div class="wish-author">Ahmed &amp; Nourhan</div>
                        <div class="wish-message">"Be the first to share your warm wishes and blessings with us!"</div>
                        <div class="wish-date"><i class="fa-regular fa-clock"></i> Wedding Day</div>
                    </div>`;
                return;
            }

            // استخراج وتصفية الرسائل الصالحة فقط وترتيبها من الأحدث للأقدم
            const wishesArray = Object.values(data)
                .filter(item => item && (item.name || item.message))
                .reverse();

            if (wishesArray.length === 0) {
                list.innerHTML = `
                    <div class="wish-note">
                        <div class="wish-author">Ahmed &amp; Nourhan</div>
                        <div class="wish-message">"Be the first to share your warm wishes and blessings with us!"</div>
                        <div class="wish-date"><i class="fa-regular fa-clock"></i> Wedding Day</div>
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

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('wishName').value.trim();
        const message = document.getElementById('wishMessage').value.trim();

        if (!name || !message) return;

        submitBtn.disabled = true;
        submitBtn.querySelector('.btn-text').textContent = "SENDING...";

        // التاريخ والوقت بالثانية
        const now = new Date();
        const formattedDateTime = now.toLocaleString('en-US', {
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
            submitBtn.querySelector('.btn-text').textContent = "SEND BLESSING";
            renderWishes();
        } catch (err) {
            console.error("Firebase save error:", err);
            alert("Could not post blessing. Make sure Firebase Rules are published as true.");
            submitBtn.disabled = false;
            submitBtn.querySelector('.btn-text').textContent = "SEND BLESSING";
        }
    });

    renderWishes();
}

function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}