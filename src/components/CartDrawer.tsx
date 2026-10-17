import React, { useState } from 'react';
import { PhoneSpec, formatPrice } from '../data/phones';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';

export interface CartItem {
  id: string; // unique item id: `${phone.id}-${color}-${storage}`
  phone: PhoneSpec;
  selectedColor: string;
  selectedStorage: string;
  unitPrice: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  currency: 'USD' | 'UZS';
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  currency,
  appliedPromo,
  onApplyPromo,
  onRemovePromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountRate = appliedPromo ? 0.1 : 0; // 10% discount with promo
  const discountAmount = rawSubtotal * discountRate;
  const finalTotal = rawSubtotal - discountAmount;

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput.trim());
    if (ok) {
      setPromoError(null);
      setPromoInput('');
    } else {
      setPromoError("Noto'g'ri promokod. 'GITHUB2026' yoki 'APEX10' kodini sinab ko'ring.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-900 border-l border-zinc-800 shadow-2xl flex flex-col text-zinc-100">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white font-display">Savat ({items.reduce((c, i) => c + i.quantity, 0)})</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-zinc-500 space-y-3">
                <ShoppingBag className="w-12 h-12 stroke-1 text-zinc-600" />
                <div>
                  <p className="text-sm font-semibold text-zinc-300">Savatingiz hozircha bo'sh</p>
                  <p className="text-xs text-zinc-500 mt-1">Ko'rgazmadagi smartfonlardan birini tanlab savatga qo'shing</p>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 flex gap-3 items-center"
                >
                  <img
                    src={item.phone.image}
                    alt={item.phone.name}
                    className="w-16 h-16 rounded-lg object-cover bg-zinc-900 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate font-display">{item.phone.name}</h4>
                    <p className="text-[11px] text-zinc-400 mt-0.5">
                      {item.selectedColor} · {item.selectedStorage}
                    </p>
                    <div className="text-xs font-semibold text-cyan-300 mt-1 tabular-nums">
                      {formatPrice(item.unitPrice, currency)}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-zinc-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                      title="O'chirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold px-1 tabular-nums text-zinc-200">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout calculation */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-950 space-y-4">
              {/* Promo code */}
              {appliedPromo ? (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    <span>Promokod faollashtirildi: {appliedPromo} (-10%)</span>
                  </span>
                  <button
                    onClick={onRemovePromo}
                    className="text-emerald-400 hover:text-white underline cursor-pointer text-[11px]"
                  >
                    Bekor qilish
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromoCode} className="space-y-1">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => {
                          setPromoInput(e.target.value);
                          if (promoError) setPromoError(null);
                        }}
                        placeholder="Promokod (masalan: GITHUB2026)..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-3 py-1.5 text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors cursor-pointer"
                    >
                      Qo'llash
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-400">{promoError}</p>
                  )}
                </form>
              )}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Oraliq summa:</span>
                  <span className="text-zinc-200 tabular-nums">{formatPrice(rawSubtotal, currency)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Chegirma (10%):</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Yetkazib berish:</span>
                  <span className="text-emerald-400 font-semibold">Bepul (0 so'm)</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-zinc-800">
                  <span>Jami to'lov:</span>
                  <span className="text-cyan-400 text-base tabular-nums">{formatPrice(finalTotal, currency)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Buyurtmani rasmiylashtirish</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
