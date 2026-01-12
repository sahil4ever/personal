import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import audioManager from '../utils/AudioManager';
import '../styles/App.css'; // Ensure we can use standard CSS if needed for keyframes

// --- GLITCH TEXT COMPONENT ---
const GlitchText = ({ text }) => {
    return (
        <span className="glitch-wrapper" style={{ display: 'inline-block', position: 'relative' }}>
            <motion.span
                animate={{
                    x: [0, -2, 2, -1, 1, 0],
                    y: [0, 1, -1, 0],
                    opacity: [1, 0.8, 1, 0.9, 1]
                }}
                transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatType: "mirror",
                    repeatDelay: Math.random() * 2 // Randomize glitch frequency
                }}
                style={{
                    color: 'red',
                    textShadow: '2px 0 blue, -2px 0 lime', // RGB split effect
                    fontWeight: 'bold'
                }}
            >
                {text}
            </motion.span>
        </span>
    );
};

// --- TYPEWRITER COMPONENT ---
const Typewriter = ({ text, delay = 0, speed = 50, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setHasStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!hasStarted) return;

        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text.charAt(index));
                // Optional: Play tiny click sound here via audioManager if desired
                index++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, speed);

        return () => clearInterval(interval);
    }, [hasStarted, text, speed, onComplete]);

    return <span>{displayedText}</span>;
};

const WelcomeScreen = ({ onStart }) => {
    const [showButton, setShowButton] = useState(false);

    // --- AUTOPLAY UNLOCK ---
    useEffect(() => {
        // Try to play immediately (might work if user already interacted)
        audioManager.playAmbience('theme-hacked');

        // Fallback: Play on first click (Unlock AudioContext)
        const unlockAudio = () => {
            audioManager.playAmbience('theme-hacked');
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };

        window.addEventListener('click', unlockAudio);
        window.addEventListener('keydown', unlockAudio);

        return () => {
            window.removeEventListener('click', unlockAudio);
            window.removeEventListener('keydown', unlockAudio);
        };
    }, []);

    const handleStart = () => {
        audioManager.playSfx('jumpscare_short');
        setTimeout(() => {
            onStart();
        }, 800);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#000000', // Deep Black
            color: '#FF0000', // Blood Red
            fontFamily: "'Courier New', Courier, monospace", // Terminal Font
            zIndex: 100,
            overflow: 'hidden',
            padding: '20px',
            textAlign: 'left' // Terminal style is usually left-aligned, but we'll center the container
        }}>

            {/* CONTAINER FOR TERMINAL CONTENT */}
            <div style={{ maxWidth: '800px', width: '100%' }}>

                {/* 1. ALERT HEADER */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} // Flash effect
                    style={{
                        borderBottom: '2px solid red',
                        marginBottom: '2rem',
                        paddingBottom: '10px',
                        fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                        fontWeight: 'bold',
                        textAlign: 'center'
                    }}
                >
                    ⚠️ SYSTEM BREACH DETECTED ⚠️
                </motion.div>

                {/* 2. SUBJECT DETAILS */}
                <div style={{ fontSize: '1.2rem', marginBottom: '2rem', lineHeight: '1.8' }}>
                    <p>
                        <span style={{ opacity: 0.7 }}>{'>'} DETECTING INTRUDER...</span>
                    </p>
                    <p>
                        <span style={{ opacity: 0.7 }}>{'>'} SUBJECT IDENTIFIED: </span>
                        <GlitchText text="GARIMA RANA" />
                    </p>
                    <p>
                        <span style={{ opacity: 0.7 }}>{'>'} STATUS: </span>
                        <span style={{ background: 'red', color: 'black', padding: '0 5px', fontWeight: 'bold' }}>TRAPPED</span>
                    </p>
                </div>

                {/* 3. NARRATIVE TYPEWRITER */}
                <div style={{
                    marginBottom: '3rem',
                    minHeight: '150px', // Prevent layout shift
                    fontSize: '1.1rem',
                    lineHeight: '1.6',
                    borderLeft: '2px solid rgba(255,0,0,0.3)',
                    paddingLeft: '15px'
                }}>
                    <Typewriter
                        text="Encrypted within these walls lies a fragment of memory... corrupted... hidden. The system has locked you inside. To escape, you must decipher the codes and unlock the archive. But be warned... the algorithm is watching."
                        delay={1500}
                        speed={30}
                        onComplete={() => setTimeout(() => setShowButton(true), 500)} // Show button after reading
                    />
                </div>

                {/* 4. FOOTER WARNING & BUTTON */}
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>

                    {showButton && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{
                                scale: 1.05,
                                backgroundColor: "#FF0000",
                                color: "#000000",
                                boxShadow: "0 0 20px #FF0000"
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStart}
                            style={{
                                background: 'transparent',
                                border: '2px solid #FF0000',
                                color: '#FF0000',
                                padding: '15px 30px',
                                fontFamily: "'Courier New', Courier, monospace",
                                fontSize: '1.2rem',
                                cursor: 'pointer',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                marginBottom: '2rem'
                            }}
                        >
                            {'>'} INITIATE_DECRYPTION
                        </motion.button>
                    )}

                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ fontSize: '1rem', marginTop: '1rem', color: '#8a0000' }}
                    >
                        👁️ DO NOT LOOK BEHIND YOU 👁️
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default WelcomeScreen;
