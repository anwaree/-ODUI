class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">حدث خطأ ما</h1>
            <p className="text-gray-600 mb-4">نعتذر، حدث خطأ غير متوقع.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90"
            >
              إعادة تحميل الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [links, setLinks] = React.useState(() => loadLinks());
    const [visitedCount, setVisitedCount] = React.useState(() => loadVisitedCount());
    const [visitorCount, setVisitorCount] = React.useState(() => loadVisitorCount());
    const [visitors, setVisitors] = React.useState(() => loadVisitors());
    const [isRunning, setIsRunning] = React.useState(false);
    const [countdown, setCountdown] = React.useState(10);
    const [showCountdown, setShowCountdown] = React.useState(false);
    const [visitedSites, setVisitedSites] = React.useState([]);
    const [usersWithLinks, setUsersWithLinks] = React.useState(() => loadUsersWithLinks());
    const currentIndexRef = React.useRef(0);
    const openedWindowRef = React.useRef(null);
    const intervalRef = React.useRef(null);
    const timeoutRef = React.useRef(null);

    React.useEffect(() => {
      trackVisitor(visitors, setVisitors, setVisitorCount);
      
      // Load ads after a short delay to ensure DOM is ready
      setTimeout(() => {
        if (typeof loadAds === 'function') {
          loadAds();
        }
      }, 100);
    }, []);

    React.useEffect(() => {
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (openedWindowRef.current && !openedWindowRef.current.closed) {
          openedWindowRef.current.close();
        }
      };
    }, []);

    const addLink = (url) => {
      if (url.startsWith('http') && !links.includes(url)) {
        const newLinks = [...links, url];
        setLinks(newLinks);
        saveLinks(newLinks);
        
        const updatedUsers = saveUserWithLink(url);
        setUsersWithLinks(updatedUsers);
        
        return true;
      }
      return false;
    };

    const startExchange = () => {
      if (links.length === 0) return;
      setIsRunning(true);
      setShowCountdown(true);
      setTimeout(() => {
        redirectToNext();
      }, 100);
    };

    const stopExchange = () => {
      setIsRunning(false);
      setShowCountdown(false);
      setCountdown(10);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (openedWindowRef.current && !openedWindowRef.current.closed) {
        openedWindowRef.current.close();
        openedWindowRef.current = null;
      }
    };

    const redirectToNext = () => {
      setCountdown(10);

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      intervalRef.current = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      timeoutRef.current = setTimeout(() => {
        if (openedWindowRef.current && !openedWindowRef.current.closed) {
          openedWindowRef.current.close();
          openedWindowRef.current = null;
        }
        
        if (links.length > 0) {
          const currentLink = links[currentIndexRef.current];
          
          try {
            openedWindowRef.current = window.open(currentLink, '_blank');
            
            setVisitedSites(prev => [...prev, { url: currentLink, time: new Date().toLocaleTimeString('ar-SA') }]);
            
            currentIndexRef.current = (currentIndexRef.current + 1) % links.length;
            
            setVisitedCount(prev => {
              const newCount = prev + 1;
              saveVisitedCount(newCount);
              return newCount;
            });
            
            setTimeout(() => {
              redirectToNext();
            }, 100);
          } catch (error) {
            console.error('Error opening window:', error);
            setTimeout(() => {
              redirectToNext();
            }, 100);
          }
        }
      }, 10000);
    };

    return (
      <div className="min-h-screen py-8 px-4" data-name="app" data-file="app.js">
        <a href="admin.html" className="admin-link">
          <div className="icon-settings text-lg inline-block ml-2"></div>
          لوحة التحكم
        </a>
        
        <Countdown show={showCountdown} countdown={countdown} />
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center mb-2">🔄 تبادل الزيارات التلقائي</h1>
          <p className="text-center text-gray-600 mb-6">أدخل رابط موقعك ليتم إدراجه في قائمة التبادل</p>
          
          <AddLinkForm onAdd={addLink} />
          
          {(() => {
            const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
            return settings.showStats !== false ? <Stats visitedCount={visitedCount} visitorCount={visitorCount} usersWithLinks={usersWithLinks} /> : null;
          })()}
          
          <div className="text-center mt-6 flex gap-3 justify-center">
            <button
              onClick={startExchange}
              disabled={isRunning || links.length === 0 || (() => {
                const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
                return settings.exchangeEnabled === false;
              })()}
              className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🚀 بدء التبادل التلقائي
            </button>
            {isRunning && (
              <button
                onClick={stopExchange}
                className="px-8 py-3 bg-[var(--danger-color)] text-white rounded-lg font-bold text-lg hover:opacity-90"
              >
                ⏹ إيقاف التبادل
              </button>
            )}
          </div>
          
          {visitedSites.length > 0 && (
            <VisitedSites sites={visitedSites} />
          )}
          
          <VisitorList visitors={visitors} />
          <SitesList sites={links} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);