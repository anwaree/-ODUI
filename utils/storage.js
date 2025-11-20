 function loadLinks() {
  const stored = localStorage.getItem('exchangeLinks');
  const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
  const blockedSites = settings.blockedSites || [];
  
  const links = stored ? JSON.parse(stored) : [
    'https://dzcom55.blogspot.com/',
    'https://iptvfree-m3ulist.blogspot.com/',
    'https://www.adstoo4.kozow.com/',
    'https://mood4too.blogspot.com/',
    'https://nnto4.blogspot.com/2020/02/blog-post_53.html',
    'https://www.dzto4.casacam.net/',
    'https://godbay56.blogspot.com/2023/02/m3u-smart-iptv.html',
    'https://gods45.blogspot.com/2023/05/cyberghost-vpn-lg.html',
    'https://dzcomfree.blogspot.com/',
    'https://gods45.blogspot.com/2015/07/blog-post_29.html',
    'https://freeiptv7satt.blogspot.com/',
    'https://iptv-m3ufree.blogspot.com',
    'https://gods45.blogspot.com/2015/07/10_25.html',
    'https://gods45.blogspot.com/',
    'https://toobcom7.blogspot.com/',
    'https://mobilltna.org/iptv-smarters-proo/',
    'https://www.youtube.com/watch?v=UFgm-hhbBB0',
    'https://www.youtube.com/watch?v=ylNAr41oRLE',
    'https://nourie23.blogspot.com/',
    'https://www.iptvsmarters.com/',
    'https://www.dealabs.com/bons-plans/iptv-smart-player-pro-3188728',
    'https://adsela55.blogspot.com/',
    'https://setupad.com/blog/make-money-with-adsense/',
    'https://edu-forms.com/professional-learning-community/exchange-visit-report',
    'https://www.tiktok.com/@hhdjwjes3y7/video/7505848449183649046?lang=ar',
    'https://www.easy-orders.net/blog/%D9%83%D9%8A%D9%81%D9%8A%D8%A9-%D8%A7%D9%84%D8%B1%D8%A8%D8%AD-%D9%85%D9%86-%D8%AA%D9%8A%D9%83-%D8%AA%D9%88%D9%83-2025/',
    'https://www.youtube.com/watch?v=eR8L5chaziU',
    'https://www.youtube.com/watch?v=23bH4pKdcFc',
    'https://www.youtube.com/watch?v=r6BCYfBFhUY',
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
