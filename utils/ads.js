// ads.js (GitHub JSON reader)
const SETTINGS_JSON_URL = "https://raw.githubusercontent.com/anwaree/-ODUI/refs/heads/main/settings.json";

// محاولات التحميل: جلب من GitHub ثم fallback إلى localStorage إن لم يتوفر
async function fetchSettings() {
  try {
    // نضيف كاش-بستر حتى لا يبقى المستعرض يخزن نسخة قديمة
    const res = await fetch(SETTINGS_JSON_URL + "?t=" + Date.now());
    if (!res.ok) throw new Error("Failed to fetch remote settings");
    const json = await res.json();
    return json;
  } catch (err) {
    console.warn("Failed fetching settings.json from GitHub, falling back to localStorage:", err);
    try {
      return JSON.parse(localStorage.getItem('adminSettings') || '{}');
    } catch (e) {
      return {};
    }
  }
}

async function loadAds() {
  const settings = await fetchSettings();

  // عرض المناطق الإعلانية - تأكد أن الصفحة تحتوي العناصر ذات المعرفات التالية
  const header = document.getElementById('ads-header');
  const footer = document.getElementById('ads-footer');
  const left = document.getElementById('ads-left');
  const right = document.getElementById('ads-right');

  if (header && settings.adsenseHeader) header.innerHTML = settings.adsenseHeader;
  if (footer && settings.adsenseFooter) footer.innerHTML = settings.adsenseFooter;
  if (left && settings.adsenseLeft) left.innerHTML = settings.adsenseLeft;
  if (right && settings.adsenseRight) right.innerHTML = settings.adsenseRight;

  // إذا تحتاج استدعاء اكواد after-load (مثل تهيئة إعلانات AdSense) نفذها هنا:
  // مثال: if (window.adsbygoogle && settings.adsenseHeader) (إعادة تهيئة..)
}

// اختبار تلقائي عند تحميل السكربت
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadAds);
} else {
  loadAds();
}
