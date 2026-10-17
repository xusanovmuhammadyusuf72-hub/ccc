import React from 'react';
import { PhoneSpec, PHONES, formatPrice } from '../data/phones';
import { X, Scale, Plus, CheckCircle2 } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  primaryPhone: PhoneSpec | null;
  secondaryPhone: PhoneSpec | null;
  onSelectSecondaryPhone: (phone: PhoneSpec) => void;
  currency: 'USD' | 'UZS';
  onAddToCart: (phone: PhoneSpec, selectedColor: string, selectedStorage: string, price: number) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  primaryPhone,
  secondaryPhone,
  onSelectSecondaryPhone,
  currency,
  onAddToCart
}) => {
  if (!isOpen || !primaryPhone) return null;

  const compareTarget = secondaryPhone || PHONES.find(p => p.id !== primaryPhone.id) || PHONES[0];

  const specsList = [
    { label: 'Narx', key1: formatPrice(primaryPhone.priceUSD, currency), key2: formatPrice(compareTarget.priceUSD, currency) },
    { label: 'Protsessor', key1: primaryPhone.specs.processor, key2: compareTarget.specs.processor },
    { label: 'Geekbench Multi-Core', key1: `${primaryPhone.specs.geekbenchMulti.toLocaleString()} ball`, key2: `${compareTarget.specs.geekbenchMulti.toLocaleString()} ball`, isNumeric: true, val1: primaryPhone.specs.geekbenchMulti, val2: compareTarget.specs.geekbenchMulti },
    { label: 'Displey', key1: `${primaryPhone.specs.display} (${primaryPhone.specs.displayRefresh})`, key2: `${compareTarget.specs.display} (${compareTarget.specs.displayRefresh})` },
    { label: 'RAM Tezkor xotira', key1: primaryPhone.specs.ram, key2: compareTarget.specs.ram },
    { label: 'Asosiy kamera', key1: primaryPhone.specs.mainCamera, key2: compareTarget.specs.mainCamera },
    { label: 'Telefoto / Zoom', key1: primaryPhone.specs.telephotoCamera, key2: compareTarget.specs.telephotoCamera },
    { label: 'Akkumulyator', key1: primaryPhone.specs.battery, key2: compareTarget.specs.battery },
    { label: 'Quvvatlash tezligi', key1: primaryPhone.specs.charging, key2: compareTarget.specs.charging },
    { label: 'Og‘irlik', key1: primaryPhone.specs.weight, key2: compareTarget.specs.weight },
    { label: 'Suvga chidamlilik', key1: primaryPhone.specs.waterResistance, key2: compareTarget.specs.waterResistance },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-display">Smartfonlarni Taqqoslash</h3>
              <p className="text-xs text-zinc-400">Flagman telefonlar parametrlarini yonma-yon solishtiring</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Phone Header Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Phone 1 */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center flex flex-col items-center">
              <img
                src={primaryPhone.image}
                alt={primaryPhone.name}
                className="w-24 h-24 object-cover rounded-lg mb-2 shadow"
                referrerPolicy="no-referrer"
              />
              <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold">{primaryPhone.brand}</span>
              <h4 className="text-sm font-bold text-white font-display">{primaryPhone.name}</h4>
              <div className="text-base font-extrabold text-white mt-1 tabular-nums">
                {formatPrice(primaryPhone.priceUSD, currency)}
              </div>
              <button
                onClick={() => onAddToCart(primaryPhone, primaryPhone.colors[0].name, primaryPhone.storageOptions[0].size, primaryPhone.priceUSD)}
                className="mt-3 px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Savatga qo'shish
              </button>
            </div>

            {/* Phone 2 (with selector dropdown) */}
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center flex flex-col items-center">
              <div className="w-full mb-2">
                <select
                  value={compareTarget.id}
                  onChange={(e) => {
                    const found = PHONES.find(p => p.id === e.target.value);
                    if (found) onSelectSecondaryPhone(found);
                  }}
                  className="w-full py-1 px-2 text-xs bg-zinc-900 border border-zinc-700 rounded-lg text-zinc-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {PHONES.filter(p => p.id !== primaryPhone.id).map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.brand})
                    </option>
                  ))}
                </select>
              </div>

              <img
                src={compareTarget.image}
                alt={compareTarget.name}
                className="w-24 h-24 object-cover rounded-lg mb-2 shadow"
                referrerPolicy="no-referrer"
              />
              <span className="text-[11px] uppercase tracking-wider text-cyan-400 font-semibold">{compareTarget.brand}</span>
              <h4 className="text-sm font-bold text-white font-display">{compareTarget.name}</h4>
              <div className="text-base font-extrabold text-white mt-1 tabular-nums">
                {formatPrice(compareTarget.priceUSD, currency)}
              </div>
              <button
                onClick={() => onAddToCart(compareTarget, compareTarget.colors[0].name, compareTarget.storageOptions[0].size, compareTarget.priceUSD)}
                className="mt-3 px-4 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Savatga qo'shish
              </button>
            </div>
          </div>

          {/* Specs Rows */}
          <div className="rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden divide-y divide-zinc-800/80">
            {specsList.map((row, idx) => (
              <div key={idx} className="p-3 text-xs hover:bg-zinc-900/40 transition-colors">
                <div className="text-zinc-500 text-center font-semibold mb-1">{row.label}</div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className={`p-1.5 rounded-lg ${row.isNumeric && row.val1 && row.val2 && row.val1 > row.val2 ? 'bg-cyan-950/40 text-cyan-300 font-bold' : 'text-zinc-300'}`}>
                    {row.key1}
                  </div>
                  <div className={`p-1.5 rounded-lg ${row.isNumeric && row.val1 && row.val2 && row.val2 > row.val1 ? 'bg-cyan-950/40 text-cyan-300 font-bold' : 'text-zinc-300'}`}>
                    {row.key2}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
