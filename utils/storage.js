// storage.js (GitHub JSON reader for links)
const SETTINGS_JSON_URL = "https://raw.githubusercontent.com/anwaree/-ODUI/refs/heads/main/settings.json";

async function fetchSettingsForLinks() {
  try {
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

async function loadLinks() {
  const settings = await fetchSettingsForLinks();
  // exchangeLinks قد تكون موجودة داخل settings أو مخزنة بمفتاح exchangeLinks في localStorage
  let links = [];
  if (Array.isArray(settings.exchangeLinks)) {
    links = settings.exchangeLinks;
  } else {
    const stored = localStorage.getItem('exchangeLinks');
    links = stored ? JSON.parse(stored) : [];
  }
  const blocked = Array.isArray(settings.blockedSites) ? settings.blockedSites : (settings.blocked || []);

  // تصفية الروابط المحظورة
  const filtered = links.filter(l => !blocked.includes(l));
  return filtered;
}

// دالة مساعدة لحفظ روابط محليًا (خيار احتياطي)
function saveLinksLocal(links) {
  localStorage.setItem('exchangeLinks', JSON.stringify(links));
}

// استدعاء تجريبي: (يمكنك إزالة هذا السطر أو استبداله ضمن وظيفة العرض في الموقع)
if (typeof window !== 'undefined') {
  // مثال: عرض الروابط داخل عنصر له id="links-list" (إن وُجد)
  (async () => {
    const links = await loadLinks();
    const container = document.getElementById('links-list');
    if (container) {
      container.innerHTML = links.map(l => `<div><a href="${l}" target="_blank" rel="noopener noreferrer">${l}</a></div>`).join("");
    }
  })();
}

// حفظ عدد الزيارات
function saveVisitedCount(count) {
    localStorage.setItem("visitedCount", count);
}

// تحميل عدد الزيارات
function loadVisitedCount() {
    return parseInt(localStorage.getItem("visitedCount")) || 0;
}

