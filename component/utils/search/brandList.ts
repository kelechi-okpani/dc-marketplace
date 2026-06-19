import { Brand } from "../types";



export const ALL_BRANDS: Brand[] = [
  // VEHICLES (id: 1)
  { label: 'Toyota', value: 'Toyota', count: 5420, icon: '🚗', categoryId: 1 },
  { label: 'Lexus', value: 'Lexus', count: 3180, icon: '🚘', categoryId: 1 },
  { label: 'Mercedes-Benz', value: 'Mercedes-Benz', count: 2450, icon: '🏎️', categoryId: 1 },
  { label: 'BMW', value: 'BMW', count: 2400, icon: '🏎️', categoryId: 1 },
  { label: 'Hyundai', value: 'Hyundai', count: 2150, icon: '🚗', categoryId: 1 },
  { label: 'Kia', value: 'Kia', count: 1950, icon: '🚙', categoryId: 1 },
  { label: 'Honda', value: 'Honda', count: 1890, icon: '🚙', categoryId: 1 },
  { label: 'Nissan', value: 'Nissan', count: 1700, icon: '🚙', categoryId: 1 },
  { label: 'Volkswagen', value: 'Volkswagen', count: 1550, icon: '🚘', categoryId: 1 },
  { label: 'Ford', value: 'Ford', count: 1400, icon: '🚘', categoryId: 1 },
  { label: 'Peugeot', value: 'Peugeot', count: 1250, icon: '🚗', categoryId: 1 },
  { label: 'Mitsubishi', value: 'Mitsubishi', count: 980, icon: '🚐', categoryId: 1 },
  { label: 'Suzuki', value: 'Suzuki', count: 860, icon: '🚗', categoryId: 1 },
  { label: 'GAC', value: 'GAC', count: 600, icon: '🚗', categoryId: 1 },
  { label: 'Innoson(IVM)', value: 'Innoson', count: 450, icon: '🚐', categoryId: 1 },

  // PHONES & TABLETS (id: 3)
  { label: 'Apple', value: 'Apple', count: 18200, icon: '🍏', categoryId: 3 },
  { label: 'Samsung', value: 'Samsung', count: 14500, icon: '📱', categoryId: 3 },
  { label: 'Tecno', value: 'Tecno', count: 9200, icon: '📱', categoryId: 3 },
  { label: 'Infinix', value: 'Infinix', count: 8900, icon: '📱', categoryId: 3 },
  { label: 'Itel', value: 'Itel', count: 7500, icon: '📱', categoryId: 3 },
  { label: 'Xiaomi', value: 'Xiaomi', count: 4100, icon: '📱', categoryId: 3 },
  { label: 'Lenovo', value: 'Lenovo', count: 4100, icon: '💻', categoryId: 3 },
  { label: 'Nokia', value: 'Nokia', count: 3800, icon: '📱', categoryId: 3 },
  { label: 'Huawei', value: 'Huawei', count: 3200, icon: '📱', categoryId: 3 },
  { label: 'Google Pixel', value: 'Google', count: 2400, icon: '📱', categoryId: 3 },
  { label: 'Asus', value: 'Asus', count: 2200, icon: '💻', categoryId: 3 },
  { label: 'Acer', value: 'Acer', count: 1900, icon: '💻', categoryId: 3 },

  // ELECTRONICS (id: 4)
  { label: 'Hisense', value: 'Hisense', count: 12500, icon: '📺', categoryId: 4 },
  { label: 'LG', value: 'LG', count: 11200, icon: '🔌', categoryId: 4 },
  { label: 'Oraimo', value: 'Oraimo', count: 9500, icon: '🔋', categoryId: 4 },
  { label: 'Microsoft', value: 'Microsoft', count: 9200, icon: '🖥️', categoryId: 4 },
  { label: 'HP', value: 'HP', count: 8500, icon: '💻', categoryId: 4 },
  { label: 'Dell', value: 'Dell', count: 7100, icon: '💻', categoryId: 4 },
  { label: 'Intel', value: 'Intel', count: 6200, icon: '💻', categoryId: 4 },
  { label: 'NVIDIA', value: 'NVIDIA', count: 4200, icon: '🎮', categoryId: 4 },
  { label: 'AMD', value: 'AMD', count: 3500, icon: '💻', categoryId: 4 },
  { label: 'Sony', value: 'Sony', count: 200, icon: '🔋', categoryId: 4 },

  // HOME, FURNITURE & APPLIANCES (id: 5)
  { label: 'Haier Thermocool', value: 'Haier-Thermocool', count: 14200, icon: '🧊', categoryId: 5 },
  { label: 'Scanfrost', value: 'Scanfrost', count: 7400, icon: '❄️', categoryId: 5 },
  { label: 'Nexus', value: 'Nexus', count: 6800, icon: '🍳', categoryId: 5 },
  { label: 'Binatone', value: 'Binatone', count: 6300, icon: '🔌', categoryId: 5 },
  { label: 'Royal', value: 'Royal', count: 5200, icon: '📺', categoryId: 5 },



  // FASHION (id: 6)
  { label: 'Nike', value: 'Nike', count: 8500, icon: '👟', categoryId: 6 },
  { label: 'Adidas', value: 'Adidas', count: 7200, icon: '👟', categoryId: 6 },
  { label: 'Zara', value: 'Zara', count: 5400, icon: '👕', categoryId: 6 },
  { label: 'Gucci', value: 'Gucci', count: 4800, icon: '👜', categoryId: 6 },
  { label: 'Louis Vuitton', value: 'Louis-Vuitton', count: 4200, icon: '👜', categoryId: 6 },
  { label: 'Puma', value: 'Puma', count: 3900, icon: '👟', categoryId: 6 },
  { label: 'Versace', value: 'Versace', count: 3100, icon: '👔', categoryId: 6 },
  { label: 'H&M', value: 'HM', count: 2800, icon: '👕', categoryId: 6 },
  { label: 'Ralph Lauren', value: 'Ralph-Lauren', count: 2500, icon: '👔', categoryId: 6 },
  { label: 'Levis', value: 'Levis', count: 2200, icon: '👖', categoryId: 6 },
  { label: 'Rolex', value: 'Rolex', count: 1800, icon: '⌚', categoryId: 6 },
  { label: 'Casio', value: 'Casio', count: 1500, icon: '⌚', categoryId: 6 },
  { label: 'Fossil', value: 'Fossil', count: 1200, icon: '⌚', categoryId: 6 },



  // BEAUTY & PERSONAL CARE (id: 7)
  { label: 'Nivea', value: 'Nivea', count: 6200, icon: '🧴', categoryId: 7 },
  { label: 'CeraVe', value: 'CeraVe', count: 200, icon: '🌿', categoryId: 7 },
  { label: 'Loréal', value: 'Loreal', count: 6800, icon: '💄', categoryId: 7 },
  { label: 'Estée Lauder', value: 'Estee-Lauder', count: 4500, icon: '✨', categoryId: 7 },
  { label: 'Dove', value: 'Dove', count: 4100, icon: '🧼', categoryId: 7 },
  { label: 'Maybelline', value: 'Maybelline', count: 3800, icon: '💄', categoryId: 7 },
  { label: 'Clinique', value: 'Clinique', count: 3200, icon: '🧴', categoryId: 7 },
  { label: 'Avon', value: 'Avon', count: 2900, icon: '💄', categoryId: 7 },
  { label: 'Garnier', value: 'Garnier', count: 2600, icon: '🌿', categoryId: 7 },
  { label: 'Revlon', value: 'Revlon', count: 2400, icon: '💄', categoryId: 7 },
  { label: 'Neutrogena', value: 'Neutrogena', count: 2200, icon: '🧴', categoryId: 7 },
  { label: 'MAC', value: 'MAC', count: 1800, icon: '💄', categoryId: 7 },
  { label: 'Vaseline', value: 'Vaseline', count: 1600, icon: '🧴', categoryId: 7 },


// COMMERCIAL EQUIPMENT & TOOLS (id: 10)
  { label: 'Bosch', value: 'Bosch', count: 4200, icon: '🛠️', categoryId: 10 },
  { label: 'Makita', value: 'Makita', count: 3800, icon: '🔧', categoryId: 10 },
  { label: 'DeWalt', value: 'DeWalt', count: 3500, icon: '🪚', categoryId: 10 },
  { label: 'Caterpillar', value: 'Caterpillar', count: 2800, icon: '🚜', categoryId: 10 },
  { label: 'Stanley', value: 'Stanley', count: 2400, icon: '🛠️', categoryId: 10 },
  { label: 'Black+Decker', value: 'Black-Decker', count: 2100, icon: '🔧', categoryId: 10 },
  { label: 'Hitachi', value: 'Hitachi', count: 1900, icon: '⚡', categoryId: 10 },
  { label: 'Schneider Electric', value: 'Schneider', count: 1700, icon: '🔌', categoryId: 10 },
  { label: 'Lincoln Electric', value: 'Lincoln', count: 1200, icon: '🔥', categoryId: 10 },
  { label: 'Ingersoll Rand', value: 'Ingersoll', count: 950, icon: '⚙️', categoryId: 10 },


  // FOOD, AGRICULTURE & FARMING (id: 13)
  { label: 'Dangote', value: 'Dangote', count: 15000, icon: '🏭', categoryId: 13 },
  { label: 'Nestlé', value: 'Nestle', count: 14800, icon: '🥛', categoryId: 13 },
  { label: 'Unilever', value: 'Unilever', count: 13500, icon: '🧼', categoryId: 13 },
  { label: 'Golden Penny', value: 'Golden-Penny', count: 12500, icon: '🌾', categoryId: 13 },
  { label: 'Dufil(Indomie)', value: 'Dufil', count: 12000, icon: '🍜', categoryId: 13 },
  { label: 'Coca-Cola', value: 'Coca-Cola', count: 9800, icon: '🥤', categoryId: 13 },
  { label: 'Peak Milk', value: 'Peak', count: 9700, icon: '🥛', categoryId: 13 },
  { label: 'BUA Foods', value: 'BUA', count: 8500, icon: '🌾', categoryId: 13 },
  { label: 'Milo', value: 'Milo', count: 8400, icon: '🍫', categoryId: 13 },
  { label: 'Mamador', value: 'Mamador', count: 7100, icon: '🍳', categoryId: 13 },
  { label: 'Three Crowns', value: 'Three-Crowns', count: 6900, icon: '🥛', categoryId: 13 },
  { label: 'Honeywell', value: 'Honeywell', count: 6400, icon: '🌾', categoryId: 13 },
  
  
  { label: 'Power-Oil', value: 'Power-Oil', count: 6200, icon: '🛢️', categoryId: 13 },
  { label: 'CWAY', value: 'CWAY', count: 4200, icon: '💧', categoryId: 13 },



  // REPAIR & CONSTRUCTION (id: 9)
  { label: 'Dangote Cement', value: 'Dangote-Cement', count: 11000, icon: '🏗️', categoryId: 9 },
  { label: 'Lafarge', value: 'Lafarge', count: 7600, icon: '🏗️', categoryId: 9 },
  { label: 'BUA Cement', value: 'BUA-Cement', count: 7200, icon: '🏗️', categoryId: 9 },
  { label: 'Vitafoam', value: 'Vitafoam', count: 4800, icon: '🛏️', categoryId: 9 },
  { label: 'Mikano', value: 'Mikano', count: 3400, icon: '🏭', categoryId: 9 },
  { label: 'Julius Berger', value: 'Julius-Berger', count: 3200, icon: '🏗️', categoryId: 9 },
  { label: 'Tower Aluminium', value: 'Tower-Aluminium', count: 2600, icon: '🏢', categoryId: 9 },



  // LEISURE & ACTIVITIES (id: 11)
  { label: 'Wilson', value: 'Wilson', count: 2100, icon: '⚽', categoryId: 11 },
  { label: 'Yamaha', value: 'Yamaha', count: 1800, icon: '🎸', categoryId: 11 },
  { label: 'Canon', value: 'Canon', count: 1500, icon: '📷', categoryId: 11 },
  { label: 'Nintendo', value: 'Nintendo', count: 1200, icon: '🎮', categoryId: 11 },

  // BABIES & KIDS (id: 12)
  { label: 'Huggies', value: 'Huggies', count: 4500, icon: '👶', categoryId: 12 },
  { label: 'Pampers', value: 'Pampers', count: 4200, icon: '👶', categoryId: 12 },
  { label: 'Chicco', value: 'Chicco', count: 2800, icon: '🍼', categoryId: 12 },
  { label: 'Fisher-Price', value: 'Fisher-Price', count: 2400, icon: '🧸', categoryId: 12 },
  { label: 'Graco', value: 'Graco', count: 1900, icon: '🚼', categoryId: 12 },

  // ANIMALS & PETS (id: 14)
  { label: 'Royal Canin', value: 'Royal-Canin', count: 3200, icon: '🐾', categoryId: 14 },
  { label: 'Purina', value: 'Purina', count: 2800, icon: '🐕', categoryId: 14 },
  { label: 'Pedigree', value: 'Pedigree', count: 2500, icon: '🐕', categoryId: 14 },

  // JOBS (id: 15)
  { label: 'Dangote Group', value: 'Dangote', count: 2500, icon: '💼', categoryId: 15 },
  { label: 'GTBank', value: 'GTB', count: 2100, icon: '🏦', categoryId: 15 },
  { label: 'MTN Nigeria', value: 'MTN', count: 1800, icon: '📶', categoryId: 15 },
  { label: 'Chevron', value: 'Chevron', count: 1200, icon: '🛢️', categoryId: 15 },

  // SEEKING WORK - CVs (id: 16)
  { label: 'Chartered Accountant', value: 'ACCA', count: 1500, icon: '📊', categoryId: 16 },
  { label: 'Project Management', value: 'PMP', count: 1200, icon: '📋', categoryId: 16 },
  { label: 'Software Engineer', value: 'Developer', count: 1100, icon: '💻', categoryId: 16 },




  // HEALTH & MEDICAL (id: 17) - New Category
  { label: 'Pfizer', value: 'Pfizer', count: 3200, icon: '💊', categoryId: 17 },
  { label: 'GlaxoSmithKline', value: 'GSK', count: 2800, icon: '💊', categoryId: 17 },
  { label: 'Emzor', value: 'Emzor', count: 4500, icon: '💊', categoryId: 17 },
  { label: 'May & Baker', value: 'May-Baker', count: 1500, icon: '💊', categoryId: 17 },

  // OFFICE & STATIONERY (id: 18) - New Category
  { label: 'BIC', value: 'BIC', count: 5500, icon: '🖊️', categoryId: 18 },
  { label: 'HP (Office)', value: 'HP-Office', count: 4200, icon: '🖨️', categoryId: 18 },
  { label: 'Pelikan', value: 'Pelikan', count: 2100, icon: '🖊️', categoryId: 18 },
  { label: 'Paper Mate', value: 'Paper-Mate', count: 3200, icon: '📝', categoryId: 18 },



    // AUTOMOTIVE SERVICES (id: 19)
  { label: 'TotalEnergies', value: 'Total', count: 2200, icon: '⛽', categoryId: 19 },
  { label: 'Mobil', value: 'Mobil', count: 1900, icon: '⛽', categoryId: 19 },
  { label: 'AXA Mansard', value: 'AXA', count: 1500, icon: '🛡️', categoryId: 19 },
  { label: 'Leadway', value: 'Leadway', count: 1400, icon: '🛡️', categoryId: 19 },


];