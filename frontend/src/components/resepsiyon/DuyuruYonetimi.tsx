"use client";

import { useState } from "react";

export type Duyuru = {
  id: string;
  baslik: string;
  icerik: string;
  tarih: string;
};

const initialDuyurular: Duyuru[] = [
  { id: "1", baslik: "Yaz Sezonu Bakım Çalışmaları", icerik: "Misafirhanemiz 1-5 Eylül arası bakıma girecektir.", tarih: "2024-08-01" },
  { id: "2", baslik: "Yeni Oda Fiyatları", icerik: "2024 yılı itibarıyla oda fiyatlarında güncelleme yapılmıştır.", tarih: "2024-07-15" }
];

export default function DuyuruYonetimi() {
  const [duyurular, setDuyurular] = useState<Duyuru[]>(initialDuyurular);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [editingDuyuru, setEditingDuyuru] = useState<Partial<Duyuru>>({});

  const isEditing = !!editingDuyuru.id;

  const openNew = () => {
    setEditingDuyuru({});
    setDialogVisible(true);
  };

  const openEdit = (duyuru: Duyuru) => {
    setEditingDuyuru({ ...duyuru });
    setDialogVisible(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu duyuruyu silmek istediğinize emin misiniz?")) {
      setDuyurular(prev => prev.filter(d => d.id !== id));
    }
  };

  const saveDuyuru = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDuyuru.baslik || !editingDuyuru.icerik) return;

    if (isEditing) {
      setDuyurular(prev => prev.map(d => d.id === editingDuyuru.id ? { ...d, ...editingDuyuru } as Duyuru : d));
    } else {
      const newDuyuru: Duyuru = {
        id: Date.now().toString(),
        baslik: editingDuyuru.baslik,
        icerik: editingDuyuru.icerik,
        tarih: new Date().toISOString().split('T')[0]
      };
      setDuyurular(prev => [newDuyuru, ...prev]);
    }
    setDialogVisible(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#0f2a0f] m-0">Duyuru Yönetimi</h1>
          <p className="text-gray-500 m-0 mt-1 text-sm">Anasayfada gösterilecek duyuruları buradan ekleyip düzenleyebilirsiniz.</p>
        </div>
        <button 
          onClick={openNew} 
          className="flex items-center gap-2 bg-[#16a34a] text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          <i className="pi pi-plus text-xs" />
          Yeni Duyuru Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-[#1e5c1e]">
                <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">Tarih</th>
                <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">Başlık</th>
                <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide w-full">İçerik</th>
                <th className="px-4 py-3 text-white font-semibold text-xs uppercase tracking-wide">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {duyurular.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-10 text-center text-gray-400">
                    <i className="pi pi-inbox text-3xl block mb-2 opacity-40" />
                    Kayıtlı duyuru bulunamadı.
                  </td>
                </tr>
              ) : (
                duyurular.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600 whitespace-nowrap">{d.tarih}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{d.baslik}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{d.icerik}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(d)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-ogm-700 hover:bg-ogm-50 transition-colors" title="Düzenle">
                          <i className="pi pi-pencil" />
                        </button>
                        <button onClick={() => handleDelete(d.id)} className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors" title="Sil">
                          <i className="pi pi-trash" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {dialogVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 bg-ogm-800">
              <h2 className="text-white font-bold text-sm">
                {isEditing ? "Duyuruyu Düzenle" : "Yeni Duyuru Ekle"}
              </h2>
              <button onClick={() => setDialogVisible(false)} className="text-white/70 hover:text-white">
                <i className="pi pi-times" />
              </button>
            </div>
            
            <form onSubmit={saveDuyuru} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Duyuru Başlığı</label>
                <input
                  required
                  type="text"
                  value={editingDuyuru.baslik || ''}
                  onChange={(e) => setEditingDuyuru({...editingDuyuru, baslik: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-ogm-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">İçerik</label>
                <textarea
                  required
                  rows={4}
                  value={editingDuyuru.icerik || ''}
                  onChange={(e) => setEditingDuyuru({...editingDuyuru, icerik: e.target.value})}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-base focus:border-ogm-500 focus:outline-none resize-y"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setDialogVisible(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50">
                  İptal
                </button>
                <button type="submit" className="rounded-lg bg-ogm-700 px-4 py-2 text-sm font-bold text-white hover:bg-ogm-800">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
