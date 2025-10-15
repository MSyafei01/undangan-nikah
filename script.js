    // script.js

    // === 1. Toggle Mode Malam/Siang ===
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Cek preferensi sebelumnya
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.classList.toggle('theme-dark', savedTheme === 'dark');

    themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

    themeToggle.addEventListener('click', () => {
    body.classList.toggle('theme-dark');
    const isDark = body.classList.contains('theme-dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    });

    // === 2. Countdown Timer ===
    const weddingDate = new Date('2025-11-20T00:00:00').getTime();

    function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff <= 0) {
        document.getElementById('countdown').innerHTML = '<p>🎉 Hari Bahagia Telah Tiba!</p>';
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

    // === 3. Buka Undangan ===
    document.getElementById('openInvitation').addEventListener('click', () => {
    document.getElementById('cover').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    });

    // === 4. Musik Latar (Toggle Play/Pause) ===
    const player = document.getElementById('ytPlayer');
    const musicIcon = document.getElementById('musicIcon');
    let isMuted = true;

    document.getElementById('musicControl').addEventListener('click', () => {
    if (isMuted) {
        player.src += "&mute=0"; // Tidak bisa unmute via JS karena kebijakan browser
        musicIcon.textContent = '🔊';
        alert('Musik diputar! (Pastikan suara tidak dimatikan di perangkat Anda)');
    } else {
        player.src = player.src.replace("&mute=0", "&mute=1");
        musicIcon.textContent = '🔈';
    }
    isMuted = !isMuted;
    });

    // === Galeri Foto Otomatis ===
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

    function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    }

    function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
    }

    // Auto slide setiap 4 detik
    let slideInterval = setInterval(nextSlide, 4000);

    // Klik dot
    dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // hentikan auto jika manual
        showSlide(parseInt(dot.dataset.index));
        slideInterval = setInterval(nextSlide, 4000); // mulai lagi
    });
    });