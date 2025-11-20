function AddLinkForm({ onAdd }) {
  try {
    const [url, setUrl] = React.useState('');
    const [message, setMessage] = React.useState('');

    const handleSubmit = () => {
      if (!url.trim()) {
        setMessage('⚠️ يرجى إدخال رابط');
        return;
      }

      const success = onAdd(url.trim());
      if (success) {
        setUrl('');
        setMessage('✅ تم إضافة الرابط بنجاح');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('❌ يرجى إدخال رابط صحيح يبدأ بـ http وعدم تكراره');
      }
    };

    return (
      <div 
        className="mb-6"
        data-name="add-link-form"
        data-file="components/AddLinkForm.js"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
          />
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 font-bold"
          >
            ➕ إضافة الرابط
          </button>
        </div>
        {message && (
          <p className="mt-2 text-sm text-center">{message}</p>
        )}
      </div>
    );
  } catch (error) {
    console.error('AddLinkForm component error:', error);
    return null;
  }
}