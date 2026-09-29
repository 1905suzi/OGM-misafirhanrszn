package com.ogm.misafirhane.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

/**
 * Fiyat Yönetimi Web Kontrolcüsü
 * Oda fiyatlarının listeleme, ekleme, güncelleme ve silme sayfalarını yönetir.
 */
@Controller
@RequestMapping("/fiyat")
public class FiyatWebController {

    /** Fiyat listesi sayfası */
    @GetMapping
    public String fiyatListesi(Model model) {
        model.addAttribute("pageTitle", "Fiyat Yönetimi");
        model.addAttribute("activeMenu", "fiyat");
        return "fiyat/fiyat-listesi";
    }

    /** Fiyat düzenleme sayfası (yeni veya mevcut) */
    @GetMapping("/duzenle")
    public String fiyatDuzenle(@RequestParam(value = "id", required = false) Long id,
                                Model model) {
        if (id != null) {
            model.addAttribute("pageTitle", "Fiyat Düzenle");
            model.addAttribute("fiyatId", id);
            model.addAttribute("isEdit", true);
        } else {
            model.addAttribute("pageTitle", "Yeni Fiyat Ekle");
            model.addAttribute("isEdit", false);
        }
        model.addAttribute("activeMenu", "fiyat");
        return "fiyat/fiyat-duzenle";
    }

    /** Fiyat kaydetme POST (simüle) */
    @PostMapping("/kaydet")
    public String fiyatKaydet(@RequestParam(defaultValue = "") String odaTipi,
                               @RequestParam(defaultValue = "") String misafirTipi,
                               @RequestParam(defaultValue = "") String basTarih,
                               @RequestParam(defaultValue = "") String bitisTarih,
                               @RequestParam(defaultValue = "0") Double gunlukFiyat) {
        // Gerçek uygulamada servis/repository katmanına kaydedilir
        return "redirect:/fiyat?kayit=basarili";
    }

    /** Fiyat silme POST (simüle) */
    @PostMapping("/sil/{id}")
    public String fiyatSil(@PathVariable Long id) {
        // Gerçek uygulamada silme işlemi yapılır
        return "redirect:/fiyat?silindi=true";
    }
}
