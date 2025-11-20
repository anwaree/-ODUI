function SitesList({ sites }) {
  try {
    return (
      <div 
        className="mt-6 bg-white border border-gray-200 rounded-lg p-4"
        data-name="sites-list"
        data-file="components/SitesList.js"
      >
        <h3 className="text-lg font-bold text-center mb-3">🌐 المواقع المضافة</h3>
        <ul className="space-y-2">
          {sites.length === 0 ? (
            <li className="text-center text-gray-500">لا توجد مواقع مضافة بعد</li>
          ) : (
            sites.map((site, index) => (
              <li key={index} className="text-gray-700">
                🔗 <a href={site} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{site}</a>
              </li>
            ))
          )}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('SitesList component error:', error);
    return null;
  }
}