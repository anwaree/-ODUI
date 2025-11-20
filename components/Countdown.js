function Countdown({ show, countdown }) {
  try {
    if (!show) return null;

    return (
      <div 
        className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-[var(--danger-color)] text-white px-6 py-3 rounded-lg shadow-lg z-50"
        data-name="countdown"
        data-file="components/Countdown.js"
      >
        <span className="font-bold text-xl">
          ⏱ الانتقال خلال: <span id="timer">{countdown}</span> ثانية
        </span>
      </div>
    );
  } catch (error) {
    console.error('Countdown component error:', error);
    return null;
  }
}