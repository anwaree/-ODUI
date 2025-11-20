 function loadAds() {
  const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
  
  if (settings.adsenseHeader) {
    document.getElementById('ads-header').innerHTML = settings.adsenseHeader;
  }
  
  if (settings.adsenseFooter) {
    document.getElementById('ads-footer').innerHTML = settings.adsenseFooter;
  }
  
  if (settings.adsenseLeft) {
    document.getElementById('ads-left').innerHTML = settings.adsenseLeft;
  }
  
  if (settings.adsenseRight) {
    document.getElementById('ads-right').innerHTML = settings.adsenseRight;
  }
}
