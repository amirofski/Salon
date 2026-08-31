import { SalonChapter, SalonService, SalonArtisan } from '../types';
import { Sparkles, Feather, ShieldCheck, HeartPulse } from 'lucide-react';

export const SALON_CHAPTERS: SalonChapter[] = [
  {
    id: 'atrium',
    number: '01',
    numberFa: '۰۱',
    title: {
      fa: 'مشاوره اختصاصی چهره‌شناسی و سلامت مو',
      en: 'Facial Harmony Profiling & Hair Diagnostics',
    },
    subtitle: {
      fa: 'تحلیل میکروسکوپی ساقه و فرمولاسیون اختصاصی',
      en: 'OPTICAL FIBER DIAGNOSTICS & BESPOKE STYLING',
    },
    description: {
      fa: 'شروع یک تجربه دگرگون‌کننده با تحلیل میکروسکوپی سلامت پوست سر و تار مو. بررسی دقیق زاویه فک، فرم گونه‌ها و تناژ رنگ پوست برای خلق هارمونی کامل و انتخاب بهترین مدل کوپ و رنگ.',
      en: 'Begin your transformation with optical micro-diagnostics of hair fiber and scalp health. Detailed analysis of skin undertones and facial geometry guarantees the most flattering cut, color, and texture balance.',
    },
    startProgress: 0.0,
    endProgress: 0.26,
    coordinates: {
      fa: 'ایستگاه ۰۱ // مشاوره و آنالیز VIP',
      en: 'SUITE 01 // VIP CONSULTATION',
    },
    highlights: {
      fa: ['آنالیز میکروسکوپی مو', 'تطبیق هارمونی چهره', 'دمنوش ارگانیک آرامش‌بخش'],
      en: ['Microscopic Hair Analysis', 'Facial Harmony Profiling', 'Organic Botanical Elixirs'],
    },
  },
  {
    id: 'color-lab',
    number: '02',
    numberFa: '۰۲',
    title: {
      fa: 'لابراتوار تخصصی رنگ و کیمیاگری پیگمنت‌ها',
      en: 'Haute Botanical Color & Light Alchemy',
    },
    subtitle: {
      fa: 'پیگمنت‌های گیاهی بیودینامیک و بلوندینگ بدون آسیب',
      en: 'ORGANIC BOTANICAL PIGMENTS & ZERO-DAMAGE BLONDING',
    },
    description: {
      fa: 'ترکیب پیگمنت‌های غنی و خالص گیاهی زیر نور کالیبره‌شده با طیف روز. بالیاژهای سه‌بعدی، سامبره و گلاسینگ‌های براق بدون آمونیاک که درخششی خیره‌کننده و ابریشمی به موها می‌بخشند.',
      en: 'A luminous color laboratory where master colorists blend custom biodynamic pigments under daylight-calibrated illumination. Seamless balayage and bio-lipid glossing deliver dimensional radiance and silky vitality.',
    },
    startProgress: 0.26,
    endProgress: 0.52,
    coordinates: {
      fa: 'ایستگاه ۰۲ // لابراتوار رنگ و لایت',
      en: 'ZONE 02 // COLOR & HIGHLIGHT LAB',
    },
    highlights: {
      fa: ['۹۸٪ پیگمنت‌های بیودینامیک', 'بالیاژ فرانسوی و روسی', 'پلکس و بازسازی ساختار مو'],
      en: ['98% Biodynamic Pigments', 'French & Russian Balayage', 'Bond-Building Infusions'],
    },
  },
  {
    id: 'styling-suites',
    number: '03',
    numberFa: '۰۳',
    title: {
      fa: 'سوئیت‌های کوپ ژورنالی و استایلینگ مدرن',
      en: 'Haute Styling & Precision Editorial Cuts',
    },
    subtitle: {
      fa: 'تکنیک کوپ خشک و براشینگ ابریشمی ماندگار',
      en: 'PRECISION DRY CUTTING & SILK BLOWOUT RITUALS',
    },
    description: {
      fa: 'اجرای دقیق‌ترین کوپ‌های ژورنالی با قیچی‌های دست‌ساز کبالت بر اساس خواب طبیعی و بافت مو. فرم‌دهی تخصصی و براشینگ ابریشمی که حالت و حجم مو را تا ماه‌ها با طراوت حفظ می‌کند.',
      en: 'Executing runway haircut trends with handcrafted cobalt shears, sculpted to your hair’s organic movement and density. Silk blowout rituals and precision texturizing guarantee lasting movement and effortless volume.',
    },
    startProgress: 0.52,
    endProgress: 0.78,
    coordinates: {
      fa: 'ایستگاه ۰۳ // سوئیت استایلینگ و کوپ',
      en: 'ZONE 03 // HAUTE STYLING SUITES',
    },
    highlights: {
      fa: ['کوپ خشک با قیچی ژاپنی', 'براشینگ ابریشمی و شاینینگ', 'استایلینگ ژورنالی مو'],
      en: ['Japanese Precision Shears', 'Silk Blowout Finish', 'Editorial Form Sculpting'],
    },
  },
  {
    id: 'sanctuary',
    number: '04',
    numberFa: '۰۴',
    title: {
      fa: 'آب‌درمانی و اسپا سر ژاپنی (هد اسپا)',
      en: 'Japanese Head Spa & Scalp Hydrotherapy',
    },
    subtitle: {
      fa: 'ماساژ شیاتسو و احیای عمیق فولیکول و ساقه مو',
      en: 'SHIATSU MASSAGE & DEEP FOLLICLE NOURISHMENT',
    },
    description: {
      fa: 'آیینی آرامش‌بخش برای سم‌زدایی پوست سر، تحریک رشد تارهای جدید و رفع خستگی ذهن. لذت بردن از آبشارهای کروماتراپی، بخار ازن گیاهی و تغذیه ریشه‌ها با ماسک‌های خاویار و کراتین خالص.',
      en: 'A rejuvenating hydrotherapy ritual to detoxify follicles and stimulate healthy hair growth. Waterfall scalp circulations, warm botanical steam, lymphatic shiatsu massage, and deep caviar nutrition.',
    },
    startProgress: 0.78,
    endProgress: 1.0,
    coordinates: {
      fa: 'ایستگاه ۰۴ // پناهگاه هد اسپا',
      en: 'ZONE 04 // HEAD SPA SANCTUARY',
    },
    highlights: {
      fa: ['آبشارهای کروماتراپی', 'ماساژ شیاتسو پوست سر', 'تغذیه با خاویار و پپتید'],
      en: ['Waterfall Scalp Circulation', 'Shiatsu Cranial Massage', 'Caviar & Peptide Infusion'],
    },
  },
];

export const SALON_SERVICES: SalonService[] = [
  {
    id: 'haute-color',
    name: {
      fa: 'بالیاژ سفارشی و تونینگ کوتور',
      en: 'Bespoke Balayage & Couture Toning',
    },
    category: 'color',
    duration: {
      fa: '۱۸۰ دقیقه',
      en: '180 min',
    },
    price: {
      fa: 'از ۴,۸۰۰,۰۰۰ تومان',
      en: '$380+',
    },
    description: {
      fa: 'کانتورینگ دستی سه‌بعدی همراه با گلاسینگ بیولیپید و تونینگ اختصاصی متناسب با تُن چهره و رنگ چشم.',
      en: 'Hand-painted dimensional contouring paired with bio-lipid glossing and bespoke toning suited to skin temperature.',
    },
    highlight: {
      fa: 'خدمت امضا',
      en: 'Signature Service',
    },
  },
  {
    id: 'architectural-cut',
    name: {
      fa: 'کوپ ژورنالی و استایلینگ مجسمه‌ای',
      en: 'Precision Editorial Cut & Sculptural Styling',
    },
    category: 'cut',
    duration: {
      fa: '۷۵ دقیقه',
      en: '75 min',
    },
    price: {
      fa: '۲,۴۵۰,۰۰۰ تومان',
      en: '$195',
    },
    description: {
      fa: 'کوپ تخصصی خشک و مرطوب بر اساس فرم چهره، خطوط گونه و الگوی رشد طبیعی تارهای مو همراه با براشینگ ابریشمی.',
      en: 'Tailored precision wet and dry haircutting considering organic growth patterns, facial angles, and daily texture movement.',
    },
    highlight: {
      fa: 'مدیر خلاق',
      en: 'Creative Director',
    },
  },
  {
    id: 'scalp-sanctuary',
    name: {
      fa: 'آیین اسپا سر و هیدروتراپی ژاپنی',
      en: 'Japanese Hydro-Steam Scalp Ritual',
    },
    category: 'ritual',
    duration: {
      fa: '۹۰ دقیقه',
      en: '90 min',
    },
    price: {
      fa: '۳,۲۰۰,۰۰۰ تومان',
      en: '$240',
    },
    description: {
      fa: 'میکرو اسکراب لایه‌بردار، بخار ازن حرارتی، ماساژ شیاتسو غدد لنفاوی و تغذیه فولیکول با پپتیدهای ارگانیک.',
      en: 'Micro-exfoliation, thermal ozone misting, deep lymph shiatsu massage, and customized polypeptide follicle nutrition.',
    },
    highlight: {
      fa: 'محبوب‌ترین آیین',
      en: 'Guest Favorite',
    },
  },
  {
    id: 'keratin-infusion',
    name: {
      fa: 'تراپی پروتئین ابریشم سرد و بوتاکس مو',
      en: 'Cold-Pressed Silk Protein Infusion',
    },
    category: 'spa',
    duration: {
      fa: '۱۲۰ دقیقه',
      en: '120 min',
    },
    price: {
      fa: '۳,۹۰۰,۰۰۰ تومان',
      en: '$320',
    },
    description: {
      fa: 'صافی و آینه‌ای کردن کوتیکول مو بدون فرمالدئید، با عصاره خاویار و کراتین خالص گیاهی.',
      en: 'Formaldehyde-free smoothing and cuticle glassing treatment with caviar extract and botanical keratin.',
    },
  },
  {
    id: 'gloss-alchemy',
    name: {
      fa: 'وارنیش الماس و ماسک احیای سلولی',
      en: 'Diamond Glaze & Cell-Renewal Mask',
    },
    category: 'color',
    duration: {
      fa: '۶۰ دقیقه',
      en: '60 min',
    },
    price: {
      fa: '۱,۸۵۰,۰۰۰ تومان',
      en: '$150',
    },
    description: {
      fa: 'روکش رنگی نیمه‌شفاف و فوق‌العاده درخشان، غنی‌شده با آنتی‌اکسیدان چای سفید و اسید هیالورونیک.',
      en: 'Ultra-reflective translucent color varnish infused with antioxidant white tea and hyaluronic acid.',
    },
  },
  {
    id: 'vip-bridal',
    name: {
      fa: 'سوئیت VIP آتلیه عروس و تشریفات',
      en: 'Editorial Bridal Atelier Suite',
    },
    category: 'spa',
    duration: {
      fa: '۲۴۰ دقیقه',
      en: '240 min',
    },
    price: {
      fa: '۸,۹۰۰,۰۰۰ تومان',
      en: '$650',
    },
    description: {
      fa: 'رزرو کامل سوئیت خصوصی، پذیرایی VIP، تست آرایش و شینیون کوتور و آماده‌سازی درخشان مو برای مراسم.',
      en: 'Exclusive suite reservation, champagne tasting, couture trial styling, and high-gloss hair preparation for gala events.',
    },
  },
];

export const SALON_ARTISANS: SalonArtisan[] = [
  {
    name: {
      fa: 'والری مون‌کلر',
      en: 'Valérie Montclair',
    },
    role: {
      fa: 'مدیر خلاق و استاد ارشد استایلینگ',
      en: 'Creative Director & Master Stylist',
    },
    bio: {
      fa: 'فارغ‌التحصیل آکادمی‌های مد پاریس و توکیو با ۱۸ سال سابقه در استایلینگ فشن‌شوهای بین‌المللی و کوپ‌های ژورنالی.',
      en: 'Trained in Paris and Tokyo with 18 years shaping global runway looks. Renowned for sculptural precision and organic texture cuts.',
    },
    specialty: {
      fa: 'کوپ‌های ژورنالی و استایلینگ اروپایی',
      en: 'Editorial Cuts & European Styling',
    },
    experience: {
      fa: '۱۸ سال سابقه حرفه‌ای',
      en: '18 Years Experience',
    },
    avatarText: 'VM',
  },
  {
    name: {
      fa: 'جولین ونس',
      en: 'Julian Vance',
    },
    role: {
      fa: 'سرپرست کیمیاگری رنگ و تکنیک‌های لایت',
      en: 'Head Color Alchemist',
    },
    bio: {
      fa: 'مبدع تکنیک‌های نوین فویل‌گذاری میکرومتری و ترنزیشن‌های نرم ریشه مو با استفاده از پیگمنت‌های گیاهی ارگانیک.',
      en: 'Pioneer of low-toxin dimensional illumination and seamless micro-foiling techniques for seamless root transitions.',
    },
    specialty: {
      fa: 'بالیاژ اختصاصی و بلوندینگ فرانسوی',
      en: 'Bespoke Balayage & French Blonding',
    },
    experience: {
      fa: '۱۴ سال سابقه حرفه‌ای',
      en: '14 Years Experience',
    },
    avatarText: 'JV',
  },
  {
    name: {
      fa: 'ثریا چن',
      en: 'Soraya Chen',
    },
    role: {
      fa: 'متخصص ارشد اسپا سر ژاپنی و سلامت اسکالپ',
      en: 'Master Scalp & Head Spa Specialist',
    },
    bio: {
      fa: 'دارای مدرک رسمی هیدروتراپی پوست سر از کیوتو و رفلکسولوژی، تلفیق‌کننده سلامت سلولی مو با آرامش عمیق ذهنی.',
      en: 'Certified in Kyoto holistic scalp hydrotherapy and cranial reflexology, harmonizing cellular hair wellness with deep relaxation.',
    },
    specialty: {
      fa: 'اسپا سر ژاپنی و تریکولوژی مو',
      en: 'Japanese Head Spa & Trichology',
    },
    experience: {
      fa: '۱۱ سال سابقه حرفه‌ای',
      en: '11 Years Experience',
    },
    avatarText: 'SC',
  },
];

export const PHILOSOPHY_PILLARS = [
  {
    icon: ShieldCheck,
    title: {
      fa: 'سلامت‌محوری و محافظت از ساختار مو',
      en: 'Holistic Hair Integrity',
    },
    desc: {
      fa: 'استفاده از پلکس‌های پیوندساز و فرمول‌های بدون آمونیاک برای محافظت دائمی از ساختار تارهای مو در تمامی مراحل رنگ و دکلره.',
      en: 'Utilizing bond-building plexes and zero-ammonia formulations to safeguard hair fiber strength during every color and lightening service.',
    },
  },
  {
    icon: Feather,
    title: {
      fa: 'نور کالیبره‌شده برای تناژ واقعی رنگ',
      en: 'True-Tone Color Illumination',
    },
    desc: {
      fa: 'تنظیم نورپردازی ایستگاه‌ها با طیف ۵۶۰۰ کلوین خورشیدی برای اطمینان از تناژ ۱۰۰٪ دقیق رنگ و عدم تغییر در محیط بیرون.',
      en: 'Daylight-calibrated 5600K lighting ensuring your bespoke color tone looks flawless under natural outdoor sunlight.',
    },
  },
  {
    icon: HeartPulse,
    title: {
      fa: 'پاکسازی و سم‌زدایی پوست سر',
      en: 'Scalp Detox & Micro-Circulation',
    },
    desc: {
      fa: 'درمان‌های تخصصی اسکراب پوست سر و هیدروتراپی برای بهبود جریان خون و تقویت ریشه‌های ضعیف و آسیب‌دیده.',
      en: 'Targeted scalp micro-exfoliation and hydrotherapy treatments to boost micro-circulation and revitalize weak hair follicles.',
    },
  },
  {
    icon: Sparkles,
    title: {
      fa: 'کیمیاگری ارگانیک و پیگمنت‌های گیاهی',
      en: 'Organic Botanical Formulations',
    },
    desc: {
      fa: 'روغن‌های پرس سرد، عصاره چای سفید و پیگمنت‌های غنی بیودینامیک بدون فرمالدئید و سولفات در تمامی آیین‌ها.',
      en: 'Cold-pressed oils, white tea extracts, and rich biodynamic pigments free from sulfates and parabens.',
    },
  },
];
