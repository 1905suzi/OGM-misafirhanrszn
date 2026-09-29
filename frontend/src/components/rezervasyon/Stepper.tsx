import React from "react";

export default function Stepper({ aktifAdim = 1 }: { aktifAdim?: 1 | 2 | 3 | 4 | 5 }) {
  return (
    <div className="flex items-center justify-between w-full mb-14 px-4">
      {/* 1. ADIM */}
      <div className={`flex items-center gap-2 ${aktifAdim >= 1 ? "text-[#1a3b25] font-semibold" : "text-[#888] font-medium"} text-[1rem]`}>
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
        <span>Konaklama</span>
      </div>
      <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
      
      {/* 2. ADIM */}
      <div className={`flex items-center gap-2 ${aktifAdim >= 2 ? "text-[#1a3b25] font-semibold" : "text-[#888] font-medium"} text-[1rem]`}>
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        <span>Oda Seçimi</span>
      </div>
      <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
      
      {/* 3. ADIM */}
      <div className={`flex items-center gap-2 ${aktifAdim >= 3 ? "text-[#1a3b25] font-semibold" : "text-[#888] font-medium"} text-[1rem]`}>
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
        <span>Ön İzleme</span>
      </div>
      <div className="flex-1 h-[1px] bg-[#d1d5db] mx-5"></div>
      
      {/* 4. ADIM */}
      <div className={`flex items-center gap-2 ${aktifAdim >= 4 ? "text-[#1a3b25] font-semibold" : "text-[#888] font-medium"} text-[1rem]`}>
        <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] fill-current"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
        <span>Ödeme</span>
      </div>
    </div>
  );
}
