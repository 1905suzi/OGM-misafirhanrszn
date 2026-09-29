package com.ogm.misafirhane.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AuthWebController {

    @GetMapping("/")
    public String anaSayfa(Model model) {
        model.addAttribute("activeMenu", "anasayfa");
        return "auth/login";
    }

    @GetMapping("/giris")
    public String giris(
            @RequestParam(value = "registered", defaultValue = "false") boolean registered,
            @RequestParam(value = "logout",     defaultValue = "false") boolean logout,
            HttpSession session,
            Model model) {

        if (!logout && session.getAttribute("aktifKullanici") != null) {
            return "redirect:/dashboard";
        }

        model.addAttribute("registered", registered);
        model.addAttribute("logout", logout);
        model.addAttribute("pageTitle", "Giriş Yap");
        model.addAttribute("activeMenu", "anasayfa");
        return "auth/login";
    }

    @GetMapping("/giris-yap")
    public String girisYap(@RequestParam(defaultValue = "") String tc,
                           @RequestParam(defaultValue = "") String sifre) {
        if (!tc.isBlank() && !sifre.isBlank()) {
            return "redirect:/dashboard";
        }
        return "redirect:/giris?hata=true";
    }

    @GetMapping("/uye-ol")
    public String uyeOl(Model model) {
        model.addAttribute("pageTitle", "Üye Ol");
        return "auth/register";
    }

    @GetMapping("/cikis")
    public String cikis(HttpSession session) {
        session.invalidate();
        return "redirect:/giris?logout=true";
    }

    // NOT: /dashboard endpoint'i DashboardWebController tarafından yönetilmektedir.

    @GetMapping("/konaklama")
    public String konaklamaSayfasi(HttpSession session, Model model) {
        session.setAttribute("misafirBilgileriAlindi", true);
        model.addAttribute("girisTarihi", session.getAttribute("girisTarihi"));
        model.addAttribute("cikisTarihi", session.getAttribute("cikisTarihi"));
        model.addAttribute("yetiskin", session.getAttribute("yetiskin") != null ? session.getAttribute("yetiskin") : "1");
        model.addAttribute("cocuk", session.getAttribute("cocuk") != null ? session.getAttribute("cocuk") : "0");
        model.addAttribute("seciliOdaTipi", session.getAttribute("seciliOdaTipi") != null ? session.getAttribute("seciliOdaTipi") : "Standart");
        model.addAttribute("notlar", session.getAttribute("notlar"));

        return "konaklama";
    }

    @GetMapping("/oda-secimi")
    public String odaSecimiSayfasi(
            @RequestParam(value = "girisTarihi", required = false) String girisTarihi,
            @RequestParam(value = "cikisTarihi", required = false) String cikisTarihi,
            @RequestParam(value = "yetiskin", required = false) String yetiskin,
            @RequestParam(value = "cocuk", required = false) String cocuk,
            @RequestParam(value = "odaTipi", required = false) String odaTipi,
            @RequestParam(value = "notlar", required = false) String notlar,
            HttpSession session, Model model) {

        if (girisTarihi != null) session.setAttribute("girisTarihi", girisTarihi);
        if (cikisTarihi != null) session.setAttribute("cikisTarihi", cikisTarihi);
        if (yetiskin != null) session.setAttribute("yetiskin", yetiskin);
        if (cocuk != null) session.setAttribute("cocuk", cocuk);
        if (odaTipi != null) session.setAttribute("seciliOdaTipi", odaTipi);
        if (notlar != null) session.setAttribute("notlar", notlar);

        String aktifKullanici = (String) session.getAttribute("aktifKullanici");
        if (aktifKullanici == null) aktifKullanici = "Misafir";

        String seciliOdaTipi = (String) session.getAttribute("seciliOdaTipi");
        if (seciliOdaTipi == null) seciliOdaTipi = "Standart";

        // Eğer kullanıcı 2 veya daha fazla yetişkin seçtiyse ve oda tipi belirtilmediyse otomatik uygun odaya yönlendir
        String yetiskinStr = (String) session.getAttribute("yetiskin");
        int yetiskinSayisi = 1;
        if (yetiskinStr != null && !yetiskinStr.isEmpty()) {
            try { yetiskinSayisi = Integer.parseInt(yetiskinStr); } catch(Exception e){}
        }

        int fiyatStandart = 1000 * yetiskinSayisi;
        int fiyatSuit = 1800 * yetiskinSayisi;
        int fiyatAile = 2500 * yetiskinSayisi;
        String etiket = "Standart Fiyat";

        if (aktifKullanici.equals("Personel")) {
            fiyatStandart = 500 * yetiskinSayisi;
            fiyatSuit = 900 * yetiskinSayisi;
            fiyatAile = 1250 * yetiskinSayisi;
            etiket = "Personel İndirimi (%50)";
        } else if (aktifKullanici.equals("PersonelYakini")) {
            fiyatStandart = 750 * yetiskinSayisi;
            fiyatSuit = 1350 * yetiskinSayisi;
            fiyatAile = 1875 * yetiskinSayisi;
            etiket = "Yakın İndirimi (%25)";
        }

        model.addAttribute("fiyatStandart", fiyatStandart);
        model.addAttribute("fiyatSuit", fiyatSuit);
        model.addAttribute("fiyatAile", fiyatAile);
        model.addAttribute("indirimEtiketi", etiket);
        model.addAttribute("seciliOdaTipi", seciliOdaTipi);

        return "oda-secimi";
    }

    @GetMapping("/on-izleme")
    public String onIzlemeSayfasi(@RequestParam(value = "oda", required = false) String secilenOda, HttpSession session, Model model) {
        if (secilenOda != null) {
            session.setAttribute("sonSecilenOdaTipi", secilenOda);
        } else {
            secilenOda = (String) session.getAttribute("sonSecilenOdaTipi");
            if (secilenOda == null) secilenOda = (String) session.getAttribute("seciliOdaTipi");
            if (secilenOda == null) secilenOda = "Standart";
        }

        String aktifKullanici = (String) session.getAttribute("aktifKullanici");
        if (aktifKullanici == null) aktifKullanici = "Misafir";

        String yetiskinStr = (String) session.getAttribute("yetiskin");
        int yetiskinSayisi = 1;
        if (yetiskinStr != null && !yetiskinStr.isEmpty()) {
            try { yetiskinSayisi = Integer.parseInt(yetiskinStr); } catch(Exception e){}
        }

        int gunlukTutar = 1000 * yetiskinSayisi;
        String etiket = "Standart Fiyat";
        String odaAdi = "Oda 101 (Çam Katı)";
        String odaTipiDetay = "Standart Oda";

        if (secilenOda.equals("Suit")) {
            gunlukTutar = 1800 * yetiskinSayisi;
            odaAdi = "Oda 102 (Çam Katı)";
            odaTipiDetay = "Suit Oda";
        } else if (secilenOda.equals("Aile")) {
            gunlukTutar = 2500 * yetiskinSayisi;
            odaAdi = "Oda 103 (Çam Katı)";
            odaTipiDetay = "Aile Odası";
        }

        if (aktifKullanici.equals("Personel")) {
            gunlukTutar = gunlukTutar / 2;
            etiket = "Personel İndirimi (%50)";
        } else if (aktifKullanici.equals("PersonelYakini")) {
            gunlukTutar = (int)(gunlukTutar * 0.75);
            etiket = "Yakın İndirimi (%25)";
        }

        String giris = (String) session.getAttribute("girisTarihi");
        String cikis = (String) session.getAttribute("cikisTarihi");
        String cocuk = (String) session.getAttribute("cocuk");

        long gunSayisi = 1;
        if (giris != null && cikis != null && !giris.isEmpty() && !cikis.isEmpty()) {
            try {
                LocalDate g = LocalDate.parse(giris);
                LocalDate c = LocalDate.parse(cikis);
                gunSayisi = ChronoUnit.DAYS.between(g, c);
                if (gunSayisi <= 0) gunSayisi = 1;
            } catch(Exception e) {}
        }

        long toplamTutar = gunlukTutar * gunSayisi;

        model.addAttribute("gunlukTutar", gunlukTutar);
        model.addAttribute("toplamTutar", toplamTutar);
        model.addAttribute("gunSayisi", gunSayisi);
        model.addAttribute("indirimEtiketi", etiket);
        model.addAttribute("odaAdi", odaAdi);
        model.addAttribute("odaTipiDetay", odaTipiDetay);

        model.addAttribute("girisTarihi", giris != null ? giris : "Belirtilmedi");
        model.addAttribute("cikisTarihi", cikis != null ? cikis : "Belirtilmedi");

        String kisiSayisi = yetiskinSayisi + " Yetişkin";
        if (cocuk != null && !cocuk.equals("0") && !cocuk.isEmpty()) {
            kisiSayisi += ", " + cocuk + " Çocuk";
        }
        model.addAttribute("kisiSayisi", kisiSayisi);

        session.setAttribute("sonSecilenOda", odaTipiDetay);

        return "on-izleme";
    }

    @GetMapping("/odeme")
    public String odemeSayfasi() {
        return "odeme";
    }

    @GetMapping("/rezervasyon-basarili")
    public String rezervasyonBasarili(HttpSession session) {
        String aktifKullanici = (String) session.getAttribute("aktifKullanici");
        if (aktifKullanici == null) aktifKullanici = "Misafir";

        String listeKey = "rezervasyonListesi_" + aktifKullanici;

        @SuppressWarnings("unchecked")
        List<Map<String, String>> rezervasyonlar = (List<Map<String, String>>) session.getAttribute(listeKey);
        if (rezervasyonlar == null) {
            rezervasyonlar = new ArrayList<>();
        }

        String secilenOda = (String) session.getAttribute("sonSecilenOda");
        if (secilenOda == null) secilenOda = "Standart Oda";

        String giris = (String) session.getAttribute("girisTarihi");

        Map<String, String> yeniRezervasyon = new HashMap<>();
        yeniRezervasyon.put("islemNo", "REZ-" + (1000 + rezervasyonlar.size() + 1));
        yeniRezervasyon.put("tarih", (giris != null && !giris.isEmpty()) ? giris : "2026-08-08");
        yeniRezervasyon.put("oda", secilenOda);
        yeniRezervasyon.put("durum", "Onaylandı");

        rezervasyonlar.add(yeniRezervasyon);
        session.setAttribute(listeKey, rezervasyonlar);

        session.removeAttribute("girisTarihi");
        session.removeAttribute("cikisTarihi");
        session.removeAttribute("notlar");

        return "rezervasyon-basarili";
    }

    @GetMapping("/rezervasyon-iptal")
    public String iptalTalebi(@RequestParam("islemNo") String islemNo, HttpSession session) {
        String aktifKullanici = (String) session.getAttribute("aktifKullanici");
        if (aktifKullanici == null) aktifKullanici = "Misafir";

        String listeKey = "rezervasyonListesi_" + aktifKullanici;

        @SuppressWarnings("unchecked")
        List<Map<String, String>> rezervasyonlar = (List<Map<String, String>>) session.getAttribute(listeKey);

        if (rezervasyonlar != null) {
            for (Map<String, String> rez : rezervasyonlar) {
                if (rez.get("islemNo").equals(islemNo)) {
                    rez.put("durum", "İptal Talebi Alındı");
                    break;
                }
            }
            session.setAttribute(listeKey, rezervasyonlar);
        }

        return "redirect:/rezervasyonlarim";
    }

    @GetMapping("/rezervasyonlarim")
    public String rezervasyonlarimSayfasi(HttpSession session, Model model) {
        String aktifKullanici = (String) session.getAttribute("aktifKullanici");
        if (aktifKullanici == null) aktifKullanici = "Misafir";
        String listeKey = "rezervasyonListesi_" + aktifKullanici;

        @SuppressWarnings("unchecked")
        List<Map<String, String>> rezervasyonlar = (List<Map<String, String>>) session.getAttribute(listeKey);
        if (rezervasyonlar == null) rezervasyonlar = new ArrayList<>();

        model.addAttribute("rezervasyonListesi", rezervasyonlar);
        model.addAttribute("activeMenu", "rezervasyonlarim");
        return "rezervasyonlarim";
    }

    @GetMapping("/rezervasyon-olustur")
    public String rezervasyonOlusturSayfasi(HttpSession session, Model model) {
        model.addAttribute("activeMenu", "rezervasyon");
        Boolean bilgiAlindi = (Boolean) session.getAttribute("misafirBilgileriAlindi");
        if (bilgiAlindi != null && bilgiAlindi) return "redirect:/konaklama";
        return "misafir-bilgileri";
    }

    @GetMapping("/misafir-kayit")
    public String misafirKayitSayfasi(HttpSession session, Model model) {
        session.setAttribute("aktifKullanici", "Misafir");
        model.addAttribute("activeMenu", "anasayfa");
        return "misafir-kayit";
    }

    @GetMapping("/personel-yakini-dogrulama")
    public String personelYakiniDogrulamaSayfasi(HttpSession session, Model model) {
        session.setAttribute("aktifKullanici", "PersonelYakini");
        model.addAttribute("activeMenu", "anasayfa");
        return "personel-yakini";
    }

    @GetMapping("/personel-girisi")
    public String personelGirisi(HttpSession session) {
        session.setAttribute("aktifKullanici", "Personel");
        session.setAttribute("misafirBilgileriAlindi", true);
        return "redirect:/konaklama";
    }

    @GetMapping("/iletisim")
    public String iletisimSayfasi(Model model) {
        model.addAttribute("activeMenu", "iletisim");
        return "iletisim";
    }
}