import AnasayfaTopStrip from "@/components/anasayfa/AnasayfaTopStrip";
import AnasayfaHeader from "@/components/anasayfa/AnasayfaHeader";
import AnasayfaHero from "@/components/anasayfa/AnasayfaHero";
import AnasayfaQuickInfo from "@/components/anasayfa/AnasayfaQuickInfo";
import AnasayfaAbout from "@/components/anasayfa/AnasayfaAbout";
import AnasayfaFeatureCards from "@/components/anasayfa/AnasayfaFeatureCards";
import AnasayfaServices from "@/components/anasayfa/AnasayfaServices";
import AnasayfaAnnouncements from "@/components/anasayfa/AnasayfaAnnouncements";
import AnasayfaLocation from "@/components/anasayfa/AnasayfaLocation";
import AnasayfaFooter from "@/components/anasayfa/AnasayfaFooter";

export default function Home() {
  return (
    <main>
      <AnasayfaTopStrip />
      <AnasayfaHeader />
      <AnasayfaHero />
      <AnasayfaQuickInfo />
      <AnasayfaAbout />
      <AnasayfaFeatureCards />
      <AnasayfaServices />
      <AnasayfaLocation />
      <AnasayfaAnnouncements />
      <AnasayfaFooter />
    </main>
  );
}
