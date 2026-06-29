import "./SessionLoader.css";

const SessionLoader = () => {
  return (
    <div className="loader-root">
      <div className="logo-area">
        <div className="ring-pulse2"></div>
        <div className="ring-pulse"></div>
        <div className="logo-card">
          <div className="logo-card-title">EV</div>
          <div className="logo-card-sub">EduVault</div>
        </div>
      </div>

      <h1 className="app-name">EduVault</h1>
      <p className="app-tagline">Your academic resource hub</p>

      <div className="shimmer-bar-wrap">
        <div className="shimmer-bar"></div>
        <div className="shimmer-bar"></div>
        <div className="shimmer-bar"></div>
      </div>

      <div className="dot-row">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>

      <p className="status-text">Verifying your session…</p>
    </div>
  );
};

export default SessionLoader;
