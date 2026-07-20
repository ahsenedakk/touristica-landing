// ============================================================
// Hotel Database — 30+ hotels with full metadata
// ============================================================

export type HotelFeatures = {
  spa: boolean;
  vip: boolean;
  meal: string;
  pool: string;
  beach: string;
  aquapark: boolean;
  kids_club: boolean;
  airport_km: number;
  beachfront: boolean;
  adults_only: boolean;
  private_beach: boolean;
};

export type Hotel = {
  id: number;
  name: string;
  destination_key: string;
  location: string;
  stars: number;
  image: string;
  gallery: string[];
  price: number;
  old_price: number;
  rating: number;
  reviews_count: number;
  campaign: string;
  badges: string[];
  is_popular: boolean;
  features: HotelFeatures;
  categories: string[];
  capacity: number;
  available_months: string[];
  description: string;
  tags: string[];
  sort_order: number;
};

export type Campaign = {
  id: number;
  title: string;
  highlight: string;
  description: string;
  badge: string;
  image: string;
  theme: 'sunset' | 'gold' | 'aqua' | 'ocean' | 'leaf';
  expires: string;
  cta: string;
  sort_order: number;
};

export type Destination = {
  id: number;
  key: string;
  name: string;
  image: string;
  hotels_count: number;
  price_from: number;
  tagline: string;
  sort_order: number;
};

export type Review = {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  title: string;
  text: string;
  hotel: string;
  trip: string;
  verified: boolean;
};

export type Stats = {
  hotels_available: number;
  campaigns_active: number;
  prices_checked_minutes: number;
  hotels_updated_today: number;
};

const px = (id: number, w = 1200) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const g = (ids: number[]) => ids.map((id) => px(id));

export const hotels: Hotel[] = [
  {
    id: 1, name: 'Azure Crown Palace Resort & Spa', destination_key: 'belek', location: 'Belek, Antalya',
    stars: 5, image: px(261101), gallery: g([261101, 1450389, 1287460, 262978]),
    price: 84900, old_price: 118500, rating: 9.4, reviews_count: 2138,
    campaign: 'Erken Rezervasyon %28', badges: ['En Popüler', 'Ücretsiz İptal', 'Aile Dostu', 'Denize Sıfır'],
    is_popular: true,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: '5 havuz + aquapark', beach: 'Mavi Bayraklı özel plaj', aquapark: true, kids_club: true, airport_km: 32, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'luxury', 'beach'], capacity: 1200, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Belek\'te 5 havuz ve aquapark ile lüks aile tatili.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Spa Merkezi'],
    sort_order: 1,
  },
  {
    id: 2, name: 'Santa Mare Deluxe Resort', destination_key: 'side', location: 'Çolaklı, Side',
    stars: 5, image: px(1450363), gallery: g([1450363, 1450389, 261101, 3225531]),
    price: 62400, old_price: 79900, rating: 9.1, reviews_count: 1764,
    campaign: 'Erken Rezervasyon %22', badges: ['Ücretsiz İptal', 'Denize Sıfır', 'Aile Dostu'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '3 açık havuz', beach: '400 m kum sahil', aquapark: false, kids_club: true, airport_km: 55, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'beach'], capacity: 850, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Side\'de kum sahile yakın, aile dostu her şey dahil konsept.', tags: ['Aile Odası', 'Kids Club', 'Kum Plaj', 'Spa Merkezi'],
    sort_order: 2,
  },
  {
    id: 3, name: 'Vista Mare Bodrum Resort', destination_key: 'bodrum', location: 'Türkbükü, Bodrum',
    stars: 5, image: px(2467558), gallery: g([2467558, 189296, 1450389, 262978]),
    price: 71250, old_price: 92000, rating: 8.9, reviews_count: 1389,
    campaign: 'ParafPara Fırsatı', badges: ['Kahvaltı Dahil', 'Ücretsiz İptal', 'Denize Sıfır'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: 'Infinity + kapalı havuz', beach: 'Özel iskele plajı', aquapark: false, kids_club: false, airport_km: 38, beachfront: true, adults_only: true, private_beach: true },
    categories: ['honeymoon', 'spa', 'beach'], capacity: 400, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Bodrum\'da yetişkinlere özel, infinity havuzlu romantik resort.', tags: ['Sea View Balcony', 'Jacuzzi', 'Sunset Dinner', 'Infinity Pool'],
    sort_order: 3,
  },
  {
    id: 4, name: 'Golden Palm Resort Kıbrıs', destination_key: 'kibris', location: 'Girne, Kıbrıs',
    stars: 5, image: px(1450389), gallery: g([1450389, 261101, 1287460, 262978]),
    price: 56800, old_price: 71500, rating: 9.0, reviews_count: 1927,
    campaign: 'Jest Lira + Transfer', badges: ['Aile Dostu', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Ultra Her Şey Dahil', pool: '6 havuz + aquapark', beach: 'Mavi bayraklı kum plaj', aquapark: true, kids_club: true, airport_km: 45, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'beach'], capacity: 1100, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kıbrıs\'ta 6 havuz ve aquapark ile dolu dolu aile tatili.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Kum Plaj'],
    sort_order: 4,
  },
  {
    id: 5, name: 'Alpine Sea Resort', destination_key: 'kemer', location: 'Göynük, Kemer',
    stars: 5, image: px(259005), gallery: g([259005, 261101, 1450389, 3997991]),
    price: 49950, old_price: 61400, rating: 8.8, reviews_count: 1102,
    campaign: 'Aile İndirimi %15', badges: ['Kahvaltı Dahil', 'Aile Dostu', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + kapalı havuz', beach: 'Çakıl-kumsal plaj', aquapark: false, kids_club: true, airport_km: 52, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'spa', 'beach'], capacity: 700, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kemer\'de dağ ve deniz manzaralı, aile dostu resort.', tags: ['Aile Odası', 'Kids Club', 'Spa Merkezi', 'Deniz Manzarası'],
    sort_order: 5,
  },
  {
    id: 6, name: 'Aegean Bliss Marmaris', destination_key: 'marmaris', location: 'İçmeler, Marmaris',
    stars: 4, image: px(3225531), gallery: g([3225531, 259005, 1287460, 1450389]),
    price: 44300, old_price: 55900, rating: 8.7, reviews_count: 986,
    campaign: 'Ücretsiz Transfer', badges: ['Kahvaltı Dahil', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Yarım Pansiyon', pool: '1 açık havuz', beach: 'Plaja 300 m', aquapark: false, kids_club: false, airport_km: 96, beachfront: false, adults_only: false, private_beach: false },
    categories: ['budget', 'beach'], capacity: 500, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Marmaris İçmeler\'de bütçe dostu, yarım pansiyon konsept.', tags: ['Standard Room', 'Pool', 'Garden', 'Beach'],
    sort_order: 6,
  },
  {
    id: 7, name: 'Regal Iconic Palace', destination_key: 'belek', location: 'Belek, Antalya',
    stars: 5, image: px(2021745), gallery: g([2021745, 261101, 1450389, 2467558]),
    price: 128500, old_price: 168000, rating: 9.6, reviews_count: 2741,
    campaign: 'Erken Rezervasyon %24 + VIP Transfer', badges: ['VIP Servis', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: '7 havuz + villa havuzları', beach: 'Özel kum plaj', aquapark: true, kids_club: true, airport_km: 28, beachfront: true, adults_only: false, private_beach: true },
    categories: ['luxury', 'family', 'beach'], capacity: 600, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Belek\'te villa havuzları ve VIP servis ile ultra lüks tatil.', tags: ['Private Villa', 'Infinity Pool', 'VIP Beach', 'Premium Suite'],
    sort_order: 7,
  },
  {
    id: 8, name: 'Serenity Cove Resort', destination_key: 'bodrum', location: 'Gündoğan, Bodrum',
    stars: 5, image: px(189296), gallery: g([189296, 2467558, 3997991, 1450389]),
    price: 96500, old_price: 121000, rating: 9.3, reviews_count: 842,
    campaign: 'Balayına Özel %20', badges: ['Yetişkinlere Özel', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Her Şey Dahil', pool: 'Sonsuzluk havuzu', beach: 'Özel iskele & cabana', aquapark: false, kids_club: false, airport_km: 41, beachfront: true, adults_only: true, private_beach: true },
    categories: ['honeymoon', 'luxury', 'spa'], capacity: 300, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Bodrum\'da yetişkinlere özel, balayı için tasarlanmış cennet.', tags: ['Romantic Suite', 'Sea View Balcony', 'Jacuzzi', 'Sunset Dinner'],
    sort_order: 8,
  },
  {
    id: 9, name: 'Venus Romantic Beach Resort', destination_key: 'antalya', location: 'Lara, Antalya',
    stars: 5, image: px(261395), gallery: g([261395, 1450389, 261101, 3997991]),
    price: 78900, old_price: 95400, rating: 9.2, reviews_count: 1198,
    campaign: 'Erken Rezervasyon %17', badges: ['Denize Sıfır', 'Ücretsiz İptal', 'Kahvaltı Dahil'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '2 açık havuz', beach: 'Özel Lara plajı', aquapark: false, kids_club: false, airport_km: 15, beachfront: true, adults_only: false, private_beach: true },
    categories: ['honeymoon', 'beach', 'spa'], capacity: 550, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Lara\'da özel plajı ve spa merkeziyle romantik tatil.', tags: ['Romantic Suite', 'Sea View Balcony', 'Spa Merkezi', 'Sunset Dinner'],
    sort_order: 9,
  },
  {
    id: 10, name: 'Sun Garden Resort', destination_key: 'kemer', location: 'Kiriş, Kemer',
    stars: 4, image: px(1287460), gallery: g([1287460, 259005, 261101, 1450389]),
    price: 32500, old_price: 43800, rating: 8.4, reviews_count: 2187,
    campaign: 'Süper Erken Rezervasyon %26', badges: ['Aile Dostu', 'Ücretsiz İptal', 'Kahvaltı Dahil'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + çocuk havuzu', beach: 'Plaja 400 m', aquapark: true, kids_club: true, airport_km: 58, beachfront: false, adults_only: false, private_beach: false },
    categories: ['family', 'budget'], capacity: 900, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kemer\'de bütçe dostu, aquaparklı aile tatili.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Pool'],
    sort_order: 10,
  },
  {
    id: 11, name: 'Palm Beach Club Marmaris', destination_key: 'marmaris', location: 'Marmaris Merkez',
    stars: 4, image: px(2070053), gallery: g([2070053, 3225531, 259005, 1287460]),
    price: 28900, old_price: 37400, rating: 8.2, reviews_count: 1543,
    campaign: 'Süper Fırsat %23', badges: ['Kahvaltı Dahil', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Yarım Pansiyon', pool: '1 açık havuz', beach: 'Denize sıfır kum plaj', aquapark: false, kids_club: false, airport_km: 92, beachfront: true, adults_only: false, private_beach: false },
    categories: ['budget', 'beach'], capacity: 450, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Marmaris merkezde denize sıfır, ekonomik konsept.', tags: ['Standard Room', 'Beach', 'Pool', 'Garden'],
    sort_order: 11,
  },
  {
    id: 12, name: 'Crown Kyrenia Deluxe', destination_key: 'kibris', location: 'Girne, Kıbrıs',
    stars: 5, image: px(261101), gallery: g([261101, 1450389, 1287460, 2021745]),
    price: 89750, old_price: 112500, rating: 9.1, reviews_count: 1674,
    campaign: 'Jest Lira + %18 İndirim', badges: ['Aile Dostu', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: '4 havuz + aquapark', beach: 'Mavi bayraklı plaj', aquapark: true, kids_club: true, airport_km: 43, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'luxury', 'beach'], capacity: 1000, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kıbrıs\'ta aquapark ve VIP servisiyle lüks aile tatili.', tags: ['Aile Odası', 'Aquapark', 'VIP Beach', 'Kids Club'],
    sort_order: 12,
  },
  {
    id: 13, name: 'Mira Bay Luxury Hotel', destination_key: 'antalya', location: 'Konyaaltı, Antalya',
    stars: 5, image: px(1450389), gallery: g([1450389, 261101, 2467558, 2021745]),
    price: 92000, old_price: 125000, rating: 9.3, reviews_count: 1456,
    campaign: 'Erken Rezervasyon %26', badges: ['VIP Servis', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: 'Infinity + 2 havuz', beach: 'Özel plaj', aquapark: false, kids_club: false, airport_km: 18, beachfront: true, adults_only: true, private_beach: true },
    categories: ['luxury', 'honeymoon', 'spa'], capacity: 350, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Antalya Konyaaltı\'nda yetişkinlere özel ultra lüks resort.', tags: ['Premium Suite', 'Infinity Pool', 'VIP Beach', 'Spa Merkezi'],
    sort_order: 13,
  },
  {
    id: 14, name: 'Delfin Blu Family Resort', destination_key: 'side', location: 'Sorgun, Side',
    stars: 5, image: px(1287460), gallery: g([1287460, 1450363, 261101, 1450389]),
    price: 51000, old_price: 68000, rating: 8.9, reviews_count: 1320,
    campaign: 'Aile İndirimi %25', badges: ['Aile Dostu', 'Ücretsiz İptal', 'Denize Sıfır'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '3 havuz + çocuk havuzu', beach: 'Kum plaj 200 m', aquapark: true, kids_club: true, airport_km: 50, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'beach'], capacity: 950, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Side\'de aquapark ve çocuk kulübüyle tam aile oteli.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Kum Plaj'],
    sort_order: 14,
  },
  {
    id: 15, name: 'Ottoman Dream Spa Resort', destination_key: 'antalya', location: 'Belek, Antalya',
    stars: 5, image: px(3997991), gallery: g([3997991, 261101, 1450389, 2467558]),
    price: 88000, old_price: 110000, rating: 9.2, reviews_count: 980,
    campaign: 'Erken Rezervasyon %20', badges: ['Spa & Wellness', 'Ücretsiz İptal', 'Denize Sıfır'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Her Şey Dahil', pool: 'Kapalı + açık havuz', beach: 'Özel plaj', aquapark: false, kids_club: false, airport_km: 30, beachfront: true, adults_only: true, private_beach: true },
    categories: ['spa', 'luxury', 'honeymoon'], capacity: 280, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Belek\'te ödüllü spa merkeziyle wellness tatili.', tags: ['Spa Center', 'Massage Area', 'Wellness Pool', 'Relaxation Area'],
    sort_order: 15,
  },
  {
    id: 16, name: 'Coral Bay Beach Hotel', destination_key: 'kemer', location: 'Beldibi, Kemer',
    stars: 4, image: px(259005), gallery: g([259005, 3225531, 1287460, 1450389]),
    price: 38000, old_price: 49000, rating: 8.5, reviews_count: 1670,
    campaign: 'Süper Erken %22', badges: ['Denize Sıfır', 'Ücretsiz İptal', 'Kahvaltı Dahil'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Yarım Pansiyon', pool: '1 havuz', beach: 'Denize sıfır', aquapark: false, kids_club: false, airport_km: 48, beachfront: true, adults_only: false, private_beach: false },
    categories: ['budget', 'beach'], capacity: 600, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kemer Beldibi\'nde denize sıfır ekonomik tatil.', tags: ['Standard Room', 'Beach', 'Pool', 'Sea View'],
    sort_order: 16,
  },
  {
    id: 17, name: 'Royal Palm Belek Resort', destination_key: 'belek', location: 'Belek, Antalya',
    stars: 5, image: px(2021745), gallery: g([2021745, 261101, 1450389, 1287460]),
    price: 95000, old_price: 130000, rating: 9.4, reviews_count: 1890,
    campaign: 'Erken Rezervasyon %27', badges: ['VIP Servis', 'Aile Dostu', 'Denize Sıfır'],
    is_popular: true,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: '5 havuz + aquapark', beach: 'Özel kum plaj', aquapark: true, kids_club: true, airport_km: 25, beachfront: true, adults_only: false, private_beach: true },
    categories: ['luxury', 'family', 'beach'], capacity: 800, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Belek\'te VIP servis ve özel plajla lüks aile tatili.', tags: ['Premium Suite', 'Aquapark', 'VIP Beach', 'Kids Club'],
    sort_order: 17,
  },
  {
    id: 18, name: 'Lemon Tree Boutique Hotel', destination_key: 'bodrum', location: 'Bodrum Merkez',
    stars: 4, image: px(2467558), gallery: g([2467558, 189296, 1450389, 3997991]),
    price: 42000, old_price: 52000, rating: 8.6, reviews_count: 760,
    campaign: 'Son Dakika %19', badges: ['Ücretsiz İptal', 'Kahvaltı Dahil'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Kahvaltı Dahil', pool: '1 havuz', beach: 'Plaja 500 m', aquapark: false, kids_club: false, airport_km: 35, beachfront: false, adults_only: true, private_beach: false },
    categories: ['budget', 'honeymoon'], capacity: 200, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Bodrum merkezde butik, ekonomik romantik kaçamak.', tags: ['Standard Room', 'Sea View Balcony', 'Pool', 'Garden'],
    sort_order: 18,
  },
  {
    id: 19, name: 'Grand Pearl Side Hotel', destination_key: 'side', location: 'Titreyengöl, Side',
    stars: 5, image: px(1450363), gallery: g([1450363, 1287460, 261101, 259005]),
    price: 58000, old_price: 73000, rating: 8.8, reviews_count: 1430,
    campaign: 'Erken Rezervasyon %20', badges: ['Aile Dostu', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + çocuk havuzu', beach: 'Kum plaj', aquapark: false, kids_club: true, airport_km: 53, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'beach'], capacity: 750, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Side\'de kum sahilde aile dostu her şey dahil otel.', tags: ['Aile Odası', 'Kids Club', 'Kum Plaj', 'Spa Merkezi'],
    sort_order: 19,
  },
  {
    id: 20, name: 'Aqua Park Kemer Resort', destination_key: 'kemer', location: 'Camyuva, Kemer',
    stars: 4, image: px(1287460), gallery: g([1287460, 259005, 261101, 1450389]),
    price: 41000, old_price: 55000, rating: 8.3, reviews_count: 1920,
    campaign: 'Aile İndirimi %25', badges: ['Aile Dostu', 'Aquapark', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + aquapark', beach: 'Plaja 300 m', aquapark: true, kids_club: true, airport_km: 55, beachfront: false, adults_only: false, private_beach: false },
    categories: ['family', 'budget'], capacity: 1000, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kemer\'de dev aquapark ile çocuklar için cennet.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Pool'],
    sort_order: 20,
  },
  {
    id: 21, name: 'Sirena Clifftop Resort', destination_key: 'bodrum', location: 'Yalıkavak, Bodrum',
    stars: 5, image: px(189296), gallery: g([189296, 2467558, 3997991, 1450389]),
    price: 110000, old_price: 145000, rating: 9.5, reviews_count: 690,
    campaign: 'Balayına Özel %24', badges: ['Yetişkinlere Özel', 'VIP Servis', 'Denize Sıfır'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: 'Infinity havuz', beach: 'Özel iskele', aquapark: false, kids_club: false, airport_km: 44, beachfront: true, adults_only: true, private_beach: true },
    categories: ['honeymoon', 'luxury', 'spa'], capacity: 250, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Bodrum Yalıkavak\'ta uçurum manzaralı balayı oteli.', tags: ['Romantic Suite', 'Infinity Pool', 'VIP Beach', 'Sunset Dinner'],
    sort_order: 21,
  },
  {
    id: 22, name: 'Mandarin Coast Antalya', destination_key: 'antalya', location: 'Kemer, Antalya',
    stars: 5, image: px(261395), gallery: g([261395, 1450389, 261101, 3997991]),
    price: 72000, old_price: 94000, rating: 9.0, reviews_count: 1120,
    campaign: 'Erken Rezervasyon %23', badges: ['Denize Sıfır', 'Spa & Wellness', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + kapalı', beach: 'Özel plaj', aquapark: false, kids_club: false, airport_km: 40, beachfront: true, adults_only: false, private_beach: true },
    categories: ['spa', 'beach', 'honeymoon'], capacity: 480, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Antalya\'da spa ve özel plajla huzurlu tatil.', tags: ['Spa Center', 'Wellness Pool', 'Sea View Balcony', 'Deniz Manzarası'],
    sort_order: 22,
  },
  {
    id: 23, name: 'Blue Lagoon Family Club', destination_key: 'marmaris', location: 'Turunç, Marmaris',
    stars: 4, image: px(3225531), gallery: g([3225531, 2070053, 1287460, 259005]),
    price: 36000, old_price: 47000, rating: 8.4, reviews_count: 1340,
    campaign: 'Aile İndirimi %23', badges: ['Aile Dostu', 'Ücretsiz İptal', 'Kahvaltı Dahil'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + çocuk havuzu', beach: 'Denize sıfır', aquapark: true, kids_club: true, airport_km: 88, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'budget', 'beach'], capacity: 820, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Turunç\'ta aquaparklı, bütçe dostu aile tatili.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Beach'],
    sort_order: 23,
  },
  {
    id: 24, name: 'Kyrenia Bay Luxury Resort', destination_key: 'kibris', location: 'Esentepe, Kıbrıs',
    stars: 5, image: px(1450389), gallery: g([1450389, 261101, 2021745, 189296]),
    price: 105000, old_price: 138000, rating: 9.4, reviews_count: 760,
    campaign: 'Erken Rezervasyon %24', badges: ['VIP Servis', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Ultra Her Şey Dahil', pool: 'Infinity + 3 havuz', beach: 'Özel plaj', aquapark: false, kids_club: false, airport_km: 40, beachfront: true, adults_only: true, private_beach: true },
    categories: ['luxury', 'honeymoon', 'spa'], capacity: 320, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kıbrıs Esentepe\'de yetişkinlere özel ultra lüks resort.', tags: ['Premium Suite', 'Infinity Pool', 'VIP Beach', 'Spa Merkezi'],
    sort_order: 24,
  },
  {
    id: 25, name: 'Sunset Garden Hotel', destination_key: 'antalya', location: 'Alanya, Antalya',
    stars: 4, image: px(259005), gallery: g([259005, 1287460, 3225531, 1450389]),
    price: 31000, old_price: 42000, rating: 8.1, reviews_count: 2010,
    campaign: 'Süper Fırsat %26', badges: ['Aile Dostu', 'Ücretsiz İptal', 'Kahvaltı Dahil'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Yarım Pansiyon', pool: '1 havuz + çocuk havuzu', beach: 'Plaja 350 m', aquapark: false, kids_club: true, airport_km: 120, beachfront: false, adults_only: false, private_beach: false },
    categories: ['budget', 'family'], capacity: 700, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Alanya\'da bütçe dostu, çocuk kulüplü aile oteli.', tags: ['Standard Room', 'Kids Club', 'Pool', 'Garden'],
    sort_order: 25,
  },
  {
    id: 26, name: 'Casa del Mare Boutique', destination_key: 'bodrum', location: 'Gümüşlük, Bodrum',
    stars: 5, image: px(2467558), gallery: g([2467558, 189296, 1450389, 3997991]),
    price: 68000, old_price: 85000, rating: 9.0, reviews_count: 540,
    campaign: 'Balayına Özel %20', badges: ['Yetişkinlere Özel', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Kahvaltı Dahil', pool: 'Infinity havuz', beach: 'Özel iskele', aquapark: false, kids_club: false, airport_km: 50, beachfront: true, adults_only: true, private_beach: true },
    categories: ['honeymoon', 'spa', 'beach'], capacity: 180, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Gümüşlük\'te butik, deniz manzaralı balayı oteli.', tags: ['Romantic Suite', 'Sea View Balcony', 'Infinity Pool', 'Sunset Dinner'],
    sort_order: 26,
  },
  {
    id: 27, name: 'Paloma Pegasos Resort', destination_key: 'belek', location: 'Belek, Antalya',
    stars: 5, image: px(261101), gallery: g([261101, 2021745, 1287460, 1450389]),
    price: 76000, old_price: 98000, rating: 9.1, reviews_count: 1670,
    campaign: 'Erken Rezervasyon %22', badges: ['Aile Dostu', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Ultra Her Şey Dahil', pool: '4 havuz + aquapark', beach: 'Kum plaj', aquapark: true, kids_club: true, airport_km: 35, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'beach'], capacity: 1050, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Belek\'te 4 havuz ve aquapark ile geniş aile resort.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Kum Plaj'],
    sort_order: 27,
  },
  {
    id: 28, name: 'Wellness Paradise Hotel', destination_key: 'antalya', location: 'Lara, Antalya',
    stars: 5, image: px(3997991), gallery: g([3997991, 261101, 1450389, 2467558]),
    price: 83000, old_price: 105000, rating: 9.2, reviews_count: 890,
    campaign: 'Erken Rezervasyon %21', badges: ['Spa & Wellness', 'Ücretsiz İptal', 'Denize Sıfır'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Her Şey Dahil', pool: 'Kapalı + açık havuz', beach: 'Özel plaj', aquapark: false, kids_club: false, airport_km: 12, beachfront: true, adults_only: true, private_beach: true },
    categories: ['spa', 'luxury', 'honeymoon'], capacity: 260, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Lara\'da tam donanımlı spa ve wellness merkezi.', tags: ['Spa Center', 'Massage Area', 'Wellness Pool', 'Relaxation Area'],
    sort_order: 28,
  },
  {
    id: 29, name: 'Marina Bay Bodrum Resort', destination_key: 'bodrum', location: 'Turgutreis, Bodrum',
    stars: 5, image: px(189296), gallery: g([189296, 2467558, 1450389, 261101]),
    price: 88000, old_price: 115000, rating: 9.1, reviews_count: 1020,
    campaign: 'Erken Rezervasyon %23', badges: ['VIP Servis', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Her Şey Dahil', pool: '2 havuz + infinity', beach: 'Özel iskele', aquapark: false, kids_club: false, airport_km: 47, beachfront: true, adults_only: false, private_beach: true },
    categories: ['luxury', 'beach', 'spa'], capacity: 420, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Turgutreis\'te marina manzaralı lüks resort.', tags: ['Premium Suite', 'Infinity Pool', 'VIP Beach', 'Spa Merkezi'],
    sort_order: 29,
  },
  {
    id: 30, name: 'Crystal Sea Family Park', destination_key: 'side', location: 'Kumköy, Side',
    stars: 4, image: px(1450363), gallery: g([1450363, 1287460, 261101, 259005]),
    price: 39000, old_price: 51000, rating: 8.5, reviews_count: 1750,
    campaign: 'Aile İndirimi %24', badges: ['Aile Dostu', 'Aquapark', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: false, vip: false, meal: 'Her Şey Dahil', pool: '2 havuz + aquapark', beach: 'Kum plaj', aquapark: true, kids_club: true, airport_km: 51, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'budget', 'beach'], capacity: 880, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Kumköy\'de aquapark ve kum plajla aile tatili.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Kum Plaj'],
    sort_order: 30,
  },
  {
    id: 31, name: 'Aurora Cliffs Spa Hotel', destination_key: 'kemer', location: 'Tekirova, Kemer',
    stars: 5, image: px(3997991), gallery: g([3997991, 259005, 1450389, 261101]),
    price: 94000, old_price: 122000, rating: 9.3, reviews_count: 610,
    campaign: 'Erken Rezervasyon %23', badges: ['Spa & Wellness', 'Yetişkinlere Özel', 'Denize Sıfır'],
    is_popular: false,
    features: { spa: true, vip: true, meal: 'Her Şey Dahil', pool: 'Infinity havuz', beach: 'Özel iskele', aquapark: false, kids_club: false, airport_km: 60, beachfront: true, adults_only: true, private_beach: true },
    categories: ['spa', 'luxury', 'honeymoon'], capacity: 230, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Tekirova\'da uçurum manzaralı, spa odaklı yetişkin oteli.', tags: ['Spa Center', 'Massage Area', 'Infinity Pool', 'Relaxation Area'],
    sort_order: 31,
  },
  {
    id: 32, name: 'Grand Azure Kıbrıs Resort', destination_key: 'kibris', location: 'Baf, Kıbrıs',
    stars: 5, image: px(1450389), gallery: g([1450389, 261101, 1287460, 2021745]),
    price: 63000, old_price: 80000, rating: 8.8, reviews_count: 1230,
    campaign: 'Jest Lira + Transfer', badges: ['Aile Dostu', 'Denize Sıfır', 'Ücretsiz İptal'],
    is_popular: false,
    features: { spa: true, vip: false, meal: 'Her Şey Dahil', pool: '3 havuz + çocuk havuzu', beach: 'Kum plaj', aquapark: true, kids_club: true, airport_km: 50, beachfront: true, adults_only: false, private_beach: false },
    categories: ['family', 'beach'], capacity: 780, available_months: ['Haziran 2026', 'Temmuz 2026', 'Ağustos 2026', 'Eylül 2026'],
    description: 'Baf\'ta aquapark ve çocuk kulübüyle aile tatili.', tags: ['Aile Odası', 'Aquapark', 'Kids Club', 'Kum Plaj'],
    sort_order: 32,
  },
];

export const campaigns: Campaign[] = [
  { id: 1, title: '2026 Erken Rezervasyon', highlight: "%50'ye Varan İndirim", description: "2026 yaz sezonu otellerinde erken rezervasyona özel %50'ye varan indirim, üstelik 9 taksit ve ücretsiz transfer fırsatıyla. Yerinizi şimdiden ayırtın.", badge: 'En Çok Tercih Edilen', image: px(1450389, 1200), theme: 'sunset', expires: '30 Nisan 2026', cta: 'Fırsatları Keşfet', sort_order: 1 },
  { id: 2, title: "8.500 TL'ye Varan ParafPara", highlight: 'Banka Kampanyası', description: "Touristica tatil alışverişlerinizde Paraf kartınıza 8.500 TL'ye varan ParafPara hediye. Kazandığınız ParafPara'yı tüm Paraf üye işyerlerinde kullanın.", badge: 'Banka Kampanyası', image: px(4450245, 1200), theme: 'gold', expires: '31 Aralık 2026', cta: 'Nasıl Kazanırım?', sort_order: 2 },
  { id: 3, title: 'Jest Lira Fırsatı', highlight: 'Anında Hediye', description: 'Seçili otellerde yapacağınız rezervasyonlarda anında Jest Lira kazanın; bir sonraki tatilinizde dilediğiniz gibi harcayın.', badge: 'Anında Hediye', image: px(1287460, 1200), theme: 'aqua', expires: '31 Mayıs 2026', cta: 'Kampanyalı Oteller', sort_order: 3 },
  { id: 4, title: 'Çocuklu Ailelere Özel', highlight: '2 Çocuk Ücretsiz', description: 'Seçili aile otellerinde 12 yaşa kadar 2 çocuk ücretsiz konaklar. Çocuk kulübü, aquapark ve mini diskolar tatil fiyatına dahil.', badge: 'Aile Dostu', image: px(261101, 1200), theme: 'ocean', expires: '15 Haziran 2026', cta: 'Aile Otellerini Gör', sort_order: 4 },
  { id: 5, title: 'Ücretsiz Havalimanı Transferi', highlight: 'Transfer Bizden', description: 'Erken rezervasyon döneminde yapılan tüm rezervasyonlarda gidiş-dönüş havalimanı transferi tüm misafirler için ücretsiz.', badge: 'Transfer Dahil', image: px(2021745, 1200), theme: 'leaf', expires: '31 Mayıs 2026', cta: 'Detayları Gör', sort_order: 5 },
];

export const destinations: Destination[] = [
  { id: 1, key: 'antalya', name: 'Antalya', image: px(1285625, 1000), hotels_count: 320, price_from: 18750, tagline: 'Turkuaz koylar ve antik şehirler arasında', sort_order: 1 },
  { id: 2, key: 'belek', name: 'Belek', image: px(261395, 1000), hotels_count: 112, price_from: 24900, tagline: "Golf sahaları ve lüks resort'ların kalbi", sort_order: 2 },
  { id: 3, key: 'side', name: 'Side', image: px(1450363, 1000), hotels_count: 98, price_from: 21450, tagline: "Apollon Tapınağı'nın gölgesinde altın kumlar", sort_order: 3 },
  { id: 4, key: 'bodrum', name: 'Bodrum', image: px(2467558, 1000), hotels_count: 87, price_from: 26300, tagline: 'Beyaz evler, marinalar ve Ege esintisi', sort_order: 4 },
  { id: 5, key: 'marmaris', name: 'Marmaris', image: px(3225531, 1000), hotels_count: 64, price_from: 19950, tagline: 'Çam ormanlarının denizle buluştuğu koy', sort_order: 5 },
  { id: 6, key: 'kemer', name: 'Kemer', image: px(259005, 1000), hotels_count: 76, price_from: 22600, tagline: "Toroslar'ın eteğinde mavi bayraklı plajlar", sort_order: 6 },
  { id: 7, key: 'kibris', name: 'Kıbrıs', image: px(189296, 1000), hotels_count: 54, price_from: 27800, tagline: "Akdeniz'in incisi, yıl boyu güneş", sort_order: 7 },
  { id: 8, key: 'cruise', name: 'Cruise Turları', image: px(165874, 1000), hotels_count: 18, price_from: 32500, tagline: "Ege ve Akdeniz'in koylarında yüzen oteller", sort_order: 8 },
];

export const reviews: Review[] = [
  { id: 1, name: 'Elif Sarıkaya', avatar: px(415829, 200), rating: 5, title: 'Rezervasyondan dönüşe kadar kusursuz', text: 'İlk kez internet üzerinden değil danışmanla tatil aldık. Derya Hanım her detayı düşündü, otele vardığımızda bizi deniz manzaralı odaya yükseltme sürprizi bekliyordu. Kesinlikle tekrarlanacak.', hotel: 'Azure Crown Palace, Belek', trip: 'Ağustos 2025 · Aile tatili', verified: true },
  { id: 2, name: 'Ahmet Yıldırım', avatar: px(220453, 200), rating: 4.5, title: 'Fiyatlar gerçekten daha avantajlı', text: 'Aynı oteli üç farklı yerden araştırdım, Touristica\'nın erken rezervasyon fiyatı açık ara en iyisiydi. 9 taksit ve ücretsiz transfer de cabası. Tekrar tercih edeceğim.', hotel: 'Vista Mare Bodrum', trip: 'Haziran 2025 · Arkadaşlarla', verified: true },
  { id: 3, name: 'Selin & Emre Demirtaş', avatar: px(1239291, 200), rating: 5, title: 'Balayı için mükemmel bir seçimdi', text: 'Balayı denince hiç riske girmedik; danışmanımızın önerisiyle Santa Mare\'yi seçtik. Sonsuzluk havuzunda gün batımı tarif edilemez. Her şey düşünülmüştü, teşekkürler Touristica.', hotel: 'Santa Mare Deluxe, Side', trip: 'Temmuz 2025 · Balayı', verified: true },
  { id: 4, name: 'Nurgül Kaya', avatar: px(762020, 200), rating: 5, title: 'Üç çocukla stressiz bir tatil', text: 'Üç çocuklu bir anne olarak ilk kez gerçekten dinlenebildim. Çocuk kulübü ve aquapark harika; akşamları mini disko olmadan uyumuyorlar artık. Transfer de dakikti, aklınız kalmasın.', hotel: 'Golden Palm Resort, Kıbrıs', trip: 'Ağustos 2025 · Aile tatili', verified: true },
];

export const stats: Stats = {
  hotels_available: 120,
  campaigns_active: 26,
  prices_checked_minutes: 5,
  hotels_updated_today: 42,
};

export const destinationsForPlanner = [
  { key: 'all', name: 'Antalya (tüm bölgeler)' },
  { key: 'antalya', name: 'Antalya' },
  { key: 'belek', name: 'Belek' },
  { key: 'side', name: 'Side' },
  { key: 'bodrum', name: 'Bodrum' },
  { key: 'marmaris', name: 'Marmaris' },
  { key: 'kemer', name: 'Kemer' },
  { key: 'kibris', name: 'Kıbrıs' },
];

export const months = [
  'Haziran 2026',
  'Temmuz 2026',
  'Ağustos 2026',
  'Eylül 2026',
];

export const tripTypes = [
  { key: 'family', label: 'Aile Dostu', icon: 'Users', desc: 'Çocuk kulübü & aqua' },
  { key: 'honeymoon', label: 'Balayı', icon: 'Heart', desc: 'Romantik kaçamak' },
  { key: 'luxury', label: 'Lüks', icon: 'Crown', desc: 'VIP ayrıcalıklar' },
  { key: 'budget', label: 'Ekonomik', icon: 'Wallet', desc: 'Bütçe dostu' },
  { key: 'spa', label: 'Relax & Spa', icon: 'Sparkles', desc: 'Huzur & wellness' },
  { key: 'beach', label: 'Her Şey Dahil', icon: 'Waves', desc: 'Hepsi bir pakette' },
];

export const featureLabels: Record<string, string> = {
  kids_club: 'Çocuk Kulübü',
  aquapark: 'Aquapark',
  beachfront: 'Denize Sıfır',
  adults_only: 'Yetişkinlere Özel',
  private_beach: 'Özel Plaj',
  spa: 'Spa & wellness merkezi',
  vip: 'VIP ayrıcalıklar',
};

export const formatTRY = (n: number) =>
  new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 0 }).format(Number(n));

export const formatMonthly = (price: number) => formatTRY(Math.round(Number(price) / 9));
