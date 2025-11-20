function Stats({ visitedCount, visitorCount, usersWithLinks }) {
  try {
    return (
      <div 
        className="bg-[var(--secondary-color)] rounded-lg p-4 mb-6"
        data-name="stats"
        data-file="components/Stats.js"
      >
        <h3 className="text-xl font-bold text-center mb-4">📊 إحصائيات الزوار</h3>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
          <div>
            <p className="text-gray-600 text-sm">🌐 المواقع المزارة</p>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{visitedCount}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">👥 الزوار</p>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{visitorCount}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">➕ مضيفي الروابط</p>
            <p className="text-2xl font-bold text-[var(--primary-color)]">{usersWithLinks.length}</p>
          </div>
        </div>
        {usersWithLinks.length > 0 && (
          <div className="bg-white rounded-lg p-3 mt-3">
            <h4 className="font-bold text-sm mb-2">👤 المستخدمون الذين أضافوا روابط:</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {usersWithLinks.map((user, index) => (
                <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">مستخدم #{user.id}</span>
                    <span className="text-gray-500">{user.addedAt}</span>
                  </div>
                  <div className="text-gray-700 mt-1 break-all">{user.url}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('Stats component error:', error);
    return null;
  }
}
