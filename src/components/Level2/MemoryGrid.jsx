import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MemoryCard from './MemoryCard';
import ProgressBar from './ProgressBar';
import audioManager from '../../utils/AudioManager';

// Horror Icons
const cardContents = ['☠️', '👁️', '🖐️', '💔', '😱', '⚰️'];

const generateCards = () => {
    const cards = [...cardContents, ...cardContents].map((content, index) => ({
        id: index,
        content,
        isFlipped: false,
        isMatched: false,
    }));
    return cards.sort(() => Math.random() - 0.5);
};

const MemoryGrid = ({ onComplete }) => {
    const [cards, setCards] = useState(generateCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showReward, setShowReward] = useState(false);

    // Calculate progress
    const matchedCount = cards.filter(c => c.isMatched).length / 2;
    const progress = (matchedCount / cardContents.length) * 100;

    useEffect(() => {
        if (matchedCount === cardContents.length) {
            setTimeout(() => {
                setShowReward(true);
            }, 1000);
        }
    }, [matchedCount]);

    const handleCardClick = (id) => {
        if (isProcessing) return;

        const clickedCard = cards.find(c => c.id === id);
        if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

        audioManager.playSfx('card_flip');

        const newCards = cards.map(c => c.id === id ? { ...c, isFlipped: true } : c);
        setCards(newCards);

        const newFlipped = [...flippedCards, clickedCard];
        setFlippedCards(newFlipped);

        if (newFlipped.length === 2) {
            setIsProcessing(true);
            const [first, second] = newFlipped;

            if (first.content === clickedCard.content) {
                // MATCH
                audioManager.playSfx('sizzle_burn');
                // Set matched state after short delay to show content
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        c.id === first.id || c.id === clickedCard.id
                            ? { ...c, isMatched: true, isFlipped: true }
                            : c
                    ));
                    setFlippedCards([]);
                    setIsProcessing(false);
                }, 500);
            } else {
                // MISMATCH
                audioManager.playSfx('whisper_laugh');
                setTimeout(() => {
                    setCards(prev => prev.map(c =>
                        c.id === first.id || c.id === clickedCard.id
                            ? { ...c, isFlipped: false }
                            : c
                    ));
                    setFlippedCards([]);
                    setIsProcessing(false);
                }, 1000);
            }
        }
    };

    return (
        <div className="card-container" style={{ maxWidth: '800px' }}>
            {!showReward ? (
                <>
                    <h2 className="header-text" style={{ fontFamily: 'Creepster', color: 'red', textShadow: '0 0 10px black' }}>
                        Shadows & Whispers
                    </h2>

                    <ProgressBar progress={progress} />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                            gap: '15px',
                            width: '100%',
                            justifyItems: 'center',
                            marginTop: '20px'
                        }}
                    >
                        {cards.map(card => (
                            <MemoryCard
                                key={card.id}
                                {...card}
                                onClick={handleCardClick}
                            />
                        ))}
                    </motion.div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel"
                    style={{ padding: '2rem', border: '2px solid red', backgroundColor: 'rgba(0,0,0,0.8)' }}
                >
                    <h2 style={{ fontFamily: 'Nosifer', color: 'red', marginBottom: '1.5rem' }}>THE SMILE</h2>
                    <p className="responsive-text" style={{ color: '#ccc', marginBottom: '2rem', textAlign: 'left', borderLeft: '3px solid red', paddingLeft: '1rem' }}>
                        "Mood tera off ho ya on, <span style={{ color: 'red' }}>Main chahiye tujhe</span> from dusk till dawn.<br />
                        Cap hata aur twist kar, color tera favorite hai,<br />
                        Agla clue <span style={{ color: 'red', fontWeight: 'bold' }}>Makeup Kit</span> mein hai, waqt bahut short hai!"
                    </p>
                    <button
                        onClick={onComplete}
                        style={{
                            background: '#8a0303',
                            color: 'black',
                            border: 'none',
                            padding: '1rem 2rem',
                            fontFamily: 'Creepster',
                            fontSize: '1.5rem',
                            cursor: 'pointer',
                            boxShadow: '0 0 15px red',
                            marginTop: '1rem'
                        }}
                    >
                        PROCEED IF YOU DARE
                    </button>
                </motion.div>
            )}
        </div>
    );
};

export default MemoryGrid;
