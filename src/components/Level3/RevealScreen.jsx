import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import audioManager from '../../utils/AudioManager';
import surpriseBg from '../../assets/surprise_bg.jpg';

// --- DYNAMIC PHOTO LOADING ---
const memoryImages = import.meta.glob('../memories/*.{png,jpg,jpeg,svg,webp}', { eager: true });
const loadedPhotos = Object.values(memoryImages).map(img => img.default);

// --- CONFIGURATION ---
const PHOTO_COUNT = 40;

const PLACEHOLDER_PHOTOS = Array.from({ length: PHOTO_COUNT }).map((_, i) => {
    const hasRealPhotos = loadedPhotos.length > 0;
    const realPhotoSrc = hasRealPhotos ? loadedPhotos[i % loadedPhotos.length] : null;

    return {
        id: i,
        content: ['📸', '😍', '🥰', '🎉', '🌟', '💑', '🌹', '💖'][i % 8],
        src: realPhotoSrc,
        x: (Math.random() - 0.5) * 180,
        rotate: (Math.random() - 0.5) * 20,
        scale: 0.8 + Math.random() * 0.4,
        delay: Math.random() * 20,
    };
});

const RevealScreen = () => {
    const [stage, setStage] = useState('transition');
    const fullText =
        `Happy Birthday, My Beautiful Queen! 👑❤️

Aaj ka din mere liye sabse khaas hai, kyunki aaj meri zindagi ki sabse haseen pari Ginni ka janam hua tha! 🎂🌸

Ginni, teri muskaan 🌟, jaise subah ki pehli dhoop ho 🌅, aur teri aankhein 🌸, jaise raat ka chamakta chand 🌙. Tere gaalon ka gulabi rang 🌹 mujhe ek khubsurat bagaicha yaad dilata hai. Teri baatein 🎶, jaise koel ki madhur awaaz aur teri adayein 💃, jaise ek nazakat bhara sapna!

Tu meri zindagi ki roshni hai 🌟, meri dhadkan 💓, aur meri sabse badi taaqat hai 💪. Tere bina sab kuch adhoora lagta hai 🌌. Tu meri khushi hai, mera sukoon hai aur mere dil ka sabse khaas hissa hai ❤️.

Mujhe Rab ka sabse bada tohfa tere roop mein mila hai 🎁✨. Teri hasi mere liye ek dua hai 🙏, aur tera saath meri zindagi ki sabse badi jeet hai 🏆.

Aaj ke din bas yahi dua karta hoon ki teri saari wishes poori ho 🎉, teri zindagi khushiyon se bhari rahe 🌺, aur tu hamesha aise hi muskurati rahe 😊🌻.

Teri zindagi mein rang barse 🌈, chandni chamke 🌙, aur tera har din khushboo se mehka rahe 🌸✨.

Happy Birthday, My Angel! 🥳👸💖 Teri muskaan ke bina yeh duniya adhuri lagti hai. Tu meri zindagi ka sabse khoobsurat hissa hai! 🥰💐

Love you always, forever and beyond! ❤️♾️`;

    // 1. Transition Logic
    useEffect(() => {
        const timer = setTimeout(() => {
            setStage('gift');
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // 2. Typewriter Logic - REMOVED for simplicity
    // useEffect(() => { ... }, [stage]);

    // 3. ROSE RAIN EFFECT (High Contrast/Visibility)
    const [roses, setRoses] = useState([]);
    useEffect(() => {
        if (stage === 'gallery') {
            const roseInterval = setInterval(() => {
                const id = Date.now();
                const newRose = {
                    id,
                    left: Math.random() * 100,
                    duration: 4 + Math.random() * 2,
                    size: 1.5 + Math.random(),
                };
                setRoses(prev => {
                    const updated = [...prev, newRose];
                    if (updated.length > 60) return updated.slice(1);
                    return updated;
                });
            }, 100); // 100ms interval for dense rain

            return () => clearInterval(roseInterval);
        }
    }, [stage]);

    // 4. User Interaction
    const handleGiftClick = () => {
        audioManager.playSfx('pop');
        audioManager.playTrack('/audio/sweet_song.mp3', 2000);
        setStage('gallery');

        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#FFD700', '#FFFFFF']
        });
    };

    return (
        <div style={{
            position: 'relative',
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            // THEME: Custom Image Background
            background: stage === 'transition'
                ? 'black'
                : `url(${surpriseBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'background 2s ease',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            perspective: '1000px'
        }}>


            {/* GIFT BOX */}
            <AnimatePresence>
                {stage === 'gift' && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 2, opacity: 0, filter: 'blur(10px)' }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        onClick={handleGiftClick}
                        style={{ cursor: 'pointer', zIndex: 50, textAlign: 'center' }}
                    >
                        <div style={{ fontSize: '8rem', filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.4))' }}>🎁</div>
                        <h2 className="header-text" style={{ fontSize: '2rem', marginTop: '1rem', fontFamily: 'Playfair Display', color: '#FFD700' }}>
                            A Gift For You
                        </h2>
                        <p style={{ color: '#aaa' }}>(Click to Open)</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* GALLERY */}
            {stage === 'gallery' && (
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, overflow: 'hidden', zIndex: 10 }}>
                    {PLACEHOLDER_PHOTOS.map((photo) => (
                        <motion.div
                            key={photo.id}
                            initial={{ x: `${photo.x}vw`, y: '110vh', opacity: 0, rotate: photo.rotate }}
                            animate={{ y: '-120vh', opacity: [0, 1, 1, 1, 0] }}
                            transition={{
                                duration: 25 + Math.random() * 10,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: photo.delay
                            }}
                            style={{
                                position: 'absolute',
                                left: '50%',
                                width: '220px',
                                background: 'rgba(255,255,255,0.95)',
                                padding: '10px 10px 30px 10px',
                                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                            }}
                        >
                            {photo.src ? (
                                <img src={photo.src} alt="memory" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            ) : (
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>{photo.content}</div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* ROSE RAIN (High Z-Index) */}
            {stage === 'gallery' && (
                <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, pointerEvents: 'none', zIndex: 50 }}>
                    {roses.map(rose => (
                        <motion.div
                            key={rose.id}
                            initial={{ y: '-10vh', opacity: 0, x: `${rose.left}vw` }}
                            animate={{ y: '110vh', opacity: 1, rotate: 360 }}
                            transition={{ duration: rose.duration, ease: 'linear' }}
                            style={{
                                position: 'absolute',
                                fontSize: `${rose.size}rem`,
                                textShadow: '0 2px 5px rgba(0,0,0,0.5)'
                            }}
                        >
                            🌹
                        </motion.div>
                    ))}
                </div>
            )}

            {/* MESSAGE */}
            {stage === 'gallery' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1.5 }}
                    style={{
                        position: 'absolute',
                        zIndex: 100,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        pointerEvents: 'auto',
                        overflowY: 'auto',
                        padding: '1rem', // Reduced padding for mobile
                    }}
                >
                    <div style={{
                        width: '100%',
                        maxWidth: '90%', // Wider on mobile
                        textAlign: 'center',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <h1 style={{
                            fontFamily: 'Playfair Display',
                            fontSize: 'clamp(1.2rem, 5vw, 2.5rem)', // Smaller min font size for mobile
                            color: '#FFF',
                            lineHeight: '1.6',
                            whiteSpace: 'pre-line',
                            textShadow: '0 0 10px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)',
                            padding: '20px',
                            margin: '0 auto 1.5rem auto',
                            minHeight: '150px', // Slightly smaller min-height
                            width: 'fit-content',
                            maxWidth: '100%',
                        }}>
                            {fullText}
                        </h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 2, duration: 1 }}
                            style={{
                                fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', // Responsive font size
                                color: '#FFD700',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                                marginTop: '0.5rem',
                                fontWeight: 'bold'
                            }}
                        >
                            To the moon and back 🌙
                        </motion.p>
                    </div>
                </motion.div>
            )}

        </div>
    );
};

export default RevealScreen;
