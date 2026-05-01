class Kayit {
    constructor(ders, ogrenci, hoca, gun, saat) {
        this.id = Date.now(); 
        this.ders = ders;       
        this.ogrenci = ogrenci; 
        this.hoca = hoca;       
        this.gun = gun;         
        this.saat = saat; 
    }
}

let kayitlar = JSON.parse(localStorage.getItem("proDersProgrami")) || [];         
const tumGunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
const tumSaatler = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];

let pastaGrafik = null; // Grafiği hafızada tutacağımız değişken

// KAYDET BUTONU
document.getElementById("btnKaydet").addEventListener("click", () => {
    const d = document.getElementById("ders").value.trim();
    const o = document.getElementById("ogr").value.trim();
    const h = document.getElementById("hoca").value.trim();
    const g = document.getElementById("gun").value;
    const s = document.getElementById("saat").value;
    
    if (d === "" || o === "" || h === "" || g === "" || s === "") {
        alert("SİSTEM UYARISI: Lütfen tüm alanları (saat dahil) eksiksiz doldurun!");
        return; 
    }

    const cakismaVarMi = kayitlar.some(kayit => kayit.gun === g && kayit.saat === s);
    
    if (cakismaVarMi) {
        alert(`SİSTEM UYARISI: ${g} günü saat ${s} arası zaten dolu!`);
        return; 
    }

    const yeniKayit = new Kayit(d, o, h, g, s);
    kayitlar = [...kayitlar, yeniKayit]; 
    localStorage.setItem("proDersProgrami", JSON.stringify(kayitlar));

    document.getElementById("ders").value = ""; 
    document.getElementById("ogr").value = ""; 
    document.getElementById("hoca").value = ""; 
    document.getElementById("gun").value = ""; 
    document.getElementById("saat").value = ""; 

    alert("✅ Kayıt matrise başarıyla eklendi!");
    
    if(document.getElementById("ekran").style.display === "block") {
        matrisiCiz();
    }
});

// MATRİS VE GRAFİK ÇİZME
const matrisiCiz = () => {
    const tabloGövdesi = document.getElementById("tabloGovdesi");
    document.getElementById("ekran").style.display = "block"; 

    // Tabloyu Çiz
    const HTMLSatirlari = tumSaatler.map(saatDilimi => {
        let satirHTML = `<tr><td><strong>${saatDilimi}</strong></td>`;
        tumGunler.forEach(gunAdi => {
            const oDers = kayitlar.find(k => k.gun === gunAdi && k.saat === saatDilimi);
            if (oDers) {
                satirHTML += `
                    <td class="dolu-kutu">
                        <b>${oDers.ders}</b>${oDers.ogrenci}<br>${oDers.hoca}<br>
                        <button class="btn-kucuk-sil" onclick="kayitSil(${oDers.id})">Sil</button>
                    </td>`;
            } else {
                satirHTML += `<td class="bos-kutu">- Boş -</td>`;
            }
        });
        return satirHTML + `</tr>`;
    }).join(""); 
    tabloGövdesi.innerHTML = HTMLSatirlari;

    // --- PAST GRAFİĞİ (CHART.JS) ÇİZİMİ ---
    const gunIstatistik = { "Pazartesi":0, "Salı":0, "Çarşamba":0, "Perşembe":0, "Cuma":0, "Cumartesi":0, "Pazar":0 };
    kayitlar.forEach(k => gunIstatistik[k.gun]++); // Günleri say

    const ctx = document.getElementById('dersGrafigi');
    if(pastaGrafik) pastaGrafik.destroy(); // Eski grafiği sil ki üst üste binmesin

    // Yazı renkleri temaya uygun olsun
    const yaziRengi = document.body.classList.contains('light-mode') ? '#333' : '#fff';

    pastaGrafik = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(gunIstatistik),
            datasets: [{
                data: Object.values(gunIstatistik),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#E7E9ED'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: yaziRengi } }
            }
        }
    });
};

document.getElementById("btnGoster").addEventListener("click", matrisiCiz);

const kayitSil = (silinecekId) => {
    if(confirm("Bu dersi silmek istediğinize emin misiniz?")) {
        kayitlar = kayitlar.filter(kayit => kayit.id !== silinecekId);
        localStorage.setItem("proDersProgrami", JSON.stringify(kayitlar));
        matrisiCiz(); 
    }
};

// --- YENİ: PDF / RESİM İNDİRME ÖZELLİĞİ (html2canvas) ---
document.getElementById('btnIndir').addEventListener('click', () => {
    const ekranBolgesi = document.getElementById('ekran');
    const mevcutArkaplan = document.body.classList.contains('light-mode') ? '#ffffff' : '#121212';
    
    // Geçici olarak sil butonlarını gizle (resimde çıkmasın diye)
    const silButonlari = document.querySelectorAll('.btn-kucuk-sil');
    silButonlari.forEach(b => b.style.display = 'none');

    // Ekranın resmini çek
    html2canvas(ekranBolgesi, { backgroundColor: mevcutArkaplan }).then(canvas => {
        // İndirme linkini oluştur ve tıkla
        const link = document.createElement('a');
        link.download = 'ders-programim.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        // Sil butonlarını geri getir
        silButonlari.forEach(b => b.style.display = 'inline-block');
    });
});