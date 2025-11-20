function VisitorList({ visitors }) {
  try {
    return (
      <div 
        className="mt-6 bg-white border border-gray-200 rounded-lg p-4"
        data-name="visitor-list"
        data-file="components/VisitorList.js"
      >
        <h3 className="text-lg font-bold text-center mb-3">👥 قائمة الزوار</h3>
        <ul className="space-y-2">
          {visitors.length === 0 ? (
            <li className="text-center text-gray-500">لا يوجد زوار بعد</li>
          ) : (
            visitors.map((visitor, index) => (
              <li key={index} className="text-gray-700">
                🔹 زائر ID: {visitor}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('VisitorList component error:', error);
    return null;
  }
}