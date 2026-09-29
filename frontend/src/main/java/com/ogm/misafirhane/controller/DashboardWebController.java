package com.ogm.misafirhane.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

/**
 * Dashboard (Ana Panel) Web Kontrolcüsü
 */
@Controller
@RequestMapping("/dashboard")
public class DashboardWebController {

    @GetMapping
    public String dashboard(HttpSession session, Model model) {
        String aktifKullanici = (String) session.getAttribute("aktifKullanici");
        if (aktifKullanici == null) {
            return "redirect:/giris";
        }

        String listeKey = "rezervasyonListesi_" + aktifKullanici;
        @SuppressWarnings("unchecked")
        List<Map<String, String>> rezervasyonlar = (List<Map<String, String>>) session.getAttribute(listeKey);
        int rezSayisi = (rezervasyonlar != null) ? rezervasyonlar.size() : 0;

        model.addAttribute("aktifKullanici", aktifKullanici);
        model.addAttribute("rezSayisi", rezSayisi);
        model.addAttribute("pageTitle", "Ana Panel");
        model.addAttribute("activeMenu", "dashboard");
        // Örnek istatistik verileri
        model.addAttribute("toplamRezervasyonSayisi", 142);
        model.addAttribute("aktifMisafirSayisi", 38);
        model.addAttribute("bosOdaSayisi", 12);
        model.addAttribute("aylikGelir", 87500);
        return "dashboard";
    }
}