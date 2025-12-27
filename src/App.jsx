import React, { useState, useEffect } from 'react';
import './styles/App.css';
import audioManager from './utils/AudioManager';

// Components
import InvitationCard from './components/Level1/InvitationCard';
import MemoryGrid from './components/Level2/MemoryGrid';
import SpotlightSearch from './components/Level3/SpotlightSearch';
import RevealScreen from './components/Level3/RevealScreen';

function App() {
  const [level, setLevel] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Theme Logic: 1-3 = Horror, 4 = Pastel
  const theme = level < 4 ? 'theme-horror' : 'theme-pastel';

  // Global Audio/Effect Logic
  useEffect(() => {
    // Play background ambience based on theme
    audioManager.playAmbience(theme);
  }, [theme]);

  // Cursor Trail Effect for Horror Theme
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    if (theme === 'theme-pastel') return;

    const moveCursor = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setTrail(prev => [...prev.slice(-5), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [theme]);

  const handleLevel3Complete = () => {
    // The "Exorcism" Transition
    setIsTransitioning(true);

    // Stop Horror Ambience
    audioManager.stopAll();

    // 1. Shake & Glass Break
    audioManager.playSfx('glass_break');

    setTimeout(() => {
      // 2. Flash White & Change Level
      setLevel(4);
      setIsTransitioning(false);
      // Happy music will auto-start via the useEffect above when theme changes
    }, 2500);
  };

  return (
    <div className={`${theme} ${isTransitioning ? 'shake-effect' : ''}`}>
      <div className="app-theme-wrapper">
        {/* Horror Overlays */}
        {level < 4 && (
          <>
            <div className="crt-overlay" />
            <div className="crt-vignette" />
            <div className="ghost-cursor" style={{ left: cursorPos.x, top: cursorPos.y }} />
            {trail.map((t, i) => (
              <div
                key={t.id}
                className="ghost-trail"
                style={{
                  left: t.x,
                  top: t.y,
                  opacity: (i + 1) / trail.length,
                  width: `${(i + 1) * 2}px`,
                  height: `${(i + 1) * 2}px`
                }}
              />
            ))}
          </>
        )}

        {/* Transition Flash */}
        {level === 4 && !isTransitioning && <div className="flash-white" />}

        <div className="level-container">
          {level === 1 && <InvitationCard onUnlock={() => setLevel(2)} />}
          {level === 2 && <MemoryGrid onComplete={() => setLevel(3)} />}
          {level === 3 && <SpotlightSearch onComplete={handleLevel3Complete} />}
          {level === 4 && <RevealScreen />}
        </div>
      </div>
    </div>
  );
}

export default App;
