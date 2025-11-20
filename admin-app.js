function AdminApp() {
  const [isAuth, setIsAuth] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [settings, setSettings] = React.useState({});
  const [activeTab, setActiveTab] = React.useState('general');
  const [saveMsg, setSaveMsg] = React.useState('');
  const [newModUsername, setNewModUsername] = React.useState('');
  const [newModPassword, setNewModPassword] = React.useState('');
  const [blockedSiteUrl, setBlockedSiteUrl] = React.useState('');
  const [newSiteUrl, setNewSiteUrl] = React.useState('');
  const [resetPassword, setResetPassword] = React.useState('');
  const [resetPasswordConfirm, setResetPasswordConfirm] = React.useState('');
  const [resetMsg, setResetMsg] = React.useState('');

  React.useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    const authTime = parseInt(localStorage.getItem('adminAuthTime') || '0');
    const now = Date.now();
    if (auth === 'true' && (now - authTime) < 3600000) {
      setIsAuth(true);
      loadAdminSettings();
    }
  }, []);

  const loadAdminSettings = () => {
    const stored = localStorage.getItem('adminSettings');
    setSettings(stored ? JSON.parse(stored) : {
      adminUsername: 'admin',
      adminPassword: 'admin123',
      showStats: true,
      exchangeEnabled: true,
      blockedSites: [],
      moderators: []
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem('adminSettings');
    const config = stored ? JSON.parse(stored) : { adminUsername: 'admin', adminPassword: 'admin123' };
    
    if (username === config.adminUsername && password === config.adminPassword) {
      localStorage.setItem('adminAuth', 'true');
      localStorage.setItem('adminAuthTime', Date.now().toString());
      setIsAuth(true);
      loadAdminSettings();
    } else {
      setError('بيانات الدخول غير صحيحة');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminAuthTime');
    setIsAuth(false);
  };

  const saveSettings = () => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    setSaveMsg('تم حفظ الإعدادات');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const addModerator = () => {
    if (newModUsername && newModPassword) {
      const mods = settings.moderators || [];
      if (!mods.find(m => m.username === newModUsername)) {
        setSettings({
          ...settings,
          moderators: [...mods, { username: newModUsername, password: newModPassword }]
        });
        setNewModUsername('');
        setNewModPassword('');
      }
    }
  };

  const removeModerator = (username) => {
    const mods = settings.moderators || [];
    setSettings({
      ...settings,
      moderators: mods.filter(m => m.username !== username)
    });
  };

  const addBlockedSite = () => {
    if (blockedSiteUrl) {
      const blocked = settings.blockedSites || [];
      if (!blocked.includes(blockedSiteUrl)) {
        setSettings({
          ...settings,
          blockedSites: [...blocked, blockedSiteUrl]
        });
        setBlockedSiteUrl('');
      }
    }
  };

  const removeBlockedSite = (url) => {
    const blocked = settings.blockedSites || [];
    setSettings({
      ...settings,
      blockedSites: blocked.filter(u => u !== url)
    });
  };

  const addSiteLink = () => {
    if (newSiteUrl && newSiteUrl.startsWith('http')) {
      const links = JSON.parse(localStorage.getItem('exchangeLinks') || '[]');
      if (!links.includes(newSiteUrl)) {
        links.push(newSiteUrl);
        localStorage.setItem('exchangeLinks', JSON.stringify(links));
        setNewSiteUrl('');
        setSaveMsg('تم إضافة الرابط بنجاح');
        setTimeout(() => setSaveMsg(''), 3000);
      }
    }
  };

  const removeSiteLink = (url) => {
    const links = JSON.parse(localStorage.getItem('exchangeLinks') || '[]');
    const newLinks = links.filter(link => link !== url);
    localStorage.setItem('exchangeLinks', JSON.stringify(newLinks));
    setSaveMsg('تم حذف الرابط');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handlePasswordReset = () => {
    if (!resetPassword || !resetPasswordConfirm) {
      setResetMsg('يرجى ملء جميع الحقول');
      return;
    }
    if (resetPassword !== resetPasswordConfirm) {
      setResetMsg('كلمات المرور غير متطابقة');
      return;
    }
    setSettings({...settings, adminPassword: resetPassword});
    localStorage.setItem('adminSettings', JSON.stringify({...settings, adminPassword: resetPassword}));
    setResetPassword('');
    setResetPasswordConfirm('');
    setResetMsg('تم تغيير كلمة المرور بنجاح');
    setTimeout(() => setResetMsg(''), 3000);
  };

  if (!isAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6">لوحة التحكم</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {error && <p className="text-red-600 text-center">{error}</p>}
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg">
              تسجيل الدخول
            </button>
          </form>
          <a href="index.html" className="block text-center mt-4 text-green-600">العودة للرئيسية</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <div className="flex gap-4">
            <a href="index.html" className="text-green-600">عرض الموقع</a>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg">
              خروج
            </button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="border-b mb-6">
            <nav className="flex gap-4 overflow-x-auto">
              {['general', 'password', 'sites', 'ads', 'stats', 'blocked', 'moderators'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={'px-4 py-2 whitespace-nowrap ' + (activeTab === tab ? 'border-b-2 border-green-600 text-green-600' : 'text-gray-600')}
                >
                  {tab === 'general' ? 'عام' :
                   tab === 'password' ? 'كلمة المرور' :
                   tab === 'sites' ? 'إدارة الروابط' :
                   tab === 'ads' ? 'الإعلانات' :
                   tab === 'stats' ? 'الإحصائيات' : 
                   tab === 'blocked' ? 'الحظر' :
                   'المشرفين'}
                </button>
              ))}
            </nav>
          </div>
          
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">بيانات تسجيل الدخول</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">اسم المستخدم</label>
                  <input
                    type="text"
                    value={settings.adminUsername || 'admin'}
                    onChange={(e) => setSettings({...settings, adminUsername: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">إعادة تعيين كلمة المرور</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">كلمة المرور الجديدة</label>
                  <input
                    type="password"
                    value={resetPassword}
                    onChange={(e) => setResetPassword(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="أدخل كلمة المرور الجديدة"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">تأكيد كلمة المرور</label>
                  <input
                    type="password"
                    value={resetPasswordConfirm}
                    onChange={(e) => setResetPasswordConfirm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="أعد إدخال كلمة المرور"
                  />
                </div>
                {resetMsg && (
                  <p className={resetMsg.includes('بنجاح') ? 'text-green-600' : 'text-red-600'}>
                    {resetMsg}
                  </p>
                )}
                <button
                  onClick={handlePasswordReset}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  تغيير كلمة المرور
                </button>
              </div>
            </div>
          )}

          {activeTab === 'sites' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">إدارة روابط المواقع</h2>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSiteUrl}
                    onChange={(e) => setNewSiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 px-4 py-2 border rounded-lg"
                  />
                  <button
                    onClick={addSiteLink}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    إضافة رابط
                  </button>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  <h3 className="font-bold">الروابط الحالية:</h3>
                  {JSON.parse(localStorage.getItem('exchangeLinks') || '[]').map((link, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm break-all">
                        {link}
                      </a>
                      <button
                        onClick={() => removeSiteLink(link)}
                        className="text-red-600 hover:text-red-800 mr-2"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">إعدادات الإعلانات</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">كود إعلان الرأس</label>
                  <textarea
                    value={settings.adsenseHeader || ''}
                    onChange={(e) => setSettings({...settings, adsenseHeader: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg h-24"
                    placeholder="ضع كود AdSense هنا"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">كود إعلان التذييل</label>
                  <textarea
                    value={settings.adsenseFooter || ''}
                    onChange={(e) => setSettings({...settings, adsenseFooter: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg h-24"
                    placeholder="ضع كود AdSense هنا"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">كود إعلان يسار</label>
                  <textarea
                    value={settings.adsenseLeft || ''}
                    onChange={(e) => setSettings({...settings, adsenseLeft: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg h-24"
                    placeholder="ضع كود AdSense هنا"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">كود إعلان يمين</label>
                  <textarea
                    value={settings.adsenseRight || ''}
                    onChange={(e) => setSettings({...settings, adsenseRight: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg h-24"
                    placeholder="ضع كود AdSense هنا"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">التحكم في الإحصائيات</h2>
              <div className="flex items-center gap-4">
                <span>عرض الإحصائيات:</span>
                <button
                  onClick={() => setSettings({...settings, showStats: !settings.showStats})}
                  className={'px-6 py-2 rounded-lg font-bold ' + (settings.showStats ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-700')}
                >
                  {settings.showStats ? 'مفعل' : 'معطل'}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'blocked' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">المواقع المحظورة</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={blockedSiteUrl}
                  onChange={(e) => setBlockedSiteUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={addBlockedSite}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg"
                >
                  حظر
                </button>
              </div>
              <div className="space-y-2">
                {(settings.blockedSites || []).map((url, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                    <span className="text-sm">{url}</span>
                    <button
                      onClick={() => removeBlockedSite(url)}
                      className="text-red-600 hover:text-red-800"
                    >
                      إزالة
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'moderators' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">إدارة المشرفين</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  value={newModUsername}
                  onChange={(e) => setNewModUsername(e.target.value)}
                  placeholder="اسم المستخدم"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="password"
                  value={newModPassword}
                  onChange={(e) => setNewModPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={addModerator}
                  className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg"
                >
                  إضافة مشرف
                </button>
              </div>
              <div className="space-y-2 mt-4">
                <h3 className="font-bold">المشرفين الحاليين:</h3>
                {(settings.moderators || []).map((mod, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded">
                    <span>{mod.username}</span>
                    <button
                      onClick={() => removeModerator(mod.username)}
                      className="text-red-600 hover:text-red-800"
                    >
                      إزالة
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {saveMsg && <p className="text-green-600 text-center mt-4">{saveMsg}</p>}
          <button
            onClick={saveSettings}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg w-full"
          >
            حفظ التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AdminApp />);