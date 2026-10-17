import React, { useState } from 'react';
import { CartItem } from './CartDrawer';
import { formatPrice } from '../data/phones';
import { 
  X, 
  CheckCircle, 
  Truck, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'USD' | 'UZS';
  appliedPromo: string | null;
  onSuccessClear: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  appliedPromo,
  onSuccessClear
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [region, setRegion] = useState('Toshkent shahri');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'click' | 'payme' | 'card'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const discountRate = appliedPromo ? 0.1 : 0;
  const discountAmount = rawSubtotal * discountRate;
  const finalTotal = rawSubtotal - discountAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.length < 9 || !address.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `APX-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderId(generatedId);
      setIsSubmitting(false);
      setOrderConfirmed(true);
      onSuccessClear();
    }, 900);
  };

  const handleCloseAll = () => {
    setOrderConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl max-h-[92vh] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-display">
              {orderConfirmed ? "Buyurtma Qabul Qilindi!" : "Buyurtmani Rasmiylashtirish"}
            </h3>
          </div>
          <button
            onClick={handleCloseAll}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {orderConfirmed ? (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-white font-display">Rahmat! Buyurtmangiz tasdiqlandi</h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  Operatorimiz tez orada ko'rsatilgan telefon raqami orqali bog'lanadi.
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-left space-y-2.5 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-800/80">
                  <span className="text-zinc-400">Buyurtma raqami:</span>
                  <span className="font-mono font-bold text-cyan-300">{orderId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Qabul qiluvchi:</span>
                  <span className="font-semibold text-zinc-200">{name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Telefon:</span>
                  <span className="font-mono text-zinc-200">{phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">Yetkazish hududi:</span>
                  <span className="text-zinc-200">{region}, {address}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">To'lov turi:</span>
                  <span className="text-zinc-200 capitalize">
                    {paymentMethod === 'cash' ? 'Naqd (yetkazib berilganda)' : paymentMethod.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-zinc-800/80 text-sm font-bold text-white">
                  <span>Jami to'lov:</span>
                  <span className="text-cyan-400 tabular-nums">{formatPrice(finalTotal, currency)}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-cyan-200 flex items-center gap-2">
                <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {region.includes('Toshkent') ? 'Toshkent shahri bo‘ylab 3 soat ichida kuryer orqali yetkaziladi.' : 'Viloyatlar bo‘ylab 24 soat ichida bepul yetkazib beriladi.'}
                </span>
              </div>

              <button
                onClick={handleCloseAll}
                className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Ko'rgazmaga qaytish
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Items Mini Summary */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-zinc-400">Tanlangan mahsulotlar: </span>
                  <span className="font-semibold text-white">{items.length} ta smartfon</span>
                </div>
                <div className="font-bold text-cyan-400 tabular-nums">
                  {formatPrice(finalTotal, currency)}
                </div>
              </div>

              {/* Recipient Info */}
              <div className="space-y-3">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Qabul Qiluvchi Ma'lumotlari</span>
                </h4>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400">Ism va Familiyangiz *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masalan: Muhammad Yusuf Xusanov"
                    className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-zinc-400">Telefon raqamingiz *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+998 90 123 45 67"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400">Viloyat / Shahar *</label>
                    <select
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Toshkent shahri">Toshkent shahri</option>
                      <option value="Toshkent viloyati">Toshkent viloyati</option>
                      <option value="Samarqand">Samarqand</option>
                      <option value="Buxoro">Buxoro</option>
                      <option value="Andijon">Andijon</option>
                      <option value="Farg'ona">Farg'ona</option>
                      <option value="Namangan">Namangan</option>
                      <option value="Qashqadaryo">Qashqadaryo</option>
                      <option value="Surxondaryo">Surxondaryo</option>
                      <option value="Xorazm">Xorazm</option>
                      <option value="Navoiy">Navoiy</option>
                      <option value="Jizzax">Jizzax</option>
                      <option value="Sirdaryo">Sirdaryo</option>
                      <option value="Qoraqalpog'iston">Qoraqalpog'iston</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs text-zinc-400">Yetkazish manzili *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ko'cha, uy, xonadon"
                      className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-cyan-400" />
                  <span>To'lov Usuli</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'cash', label: 'Naqd pul (yetkazilganda)' },
                    { id: 'click', label: 'Click' },
                    { id: 'payme', label: 'Payme' },
                    { id: 'card', label: 'Uzcard / Humo' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPaymentMethod(p.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all cursor-pointer ${
                        paymentMethod === p.id
                          ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Security & Warranty note */}
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% rasmiy original smartfonlar. Qabul qilib tekshirgach to'lov qilasiz.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Buyurtma rasmiylashtirilmoqda...</span>
                ) : (
                  <>
                    <span>Buyurtmani Tasdiqlash ({formatPrice(finalTotal, currency)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
