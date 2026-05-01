// ui.js - Tema ve Menü Kontrolleri
const temaUygula = () => {
    const aktifTema = localStorage.getItem('siteTemasi');
    const temaIkon = document.getElementById('temaIkon');
    
    if (aktifTema === 'light') {
        document.body.classList.add('light-mode');
        if(temaIkon) temaIkon.innerText = '🌙';
    } else {
        document.body.classList.remove('light-mode');
        if(temaIkon) temaIkon.innerText = '☀️';
    }
};

const temaDegistir = () => {
    const isLight = document.body.classList.toggle('light-mode');
    const temaIkon = document.getElementById('temaIkon');
    
    if (isLight) {
        localStorage.setItem('siteTemasi', 'light');
        temaIkon.innerText = '🌙';
    } else {
        localStorage.setItem('siteTemasi', 'dark');
        temaIkon.innerText = '☀️';
    }
};

const menuAcKapa = () => {
    document.getElementById('navLinkler').classList.toggle('aktif');
};

// Her sayfa yüklendiğinde temayı kontrol et
window.addEventListener('DOMContentLoaded', temaUygula);