// src/App.jsx
import React, { useState } from 'react';
import './index.css';

import SiteNavbar from './components/SiteNavbar';
import PageContainer from './components/PageContainer';
import AutomationHomePageContent from './components/AutomationHomePageContent';
import AboutPageContent from './components/AboutPageContent';
import GoalsPageContent from './components/GoalsPageContent';
import ContactPageContent from './components/ContactPageContent';
import SectionHeader from './components/SectionHeader';
import SiteFormInput from './components/SiteFormInput';
import SiteFormButton from './components/SiteFormButton';
import SiteFormSelect from './components/SiteFormSelect';

function App() {
  const [aktifSayfa, setAktifSayfa] = useState('anasayfa');
  
  // FORM HAFIZALARI VE LİSTELER
  const [ders, setDers] = useState('');
  const [ogrenci, setOgrenci] = useState('');
  const [hoca, setHoca] = useState('');
  const [gun, setGun] = useState('');
  const [saat, setSaat] = useState('');
  
  const [kayitlar, setKayitlar] = useState([]);
  const [programGoster, setProgramGoster] = useState(false); // Tabloyu aç/kapat hafızası

  const tumGunler = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];
  const tumSaatler = ["09:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00", "15:00 - 16:00", "16:00 - 17:00"];

  const navLinksList = [
    { id: 'anasayfa', name: "🏠 Ana Sayfa", path: "#" },
    { id: 'hakkinda', name: "👩‍💻 Hakkımda", path: "#" },
    { id: 'hedefler', name: "🚀 Hedeflerim", path: "#" },
    { id: 'iletisim', name: "✉️ İletişim", path: "#" }
  ];

  // KAYDETME FONKSİYONU
  const kaydetIislemi = () => {
    if (!ders || !ogrenci || !hoca || !gun || !saat) {
      alert("Lütfen tüm alanları eksiksiz doldurun!");
      return;
    }
    const cakisma = kayitlar.find(k => k.gun === gun && k.saat === saat);
    if (cakisma) {
      alert(`Uyarı: ${gun} günü ${saat} saatleri arası zaten dolu!`);
      return;
    }
    setKayitlar([...kayitlar, { id: Date.now(), ders, ogrenci, hoca, gun, saat }]);
    setDers(''); setOgrenci(''); setHoca(''); setGun(''); setSaat('');
    alert("Kayıt başarıyla eklendi!");
  };

  const kayitSil = (id) => {
    if(window.confirm("Silmek istediğinize emin misiniz?")) {
      setKayitlar(kayitlar.filter(k => k.id !== id));
    }
  };

  return (
    <PageContainer>
        <SiteNavbar systemTitle="" links={navLinksList} themeEmoji="☀️" onLinkClick={setAktifSayfa} />
        
        {/* --- SAYFA 1: ANA SAYFA --- */}
        {aktifSayfa === 'anasayfa' && (
            <>
              <AutomationHomePageContent 
                  hintText="Lütfen tüm girdileri eksiksiz doldurunuz!" 
                  colorfulLogo="📚"
                  mainTitle="Ders Ekleme Otomasyonu"
              >
                  <div className="form-inputs">
                      {/* Fonksiyonları ve değerleri proplar ile gönderiyoruz */}
                      <SiteFormInput placeholder="Ders Adı" value={ders} onChange={e => setDers(e.target.value)} />
                      <SiteFormInput placeholder="Öğrenci Adı" value={ogrenci} onChange={e => setOgrenci(e.target.value)} />
                      <SiteFormInput placeholder="Öğretmen Adı" value={hoca} onChange={e => setHoca(e.target.value)} />
                      
                      {/* Listeleri proplar ile gönderiyoruz */}
                      <SiteFormSelect defaultText="Gün Seçiniz" options={tumGunler} value={gun} onChange={e => setGun(e.target.value)} />
                      <SiteFormSelect defaultText="Saat Seçiniz" options={tumSaatler} value={saat} onChange={e => setSaat(e.target.value)} />
                  </div>
                  <div className="btn-group">
                      <SiteFormButton label="💾 Kaydet" onClick={kaydetIislemi} />
                      <SiteFormButton label="📅 Programı Göster" className="btn-secondary" onClick={() => setProgramGoster(!programGoster)} />
                  </div>
              </AutomationHomePageContent>

              {/* PROGRAMI GÖSTER BUTONUNA BASILINCA AÇILAN TABLO */}
              {programGoster && (
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '8px', overflowX: 'auto' }}>
                  <h3 style={{ textAlign: 'center', color: '#4facfe', marginBottom: '20px' }}>Haftalık Ders Programı</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '10px', border: '1px solid #444', backgroundColor: '#222' }}>Saat / Gün</th>
                        {tumGunler.map(g => <th key={g} style={{ padding: '10px', border: '1px solid #444', backgroundColor: '#222' }}>{g}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {tumSaatler.map(s => (
                        <tr key={s}>
                          <td style={{ padding: '10px', border: '1px solid #444', fontWeight: 'bold', backgroundColor: '#222' }}>{s}</td>
                          {tumGunler.map(g => {
                            const oDers = kayitlar.find(k => k.gun === g && k.saat === s);
                            return (
                              <td key={g} style={{ padding: '10px', border: '1px solid #444', backgroundColor: oDers ? 'rgba(220, 53, 69, 0.8)' : 'transparent' }}>
                                {oDers ? (
                                  <>
                                    <b style={{color: 'white'}}>{oDers.ders}</b><br/>
                                    <span style={{fontSize: '0.9em', color: '#ddd'}}>{oDers.ogrenci} - {oDers.hoca}</span><br/>
                                    <button onClick={() => kayitSil(oDers.id)} style={{ marginTop: '5px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', padding: '2px 5px', fontSize: '0.8em' }}>Sil</button>
                                  </>
                                ) : <span style={{ color: 'gray', fontStyle: 'italic' }}>- Boş -</span>}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
        )}

        {/* --- DİĞER SAYFALAR (Aynı kalıyor) --- */}
        {aktifSayfa === 'hakkinda' && (
            <AboutPageContent profileTitle="Kutay Ege Binacı" profileSubtitle="Yazılım Mühendisliği Öğrencisi">
                <SectionHeader emoji="🎓" title="Eğitim Bilgileri" description="Antalya Belek Üniversitesi - 1. Sınıf (%50 Burslu)" />
                <SectionHeader emoji="🛠️" title="Teknik Yetkinlikler" description="JavaScript, HTML5, CSS3, Python" />
                <SectionHeader emoji="💡" title="İlgi Alanları" description="Web otomasyon sistemleri ve oyun geliştirme üzerinde kendimi geliştirmekteyim." />
            </AboutPageContent>
        )}

        {aktifSayfa === 'hedefler' && (
            <GoalsPageContent goalsTitle="Gelecek Vizyonum" goalsSubtitle="Yazılım dünyasındaki adımlarımı ve ulaşmak istediğim noktaları burada paylaşıyorum.">
                <SectionHeader emoji="🎯" title="Kısa Vadeli Hedefler (2026)" description="Modern JavaScript framework'lerinde (React veya Vue) uzmanlaşmak, ilk profesyonel stajımı tamamlayıp sektörel tecrübe kazanmak, GitHub üzerinde aktif projeler geliştirerek açık kaynak dünyasına katkı sağlamak." />
                <SectionHeader emoji="🌏" title="Uzun Vadeli Hedefler" description="Tam kapsamlı (Full-stack) bir yazılım mühendisi olmak, gelişmiş oyun motorları kullanarak kendi oyun projelerimi hayata geçirmek, sürdürülebilir ve verimli otomasyon sistemleri tasarlamak." />
                <blockquote className="quote">"Kod yazmak sadece bir iş değil, problem çözme sanatıdır."</blockquote>
            </GoalsPageContent>
        )}
        
        {aktifSayfa === 'iletisim' && (
            <ContactPageContent contactHeader="Bize Ulaşın" contactSubText="Mesajınız doğrudan geliştiricinin Gmail kutusuna iletilecektir.">
                <div className="contact-inputs">
                    <SiteFormInput placeholder="Örn: Ahmet Yılmaz" />
                    <SiteFormInput placeholder="Örn: ornek@gmail.com" />
                    <SiteFormSelect defaultText="Hata Bildirimi" />
                    <textarea rows="6" placeholder="Mesajınızı buraya yazın..." className="textarea-box" style={{ padding: '12px', borderRadius: '5px', border: '1px solid #555', backgroundColor: '#222', color: '#fff', resize: 'vertical' }}></textarea>
                    <SiteFormButton label="Gönder" />
                </div>
            </ContactPageContent>
        )}
        
    </PageContainer>
  );
}

export default App;