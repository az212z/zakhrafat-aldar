# DESIGN-QUALITY-REPORT — زخرفة الدار

تقرير جودة التصميم يوثّق المهارات المُستدعاة وكيف طُبّقت، ومخرجات نظام التصميم، وقرارات UI/UX، وتطبيق الوصول والذوق.

## 1. المهارات المُستدعاة وكيف طُبّقت

### `ui-ux-pro-max` (+ `search.py --design-system`)
شُغّل: `search.py "interior decor wallpaper finishes craftsmanship" --design-system`. المخرجات المعتمَدة:
- **Pattern:** Storytelling-Driven + Feature-Rich (هيرو → خدمات → دعوة).
- **Style:** Exaggerated Minimalism (تباين عالٍ، مساحات سالبة، تايبوغرافي كبير).
- **Colors:** "Interior warm grey + gold accent" — أساس دافئ + لكنة طِينية/ذهبية. تبنّينا روح اللوحة مع تحويلها صراحةً إلى تراكوتا/فحمي/كريمي حسب البريف.
- **Typography mood:** real-estate/luxury/elegant — أكّد اتجاه عناوين راقية.
- **Checklist:** لا إيموجي كأيقونات، تباين 4.5:1، focus مرئي، احترام reduced-motion، breakpoints 375/768/1024/1440 — كلها مُطبَّقة.

### `design-taste-frontend`
- **Design Read:** "premium-consumer / local-business landing for Khobar homeowners, warm-craftsman portfolio-led language."
- **Dials:** VARIANCE 7 / MOTION 5 / DENSITY 3 (consumer-premium preset).
- **Serif/warm-palette override:** البريف يفرض El Messiri + تراكوتا/كريمي صراحةً، فاستُخدم الـ override المبرّر (هوية حِرفية دافئة أصيلة) بدل الـ default sans، ودون الوقوع في beige+brass المحظورة (استخدمنا تراكوتا صريح + فحمي، لا نحاسي/أوكسبلود).
- **Color Consistency Lock:** لكنة واحدة (clay) في كل المقاطع.
- **Shape Lock:** أزرار pill، كروت 22px، حقول 14px — نظام ثابت موثّق.
- **No AI tells:** بلا em-dash نهائيًا، بلا scroll cues، بلا locale/weather strips، بلا section-number eyebrows، بلا decorative dots، بلا fake screenshots، صور حقيقية فقط.
- **Hero discipline:** عنوان سطرين، subhead ≤ 20 كلمة، زرّان فقط، CTA ظاهر بلا تمرير.
- **Layout families:** هيرو ميديا، شريط ثقة، شبكة خدمات 3×، split (لماذا نحن)، معرض masonry، فورم، موقع split، دعوة نهائية — ≥ 4 عائلات مختلفة، بلا تكرار.

### `emil-design-eng`
- **Custom easing:** `--ease-out: cubic-bezier(0.23,1,0.32,1)` بدل الـ built-in الضعيفة.
- **Scale-on-press:** كل الأزرار وFABs `:active { scale(0.97) }` خلال 160ms.
- **Never scale(0):** اللايت بوكس يدخل من `scale(.96)+opacity` لا من صفر.
- **Durations:** ميكرو 160–250ms، انتقالات ≤ 300ms.
- **Stagger:** سكرول-ريفيل بتأخير 45ms متدرّج.
- **Transitions over keyframes:** كل الحركة عبر CSS transitions قابلة للمقاطعة.
- **prefers-reduced-motion:** يُلغي الحركة والتحوّلات ويُظهر كل شيء فورًا.

## 2. مخرجات نظام التصميم (Palette / Type)
- **Palette:** كريمي `#F7F1E8` / فحمي `#2A2421` / طِيني `#B45B36` (+`#934425` للهوفر) / ذهبي `#C9A14A` للنجوم. متغيّرات CSS دلالية (`--bg/--brand/--charcoal/--cream`).
- **Type scale:** عناوين clamp تصاعدية (h1 حتى 4rem)، جسم 16px، line-height 1.7. عرض El Messiri، كوفي Reem Kufi للـ eyebrow، جسم Tajawal.
- **Spacing:** سلّم 4/8 (`--s-1..--s-9`). **Shadows:** نظام موحّد مائل للفحمي (لا أسود صافٍ).

## 3. قرارات UI/UX الأساسية
- **Gallery-led:** صور التنفيذ الحقيقية هي البطل (هيرو + معرض + split)، يناسب نشاط بصري.
- **معرض masonry** بعنصر طولي بارز + لايت بوكس خفيف (origin-aware، Esc/خلفية للإغلاق).
- **نموذج عرض سعر** يبني رسالة واتساب + localStorage + toast، موسوم بوضوح كتجريبي.
- **FABs** ثابتة (واتساب/اتصال/خريطة) لتسهيل التحويل.

## 4. سبب الألوان والخطوط
التراكوتا والكريمي يعكسان دفء الخشب والجبس في أعمالهم؛ الفحمي يعطي رُقيًّا وتباينًا. El Messiri خط عربي أنيق بإحساس فاخر مناسب للعقار/الديكور، وTajawal نظيف عالي القراءة للنصوص.

## 5. تطبيق Hooked / UX السلوكي
- **Trigger:** CTA واضح فوق الطية + FAB واتساب دائم.
- **Action:** نموذج قصير (3 حقول إلزامية فقط).
- **Reward:** toast فوري + فتح واتساب برسالة جاهزة.
- **Investment:** حفظ الطلب محليًّا (نموذج).

## 6. تطبيق HIG / اللمس
أهداف لمس ≥ 48px (أزرار/FAB/حقول)، تباعد ≥ 8px، ردّ فعل ضغط <160ms بلا إزاحة layout، `min-h-dvh` لا `100vh`.

## 7. تطبيق Accessibility
- HTML سيمانتيك (header/nav/main/section/footer)، تدرّج h1→h2→h3 بلا قفز.
- تباين مُتحقَّق برمجيًّا: charcoal/cream 13.6:1، muted/cream 5.3:1، white/clay-btn 4.68:1، eyebrow clay-light/charcoal 5.6:1 — كلها ≥ 4.5:1.
- `:focus-visible` بإطار 3px طِيني على كل عنصر تفاعلي.
- `aria-label` لكل زر أيقونة وFAB، `aria-expanded`/`aria-controls` للبرغر، `aria-hidden` يُحدَّث للقائمة واللايت بوكس، skip-link، `role="status"` للـ toast.
- قائمة جوال = overlay ملء الشاشة (100vw/100dvh) خلفية فحمية صلبة + زر X واضح، تُغلق بـ Esc.
- `prefers-reduced-motion` مدعوم بالكامل.

## 8. تطبيق Impeccable / Taste (اختبار القبول)
- يبدو فاخرًا؟ نعم — مساحات، ظلال خفيفة، تايبوغرافي راقٍ.
- سعودي ومناسب للنشاط؟ نعم — RTL، نصوص محايدة جندريًا، صور أعمال حقيقية.
- يقنع خلال 3 ثوانٍ؟ نعم — عنوان + قيمة + تقييم 4.8 + CTA فوق الطية.
- لا يشبه قالبًا مجانيًا؟ نعم — هوية تراكوتا مميزة، تخطيطات غير مكرّرة.
- النصوص محايدة: "اطلب / تواصل / شاهد / ابدأ" — لا صيغ مؤنّثة/مذكّرة موجِّهة.

## التحقق
- خادم محلي: كل الأصول 200، كل `<img>` يشير لملف موجود (4 صور منتقاة).
- Playwright: **18/18 ناجحة** على Desktop + Mobile.
- مُعايَن بصريًّا على جوال وديسكتوب: الهيرو، الخدمات، والقائمة والـ nav المتجاوبة تعمل.
