/* ============================================================
   Cover + Countdown + Music Player
============================================================ */
(function () {
  'use strict';

  /* ============================================================
     1) Cover — فتح الدعوة
  ============================================================ */
  const cover       = document.getElementById('cover');
  const openBtn     = document.getElementById('openBtn');
  const mainContent = document.getElementById('mainContent');

  function openInvitation() {
    if (!cover) return;

    // شيل زر Open عشان ميتداسش تاني
    if (openBtn) openBtn.disabled = true;

    // ابدأ أنيميشن الفتح
    cover.classList.add('opening');

    // شغّل الأغنية (هيبدأ يشتغل بسبب التفاعل من المستخدم)
    playMusic();

    // بعد ما الأنيميشن يخلص، اخفي الكوفر واظهر المحتوى
    setTimeout(function () {
      cover.classList.add('hidden');
      if (mainContent) {
        mainContent.classList.add('visible');
        mainContent.setAttribute('aria-hidden', 'false');
      }
      // اسمح للسكرول
      document.body.style.overflow = 'auto';
    }, 1400);
  }

  // امنع السكرول في شاشة الكوفر
  document.body.style.overflow = 'hidden';

  if (openBtn) {
    openBtn.addEventListener('click', openInvitation);
  }

  /* ============================================================
     2) Countdown Timer
  ============================================================ */
  const weddingDate = new Date('2026-09-25T10:00:00').getTime();

  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      daysEl.textContent    = '00';
      hoursEl.textContent   = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days    = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent    = String(days).padStart(2, '0');
    hoursEl.textContent   = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ============================================================
     3) Music Player
  ============================================================ */
  const musicBtn = document.getElementById('musicBtn');
  const music    = document.getElementById('weddingMusic');

  let isPlaying = false;

  function playMusic() {
    if (!music) return;

    music.play().then(function () {
      if (musicBtn) musicBtn.classList.add('playing');
      isPlaying = true;
      console.log('🎵 Music started');
    }).catch(function (err) {
      console.warn('⚠️ Autoplay blocked:', err);
    });
  }

  if (musicBtn && music) {
    // زر الموسيقى (تشغيل/إيقاف يدوي)
    musicBtn.addEventListener('click', function (e) {
      e.stopPropagation();

      if (isPlaying) {
        music.pause();
        musicBtn.classList.remove('playing');
        isPlaying = false;
      } else {
        playMusic();
      }
    });
  }

  console.log('✅ Cover + Countdown + Music ready');
})();