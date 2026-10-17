import React, { useState } from 'react';
import { PhoneSpec, formatPrice } from '../data/phones';
import { 
  X, 
  Check, 
  ShoppingCart, 
  Camera, 
  Cpu, 
  BatteryCharging, 
  Maximize2, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Heart,
  Scale,
  Zap,
  Info
} from 'lucide-react';

interface PhoneDetailModalProps {
  phone: PhoneSpec | null;
  isOpen: boolean;
  onClose: () => void;
  currency: 'USD' | 'UZS';
  onAddToCart: (phone: PhoneSpec, selectedColor: string, selectedStorage: string, price: number) => void;
  onInstantOrder: (phone: PhoneSpec, selectedColor: string, selectedStorage: string, price: number) => void;
  onToggleFavorite: (phoneId: string) => void;
  isFavorite: boolean;
  onOpenCompare: (phone: PhoneSpec) => void;
}

export const PhoneDetailModal: React.FC<PhoneDetailModalProps> = ({
  phone,
  isOpen,
  onClose,
  currency,
  onAddToCart,
  onInstantOrder,
  onToggleFavorite,
  isFavorite,
  onOpenCompare
}) => {
  if (!isOpen || !phone) return null;

  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedStorageIndex, setSelectedStorageIndex] = useState(0);
  const [activeCameraMode, setActiveCameraMode] = useState<number>(0);
  const [viewTab, setViewTab] = useState<'overview' | 'camera' | 'specs'>('overview');
  const [addedNotice, setAddedNotice] = useState(false);

  const currentColor = phone.colors[selectedColorIndex] || phone.colors[0];
  const currentStorage = phone.storageOptions[selectedStorageIndex] || phone.storageOptions[0];
  const finalPrice = phone.priceUSD + currentStorage.priceDelta;

  const handleAddToCart = () => {
    onAddToCart(phone, currentColor.name, currentStorage.size, finalPrice);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleInstantBuy = () => {
    onInstantOrder(phone, currentColor.name, currentStorage.size, finalPrice);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">{phone.brand}</span>
            <span className="text-zinc-500">/</span>
            <h2 className="text-base sm:text-lg font-bold text-white font-display truncate">{phone.name}</h2>
            {phone.badge && (
              <span className="hidden sm:inline-block text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                {phone.badge}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(phone.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isFavorite 
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
                  : 'bg-zinc-800/70 text-zinc-400 hover:text-white'
              }`}
              title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={() => onOpenCompare(phone)}
              className="p-2 rounded-xl bg-zinc-800/70 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Boshqa smartfon bilan taqqoslash"
            >
              <Scale className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
              aria-label="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3 px-6 pt-2 border-b border-zinc-800 bg-zinc-900/40">
          <button
            onClick={() => setViewTab('overview')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewTab === 'overview' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Umumiy Ko'rinish</span>
          </button>
          <button
            onClick={() => setViewTab('camera')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewTab === 'camera' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Kamera Sinovi ({phone.cameraSamples.length} Rejim)</span>
          </button>
          <button
            onClick={() => setViewTab('specs')}
            className={`pb-3 text-xs font-medium border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
              viewTab === 'specs' ? 'border-cyan-500 text-cyan-400' : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Barcha Xususiyatlar</span>
          </button>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {viewTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Gallery & Visual Showcase */}
              <div className="lg:col-span-7 space-y-4">
                <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800/80 overflow-hidden aspect-[4/3] flex items-center justify-center p-4 group">
                  <img
                    src={phone.image}
                    alt={phone.name}
                    className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle color aura indicator */}
                  <div 
                    className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 text-xs text-white"
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: currentColor.hex }}
                    />
                    <span>{currentColor.name}</span>
                  </div>

                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-zinc-300 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>8K Studio Foto</span>
                  </div>
                </div>

                {/* Quick Spec Highlights Strip */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                    <Cpu className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    <div className="text-xs font-semibold text-white truncate">{phone.specs.processor.split('(')[0]}</div>
                    <div className="text-[10px] text-zinc-400">{phone.specs.ram}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                    <Camera className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    <div className="text-xs font-semibold text-white truncate">{phone.specs.mainCamera.split('(')[0]}</div>
                    <div className="text-[10px] text-zinc-400">{phone.specs.telephotoCamera.split('(')[0]}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800">
                    <BatteryCharging className="w-4 h-4 mx-auto mb-1 text-cyan-400" />
                    <div className="text-xs font-semibold text-white truncate">{phone.specs.battery.split('(')[0]}</div>
                    <div className="text-[10px] text-zinc-400">{phone.specs.charging.split(',')[0]}</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Customization & Purchase Box */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-white font-display">{phone.name}</h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">{phone.tagline}</p>

                  <div className="flex items-baseline gap-3 mt-4">
                    <span className="text-3xl font-extrabold text-white font-display tabular-nums">
                      {formatPrice(finalPrice, currency)}
                    </span>
                    {currentStorage.priceDelta > 0 && (
                      <span className="text-xs text-zinc-400">
                        (Baza: {formatPrice(phone.priceUSD, currency)})
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Mavjud · 1 yil rasmiy kafolat · Toshkentda 3 soatda yetkazish</span>
                  </div>
                </div>

                {/* Color Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Rangni tanlang:</span>
                    <span className="text-white font-semibold">{currentColor.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {phone.colors.map((c, idx) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                          selectedColorIndex === idx 
                            ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-zinc-900 scale-105' 
                            : 'opacity-80 hover:opacity-100 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {selectedColorIndex === idx && (
                          <Check className="w-4 h-4 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Storage Selector */}
                <div className="space-y-2 pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400 font-medium">Doimiy xotira (ROM):</span>
                    <span className="text-white font-semibold">{currentStorage.size}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {phone.storageOptions.map((st, idx) => (
                      <button
                        key={st.size}
                        onClick={() => setSelectedStorageIndex(idx)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex flex-col items-center justify-center ${
                          selectedStorageIndex === idx
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-sm'
                            : 'bg-zinc-950 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                        }`}
                      >
                        <span>{st.size}</span>
                        <span className="text-[10px] text-zinc-500 mt-0.5">
                          {st.priceDelta === 0 ? 'Baza' : `+${formatPrice(st.priceDelta, currency)}`}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-4 border-t border-zinc-800/80">
                  <button
                    onClick={handleInstantBuy}
                    className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Hozir buyurtma berish ({formatPrice(finalPrice, currency)})</span>
                  </button>

                  <button
                    onClick={handleAddToCart}
                    className="w-full py-3 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-colors border border-zinc-700 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>{addedNotice ? "Savatga qo'shildi!" : "Savatga qo'shish"}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Camera Studio Tab */}
          {viewTab === 'camera' && (
            <div className="space-y-6">
              <div className="flex flex-wrap gap-2">
                {phone.cameraSamples.map((sample, idx) => (
                  <button
                    key={sample.mode}
                    onClick={() => setActiveCameraMode(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeCameraMode === idx
                        ? 'bg-cyan-500 text-zinc-950'
                        : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {sample.title.split(' ')[0]} {sample.title.split(' ')[1]}
                  </button>
                ))}
              </div>

              {phone.cameraSamples[activeCameraMode] && (
                <div className="rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden">
                  <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-zinc-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={phone.image}
                      alt={phone.cameraSamples[activeCameraMode].title}
                      className="w-full h-full object-cover filter contrast-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Camera Viewfinder Overlay */}
                    <div className="absolute inset-0 border-[16px] border-black/40 pointer-events-none flex flex-col justify-between p-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-white/80 drop-shadow">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                          <span>4K · 120 FPS · RAW</span>
                        </span>
                        <span>{phone.cameraSamples[activeCameraMode].aperture} · {phone.cameraSamples[activeCameraMode].shutter} · {phone.cameraSamples[activeCameraMode].iso}</span>
                      </div>

                      <div className="self-center w-16 h-16 border border-white/40 rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      </div>

                      <div className="text-[11px] font-mono text-white/80 text-right drop-shadow">
                        <span>EV: 0.0 · AF-C · HDR+</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-zinc-950">
                    <h4 className="text-base font-bold text-white font-display">
                      {phone.cameraSamples[activeCameraMode].title}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {phone.cameraSamples[activeCameraMode].description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Full Specifications Tab */}
          {viewTab === 'specs' && (
            <div className="rounded-2xl bg-zinc-950 border border-zinc-800 divide-y divide-zinc-800/80 text-xs">
              {[
                { label: 'Displey va Ekran', value: `${phone.specs.display} (${phone.specs.displayResolution}), ${phone.specs.displayRefresh}` },
                { label: 'Markaziy Protsessor (CPU)', value: phone.specs.processor },
                { label: 'Tezkor Xotira (RAM)', value: phone.specs.ram },
                { label: 'Asosiy Kamera', value: phone.specs.mainCamera },
                { label: 'Telefoto & Zoom', value: phone.specs.telephotoCamera },
                { label: 'Ultra-keng Kamera', value: phone.specs.ultrawideCamera },
                { label: 'Frontal (Selfi) Kamera', value: phone.specs.selfieCamera },
                { label: 'Akkumulyator Hajmi', value: phone.specs.battery },
                { label: 'Quvvatlash Tezligi', value: phone.specs.charging },
                { label: 'Operatsion Tizim', value: phone.specs.os },
                { label: 'Og‘irligi', value: phone.specs.weight },
                { label: 'Suv va Chang Himoyasi', value: phone.specs.waterResistance },
                { label: 'Geekbench Multi-Core', value: `${phone.specs.geekbenchMulti.toLocaleString()} ball` },
                { label: 'AnTuTu Benchmark', value: `${phone.specs.antutuScore} ball` }
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 p-3.5 hover:bg-zinc-900/50 transition-colors">
                  <span className="font-semibold text-zinc-400">{row.label}</span>
                  <span className="sm:col-span-2 text-zinc-200 font-medium mt-1 sm:mt-0">{row.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
