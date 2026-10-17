import React, { useState, useMemo } from 'react';
import { 
  PHONES, 
  PhoneSpec, 
  formatPrice 
} from './data/phones';
import { GitHubModal } from './components/GitHubModal';
import { PhoneDetailModal } from './components/PhoneDetailModal';
import { CompareModal } from './components/CompareModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { 
  Github, 
  ExternalLink, 
  ShoppingCart, 
  Heart, 
  Scale, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Cpu, 
  Camera, 
  BatteryCharging, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  SlidersHorizontal, 
  Zap, 
  RotateCcw,
  CheckCircle2,
  Package,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function App() {
  // Navigation & Modal States
  const [currency, setCurrency] = useState<'USD' | 'UZS'>('USD');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'geekbench'>('popular');

  // Modals
  const [isGithubOpen, setIsGithubOpen] = useState(false);
  const [detailPhone, setDetailPhone] = useState<PhoneSpec | null>(null);
  const [comparePhone1, setComparePhone1] = useState<PhoneSpec | null>(null);
  const [comparePhone2, setComparePhone2] = useState<PhoneSpec | null>(null);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart & Favorites State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Cart Handlers
  const handleAddToCart = (phone: PhoneSpec, selectedColor: string, selectedStorage: string, price: number) => {
    const itemId = `${phone.id}-${selectedColor}-${selectedStorage}`;
    setCartItems(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item => item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prev, {
          id: itemId,
          phone,
          selectedColor,
          selectedStorage,
          unitPrice: price,
          quantity: 1
        }];
      }
    });
  };

  const handleInstantOrder = (phone: PhoneSpec, selectedColor: string, selectedStorage: string, price: number) => {
    handleAddToCart(phone, selectedColor, selectedStorage, price);
    setDetailPhone(null);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleToggleFavorite = (phoneId: string) => {
    setFavorites(prev => 
      prev.includes(phoneId) ? prev.filter(id => id !== phoneId) : [...prev, phoneId]
    );
  };

  const handleOpenCompare = (phone: PhoneSpec) => {
    setComparePhone1(phone);
    const other = PHONES.find(p => p.id !== phone.id) || PHONES[0];
    setComparePhone2(other);
    setIsCompareOpen(true);
  };

  const handleApplyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'GITHUB2026' || clean === 'APEX10' || clean === 'UZBEKISTAN') {
      setAppliedPromo(clean);
      return true;
    }
    return false;
  };

  // Filter & Sort Logic
  const filteredPhones = useMemo(() => {
    let result = [...PHONES];

    if (selectedBrand !== 'All') {
      result = result.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.specs.processor.toLowerCase().includes(q) ||
        p.specs.mainCamera.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'geekbench') {
      result.sort((a, b) => b.specs.geekbenchMulti - a.specs.geekbenchMulti);
    } else {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedBrand, searchQuery, sortBy]);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* ========================================================
          TOP BAR CONTRACT (Exact 3 zones separated by gap-8)
          Zone 1: Brand Wordmark (Single text element)
          Zone 2: 4-5 Concise nav links (whitespace-nowrap shrink-0)
          Zone 3: 1 Primary action + Utility controls
          ======================================================== */}
      <header className="sticky top-0 z-40 bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark */}
          <a href="#" className="text-xl font-extrabold tracking-tight text-white font-display whitespace-nowrap shrink-0 flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-zinc-950 font-black text-sm shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              AP
            </span>
            <span className="text-white">ApexPhone</span>
          </a>

          {/* Zone 2: Concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-zinc-300">
            <a href="#catalog" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Flagman Smartfonlar
            </a>
            <a href="#camera-spotlight" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Kamera & Protsessor
            </a>
            <button 
              onClick={() => {
                setComparePhone1(PHONES[0]);
                setComparePhone2(PHONES[1]);
                setIsCompareOpen(true);
              }}
              className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Taqqoslash Jadvali
            </button>
            <a href="#guarantee" className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0">
              Kafolat & Yetkazish
            </a>
          </nav>

          {/* Zone 3: Actions & GitHub primary button */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Currency switcher */}
            <button
              onClick={() => setCurrency(c => c === 'USD' ? 'UZS' : 'USD')}
              className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
              title="Valyutani o'zgartirish"
            >
              {currency === 'USD' ? '$ USD' : "SO'M"}
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => {
                if (favorites.length > 0) {
                  const fav = PHONES.find(p => p.id === favorites[0]);
                  if (fav) setDetailPhone(fav);
                }
              }}
              className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-rose-400 hover:border-zinc-700 transition-colors cursor-pointer"
              title="Sevimlilar ro'yxati"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyan-400 hover:border-zinc-700 transition-colors cursor-pointer"
              title="Savatni ochish"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-500 text-[10px] font-bold text-zinc-950 flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* PRIMARY ACTION: GitHub Button */}
            <button
              onClick={() => setIsGithubOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 transition-all shadow-md shadow-white/5 cursor-pointer whitespace-nowrap shrink-0 group"
              title="GitHub integratsiyasi va repozitoriy"
            >
              <Github className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>GitHub</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          HERO SECTION (Split-Screen Showcase Focal Point)
          ======================================================== */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-zinc-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Hero Left: Editorial Headline & Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <span className="text-cyan-400 uppercase tracking-wider">Apex Collection 2026</span>
                <span aria-hidden="true">·</span>
                <span>Rasmiy Flagmanlar Ko'rgazmasi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1] font-display text-balance">
                Eng yangi flagman smartfonlar — rasmiy kafolat bilan.
              </h1>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl">
                Titanium korpuslar, 200MP Leica va ProRAW optikasi, Snapdragon 8 Elite hamda A18 Pro protsessorlari. Har bir qurilma uchun to'liq texnik parametrlar, interaktiv kamera sinovi va qulay xarid imkoniyati.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#catalog"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                >
                  <span>Smartfonlarni Ko'rish</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsGithubOpen(true)}
                  className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repozitoriy</span>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
                </button>
              </div>

              {/* Editorial Trust Markers */}
              <div className="pt-6 border-t border-zinc-900 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-cyan-400" />
                  <span>O'zbekiston bo'ylab 24 soatda</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>100% Asl mahsulot kafolati</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Cinematic Phone Showcase Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-zinc-800/80 shadow-2xl bg-zinc-900 group">
                <img
                  src="/src/assets/images/hero_flagship_phones_1792063118433.jpg"
                  alt="Flagman smartfonlar kolleksiyasi"
                  className="w-full h-auto aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid model highlights */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-wider text-cyan-400 font-semibold">Flagman Ko'rgazma</div>
                      <h3 className="text-lg font-bold text-white font-display">Titanium & OLED Display</h3>
                      <p className="text-xs text-zinc-300 mt-0.5">iPhone 16 Pro Max · Galaxy S25 Ultra · Pixel 9 Pro</p>
                    </div>

                    <button
                      onClick={() => setDetailPhone(PHONES[0])}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer"
                    >
                      Batafsil
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Full-width 4-Column Feature Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-zinc-900">
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <Cpu className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-xs font-bold text-white">3nm Protsessorlar</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Snapdragon 8 Elite & A18 Pro</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <Camera className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-xs font-bold text-white">200MP & Leica Optika</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">1-dyuymli sensorlar va periskop zoom</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <Truck className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-xs font-bold text-white">Tezkor Bepul Yetkazish</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Eshikkacha yetkazib berish xizmati</div>
            </div>
            <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-2" />
              <div className="text-xs font-bold text-white">1 Yillik Kafolat</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">To'liq xizmat ko'rsatish markazi</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          CATALOG SECTION WITH FILTERS & SEARCH
          ======================================================== */}
      <section id="catalog" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold text-zinc-400 mb-1">
              <span>Apex Phone Store</span>
              <span className="mx-1.5">/</span>
              <span className="text-cyan-400">Katalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Mavjud Smartfonlar Modellari
            </h2>
          </div>

          <div className="text-xs text-zinc-400">
            Jami: <span className="font-bold text-white tabular-nums">{filteredPhones.length}</span> ta model topildi
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Brand Segmented Control */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
              {['All', 'Apple', 'Samsung', 'Google', 'Xiaomi', 'OnePlus'].map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedBrand === brand
                      ? 'bg-cyan-500 text-zinc-950 shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {brand === 'All' ? 'Barchasi' : brand}
                </button>
              ))}
            </div>

            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Model yoki xususiyat qidiring..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full sm:w-auto px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="popular">Reyting bo'yicha</option>
                  <option value="price-asc">Narx: Arzondan qimmatga</option>
                  <option value="price-desc">Narx: Qimmatdan arzonga</option>
                  <option value="geekbench">Unumdorlik (Geekbench)</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            PRODUCT CARDS GRID (Generous whitespace, uniform cards)
            ======================================================== */}
        {filteredPhones.length === 0 ? (
          <div className="py-16 text-center text-zinc-500 space-y-3 bg-zinc-900/30 rounded-2xl border border-zinc-800">
            <Package className="w-12 h-12 stroke-1 text-zinc-600 mx-auto" />
            <div>
              <p className="text-sm font-semibold text-zinc-300">Hech qanday smartfon topilmadi</p>
              <p className="text-xs text-zinc-500 mt-1">Qidiruv so'zini o'zgartiring yoki filtrlarni tozalang</p>
            </div>
            <button
              onClick={() => {
                setSelectedBrand('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-semibold text-cyan-400 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPhones.map((phone) => {
              const isFav = favorites.includes(phone.id);

              return (
                <div
                  key={phone.id}
                  className="group rounded-2xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:-translate-y-1"
                >
                  {/* Card Image Area (65-75% height proportion with neutral background) */}
                  <div className="relative aspect-[4/3] bg-zinc-950 p-4 flex items-center justify-center overflow-hidden">
                    <img
                      src={phone.image}
                      alt={phone.name}
                      className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />

                    {/* Badge top-left */}
                    {phone.badge && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-cyan-300 uppercase tracking-wider">
                        {phone.badge}
                      </div>
                    )}

                    {/* Wishlist Button top-right */}
                    <button
                      onClick={() => handleToggleFavorite(phone.id)}
                      className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
                        isFav 
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' 
                          : 'bg-black/50 text-white hover:bg-black/70 border border-white/10'
                      }`}
                      title={isFav ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                    </button>

                    {/* Color dot strip bottom */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      {phone.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-2.5 h-2.5 rounded-full border border-white/30"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Card Info Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Zero-Pill Unboxed Metadata with · separator */}
                      <div className="flex items-center gap-2 text-xs text-zinc-500 mb-1.5">
                        <span className="font-semibold text-cyan-400 uppercase tracking-wider">{phone.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>{phone.specs.display.split('"')[0]}" Displey</span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 text-zinc-400">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span>{phone.rating}</span>
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white font-display group-hover:text-cyan-300 transition-colors">
                        {phone.name}
                      </h3>

                      <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                        {phone.tagline}
                      </p>

                      {/* Specs Row */}
                      <div className="mt-3 pt-3 border-t border-zinc-800/70 grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                        <div className="flex items-center gap-1.5 truncate">
                          <Cpu className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          <span className="truncate">{phone.specs.processor.split('(')[0]}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Camera className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                          <span className="truncate">{phone.specs.mainCamera.split('(')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Action Buttons */}
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[10px] text-zinc-500">Boshlang'ich narxi:</div>
                        <div className="text-base font-extrabold text-white font-display tabular-nums">
                          {formatPrice(phone.priceUSD, currency)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenCompare(phone)}
                          className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          title="Taqqoslashga qo'shish"
                        >
                          <Scale className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => setDetailPhone(phone)}
                          className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>Batafsil</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>

      {/* ========================================================
          CAMERA & PERFORMANCE SPOTLIGHT SECTION
          ======================================================== */}
      <section id="camera-spotlight" className="py-16 bg-zinc-900/40 border-y border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              Kamera va Optika Innovatsiyalari
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Har bir tafsilotni kino darajasida muhrlang
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Katalogimizdagi har bir flagman sun'iy intellekt drayverlari, ko'p qatlamli optik linzalar va tunda ham shovqinsiz suratga oluvchi 1 dyuymli datchiklar bilan jihozlangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                <Camera className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-display">200MP & ProRAW 48MP</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Yuqori pikselli datchiklar hatto o'n karra yaqinlashtirganda ham to'liq ravshanlik va ranglar aniqligini saqlab qoladi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-display">Sun'iy Intellekt Algoritmlari</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Galaxy AI, Apple Intelligence va Google Tensor chipi orqali sahna avtomatik tarzda tahlil qilinadi va eng maqbul ekspozitsiya tanlanadi.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/40 flex items-center justify-center text-cyan-400">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-white font-display">100W Tezkor Zaryadlash</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                6000 mAh kremniy-uglerod batareyalari atigi 30 daqiqada to'liq quvvatlanib, ikki kunlik faol ish rejimini ta'minlaydi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          GUARANTEE & TRUST SECTION
          ======================================================== */}
      <section id="guarantee" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Ishonchli xarid</span>
            <h3 className="text-2xl font-bold text-white font-display">
              Smartfoningizni sinab ko'rib, keyin to'lang
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Kuryerimiz smartfonni to'g'ridan-to'g'ri uyingizga olib keladi. Qutisini ochib, IMEI kodini tekshirib, to'liq ko'zdan kechirganingizdan so'ng to'lov qilasiz.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                setDetailPhone(PHONES[0]);
              }}
              className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Hozir xarid qilish
            </button>
            <button
              onClick={() => setIsGithubOpen(true)}
              className="px-5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs transition-colors border border-zinc-700 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub-ga o'tish</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          FLOATING QUICK-ACTION GITHUB BUTTON
          ======================================================== */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => setIsGithubOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-700 shadow-2xl transition-all hover:scale-105 cursor-pointer"
          title="GitHub repozitoriy va profiliga kirish"
        >
          <Github className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold font-display">GitHub</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </div>

      {/* ========================================================
          FOOTER (Clean anti-slop quiet footer)
          ======================================================== */}
      <footer className="mt-auto border-t border-zinc-900 bg-zinc-950 py-10 text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-md bg-cyan-500 text-zinc-950 font-black flex items-center justify-center text-[10px]">
              AP
            </span>
            <span className="font-semibold text-zinc-400">ApexPhone Showcase & Store</span>
            <span>· 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#catalog" className="hover:text-zinc-300 transition-colors">Smartfonlar</a>
            <button onClick={() => setIsCompareOpen(true)} className="hover:text-zinc-300 transition-colors cursor-pointer">
              Taqqoslash
            </button>
            <button onClick={() => setIsGithubOpen(true)} className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub-ga kirish</span>
            </button>
          </div>

          <div className="text-[11px] text-zinc-600">
            Toshkent, O'zbekiston · Rasmiy kafolatlangan flagmanlar
          </div>
        </div>
      </footer>

      {/* ========================================================
          ALL MODALS & DRAWERS
          ======================================================== */}
      
      {/* 1. GitHub Hub Modal */}
      <GitHubModal
        isOpen={isGithubOpen}
        onClose={() => setIsGithubOpen(false)}
        defaultUsername="xusanovmuhammadyusuf72"
      />

      {/* 2. Phone Details PDP Modal */}
      <PhoneDetailModal
        phone={detailPhone}
        isOpen={!!detailPhone}
        onClose={() => setDetailPhone(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onInstantOrder={handleInstantOrder}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={detailPhone ? favorites.includes(detailPhone.id) : false}
        onOpenCompare={handleOpenCompare}
      />

      {/* 3. Phone Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        primaryPhone={comparePhone1}
        secondaryPhone={comparePhone2}
        onSelectSecondaryPhone={setComparePhone2}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      {/* 4. Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currency={currency}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={() => setAppliedPromo(null)}
      />

      {/* 5. Checkout & Receipt Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        appliedPromo={appliedPromo}
        onSuccessClear={() => setCartItems([])}
      />

    </div>
  );
}
