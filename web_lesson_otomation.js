// 1. CLASSES (Saat verisi eklendi)
class Kayit {
    constructor(ders, ogrenci, hoca, gun, saat) {
        this.id = Date.now(); 
        this.ders = ders;       
        this.ogrenci = ogrenci; 
        this.hoca = hoca;       
        this.gun = gun;         
        this.saat = saat; // YENİ
    }
}

// 2. DEĞİŞKENLER VE LOCALSTORAGE
let kayitlar = JSON.parse(localStorage.getItem("proDersProgrami")) || [];         
let sistemHazirMi = false; 

// Sabit Zaman Çizelgesi Verileri (Matris için)
const tumGunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
const tumSaatler = [
    "09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", 
    "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", 
    "15:00 - 16:00", "16:00 - 17:00"
];

// 5. ASYNC/AWAIT
const verileriGetir = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    sistemHazirMi = true;
    console.log("Matris sistemi aktif."); 
};
verileriGetir(); 

// KAYDET BUTONU - ÇAKIŞMA KONTROLÜ
document.getElementById("btnKaydet").addEventListener("click", () => {
    
    const d = document.getElementById("ders").value.trim();
    const o = document.getElementById("ogr").value.trim();
    const h = document.getElementById("hoca").value.trim();
    const g = document.getElementById("gun").value;
    const s = document.getElementById("saat").value; // Saati alıyoruz
    
    // 1. Kontrol: Boş alan var mı?
    if (d === "" || o === "" || h === "" || g === "" || s === "") {
        alert("SİSTEM UYARISI: Lütfen tüm alanları (saat dahil) eksiksiz doldurun!");
        return; // İşlemi durdur
    }

    // 2. Kontrol: ÇAKIŞMA VAR MI? (Array .some() metodu - JavaScript'in en güçlü arama metotlarından biri)
    const cakismaVarMi = kayitlar.some(kayit => kayit.gun === g && kayit.saat === s);
    
    if (cakismaVarMi) {
        alert(`SİSTEM UYARISI: ${g} günü saat ${s} arası zaten dolu! Lütfen başka bir saat seçin veya mevcut programı silin.`);
        return; // Kayıt yapmadan işlemi durdur
    }

    // Her şey uygunsa kaydet
    const yeniKayit = new Kayit(d, o, h, g, s);
    kayitlar = [...kayitlar, yeniKayit]; 
    
    localStorage.setItem("proDersProgrami", JSON.stringify(kayitlar));

    // Formu temizle
    document.getElementById("ders").value = ""; 
    document.getElementById("ogr").value = ""; 
    document.getElementById("hoca").value = ""; 
    document.getElementById("gun").value = ""; 
    document.getElementById("saat").value = ""; 

    alert("✅ Kayıt matrise başarıyla eklendi!");
    
    // Eğer tablo o an açıksa otomatik güncelle
    if(document.getElementById("ekran").style.display === "block") {
        matrisiCiz();
    }
});

// YENİ: MATRİS TABLOSU ÇİZME FONKSİYONU
const matrisiCiz = () => {
    const tabloGövdesi = document.getElementById("tabloGovdesi");
    document.getElementById("ekran").style.display = "block"; // Tablo alanını görünür yap

    // Tabloyu saat saat öreceğiz (Nested Loops / İç İçe Döngüler)
    const HTMLSatirlari = tumSaatler.map(saatDilimi => {
        
        // Önce saati yazan sol başlık hücresini oluşturuyoruz
        let satirHTML = `<tr><td><strong>${saatDilimi}</strong></td>`;

        // O saat dilimi için günleri sırayla dönüyoruz
        tumGunler.forEach(gunAdi => {
            // Bu gün ve bu saatte ders var mı bul (.find metodu)
            const oDers = kayitlar.find(k => k.gun === gunAdi && k.saat === saatDilimi);

            if (oDers) {
                // Eğer ders varsa: Hücreyi KIRMIZI boya, bilgileri yaz ve sil butonu koy
                satirHTML += `
                    <td class="dolu-kutu">
                        <b>${oDers.ders}</b>
                        ${oDers.ogrenci}<br>
                        ${oDers.hoca}<br>
                        <button class="btn-kucuk-sil" onclick="kayitSil(${oDers.id})">Sil</button>
                    </td>
                `;
            } else {
                // Eğer ders yoksa: Hücreyi BOŞ bırak
                satirHTML += `<td class="bos-kutu">- Boş -</td>`;
            }
        });

        satirHTML += `</tr>`;
        return satirHTML;

    }).join(""); // Üretilen tüm satırları birleştir

    tabloGövdesi.innerHTML = HTMLSatirlari;
};

document.getElementById("btnGoster").addEventListener("click", () => {
    matrisiCiz();
});

// SİLME FONKSİYONU (Silinen saat anında serbest kalır)
const kayitSil = (silinecekId) => {
    // Onay iste
    const onay = confirm("Bu dersi programdan silmek istediğinize emin misiniz? (Silindiğinde bu saat dilimi tekrar seçilebilir olacaktır)");
    
    if(onay) {
        kayitlar = kayitlar.filter(kayit => kayit.id !== silinecekId);
        localStorage.setItem("proDersProgrami", JSON.stringify(kayitlar));
        matrisiCiz(); // Takvimi anında güncelle
    }
};