function loadLinks() {
  const stored = localStorage.getItem('exchangeLinks');
  const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
  const blockedSites = settings.blockedSites || [];
  
  const links = stored ? JSON.parse(stored) : [
  
    'https://www.easy-orders.net/blog/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%A7%D9%84%D8%B1%D8%A8%D8%AD-%D9%85%D9%86-%D8%AA%D9%8A%D9%83-%D8%AA%D9%88%D9%83-2025/',
    'https://www.youtube.com/watch?v=zRQ_Md9QfQE',
    'https://fatimaibrahim.net/profit-from-tiktok/',
    'https://zid.sa/ar/'
  ];
  
  return links.filter(link => !blockedSites.includes(link));
}

function saveLinks(links) {
  localStorage.setItem('exchangeLinks', JSON.stringify(links));
}

function loadVisitedCount() {
  return parseInt(localStorage.getItem('visitedCount')) || 0;
}

function saveVisitedCount(count) {
  localStorage.setItem('visitedCount', count.toString());
}

function loadVisitorCount() {
  return parseInt(localStorage.getItem('visitorCount')) || 0;
}

function saveVisitorCount(count) {
  localStorage.setItem('visitorCount', count.toString());
}

function loadVisitors() {
  const stored = localStorage.getItem('visitors');
  return stored ? JSON.parse(stored) : [];
}

function saveVisitors(visitors) {
  localStorage.setItem('visitors', JSON.stringify(visitors));
}

function trackVisitor(visitors, setVisitors, setVisitorCount) {
  const visitorIP = Math.floor(Math.random() * 1000000);
  if (!visitors.includes(visitorIP)) {
    const newVisitors = [...visitors, visitorIP];
    setVisitors(newVisitors);
    saveVisitors(newVisitors);
    
    const newCount = newVisitors.length;
    setVisitorCount(newCount);
    saveVisitorCount(newCount);
  }
}

function loadUsersWithLinks() {
  const stored = localStorage.getItem('usersWithLinks');
  return stored ? JSON.parse(stored) : [];
}

function saveUserWithLink(url) {
  const users = loadUsersWithLinks();
  const timestamp = new Date().toLocaleString('ar-SA');
  const visitorId = localStorage.getItem('currentVisitorId') || Math.floor(Math.random() * 1000000);
  localStorage.setItem('currentVisitorId', visitorId);
  
  const newUser = {
    id: visitorId,
    url: url,
    addedAt: timestamp
  };
  
  users.push(newUser);
  localStorage.setItem('usersWithLinks', JSON.stringify(users));
  return users;
}
