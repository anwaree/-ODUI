function VisitedSites({ sites }) {
  try {
    return (
      <div 
        className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4"
        data-name="visited-sites"
        data-file="components/VisitedSites.js"
      >
        <h3 className="text-lg font-bold text-center mb-3">✅ المواقع التي تمت زيارتها</h3>
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-2">
            {sites.map((site, index) => (
              <li key={index} className="text-gray-700 bg-white p-2 rounded">
                <span className="font-bold text-blue-600">{site.time}</span> - 
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mr-2">
                  {site.url}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    console.error('VisitedSites component error:', error);
    return null;
  }
}