// 1. CLASSES ve NESNELER
class Kayit {
    constructor(ders, ogrenci, hoca, gun) {
        this.id = Date.now(); // Her kayda benzersiz bir kimlik veriyoruz
        this.ders = ders;       
        this.ogrenci = ogrenci; 
        this.hoca = hoca;       
        this.gun = gun;         
    }
}


// 2. DEĞİŞKENLER, VERİ TİPLERİ ve ARRAYS
// Verileri tarayıcının hafızasından (LocalStorage) çekiyoruz
let kayitlar = JSON.parse(localStorage.getItem("dersProgrami")) || [];         
let sistemHazirMi = false; 

// 3. FONKSİYONLAR ve REST OPERATÖRÜ (...)
const topluKayitEkle = (...yeniGelenler) => {
    // 4. SPREAD OPERATÖRÜ (...)
    kayitlar = [...kayitlar, ...yeniGelenler];
    localStorage.setItem("dersProgrami", JSON.stringify(kayitlar)); 
};

// 5. ASYNC/AWAIT ve JSON (Demo verileri buradan sildik ama yapı duruyor)
const verileriGetir = async () => {
    // Sektörel standart: Sistem açılırken bir konfigürasyon kontrolü simülasyonu
    const sistemMesajiJSON = '{"durum": "hazir", "mesaj": "Sistem başarıyla başlatıldı"}';
    const kontrol = JSON.parse(sistemMesajiJSON); // JSON kullanımı
    
    // 1 saniyelik asenkron bekleme (Async/Await kullanımı)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    sistemHazirMi = true;
    console.log(kontrol.mesaj); // Konsola "Sistem başarıyla başlatıldı" yazar
};
verileriGetir(); 

// 6. EVENTS ve ARROW FUNCTIONS
document.getElementById("btnKaydet").addEventListener("click", () => {
    
    // 7. STRING METHODS (.trim)
    const d = document.getElementById("ders").value.trim();
    const o = document.getElementById("ogr").value.trim();
    const h = document.getElementById("hoca").value.trim();
    const g = document.getElementById("gun").value;
    
    // 8. İF/ELSE ve OPERATÖRLER
    if (d !== "" && o !== "" && h !== "" && g !== "") {
        const yeniKayit = new Kayit(d, o, h, g);
        kayitlar = [...kayitlar, yeniKayit]; 
        
        // Veriyi hafızaya (JSON formatında) kaydet
        localStorage.setItem("dersProgrami", JSON.stringify(kayitlar));

        // Formu temizle
        document.getElementById("ders").value = ""; 
        document.getElementById("ogr").value = ""; 
        document.getElementById("hoca").value = ""; 
        document.getElementById("gun").value = ""; 

        alert("Kayıt başarıyla eklendi!");
    } else {
        alert("Lütfen tüm alanları doldurun!");
    }
});

// Tabloyu Çizme Fonksiyonu
const tabloyuCiz = () => {
    const tabloGövdesi = document.getElementById("tabloGovdesi");
    const kayitMetni = document.getElementById("toplamKayitMetni");

    if (kayitlar.length === 0) {
        tabloGövdesi.innerHTML = "";
        kayitMetni.innerText = "Haftalık Ders Programı (Henüz kayıt yok)";
        return; 
    }

    // 9. DÖNGÜLER (Klasik For)
    let toplamDers = 0; 
    for (let i = 0; i < kayitlar.length; i++) {
        toplamDers++; 
    }

    // 10. ARRAY METHODS (.map)
    const tabloSatirlari = kayitlar.map(kayitNesnesi => {
        
        // 11. DESTRUCTURING
        const { id, ders, ogrenci, hoca, gun } = kayitNesnesi;
        
        // 12. TEMPLATE LITERALS
        return `
            <tr>
                <td>${gun}</td>
                <td>${ders}</td>
                <td>${ogrenci}</td>
                <td>${hoca}</td>
                <td style="text-align: center;">
                    <button class="btn-sil" onclick="kayitSil(${id})">Sil</button>
                </td>
            </tr>
        `;
    }).join(""); 

    tabloGövdesi.innerHTML = tabloSatirlari;
    kayitMetni.innerText = `Haftalık Ders Programı (Toplam ${toplamDers} Kayıt):`;
};

document.getElementById("btnGoster").addEventListener("click", () => {
    tabloyuCiz();
});

// SİLME FONKSİYONU (.filter metodu)
const kayitSil = (silinecekId) => {
    // Listeden o ID'li kaydı çıkar
    kayitlar = kayitlar.filter(kayit => kayit.id !== silinecekId);
    // Hafızayı güncelle
    localStorage.setItem("dersProgrami", JSON.stringify(kayitlar));
    // Tabloyu tazele
    tabloyuCiz();
};