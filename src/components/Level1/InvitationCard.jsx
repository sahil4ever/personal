import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioManager from '../../utils/AudioManager';

const InvitationCard = ({ onUnlock }) => {
    const [answer, setAnswer] = useState('');
    const [error, setError] = useState(false);

    // Ghost Typer State
    const fullText = "Teri aankhon ki chamak mujhse hi hai... Buri nazar na lage, ye duty bhi meri hai. Pencil jaisi dikhti hoon par likhti nahi... Dhoond mujhe Dressing Table pe, main wahin milungi sahi.";
    const [displayedText, setDisplayedText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    // Subliminal Flash State
    const [flash, setFlash] = useState(false);

    // Typer Effect
    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText((prev) => prev + fullText.charAt(index));
                if (Math.random() > 0.7) audioManager.typewriterTick(); // Randomize sound slightly
                index++;
            } else {
                setIsTyping(false);
                clearInterval(intervalId);
            }
        }, 50); // Speed of typing

        return () => clearInterval(intervalId);
    }, []);

    // Subliminal Flash Effect (Triggered randomly)
    useEffect(() => {
        const triggerFlash = () => {
            if (Math.random() > 0.7) { // 30% chance every check
                setFlash(true);
                setTimeout(() => setFlash(false), 100); // Super fast flash (0.1s)
            }
        };
        const flashInterval = setInterval(triggerFlash, 4000);
        return () => clearInterval(flashInterval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanAnswer = answer.toLowerCase().trim();
        // User refers to this as "lipstick level", so we accept lipstick too to avoid confusion
        if (cleanAnswer === 'kajal' || cleanAnswer === 'kajal pencil' || cleanAnswer === 'lipstick') {
            audioManager.playSfx('unlock_creak');
            onUnlock();
        } else {
            setError(true);
            audioManager.playSfx('jumpscare_short');
            setTimeout(() => setError(false), 2000);
        }
    };

    // Helper to render text with "Red Words"
    const renderStyledText = () => {
        // Simple highlighting for specific scary/important words
        const words = displayedText.split(' ');
        return words.map((word, i) => {
            const cleanWord = word.replace(/[^a-zA-Z0-9]/g, '');
            const isScary = ['Buri', 'nazar', 'Dhoond', 'Dressing', 'Table', 'Dead', 'Behind'].includes(cleanWord);
            return (
                <span key={i} style={{
                    color: isScary ? '#ff0000' : 'inherit',
                    textShadow: isScary ? '0 0 5px red' : 'none',
                    fontWeight: isScary ? 'bold' : 'normal'
                }}>
                    {word}{' '}
                </span>
            );
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel card-container"
            style={{ position: 'relative', overflow: 'hidden' }}
        >
            {/* Subliminal Face Overlay */}
            <AnimatePresence>
                {flash && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'radial-gradient(circle, transparent 20%, red 100%)',
                            zIndex: 20,
                            pointerEvents: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {/* Placeholder for scary face - CSS eyes */}
                        <div style={{ display: 'flex', gap: '50px' }}>
                            <div style={{ width: '20px', height: '20px', background: 'red', borderRadius: '50%', boxShadow: '0 0 10px red' }}></div>
                            <div style={{ width: '20px', height: '20px', background: 'red', borderRadius: '50%', boxShadow: '0 0 10px red' }}></div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <h1 className="header-text" style={{ fontFamily: 'Nosifer', color: '#8a0303', marginBottom: '2rem' }}>
                The Awakening
            </h1>

            <div className="responsive-text" style={{
                minHeight: '150px',
                marginBottom: '2rem',
                color: '#cccccc',
                textAlign: 'left',
                borderLeft: '2px solid #8a0303',
                paddingLeft: '1rem'
            }}>
                {renderStyledText()}
                {isTyping && <span className="glitch-text">|</span>}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Who am I?"
                    className="horror-input"
                    autoComplete="off"
                    style={{
                        background: 'rgba(0, 0, 0, 0.5)',
                        border: error ? '2px solid red' : '1px solid #3d0000',
                        padding: '12px 20px',
                        color: 'red',
                        fontFamily: 'Courier New',
                        fontSize: '1.2rem',
                        width: '100%',
                        outline: 'none',
                        boxShadow: error ? '0 0 15px red' : 'inset 0 0 10px black'
                    }}
                />

                {error && <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ color: 'red', fontFamily: 'Creepster', fontSize: '1.2rem' }}
                >
                    WRONG. THEY ARE WATCHING.
                </motion.p>}

                <motion.button
                    whileHover={{ scale: 1.05, textShadow: "0 0 8px red" }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    style={{
                        marginTop: '1rem',
                        background: 'transparent',
                        border: '1px solid #8a0303',
                        color: '#8a0303',
                        padding: '12px 36px',
                        fontFamily: 'Nosifer',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    UNLOCK
                </motion.button>
            </form>
        </motion.div>
    );
};

export default InvitationCard;
