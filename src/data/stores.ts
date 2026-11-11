export type StoreCategory =
  | "Fashion"
  | "Food & Dining"
  | "Banks & Finance"
  | "Health & Beauty"
  | "Electronics & Tech"
  | "Home & Furniture"
  | "Entertainment"
  | "Services"
  | "Other";

export interface Store {
  id: string;
  name: string;
  shopNumber: string;
  phone?: string;
  email?: string;
  category: StoreCategory;
  description?: string;
  mapX?: number;
  mapY?: number;
}

export const stores: Store[] = [
  { id: "eswatini-bank", name: "Eswatini Bank", shopNumber: "34", phone: "+268 7602 6202", email: "swazibank@swazibank.co.sz", category: "Banks & Finance", mapX: 22, mapY: 35 },
  { id: "standard-bank", name: "Standard Bank Limited Eswatini", shopNumber: "35-37", phone: "+268 7602 6718", category: "Banks & Finance", mapX: 28, mapY: 35 },
  { id: "nedbank", name: "Nedbank", shopNumber: "40", phone: "+268 2404 8249", category: "Banks & Finance", mapX: 35, mapY: 38 },
  { id: "eswatini-building-society", name: "Eswatini Building Society", shopNumber: "43-47", phone: "+268 2416 1913", email: "ezulwini@sbs.co.sz", category: "Banks & Finance", mapX: 42, mapY: 40 },
  { id: "fnb", name: "FNB", shopNumber: "—", email: "Sibusiso.Gwadze@fnb.co.sz", category: "Banks & Finance", mapX: 48, mapY: 36 },
  { id: "mtn", name: "MTN", shopNumber: "06", phone: "+268 7606 1600", category: "Electronics & Tech", mapX: 15, mapY: 55 },
  { id: "eswatini-mobile", name: "Eswatini Mobile", shopNumber: "22", phone: "+268 7901 1000", email: "sibusiso.gwebu@swazimobile.com", category: "Electronics & Tech", mapX: 18, mapY: 60 },
  { id: "pick-n-pay-clothing", name: "Pick n Pay Clothing", shopNumber: "03", phone: "+268 7802 6816", category: "Fashion", mapX: 55, mapY: 25 },
  { id: "pick-n-pay", name: "Pick n Pay", shopNumber: "04", phone: "+268 7802 6816", category: "Food & Dining", description: "Full-service supermarket", mapX: 60, mapY: 28 },
  { id: "clicks", name: "Clicks", shopNumber: "29", phone: "+268 2416 2751", category: "Health & Beauty", mapX: 50, mapY: 45 },
  { id: "shoprite-bottle", name: "Shoprite Checkers Bottle Store", shopNumber: "G18", phone: "+268 2416 3349", category: "Food & Dining", mapX: 70, mapY: 50 },
  { id: "shoprite", name: "Shoprite", shopNumber: "G19-G20", phone: "+268 2416 3441", email: "037417@shoprite.co.za", category: "Food & Dining", description: "Major grocery anchor", mapX: 75, mapY: 52 },
  { id: "woolworths", name: "Woolworths", shopNumber: "24", phone: "+268 2416 2087", email: "PercyHealy@woolworths.co.za", category: "Fashion", description: "Premium fashion & food", mapX: 45, mapY: 22 },
  { id: "movie-zone", name: "Movie Zone", shopNumber: "11 & 12", phone: "+268 7602 2890", email: "moviezonethegables@gmail.com", category: "Entertainment", description: "Cinema & entertainment", mapX: 30, mapY: 70 },
  { id: "jet", name: "Jet", shopNumber: "G36", phone: "+268 2416 1618", category: "Fashion", mapX: 65, mapY: 35 },
  { id: "pep", name: "Pep", shopNumber: "G38", phone: "+268 2416 1349", category: "Fashion", mapX: 68, mapY: 38 },
  { id: "studio-88", name: "Studio 88", shopNumber: "G50", phone: "+268 7699 8074", email: "Graeme@studio-88.co.za", category: "Fashion", mapX: 72, mapY: 30 },
  { id: "miladys", name: "Milady's", shopNumber: "G34", phone: "+268 2417 1458", category: "Fashion", mapX: 58, mapY: 40 },
  { id: "mr-price", name: "Mr Price Apparel", shopNumber: "G56", phone: "+268 2417 1881", category: "Fashion", mapX: 80, mapY: 32 },
  { id: "foschini", name: "Foschini", shopNumber: "G72", phone: "+268 7647 6313", category: "Fashion", mapX: 82, mapY: 42 },
  { id: "exact", name: "Exact!", shopNumber: "G76", phone: "+268 2416 3067", category: "Fashion", mapX: 85, mapY: 45 },
  { id: "sportscene", name: "Sportscene", shopNumber: "G78", phone: "+268 7850 4141", category: "Fashion", mapX: 78, mapY: 48 },
  { id: "markham", name: "Markham", shopNumber: "G80", phone: "+268 7863 3512", category: "Fashion", mapX: 88, mapY: 40 },
  { id: "footgear", name: "Footgear", shopNumber: "G82", phone: "+268 3460 1057", category: "Fashion", mapX: 90, mapY: 50 },
  { id: "the-fix", name: "The Fix", shopNumber: "G40", phone: "+268 2416 1747", category: "Fashion", mapX: 62, mapY: 55 },
  { id: "shebas-rock-spur", name: "Shebas Rock Spur", shopNumber: "01", phone: "+268 7602 0008", email: "shebasrock@ninggroup.com", category: "Food & Dining", mapX: 20, mapY: 20 },
  { id: "oryx", name: "Oryx Restaurant", shopNumber: "14 & 15", phone: "+268 7835 4931", category: "Food & Dining", mapX: 25, mapY: 25 },
  { id: "debonairs", name: "Debonairs", shopNumber: "17", phone: "+268 7602 0008", category: "Food & Dining", mapX: 32, mapY: 28 },
  { id: "char-co", name: "Char.co Restaurant", shopNumber: "21", phone: "+268 7811 6648", email: "char.co.rest@gmail.com", category: "Food & Dining", mapX: 38, mapY: 30 },
  { id: "mugg-bean", name: "Mugg & Bean", shopNumber: "G58", phone: "+268 7644 6464", email: "gablesmug@outlook.com", category: "Food & Dining", mapX: 55, mapY: 60 },
  { id: "amigos", name: "Amigos Restaurant", shopNumber: "Cd106 & 107", phone: "+268 7606 0211", category: "Food & Dining", mapX: 40, mapY: 65 },
  { id: "kfc", name: "KFC Drive Thru", shopNumber: "SH100", phone: "+268 2416 2917", email: "kfc@gables.co.sz", category: "Food & Dining", mapX: 10, mapY: 80 },
  { id: "waterman", name: "Waterman", shopNumber: "07", phone: "+268 7671 6139", email: "operations@waterman-sd.com", category: "Services", mapX: 12, mapY: 45 },
  { id: "essence-of-life", name: "Essence of Life Salon", shopNumber: "09", phone: "+268 7604 5323", category: "Health & Beauty", mapX: 16, mapY: 48 },
  { id: "royal-tirta", name: "The Royal Tirta Ayu Spa", shopNumber: "G62", phone: "+268 7979 4033", category: "Health & Beauty", mapX: 70, mapY: 65 },
  { id: "health-shop", name: "The Health Shop", shopNumber: "G70", phone: "+268 7851 8940", category: "Health & Beauty", mapX: 75, mapY: 68 },
  { id: "american-swiss", name: "American Swiss Jewellers", shopNumber: "G86", phone: "+268 7850 4141", category: "Other", mapX: 92, mapY: 55 },
  { id: "ok-furniture", name: "OK Furniture", shopNumber: "G34", phone: "+268 2416 2141", category: "Home & Furniture", mapX: 52, mapY: 50 },
  { id: "sheet-street", name: "Sheet Street", shopNumber: "G52", phone: "+268 7830 5313", category: "Home & Furniture", mapX: 66, mapY: 58 },
  { id: "florist", name: "The Florist Shop", shopNumber: "G68", phone: "+268 7628 4229", category: "Other", mapX: 78, mapY: 62 },
];

export const categories: StoreCategory[] = [
  "Fashion", "Food & Dining", "Banks & Finance", "Health & Beauty",
  "Electronics & Tech", "Home & Furniture", "Entertainment", "Services", "Other",
];

export function searchStores(query: string, list: Store[] = stores): Store[] {
  if (!query.trim()) return list;
  const q = query.toLowerCase().trim();
  return list.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.shopNumber.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      (s.description?.toLowerCase().includes(q) ?? false)
  );
}
