export interface PhoneSpec {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Xiaomi' | 'OnePlus';
  badge?: string;
  tagline: string;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  image: string;
  colors: {
    name: string;
    hex: string;
    bgClass: string;
  }[];
  storageOptions: {
    size: string;
    priceDelta: number;
  }[];
  specs: {
    display: string;
    displayResolution: string;
    displayRefresh: string;
    processor: string;
    ram: string;
    mainCamera: string;
    telephotoCamera: string;
    ultrawideCamera: string;
    selfieCamera: string;
    battery: string;
    charging: string;
    os: string;
    weight: string;
    waterResistance: string;
    antutuScore: string;
    geekbenchMulti: number;
  };
  cameraSamples: {
    mode: 'day' | 'night' | 'portrait' | 'macro';
    title: string;
    description: string;
    iso: string;
    aperture: string;
    shutter: string;
  }[];
  inStock: boolean;
}

export const PHONES: PhoneSpec[] = [
  {
    id: 'iphone-16-pro-max',
    name: 'iPhone 16 Pro Max',
    brand: 'Apple',
    badge: 'Titan Flagman',
    tagline: 'Titanium dizayn, A18 Pro protsessori va 48MP Fusion kamerasi',
    priceUSD: 1199,
    rating: 4.9,
    reviewsCount: 342,
    image: '/src/assets/images/phone_iphone_titanium_1792063117706.jpg',
    colors: [
      { name: 'Natural Titanium', hex: '#9a9895', bgClass: 'bg-[#9a9895]' },
      { name: 'Black Titanium', hex: '#343332', bgClass: 'bg-[#343332]' },
      { name: 'White Titanium', hex: '#e3e4e5', bgClass: 'bg-[#e3e4e5]' },
      { name: 'Desert Titanium', hex: '#c5b29f', bgClass: 'bg-[#c5b29f]' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 200 },
      { size: '1TB', priceDelta: 400 }
    ],
    specs: {
      display: '6.9" Super Retina XDR OLED',
      displayResolution: '2868 x 1320 px (460 ppi)',
      displayRefresh: '120Hz ProMotion LTPO',
      processor: 'Apple A18 Pro (3nm, 6-core GPU)',
      ram: '8 GB LPDDR5X',
      mainCamera: '48MP Fusion (f/1.78, OIS Sensor-shift)',
      telephotoCamera: '12MP 5x Tetraprism (120mm, f/2.8)',
      ultrawideCamera: '48MP Ultra-wide (f/2.2, Macro)',
      selfieCamera: '12MP TrueDepth (f/1.9)',
      battery: '4,685 mAh (33 soatgacha video)',
      charging: '45W USB-C 3.2, 25W MagSafe',
      os: 'iOS 18 + Apple Intelligence',
      weight: '227 g',
      waterResistance: 'IP68 (6m, 30 min)',
      antutuScore: '1,850,000',
      geekbenchMulti: 8850
    },
    cameraSamples: [
      { mode: 'day', title: '48MP ProRAW Kunduzgi Detallash', description: 'Yorqin quyosh ostida har bir tola va rang mutlaq aniqlik bilan saqlanadi', iso: 'ISO 50', aperture: 'f/1.78', shutter: '1/2400s' },
      { mode: 'night', title: 'Tungi Rejim & Photonic Engine', description: 'Past yorug‘likda shovqinsiz va tabiiy yorug‘lik balansi', iso: 'ISO 1250', aperture: 'f/1.78', shutter: '1/4s' },
      { mode: 'portrait', title: 'Studio Bokeh & Chuqurlik', description: '5x optik fokus bilan professional portret suratlar', iso: 'ISO 80', aperture: 'f/2.8', shutter: '1/320s' },
      { mode: 'macro', title: 'Mikro Makro Detallash', description: '2 sm masofadan zarrachalar va tomchilarni aniq suratga olish', iso: 'ISO 100', aperture: 'f/2.2', shutter: '1/500s' }
    ],
    inStock: true
  },
  {
    id: 'samsung-galaxy-s25-ultra',
    name: 'Galaxy S25 Ultra',
    brand: 'Samsung',
    badge: '200MP Kamera',
    tagline: 'Snapdragon 8 Elite, 200MP kamera va o‘rnatilgan S-Pen',
    priceUSD: 1299,
    rating: 4.9,
    reviewsCount: 289,
    image: '/src/assets/images/phone_samsung_ultra_1792063118165.jpg',
    colors: [
      { name: 'Titanium Gray', hex: '#787b80', bgClass: 'bg-[#787b80]' },
      { name: 'Titanium Black', hex: '#282a2e', bgClass: 'bg-[#282a2e]' },
      { name: 'Titanium Violet', hex: '#584f68', bgClass: 'bg-[#584f68]' },
      { name: 'Titanium Silver', hex: '#d4d8db', bgClass: 'bg-[#d4d8db]' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 160 },
      { size: '1TB', priceDelta: 360 }
    ],
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      displayResolution: '3120 x 1440 px (QHD+)',
      displayRefresh: '120Hz LTPO (1-120Hz adaptiv)',
      processor: 'Snapdragon 8 Elite for Galaxy (3nm)',
      ram: '12 GB / 16 GB',
      mainCamera: '200MP ISOCELL HP2 (f/1.7, OIS)',
      telephotoCamera: '50MP 5x Periscope + 10MP 3x',
      ultrawideCamera: '50MP Ultra-wide (f/2.0)',
      selfieCamera: '12MP Dual Pixel AF',
      battery: '5,000 mAh',
      charging: '45W Tezkor quvvatlash, 15W Simsiz',
      os: 'One UI 7.1 (Android 15) + Galaxy AI',
      weight: '219 g',
      waterResistance: 'IP68',
      antutuScore: '2,950,000',
      geekbenchMulti: 9450
    },
    cameraSamples: [
      { mode: 'day', title: '200MP Ultra Rezolyutsiya', description: 'Suratni 10 karra kattalashtirganda ham eng mayda yozuvlar ko‘rinadi', iso: 'ISO 64', aperture: 'f/1.7', shutter: '1/3200s' },
      { mode: 'night', title: 'Nightography AI Zoom', description: 'Qorong‘uda ham Galaxy AI orqali yulduzli osmon va shahar chiroqlari ravshan', iso: 'ISO 1600', aperture: 'f/1.7', shutter: '1/3s' },
      { mode: 'portrait', title: '5x Periskop Portret', description: 'Tabiiy orqa fon xiralashishi va yuz ifodalarining jonliligi', iso: 'ISO 120', aperture: 'f/3.4', shutter: '1/250s' },
      { mode: 'macro', title: 'AI Enhanced Super Macro', description: 'Gul changchilari va mayda to‘qimalarni aniq tasvirlash', iso: 'ISO 100', aperture: 'f/2.0', shutter: '1/600s' }
    ],
    inStock: true
  },
  {
    id: 'google-pixel-9-pro-xl',
    name: 'Pixel 9 Pro XL',
    brand: 'Google',
    badge: 'Gemini AI Integratsiya',
    tagline: 'Sof Android, eng ilg‘or Gemini sun’iy intellekti va studio foto',
    priceUSD: 1099,
    rating: 4.8,
    reviewsCount: 198,
    image: '/src/assets/images/phone_pixel_flagship_1792063118644.jpg',
    colors: [
      { name: 'Obsidian', hex: '#232428', bgClass: 'bg-[#232428]' },
      { name: 'Porcelain', hex: '#ecebe8', bgClass: 'bg-[#ecebe8]' },
      { name: 'Hazel', hex: '#767871', bgClass: 'bg-[#767871]' },
      { name: 'Rose Quartz', hex: '#dec1be', bgClass: 'bg-[#dec1be]' }
    ],
    storageOptions: [
      { size: '128GB', priceDelta: 0 },
      { size: '256GB', priceDelta: 100 },
      { size: '512GB', priceDelta: 220 },
      { size: '1TB', priceDelta: 450 }
    ],
    specs: {
      display: '6.8" Super Actua LTPO OLED',
      displayResolution: '2992 x 1344 px (486 ppi)',
      displayRefresh: '1-120Hz silliq displey',
      processor: 'Google Tensor G4 + Titan M2 xavfsizlik',
      ram: '16 GB LPDDR5X',
      mainCamera: '50MP Octa PD (f/1.68, OIS)',
      telephotoCamera: '48MP Quad PD 5x Telefoto (30x Super Res)',
      ultrawideCamera: '48MP Quad PD Ultra-wide Macro',
      selfieCamera: '42MP Dual PD keng burchakli',
      battery: '5,060 mAh (24+ soat)',
      charging: '37W Tezkor, Qi2 Simsiz',
      os: 'Android 15 + 7 yil yangilanish kafolati',
      weight: '221 g',
      waterResistance: 'IP68',
      antutuScore: '1,420,000',
      geekbenchMulti: 5050
    },
    cameraSamples: [
      { mode: 'day', title: 'Real Tone & HDR+', description: 'Inson terisi rangini eng haqqoniy aks ettiruvchi Google Real Tone algoritmi', iso: 'ISO 40', aperture: 'f/1.68', shutter: '1/2000s' },
      { mode: 'night', title: 'Night Sight & Astrofotografiya', description: 'Yulduzlar va tunda eng chuqur soyalardan tabiiy yorug‘likni ajratadi', iso: 'ISO 2000', aperture: 'f/1.68', shutter: '1/2s' },
      { mode: 'portrait', title: 'Cinematic Blur Portret', description: 'Haqiqiy optik linza kabi mayin orqa fon xiralashishi', iso: 'ISO 100', aperture: 'f/2.8', shutter: '1/400s' },
      { mode: 'macro', title: 'Super Res Macro 2cm', description: 'Avtomatik ravishda so‘nggi nuqtagacha fokuslanadigan ultra makro', iso: 'ISO 80', aperture: 'f/2.2', shutter: '1/500s' }
    ],
    inStock: true
  },
  {
    id: 'aethelred-elite-1-ultra',
    name: 'Aethelred Elite 1 Ultra',
    brand: 'Xiaomi',
    badge: 'Leica 1-Dyuym Optika',
    tagline: 'Tabiiy charm korpus, 1 dyuymli Leica sensori va 90W quvvatlash',
    priceUSD: 1149,
    rating: 4.8,
    reviewsCount: 174,
    image: '/src/assets/images/phone_xiaomi_flagship_1792063119112.jpg',
    colors: [
      { name: 'Royal Blue Leather', hex: '#1e324f', bgClass: 'bg-[#1e324f]' },
      { name: 'Deep Emerald Leather', hex: '#1b3b31', bgClass: 'bg-[#1b3b31]' },
      { name: 'Obsidian Black', hex: '#222120', bgClass: 'bg-[#222120]' }
    ],
    storageOptions: [
      { size: '512GB', priceDelta: 0 },
      { size: '1TB', priceDelta: 200 }
    ],
    specs: {
      display: '6.73" WQHD+ AMOLED 3200 nits',
      displayResolution: '3200 x 1440 px',
      displayRefresh: '120Hz LTPO',
      processor: 'Snapdragon 8 Elite (4.32GHz)',
      ram: '16 GB LPDDR5X',
      mainCamera: '50MP LYT-900 1-dyuym (f/1.63-f/4.0 o‘zgaruvchan diafragma)',
      telephotoCamera: '50MP 75mm Floating + 50MP 120mm Periscope',
      ultrawideCamera: '50MP 122° Ultra-keng',
      selfieCamera: '32MP HDR',
      battery: '5,300 mAh Kremniy-uglerod batareya',
      charging: '90W Simli, 80W Simsiz (100% 33 min)',
      os: 'Xiaomi HyperOS 2.0 (Android 15)',
      weight: '220 g',
      waterResistance: 'IP68',
      antutuScore: '3,020,000',
      geekbenchMulti: 9580
    },
    cameraSamples: [
      { mode: 'day', title: 'Leica Authentic Look', description: 'Leica linzalari va 1 dyuymli sensor orqali kino sifatidagi boy ranglar', iso: 'ISO 50', aperture: 'f/1.8', shutter: '1/4000s' },
      { mode: 'night', title: '1-Dyuym Sensor Tungi Sahna', description: 'Katta maydonli sensor har qanday qorong‘u burchakni shovqinsiz ushlaydi', iso: 'ISO 1000', aperture: 'f/1.63', shutter: '1/8s' },
      { mode: 'portrait', title: '75mm Leica Telefoto Portret', description: 'Optik 75mm fokus inson yuzini buzib ko‘rsatmay, jozibador qiladi', iso: 'ISO 160', aperture: 'f/1.8', shutter: '1/300s' },
      { mode: 'macro', title: '10cm Floating Tele-Macro', description: 'Telefoto orqali uzoqroqdan ham makro ob’ektlarni chalg‘itmasdan olish', iso: 'ISO 125', aperture: 'f/2.0', shutter: '1/400s' }
    ],
    inStock: true
  },
  {
    id: 'oneplus-13-apex',
    name: 'OnePlus 13 Apex',
    brand: 'OnePlus',
    badge: '6000 mAh Muzlik Batareyasi',
    tagline: 'Snapdragon 8 Elite, 6000 mAh batareya va 100W SUPERVOOC',
    priceUSD: 899,
    rating: 4.7,
    reviewsCount: 145,
    image: '/src/assets/images/hero_flagship_phones_1792063118433.jpg',
    colors: [
      { name: 'Arctic White', hex: '#edf0f2', bgClass: 'bg-[#edf0f2]' },
      { name: 'Midnight Black', hex: '#1f2124', bgClass: 'bg-[#1f2124]' },
      { name: 'Emerald Blue', hex: '#244558', bgClass: 'bg-[#244558]' }
    ],
    storageOptions: [
      { size: '256GB', priceDelta: 0 },
      { size: '512GB', priceDelta: 100 },
      { size: '1TB', priceDelta: 250 }
    ],
    specs: {
      display: '6.82" 2K Oriental Screen 4500 nits',
      displayResolution: '3168 x 1440 px',
      displayRefresh: '120Hz LTPO 4.0',
      processor: 'Snapdragon 8 Elite',
      ram: '16 GB / 24 GB',
      mainCamera: '50MP Sony LYT-808 (f/1.6, OIS)',
      telephotoCamera: '50MP 3x Periscope (73mm)',
      ultrawideCamera: '50MP 120° (f/2.0)',
      selfieCamera: '32MP (f/2.4)',
      battery: '6,000 mAh Muzlik batareyasi (Glacier Battery)',
      charging: '100W SUPERVOOC (100% 36 min)',
      os: 'OxygenOS 15 (Android 15)',
      weight: '213 g',
      waterResistance: 'IP68 / IP69',
      antutuScore: '3,050,000',
      geekbenchMulti: 9620
    },
    cameraSamples: [
      { mode: 'day', title: 'Hasselblad Rang Kalibratsiyasi', description: 'Hasselblad rang uzatish algoritmi orqali tabiiy va toza ranglar', iso: 'ISO 64', aperture: 'f/1.6', shutter: '1/3000s' },
      { mode: 'night', title: 'Ultra Night Algorithm', description: '6000 mAh quvvat bilan tun bo‘yi tinimsiz suratga olish imkoniyati', iso: 'ISO 1400', aperture: 'f/1.6', shutter: '1/6s' },
      { mode: 'portrait', title: 'Hasselblad XCD Portret', description: 'Afsonaviy Hasselblad XCD linzalari uslubidagi portret fokus', iso: 'ISO 100', aperture: 'f/2.6', shutter: '1/250s' },
      { mode: 'macro', title: 'Periscope Tele-Macro', description: 'Periskop orqali o‘ta yaqin detallarni yuqori kontrastda aks ettiradi', iso: 'ISO 80', aperture: 'f/2.6', shutter: '1/450s' }
    ],
    inStock: true
  }
];

export const UZS_RATE = 12850; // 1 USD = 12,850 UZS

export function formatPrice(usdAmount: number, currency: 'USD' | 'UZS'): string {
  if (currency === 'USD') {
    return `$${usdAmount.toLocaleString('en-US')}`;
  }
  const uzsAmount = Math.round(usdAmount * UZS_RATE);
  return `${uzsAmount.toLocaleString('uz-UZ')} so'm`;
}
