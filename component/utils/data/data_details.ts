import { Product } from "../types";


export const FullCatalog: Product[] = [
  // ================= PHONES & TABLETS =================
  {
    id: '1', title: 'Samsung Galaxy S24 Ultra Phone (256GB, Titanium Gray)', price: 1250000, oldPrice: 1500000, description: '256GB, Titanium Gray, AI Features, 5G Network', imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Smartphones', brand: 'SAMSUNG', rating: 5, reviewsCount: 316, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Display": "6.8-inch Dynamic AMOLED 2X", "Processor": "Snapdragon 8 Gen 3", "RAM": "8GB", "Storage": "256GB" },
    longDescription: "The Galaxy S24 Ultra redefines the smartphone experience with integrated AI features and a titanium frame for maximum durability.",
    whatsInTheBox: ["Samsung Galaxy S24 Ultra", "USB-C to USB-C Cable", "SIM Ejection Tool", "Quick Start Guide"],
    warranty: "24-month manufacturer warranty"
  },
  {
    id: '2', title: 'Apple iPad Pro 11-Inch M4 Wi-Fi (256GB, Space Black)', price: 1420000, oldPrice: 1550000, description: 'Ultra Retina XDR display, ProMotion technology, Apple M4 Chip', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Tablets', brand: 'APPLE', rating: 5, reviewsCount: 48, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Chipset": "Apple M4", "Display": "11-inch Ultra Retina XDR", "Storage": "256GB", "Connectivity": "Wi-Fi 6E" },
    longDescription: "Unmatched performance in an ultra-thin design. Perfect for creative professionals on the go.",
    whatsInTheBox: ["iPad Pro 11-inch", "USB-C Charge Cable (1m)", "20W USB-C Power Adapter"],
    warranty: "12-month Apple Limited Warranty"
  },
  {
    id: '3', title: 'Oraimo Traveler 4 20000mAh Power Bank Fast Charging', price: 24500, oldPrice: 32000, description: '20A multi-output speed charging, hyper-durable slim profile pack', imageUrl: 'https://images.unsplash.com/photo-1609592424261-2830459a7144?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Accessories', brand: 'ORAIMO', rating: 4, reviewsCount: 1240, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Capacity": "20,000mAh", "Output": "20W Fast Charging", "Ports": "Dual USB-A, USB-C" },
    longDescription: "Oraimo's signature slim-profile power bank. Keeps your devices charged for days with multi-output technology.",
    whatsInTheBox: ["Traveler 4 Power Bank", "Micro-USB Cable", "User Manual"],
    warranty: "12-month warranty"
  },
  {
    id: '4', title: 'Magnetic Matte Transparent MagSafe Case for iPhone 15 Pro Max', price: 8500, oldPrice: 12000, description: 'Shockproof bumper frame casing with clear anti-yellow backplate', imageUrl: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Accessories', brand: 'Spigen', rating: 4, reviewsCount: 185, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Material": "Magnetic Matte PC", "Compatibility": "iPhone 15 Pro Max", "Feature": "MagSafe Compatible" },
    longDescription: "Shockproof bumper frame casing with clear anti-yellow backplate, designed to show off your iPhone design.",
    whatsInTheBox: ["1x MagSafe Case"],
    warranty: "N/A"
  },
  {
    id: '5', title: 'Infinix Hot 40 Pro (256GB+8GB RAM, Horizon Gold)', price: 215000, oldPrice: 245000, description: '108MP Camera, Helio G99 Processor, 5000mAh Battery', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Smartphones', brand: 'INFINIX', rating: 4, reviewsCount: 94, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Processor": "Helio G99", "RAM": "8GB", "Storage": "256GB", "Camera": "108MP" },
    longDescription: "High-performance smartphone with a brilliant display and long-lasting 5000mAh battery.",
    whatsInTheBox: ["Infinix Hot 40 Pro", "Charger", "Earphones", "Protective Case"],
    warranty: "12-month warranty"
  },
  {
    id: '6', title: 'Tecno Spark 20 Pro+ (256GB, Radiant Axinite)', price: 230000, oldPrice: 260000, description: '120Hz Curved AMOLED Display, 108MP Ultra Sensing Camera', imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Smartphones', brand: 'TECNO', rating: 4, reviewsCount: 112, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "RefreshRate": "120Hz", "Camera": "108MP Ultra Sensing", "Storage": "256GB" },
    longDescription: "Features a stunning curved AMOLED display and lightning-fast charging capabilities.",
    whatsInTheBox: ["Tecno Spark 20 Pro+", "USB Cable", "Phone Case", "Screen Protector"],
    warranty: "12-month warranty"
  },
  {
    id: '7', title: 'Anker PowerCore 10000mAh Ultra-Compact Battery Pack', price: 18500, oldPrice: 22000, description: 'High-speed charging PowerIQ technology for phones and tablets', imageUrl: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80', category: 'Phones & Tablets', subCategory: 'Accessories', brand: 'ANKER', rating: 5, reviewsCount: 421, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Capacity": "10,000mAh", "Technology": "PowerIQ", "Weight": "Compact" },
    longDescription: "Anker's ultra-compact battery pack fits in your pocket but packs enough power to charge your devices multiple times.",
    whatsInTheBox: ["PowerCore 10000", "Travel Pouch", "Micro USB Cable"],
    warranty: "18-month warranty"
  },

  // ================= ELECTRONICS & APPLIANCES (Sample snippet of completion) =================
  {
    id: '8', title: 'Sony WH-1000XM5 Premium Noise Cancelling Wireless Headphones', price: 280000, description: 'Industry-leading Active Noise Cancelling, Premium 30hr Battery Life', imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Audio & Music Equipment', brand: 'SONY', rating: 5, reviewsCount: 712, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Noise Cancellation": "Industry-leading", "Battery Life": "30 Hours", "Connectivity": "Bluetooth 5.2" },
    longDescription: "Experience silence like never before. The XM5 features two processors controlling 8 microphones for unparalleled noise canceling.",
    whatsInTheBox: ["Headphones", "Carrying Case", "Headphone Cable", "USB-C Charging Cable"],
    warranty: "12-month warranty"
  },
  // ... [Repeat this pattern for the remaining 41 items] ...

  {
    id: '9', title: 'LG 55-Inch 4K UHD Smart NanoCell Television', price: 540000, oldPrice: 620000, description: '4K Resolution, ThinQ AI WebOS, HDR10 Active Imaging', imageUrl: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'TVs', brand: 'LG', rating: 5, reviewsCount: 230, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Resolution": "4K UHD", "OS": "webOS ThinQ AI", "Size": "55-Inch" },
    longDescription: "Bring cinema-quality visuals into your living room with LG's NanoCell technology for pure colors and intelligent processing.",
    whatsInTheBox: ["TV Unit", "Magic Remote", "Power Cable", "Stand", "User Manual"],
    warranty: "24-month warranty"
  },
  {
    id: '10', title: 'Xiaomi Smart Zigbee 3.0 Wireless Automation Gateway Hub', price: 34500, oldPrice: 45000, description: 'Connects up to 128 devices, Wireless smart home control', imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Networking Equipment', brand: 'XIAOMI', rating: 4, reviewsCount: 56, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Protocol": "Zigbee 3.0", "Capacity": "Up to 128 devices", "Connectivity": "Wireless" },
    longDescription: "The brain of your smart home. Connects all your smart appliances for seamless automation and remote monitoring.",
    whatsInTheBox: ["Smart Gateway Hub", "Power Adapter", "USB Cable"],
    warranty: "12-month warranty"
  },
  {
    id: '11', title: 'JBL Flip 6 Waterproof Portable Bluetooth Speaker', price: 85000, oldPrice: 105000, description: 'IP67 Waterproof, 12 Hours Playtime, Bold Bass', imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Audio & Music Equipment', brand: 'JBL', rating: 5, reviewsCount: 340, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Waterproof": "IP67", "Playtime": "12 Hours", "Sound": "2-way System" },
    longDescription: "Bold sound for every adventure. The Flip 6 is fully waterproof and dustproof, ready for the pool or park.",
    whatsInTheBox: ["JBL Flip 6", "USB-C Cable", "Safety Sheet", "Quick Start Guide"],
    warranty: "12-month warranty"
  },
  {
    id: '12', title: 'Hisense 43-Inch FHD Smart TV with Bezelless Design', price: 265000, oldPrice: 295000, description: 'Full HD, VIDAA OS, Bezelless Screen, Natural Color Enhancer', imageUrl: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'TVs', brand: 'HISENSE', rating: 4, reviewsCount: 189, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Resolution": "FHD", "OS": "VIDAA", "Size": "43-Inch" },
    longDescription: "Bezelless design meets smart connectivity. Enjoy intuitive streaming and crisp images with VIDAA OS.",
    whatsInTheBox: ["Smart TV", "Remote Control", "Power Cable", "Stand", "Warranty Card"],
    warranty: "24-month warranty"
  },
  {
    id: '13', title: 'Amazon Fire TV Stick 4K Max Streaming Device', price: 52000, oldPrice: 65000, description: 'Wi-Fi 6E, 4K Streaming, Dolby Vision, Alexa Voice Remote', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'TVs', brand: 'AMAZON', rating: 5, reviewsCount: 412, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Connectivity": "Wi-Fi 6E", "Resolution": "4K", "Features": "Dolby Vision" },
    longDescription: "Turn any TV into a smart cinema with the most powerful Fire TV stick. Experience fast app loading and smooth playback.",
    whatsInTheBox: ["Fire TV Stick 4K Max", "Alexa Voice Remote", "Power Adapter", "HDMI Extender"],
    warranty: "12-month warranty"
  },
  {
    id: '14', title: 'Zealot S32 Portable Outdoor Wireless Speaker', price: 14500, oldPrice: 19000, description: '3D Bass Stereo, Micro SD/USB Inputs, Portable Design', imageUrl: 'https://images.unsplash.com/photo-1589256469067-ea99122bbec4?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Audio & Music Equipment', brand: 'ZEALOT', rating: 4, reviewsCount: 2050, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Sound": "3D Bass Stereo", "Inputs": "Micro SD, USB, Aux", "Battery": "1500mAh" },
    longDescription: "A powerful portable speaker with rich bass and versatile playback options, perfect for outdoor activities.",
    whatsInTheBox: ["Zealot S32 Speaker", "USB Charging Cable", "Audio Cable", "User Manual"],
    warranty: "6-month warranty"
  },

  // ================= HOME, FURNITURE & APPLIANCES =================
  {
    id: '15', title: 'Philips Air Fryer XXL Digital Touch Interface 7.5L', price: 110000, oldPrice: 145000, description: '7.5L Capacity, Digital Interface, Healthy Cooking Technology', imageUrl: 'https://images.unsplash.com/photo-1695654401103-63fcb00790e9?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Kitchen Appliances', brand: 'PHILIPS', rating: 5, reviewsCount: 154, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Capacity": "7.5L", "Power": "2000W", "Interface": "Digital Touch" },
    longDescription: "Crispy, tasty results with up to 90% less fat. The large capacity is perfect for family-sized meals.",
    whatsInTheBox: ["Air Fryer", "Cooking Basket", "Recipe Book", "User Manual"],
    warranty: "24-month warranty"
  },
  {
    id: '16', title: 'Haier Thermocool 250L Double Door Refrigerator', price: 435000, oldPrice: 490000, description: '250L capacity, Double Door, Low Voltage Protection', imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Refrigerators', brand: 'THERMOCOOL', rating: 4, reviewsCount: 92, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Capacity": "250L", "Type": "Double Door", "Feature": "Voltage Protection" },
    longDescription: "Efficient cooling for all your perishables. Features dedicated freezer and fridge compartments with low energy consumption.",
    whatsInTheBox: ["Refrigerator", "Ice Tray", "User Manual"],
    warranty: "36-month compressor warranty"
  },
  {
    id: '17', title: 'Nexus 20L Digital Microwave Oven with Grill', price: 68000, oldPrice: 78000, description: '20L Capacity, Grill Function, Auto-Defrost', imageUrl: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Kitchen Appliances', brand: 'NEXUS', rating: 4, reviewsCount: 114, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Capacity": "20L", "Features": "Grill, Auto-defrost, Digital" },
    longDescription: "Versatile microwave for heating, defrosting, and grilling. Simple digital interface for daily convenience.",
    whatsInTheBox: ["Microwave", "Glass Turntable", "Grill Rack", "Manual"],
    warranty: "12-month warranty"
  },
  {
    id: '18', title: 'Binatone 16-Inch Standing Fan with 2-Hour Timer', price: 38000, oldPrice: 45000, description: '3-Speed, 16-Inch Blades, 2-Hour Timer, Adjustable Height', imageUrl: 'https://images.unsplash.com/photo-1618945999052-19bc052b6510?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Kitchen Appliances', brand: 'BINATONE', rating: 4, reviewsCount: 523, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Size": "16-Inch", "Speed": "3-Speed", "Feature": "2-Hour Timer" },
    longDescription: "Stay cool with a reliable standing fan featuring adjustable height and a convenient timer function.",
    whatsInTheBox: ["Standing Fan", "Base", "Blades", "Grill", "Assembly Kit"],
    warranty: "12-month warranty"
  },
  {
    id: '19', title: 'Scanfrost 4-Burner Eco Gas Cooker with Oven', price: 195000, oldPrice: 220000, description: '4 Burners, Stainless Steel Finish, Oven Included', imageUrl: 'https://images.unsplash.com/photo-1522012147041-30a115908b31?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Kitchen Appliances', brand: 'SCANFROST', rating: 4, reviewsCount: 61, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Burners": "4", "Material": "Stainless Steel", "Feature": "Gas Oven" },
    longDescription: "Compact gas cooker with oven, perfect for everyday family meals in modern kitchens.",
    whatsInTheBox: ["Gas Cooker", "Pot Supports", "Manual"],
    warranty: "12-month warranty"
  },
  {
    id: '20', title: 'Panasonic Heavy Duty Dry Iron (1000W)', price: 24000, oldPrice: 29000, description: '1000W, Non-stick Soleplate, Thermal Fuse Protection', imageUrl: 'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Kitchen Appliances', brand: 'PANASONIC', rating: 5, reviewsCount: 340, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Power": "1000W", "Soleplate": "Non-stick", "Feature": "Thermal Fuse" },
    longDescription: "Classic dry iron for crisp, wrinkle-free clothes. Durable design with overheat safety protection.",
    whatsInTheBox: ["Dry Iron", "User Manual"],
    warranty: "12-month warranty"
  },
  {
    id: '21', title: 'Qasa 12V 15A Smart Battery Fast Charger & Maintainer', price: 32500, oldPrice: 40000, description: '12V 15A output, Smart Pulse Repair, LED Indicator', imageUrl: 'https://images.unsplash.com/photo-1609592424261-2830459a7144?auto=format&fit=crop&w=600&q=80', category: 'Home, Furniture & Appliances', subCategory: 'Kitchen Appliances', brand: 'QASA', rating: 4, reviewsCount: 78, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Output": "12V 15A", "Feature": "Smart Pulse Repair" },
    longDescription: "Keep your batteries healthy with smart pulse repair technology. Ideal for inverter and vehicle batteries.",
    whatsInTheBox: ["Battery Charger", "Clips", "Manual"],
    warranty: "12-month warranty"
  },

  // ================= FASHION =================
  {
    id: '22', title: 'Ankara Print Luxury Flowing Summer Tailored Dress', price: 12500, oldPrice: 25000, description: 'Ankara fabric, Flowing style, Premium tailoring', imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Clothing', brand: 'Ankara Hub', rating: 4, reviewsCount: 88,
    technicalSpecs: { "Material": "Cotton Ankara", "Style": "Flowing" },
    longDescription: "Premium handcrafted Ankara textiles tailored for a perfect fit and comfortable summer wear.",
    whatsInTheBox: ["1x Ankara Dress"],
    warranty: "N/A"
  },
  {
    id: '23', title: 'Men Casual Slim-Fit Structured Button Up Shirt', price: 14500, oldPrice: 22000, description: 'Combed cotton, Slim-fit, Breathable', imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Clothing', brand: 'Defacto', rating: 4, reviewsCount: 195,
    technicalSpecs: { "Material": "Combed Cotton", "Fit": "Slim-Fit" },
    longDescription: "Breathable, structured shirt designed for comfort and a sharp professional look.",
    whatsInTheBox: ["1x Shirt"],
    warranty: "N/A"
  },
  {
    id: '24', title: 'Minimalist Waterproof Quartz Leather Strap Men Watch', price: 45000, oldPrice: 60000, description: 'Sapphire glass, Quartz movement, Leather strap', imageUrl: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Watches', brand: 'CURREN', rating: 4, reviewsCount: 524,
    technicalSpecs: { "Glass": "Sapphire", "Movement": "Quartz", "Strap": "Leather" },
    longDescription: "Minimalist timepiece with scratch-resistant glass and a timeless leather strap design.",
    whatsInTheBox: ["1x Watch", "Watch Box"],
    warranty: "6-month warranty"
  },
  {
    id: '25', title: 'Premium Cashmere Senator Soft Plain Fabric (4 Yards)', price: 28000, oldPrice: 35000, description: 'High-grade cashmere wool, 4 yards, Smooth finish', imageUrl: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Clothing', brand: 'Visco', rating: 5, reviewsCount: 67,
    technicalSpecs: { "Material": "Cashmere Wool", "Quantity": "4 Yards" },
    longDescription: "Ultra-smooth high-grade fabric perfect for corporate tailoring and formal Senator wear.",
    whatsInTheBox: ["4 Yards of Fabric"],
    warranty: "N/A"
  },
  {
    id: '26', title: 'Unisex Polarized Vintage Clubmaster Sunglasses', price: 6500, oldPrice: 10000, description: 'UV400 protection, Alloy frame, Polarized', imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Clothing', brand: 'FEIDU', rating: 4, reviewsCount: 142,
    technicalSpecs: { "Protection": "UV400", "Frame": "Alloy" },
    longDescription: "Vintage-inspired shades with high-quality UV protection and a durable alloy frame.",
    whatsInTheBox: ["Sunglasses", "Case"],
    warranty: "N/A"
  },
  {
    id: '27', title: 'Casual High-Top Rugged Canvas Sneakers', price: 18500, oldPrice: 26000, description: 'Canvas upper, Rubber sole, High-top', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Shoes', brand: 'Converse', rating: 4, reviewsCount: 310,
    technicalSpecs: { "Sole": "Rubber", "Material": "Canvas" },
    longDescription: "Classic high-top sneakers with a rugged, anti-slip rubber sole, built for daily wear.",
    whatsInTheBox: ["1 Pair Sneakers"],
    warranty: "N/A"
  },
  {
    id: '28', title: 'Luxury Italian Leather Formal Men Bifold Wallet', price: 12000, oldPrice: 18000, description: 'Genuine leather, RFID blocking, Bifold', imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80', category: 'Fashion', subCategory: 'Clothing', brand: 'GENUINE LEATHER', rating: 5, reviewsCount: 89,
    technicalSpecs: { "Material": "Italian Leather", "Feature": "RFID Blocking" },
    longDescription: "Slim bifold wallet made from Italian leather with integrated RFID blocking protection.",
    whatsInTheBox: ["1x Leather Wallet"],
    warranty: "N/A"
  },

  // ================= BEAUTY & PERSONAL CARE =================
  {
    id: '29', title: 'Organic Raw Unrefined Grade-A Shea Butter Gold (500g)', price: 3500, oldPrice: 5000, description: 'Pure Shea butter, 500g, Grade-A', imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c8c836?auto=format&fit=crop&w=600&q=80', category: 'Beauty & Personal Care', subCategory: 'Skin Care', brand: 'Shea Gold', rating: 5, reviewsCount: 1718,
    technicalSpecs: { "Weight": "500g", "Type": "Unrefined", "Grade": "A" },
    longDescription: "Pure, organic Grade-A Shea butter for deep skin nourishment and moisturizing.",
    whatsInTheBox: ["1x 500g Shea Butter"],
    warranty: "N/A"
  },
  {
    id: '30', title: 'Bleu De Chanel Eau De Parfum Luxury Spray 100ml', price: 195000, oldPrice: 220000, description: '100ml, Eau De Parfum, Aromatic', imageUrl: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80', category: 'Beauty & Personal Care', subCategory: 'Fragrances', brand: 'CHANEL', rating: 5, reviewsCount: 142,
    technicalSpecs: { "Type": "Eau De Parfum", "Volume": "100ml" },
    longDescription: "A sophisticated and timeless fragrance for the modern man, featuring an aromatic woody trail.",
    whatsInTheBox: ["1x Perfume Bottle"],
    warranty: "N/A"
  },
  {
    id: '31', title: 'Matte Liquid Longwear Foundation Waterproof Formula', price: 16000, oldPrice: 21000, description: 'Matte finish, Liquid, Full coverage', imageUrl: 'https://images.unsplash.com/photo-1631730359577-38e4755d772b?auto=format&fit=crop&w=600&q=80', category: 'Beauty & Personal Care', subCategory: 'Makeup', brand: 'Maybelline', rating: 4, reviewsCount: 310,
    technicalSpecs: { "Type": "Liquid Foundation", "Finish": "Matte" },
    longDescription: "Full coverage foundation designed to withstand tropical weather with a long-lasting matte finish.",
    whatsInTheBox: ["1x Foundation Bottle"],
    warranty: "N/A"
  },
  {
    id: '32', title: 'CeraVe Foaming Facial Cleanser for Normal to Oily Skin (473ml)', price: 24500, oldPrice: 29000, description: '473ml, Foaming, With Ceramides', imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&q=80', category: 'Beauty & Personal Care', subCategory: 'Skin Care', brand: 'CERAVE', rating: 5, reviewsCount: 412,
    technicalSpecs: { "Size": "473ml", "Ingredients": "Ceramides" },
    longDescription: "Gentle foaming cleanser that cleans without disrupting the skin barrier, ideal for normal to oily skin.",
    whatsInTheBox: ["1x Facial Cleanser"],
    warranty: "N/A"
  },
  {
    id: '33', title: 'Cosrx Advanced Snail 96 Mucin Power Essence (100ml)', price: 19500, oldPrice: 24000, description: '100ml, Hydrating, Snail Mucin', imageUrl: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80', category: 'Beauty & Personal Care', subCategory: 'Skin Care', brand: 'COSRX', rating: 5, reviewsCount: 850,
    technicalSpecs: { "Size": "100ml", "Ingredient": "Snail Mucin" },
    longDescription: "Highly concentrated essence for deep hydration and skin repair.",
    whatsInTheBox: ["1x Essence Bottle"],
    warranty: "N/A"
  },
  {
    id: '34', title: 'Nivea Perfect & Radiant Even Tone Day Cream SPF 15', price: 6800, oldPrice: 8500, description: 'Day cream, SPF 15, Even Tone', imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80', category: 'Beauty & Personal Care', subCategory: 'Skin Care', brand: 'NIVEA', rating: 4, reviewsCount: 1104, isOfficialStore: true,
    technicalSpecs: { "Feature": "SPF 15", "Benefit": "Even Tone" },
    longDescription: "Daily moisturizing cream that helps even skin tone and protect against UV rays.",
    whatsInTheBox: ["1x Day Cream Tub"],
    warranty: "N/A"
  },

  // ================= COMPUTING & HARDWARE =================
  {
    id: '35', title: 'MacBook Pro 14-Inch M3 Chip (16GB RAM, 512GB SSD)', price: 2450000, oldPrice: 2700000, description: 'M3 Chip, 16GB RAM, 512GB SSD', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Computer Hardware', brand: 'APPLE', rating: 5, reviewsCount: 94, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "CPU": "M3 Chip", "RAM": "16GB", "Display": "Liquid Retina XDR" },
    longDescription: "The ultimate laptop for professionals. Unmatched speed, display quality, and battery life.",
    whatsInTheBox: ["MacBook Pro 14", "USB-C Power Adapter", "USB-C to MagSafe 3 Cable"],
    warranty: "12-month warranty"
  },
  {
    id: '36', title: 'HP LaserJet Pro Wireless Monochrome Laser Printer', price: 215000, oldPrice: 240000, description: 'Laser, Wireless, Monochrome, Duplex', imageUrl: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Printers', brand: 'HP', rating: 4, reviewsCount: 74, isOfficialStore: true, merchantId: 'aeon-appliances-nigeria',
    technicalSpecs: { "Type": "Monochrome Laser", "Connectivity": "Wireless", "Feature": "Duplex Printing" },
    longDescription: "Efficient, high-speed document printing for home offices and small businesses.",
    whatsInTheBox: ["LaserJet Pro", "Toner Cartridge", "Power Cord"],
    warranty: "12-month warranty"
  },
  {
    id: '37', title: 'Samsung T7 Shield 1TB Portable External SSD Drive', price: 115000, oldPrice: 135000, description: '1TB, Ruggedized, USB 3.2', imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65dff802a8?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Computer Hardware', brand: 'SAMSUNG', rating: 5, reviewsCount: 188, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Capacity": "1TB", "Connection": "USB 3.2 Gen2", "Durability": "Ruggedized" },
    longDescription: "Ultra-fast data transfer with a rugged design that survives drops and weather.",
    whatsInTheBox: ["T7 Shield SSD", "USB-C to C Cable"],
    warranty: "36-month warranty"
  },
  {
    id: '38', title: 'Lenovo IdeaPad Slim 3 Intel Core i3 (8GB RAM, 512GB SSD)', price: 465000, oldPrice: 510000, description: '15.6-Inch, i3, 8GB RAM, 512GB SSD', imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Computer Hardware', brand: 'LENOVO', rating: 4, reviewsCount: 52, isOfficialStore: true, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "CPU": "Intel Core i3", "RAM": "8GB", "Storage": "512GB SSD", "Screen": "15.6-Inch" },
    longDescription: "Reliable and durable laptop for daily productivity tasks, offering a slim profile.",
    whatsInTheBox: ["Laptop", "Power Adapter", "Quick Start Guide"],
    warranty: "12-month warranty"
  },
  {
    id: '39', title: 'Logitech MK270 Reliable Wireless Keyboard and Mouse Combo', price: 32000, oldPrice: 38000, description: 'Wireless, Full-size, 2.4 GHz', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Computer Accessories', brand: 'LOGITECH', rating: 5, reviewsCount: 312, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Connectivity": "2.4 GHz Wireless", "Layout": "Full-size", "Battery": "Extended Life" },
    longDescription: "A comfortable, durable, and reliable keyboard and mouse combo with extended battery life.",
    whatsInTheBox: ["Keyboard", "Mouse", "USB Receiver", "Batteries"],
    warranty: "12-month warranty"
  },
  {
    id: '40', title: 'Seagate Expansion 2TB External Hard Drive HDD USB 3.0', price: 78000, oldPrice: 88000, description: '2TB, USB 3.0, Plug-and-Play', imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80', category: 'Electronics', subCategory: 'Computer Hardware', brand: 'SEAGATE', rating: 4, reviewsCount: 640, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Capacity": "2TB", "Connection": "USB 3.0", "Compatibility": "Plug-and-Play" },
    longDescription: "Simple, high-capacity storage for your files, photos, and backups.",
    whatsInTheBox: ["External Hard Drive", "USB Cable", "Manual"],
    warranty: "24-month warranty"
  },

  // ================= LEISURE & ACTIVITIES =================
  {
    id: '41', title: 'PlayStation 5 Console Slim Edition (1TB Storage)', price: 680000, oldPrice: 750000, description: '1TB, Slim Edition, PS5', imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80', category: 'Leisure & Activities', subCategory: 'Gaming', brand: 'SONY', rating: 5, reviewsCount: 420, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Storage": "1TB", "Controllers": "2" },
    longDescription: "Experience lightning-fast loading and immersive gameplay with the PS5 Slim.",
    whatsInTheBox: ["PS5 Slim", "2x Controllers", "Cables"],
    warranty: "12-month warranty"
  },
  {
    id: '42', title: 'Xbox Series X Console Core 1TB Wireless Bundle', price: 640000, oldPrice: 690000, description: '1TB, True 4K, Xbox', imageUrl: 'https://images.unsplash.com/photo-1621259182978-f09e5e2b07ae?auto=format&fit=crop&w=600&q=80', category: 'Leisure & Activities', subCategory: 'Gaming', brand: 'MICROSOFT', rating: 4, reviewsCount: 112, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Storage": "1TB", "Resolution": "True 4K" },
    longDescription: "The most powerful console for 4K gaming and high frame rates.",
    whatsInTheBox: ["Xbox Series X", "Controller", "Cables"],
    warranty: "12-month warranty"
  },
  {
    id: '43', title: 'DualSense Wireless Controller Midnight Black Edition', price: 62000, oldPrice: 75000, description: 'Haptic feedback, Wireless', imageUrl: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?auto=format&fit=crop&w=600&q=80', category: 'Leisure & Activities', subCategory: 'Gaming', brand: 'SONY', rating: 5, reviewsCount: 295, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Features": "Haptic Feedback", "Color": "Midnight Black" },
    longDescription: "Advanced haptic features and adaptive triggers for immersive gameplay.",
    whatsInTheBox: ["DualSense Controller"],
    warranty: "12-month warranty"
  },
  {
    id: '44', title: 'Nintendo Switch OLED Console Model (White Joy-Con)', price: 395000, oldPrice: 440000, description: '7-inch OLED, Switch', imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', category: 'Leisure & Activities', subCategory: 'Gaming', brand: 'NINTENDO', rating: 5, reviewsCount: 84, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "Screen": "7-inch OLED", "Controllers": "Joy-Con" },
    longDescription: "Vibrant OLED screen and portable design for versatile gaming anywhere.",
    whatsInTheBox: ["Switch OLED Console", "Dock", "Cables"],
    warranty: "12-month warranty"
  },
  {
    id: '45', title: 'Razer DeathAdder Essential Wired Gaming Mouse', price: 24500, oldPrice: 32000, description: 'Wired, Gaming mouse, 6,400 DPI', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80', category: 'Leisure & Activities', subCategory: 'Gaming', brand: 'RAZER', rating: 4, reviewsCount: 194, merchantId: 'slot-matrix-phones',
    technicalSpecs: { "DPI": "6,400", "Type": "Wired" },
    longDescription: "Precision gaming mouse with customizable buttons and high-speed response.",
    whatsInTheBox: ["Gaming Mouse", "Manual"],
    warranty: "12-month warranty"
  },

  // ================= FOOD & DRINK =================
  {
    id: '46', title: 'Irish Cream Premium Whiskey Blend (1L Bottle)', price: 18500, description: '1L, Cream Liqueur', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80', category: 'Food & Drink', subCategory: 'Food Products', brand: 'Baileys', rating: 4, reviewsCount: 203,
    technicalSpecs: { "Type": "Cream Liqueur", "Volume": "1L" },
    longDescription: "Smooth and creamy Irish whiskey blend, perfect for relaxation.",
    whatsInTheBox: ["1x Bottle"],
    warranty: "N/A"
  },
  {
    id: '47', title: 'Golden Penny Pure Soya Oil Cooking Canister (5 Liters)', price: 14500, oldPrice: 16000, description: '5L, Soya Oil, Cholesterol-free', imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80', category: 'Food & Drink', subCategory: 'Food Products', brand: 'Golden Penny', rating: 5, reviewsCount: 844,
    technicalSpecs: { "Type": "Soya Oil", "Volume": "5 Liters" },
    longDescription: "Cholesterol-free, pure vegetable oil perfect for all types of cooking.",
    whatsInTheBox: ["1x 5L Canister"],
    warranty: "N/A"
  },
  {
    id: '48', title: 'Kellogg Corn Flakes Original Family Breakfast Pack 500g', price: 4200, oldPrice: 5000, description: '500g, Corn Flakes, Breakfast', imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=600&q=80', category: 'Food & Drink', subCategory: 'Food Products', brand: 'KELLOGG', rating: 5, reviewsCount: 1105,
    technicalSpecs: { "Type": "Corn Flakes", "Weight": "500g" },
    longDescription: "The classic family breakfast: crispy, nutritious, and vitamin-enriched.",
    whatsInTheBox: ["1x 500g Pack"],
    warranty: "N/A"
  },
  {
    id: '49', title: 'Milo Chocolate Malt Beverage Powder Refill Pack (800g)', price: 6200, oldPrice: 7200, description: '800g, Malt Drink, Energy', imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=600&q=80', category: 'Food & Drink', subCategory: 'Food Products', brand: 'NESTLE', rating: 5, reviewsCount: 2405, isOfficialStore: true,
    technicalSpecs: { "Type": "Malt Drink", "Weight": "800g" },
    longDescription: "Packed with essential nutrients for energy and active lifestyles.",
    whatsInTheBox: ["1x 800g Refill Pack"],
    warranty: "N/A"
  }
];