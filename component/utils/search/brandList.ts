
export interface ConsolidatedBrand {
  label: string;
  value: string;
  count: number;
  icon?: string;
  originCategory: string;
}


export const ALL_BRANDS: ConsolidatedBrand[] = [
  // VEHICLES
  { label: 'Toyota', value: 'Toyota', count: 5420, icon: '🚗', originCategory: 'vehicles' },
  { label: 'Innoson(IVM)', value: 'Innoson', count: 450, icon: '🚐', originCategory: 'vehicles' },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz', count: 2450, icon: '🏎️', originCategory: 'vehicles' },
  { label: 'Honda', value: 'Honda', count: 1890, icon: '🚙', originCategory: 'vehicles' },
  { label: 'Lexus', value: 'Lexus', count: 3180, icon: '🚘', originCategory: 'vehicles' },
  { label: 'Hyundai', value: 'Hyundai', count: 2150, icon: '🚗', originCategory: 'vehicles' },
  { label: 'Kia', value: 'Kia', count: 1950, icon: '🚙', originCategory: 'vehicles' },
  { label: 'Ford', value: 'Ford', count: 1400, icon: '🚘', originCategory: 'vehicles' },
  { label: 'Peugeot', value: 'Peugeot', count: 1250, icon: '🚗', originCategory: 'vehicles' },
  { label: 'Nissan', value: 'Nissan', count: 1700, icon: '🚙', originCategory: 'vehicles' },
  { label: 'Mitsubishi', value: 'Mitsubishi', count: 980, icon: '🚐', originCategory: 'vehicles' },
  { label: 'Suzuki', value: 'Suzuki', count: 860, icon: '🚗', originCategory: 'vehicles' },
  { label: 'Volkswagen', value: 'Volkswagen', count: 1550, icon: '🚘', originCategory: 'vehicles' },
  { label: 'BMW', value: 'BMW', count: 2400, icon: '🏎️', originCategory: 'vehicles' },
  { label: 'GAC', value: 'GAC', count: 600, icon: '🚗', originCategory: 'vehicles' },

  // PHONES & TABLETS
  { label: 'Apple', value: 'Apple', count: 18200, icon: '🍏', originCategory: 'phones-tablets' },
  { label: 'Samsung', value: 'Samsung', count: 14500, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Infinix', value: 'Infinix', count: 8900, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Tecno', value: 'Tecno', count: 9200, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Itel', value: 'Itel', count: 7500, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Xiaomi', value: 'Xiaomi', count: 4100, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Google Pixel', value: 'Google', count: 2400, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Huawei', value: 'Huawei', count: 3200, icon: '📱', originCategory: 'phones-tablets' },
  { label: 'Lenovo', value: 'Lenovo', count: 4100, icon: '💻', originCategory: 'phones-tablets' },
  { label: 'Asus', value: 'Asus', count: 2200, icon: '💻', originCategory: 'phones-tablets' },
  { label: 'Acer', value: 'Acer', count: 1900, icon: '💻', originCategory: 'phones-tablets' },
  { label: 'Nokia', value: 'Nokia', count: 3800, icon: '📱', originCategory: 'phones-tablets' },

  // ELECTRONICS
  { label: 'Microsoft', value: 'Microsoft', count: 9200, icon: '🖥️', originCategory: 'electronics' },
  { label: 'Intel', value: 'Intel', count: 6200, icon: '💻', originCategory: 'electronics' },
  { label: 'AMD', value: 'AMD', count: 3500, icon: '💻', originCategory: 'electronics' },
  { label: 'NVIDIA', value: 'NVIDIA', count: 4200, icon: '🎮', originCategory: 'electronics' },
  { label: 'Hisense', value: 'Hisense', count: 12500, icon: '📺', originCategory: 'electronics' },
  { label: 'LG', value: 'LG', count: 11200, icon: '🔌', originCategory: 'electronics' },
  { label: 'HP', value: 'HP', count: 8500, icon: '💻', originCategory: 'electronics' },
  { label: 'Dell', value: 'Dell', count: 7100, icon: '💻', originCategory: 'electronics' },
  { label: 'Oraimo', value: 'Oraimo', count: 9500, icon: '🔋', originCategory: 'electronics' },
  { label: 'Sony', value: 'Sony', count: 200, icon: '🔋', originCategory: 'electronics' },

  // HOME, FURNITURE & APPLIANCES
  { label: 'Haier Thermocool', value: 'Haier-Thermocool', count: 14200, icon: '🧊', originCategory: 'home-furniture' },
  { label: 'Scanfrost', value: 'Scanfrost', count: 7400, icon: '❄️', originCategory: 'home-furniture' },
  { label: 'Nexus', value: 'Nexus', count: 6800, icon: '🍳', originCategory: 'home-furniture' },
  { label: 'Binatone', value: 'Binatone', count: 6300, icon: '🔌', originCategory: 'home-furniture' },
  { label: 'Royal', value: 'Royal', count: 5200, icon: '📺', originCategory: 'home-furniture' },

  // FASHION
  { label: 'Nike', value: 'Nike', count: 8400, icon: '👟', originCategory: 'fashion' },
  { label: 'Adidas', value: 'Adidas', count: 7200, icon: '👟', originCategory: 'fashion' },

  // BEAUTY & PERSONAL CARE
  { label: 'Nivea', value: 'Nivea', count: 8200, icon: '🧴', originCategory: 'beauty-personal-care' },
  { label: 'Zikel', value: 'Zikel', count: 2100, icon: '💄', originCategory: 'beauty-personal-care' },

  // FOOD, AGRICULTURE & FARMING
  { label: 'Dangote', value: 'Dangote', count: 15000, icon: '🏭', originCategory: 'food-agriculture' },
  { label: 'Dufil(Indomie)', value: 'Dufil', count: 12000, icon: '🍜', originCategory: 'food-agriculture' },
  { label: 'Coca-Cola', value: 'Coca-Cola', count: 9800, icon: '🥤', originCategory: 'food-agriculture' },
  { label: 'BUA Foods', value: 'BUA', count: 8500, icon: '🌾', originCategory: 'food-agriculture' },
  { label: 'CWAY', value: 'CWAY', count: 4200, icon: '💧', originCategory: 'food-agriculture' },
  { label: 'Nestlé', value: 'Nestle', count: 14800, icon: '🥛', originCategory: 'food-agriculture' },
  { label: 'Unilever', value: 'Unilever', count: 13500, icon: '🧼', originCategory: 'food-agriculture' },
  { label: 'Golden Penny', value: 'Golden-Penny', count: 12500, icon: '🌾', originCategory: 'food-agriculture' },
  { label: 'Peak Milk', value: 'Peak', count: 9700, icon: '🥛', originCategory: 'food-agriculture' },
  { label: 'Milo', value: 'Milo', count: 8400, icon: '🍫', originCategory: 'food-agriculture' },
  { label: 'Power-Oil', value: 'Power-Oil', count: 6200, icon: '🛢️', originCategory: 'food-agriculture' },
  { label: 'Mamador', value: 'Mamador', count: 7100, icon: '🍳', originCategory: 'food-agriculture' },
  { label: 'Honeywell', value: 'Honeywell', count: 6400, icon: '🌾', originCategory: 'food-agriculture' },
  { label: 'FrieslandCampina-(Three Crowns)', value: 'Three-Crowns', count: 6900, icon: '🥛', originCategory: 'food-agriculture' },

  // SERVICES
  { label: 'MTN', value: 'MTN', count: 20000, icon: '🌐', originCategory: 'services' },
  { label: 'Airtel', value: 'Airtel', count: 18000, icon: '🌐', originCategory: 'services' },
  { label: 'Globacom', value: 'Glo', count: 15000, icon: '🌐', originCategory: 'services' },
  { label: 'OPay', value: 'OPay', count: 25000, icon: '💳', originCategory: 'services' },
  { label: 'Moniepoint', value: 'Moniepoint', count: 12000, icon: '💳', originCategory: 'services' },
  { label: 'Acces- Bank', value: 'Access', count: 9500, icon: '🏦', originCategory: 'services' },
  { label: 'Zenith-Bank', value: 'Zenith', count: 9200, icon: '🏦', originCategory: 'services' },
  { label: 'First-Bank', value: 'FirstBank', count: 9100, icon: '🏦', originCategory: 'services' },
  { label: '9mobile', value: '9mobile', count: 5200, icon: '🌐', originCategory: 'services' },
  { label: 'UBA', value: 'UBA', count: 9200, icon: '🏦', originCategory: 'services' },
  { label: 'GTBank', value: 'GTBank', count: 11000, icon: '🏦', originCategory: 'services' },
  { label: 'Fidelity-Bank', value: 'Fidelity', count: 5400, icon: '🏦', originCategory: 'services' },
  { label: 'Stanbic-IBTC', value: 'Stanbic', count: 5100, icon: '🏦', originCategory: 'services' },
  { label: 'PalmPay', value: 'PalmPay', count: 16000, icon: '💳', originCategory: 'services' },
  { label: 'Kuda-Bank', value: 'Kuda', count: 9200, icon: '💳', originCategory: 'services' },
  { label: 'FairMoney', value: 'FairMoney', count: 7400, icon: '💳', originCategory: 'services' },

  // REPAIR & CONSTRUCTION
  { label: 'Julius Berger', value: 'Julius-Berger', count: 3200, icon: '🏗️', originCategory: 'repair-construction' },
  { label: 'Vitafoam', value: 'Vitafoam', count: 4800, icon: '🛏️', originCategory: 'repair-construction' },
  { label: 'Dangote Cement', value: 'Dangote-Cement', count: 11000, icon: '🏗️', originCategory: 'repair-construction' },
  { label: 'Lafarge', value: 'Lafarge', count: 7600, icon: '🏗️', originCategory: 'repair-construction' },
  { label: 'BUA Cement', value: 'BUA-Cement', count: 7200, icon: '🏗️', originCategory: 'repair-construction' },
  { label: 'Mikano', value: 'Mikano', count: 3400, icon: '🏭', originCategory: 'repair-construction' },
  { label: 'Tower Aluminium', value: 'Tower-Aluminium', count: 2600, icon: '🏢', originCategory: 'repair-construction' },
];