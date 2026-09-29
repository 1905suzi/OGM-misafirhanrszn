import React from "react";

export default function SihirbazKarti({
  baslik,
  aciklama,
  children,
}: {
  baslik?: string;
  aciklama?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white w-full max-w-[900px] p-6 px-8 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.02)] mb-8 relative z-10">
        <h1 className="text-[1.4rem] text-[#111] mb-1.5">{baslik || "Yeni Rezervasyon Oluştur"}</h1>
        <p className="text-[0.9rem] text-[#555]">{aciklama || "Bilgilerinizi adım adım doldurunuz"}</p>
      </div>

      <div className="bg-white w-full max-w-[900px] rounded-xl p-8 md:px-10 shadow-[0_8px_24px_rgba(0,0,0,0.04)] relative z-10">
        {children}
      </div>
    </>
  );
}
