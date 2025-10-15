    // script.js - Enhanced with Elegant Transitions & Music Control

    // === Theme Toggle ===
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('theme-dark', savedTheme === 'dark');
    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
    body.classList.toggle('theme-dark');
    const isDark = body.classList.contains('theme-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    });

    // === Countdown Timer ===
    const weddingDate = new Date('2025-11-20T00:00:00').getTime();

    function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<p style="font-size:1.4rem;color:var(--accent-gold);">🎉 Hari Bahagia Telah Tiba!</p>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // === YouTube Player Control ===
    let playerReady = false;
    let userHasInteracted = false;

    // === Buka Undangan + Main Musik ===
    document.getElementById('openInvitation').addEventListener('click', () => {
    userHasInteracted = true;

    // Fade out cover
    const cover = document.getElementById('cover');
    cover.style.opacity = '0';
    cover.style.transform = 'scale(0.97)';
    
    setTimeout(() => {
        cover.classList.add('hidden');
        const mainContent = document.getElementById('mainContent');
        mainContent.classList.remove('hidden');
        
        // Coba mainkan musik
        playMusic();
        
        // Refresh AOS setelah konten muncul
        if (typeof AOS !== 'undefined') AOS.refresh();
    }, 600);
    });

    // === Musik Latar ===
    const musicIcon = document.getElementById('musicIcon');
    let isPlaying = false;

    function playMusic() {
    const player = document.getElementById('ytPlayer');
    if (!player) return;

    // Ganti src ke versi unmuted (harus setelah interaksi user)
    player.src = "https://www.youtube.com/embed/JmIUdR_fob0?autoplay=1&loop=1&playlist=JmIUdR_fob0&controls=0&mute=0";
    isPlaying = true;
    musicIcon.textContent = '🔊';
    }

    function pauseMusic() {
    const player = document.getElementById('ytPlayer');
    if (player) {
        player.src = "about:blank"; // Hentikan sementara
    }
    isPlaying = false;
    musicIcon.textContent = '🔈';
    }

    // Toggle musik manual
    document.getElementById('musicControl').addEventListener('click', () => {
    if (!userHasInteracted) {
        alert('Silakan buka undangan terlebih dahulu untuk mengaktifkan musik.');
        return;
    }

    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
    });

    // === Galeri Otomatis ===
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;

    function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    }

    function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    }

    let slideInterval = setInterval(nextSlide, 4500);

    dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        showSlide(parseInt(dot.dataset.index));
        slideInterval = setInterval(nextSlide, 4500);
    });
    });