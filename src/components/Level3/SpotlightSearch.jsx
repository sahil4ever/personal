import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../../utils/AudioManager';

const SpotlightSearch = ({ onComplete }) => {
    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const [isLightOn, setIsLightOn] = useState(true);
    const [foundPayload, setFoundPayload] = useState(false);
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);

    // Random position for the Payal (key item)
    // In a real app, ensure it's within bounds. Fixed relative % for now.
    const targetPos = { x: 70, y: 40 }; // 70% left, 40% top

    // Battery Flicker Effect
    useEffect(() => {
        const flickerLoop = setInterval(() => {
            if (Math.random() > 0.8) {
                // Turn off light
                setIsLightOn(false);
                audioManager.playSfx('light_flicker');
                setTimeout(() => setIsLightOn(true), Math.random() * 2000 + 500); // 0.5s to 2.5s dark
            }
        }, 8000); // Check every 8 seconds
        return () => clearInterval(flickerLoop);
    }, []);

    // Proximity Audio logic
    useEffect(() => {
        const checkProximity = () => {
            // Basic implementation: Calculate dist from mouse % to target %
            // This needs window dimensions for accuracy, approximating here
            // Assuming window 100vw/100vh mapping to 0-100 logic roughly
        };
        // window.addEventListener('mousemove', checkProximity);
        // return () => window.removeEventListener('mousemove', checkProximity);
    }, []);

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleFound = () => {
        setFoundPayload(true);
        audioManager.playSfx('unlock_creak');
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                background: 'black',
                cursor: foundPayload ? 'default' : 'none', // Restore cursor when found
                overflow: 'hidden'
            }}
        >
            {/* Spotlight Mask - Hide when found so it's clear */}
            {isLightOn && !foundPayload && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, transparent 10%, black 100%)`,
                        zIndex: 10
                    }}
                />
            )}

            {/* Hidden Content Container */}
            <div style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}>

                {/* The Target: Payal */}
                {!foundPayload && (
                    <div
                        onClick={handleFound}
                        style={{
                            position: 'absolute',
                            left: `${targetPos.x}%`,
                            top: `${targetPos.y}%`,
                            cursor: 'pointer',
                            fontSize: '3rem',
                            filter: 'drop-shadow(0 0 10px red)',
                            zIndex: 5
                        }}
                    >
                        👣
                    </div>
                )}

                {/* Clue UI (Appears when found) - Static, High Contrast */}
                {foundPayload && (
                    <div
                        className="glass-panel"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            padding: 'clamp(1.5rem, 5vw, 2.5rem)',
                            border: '2px solid red',
                            backgroundColor: 'rgba(0,0,0,0.95)',
                            zIndex: 100, // Ensure strictly on top
                            width: '90vw',
                            maxWidth: '500px',
                            textAlign: 'center',
                            borderRadius: '15px'
                        }}
                    >
                        <h2 style={{ fontFamily: 'Nosifer', color: 'red', marginBottom: '1rem', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>THE STEPS</h2>
                        <p className="responsive-text" style={{
                            color: '#ccc',
                            marginBottom: '1.5rem',
                            textAlign: 'center',
                            borderLeft: '3px solid red',
                            paddingLeft: '1rem',
                            paddingRight: '1rem',
                            lineHeight: '1.6',
                            wordWrap: 'break-word'
                        }}>
                            "Shor machati hoon par bolti nahi, Pairon mein bandhti hoon par chubh ti nahi.
                            Music mere bina adhoora hai, dance floor ka main craze hoon,
                            <span style={{ color: 'red', fontWeight: 'bold' }}> Jewelry Box</span> khol ke dekh, main tera final surprise hoon!"
                        </p>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const clean = answer.toLowerCase().trim();
                            if (clean === 'payal' || clean === 'anklet') {
                                audioManager.playSfx('unlock_creak');
                                onComplete();
                            } else {
                                setError(true);
                                audioManager.playSfx('jumpscare_short');
                                setTimeout(() => setError(false), 2000);
                            }
                        }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <input
                                type="text"
                                placeholder="Type answer here..."
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                style={{
                                    background: '#FFF', // White background
                                    border: error ? '3px solid red' : '2px solid #8a0303',
                                    color: '#000', // Black text
                                    padding: '15px',
                                    fontFamily: 'Courier New',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    textAlign: 'center',
                                    borderRadius: '5px'
                                }}
                                autoFocus
                            />
                            <button
                                type="submit"
                                style={{
                                    background: '#8a0303',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem 2rem',
                                    fontFamily: 'Creepster',
                                    fontSize: '1.5rem',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 15px red',
                                    marginTop: '10px'
                                }}
                            >
                                UNLOCK FINAL LEVEL
                            </button>
                        </form>
                    </div>
                )}
            </div>

            {/* Guide Text if lost */}
            {!foundPayload && isLightOn && (
                <div style={{ position: 'absolute', bottom: '20px', width: '100%', textAlign: 'center', color: '#333', pointerEvents: 'none' }}>
                    Find the path...
                </div>
            )}
        </div>
    );
};

export default SpotlightSearch;
