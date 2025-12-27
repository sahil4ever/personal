import React from 'react';
import { motion } from 'framer-motion';

const MemoryCard = ({ id, content, isFlipped, isMatched, onClick }) => {
    return (
        <div
            style={{
                width: '100px',
                height: '140px',
                position: 'relative',
                cursor: 'pointer',
                perspective: '1000px'
            }}
            onClick={() => !isFlipped && !isMatched && onClick(id)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Front of Card (Hidden State) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(135deg, var(--bg-color), var(--accent-color))',
                    borderRadius: '12px',
                    border: '2px solid var(--secondary-color)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    color: 'var(--primary-color)'
                }}>
                    <span style={{ fontSize: '2rem', opacity: 0.7 }}>❀</span>
                </div>

                {/* Back of Card (Revealed State) */}
                <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                    borderRadius: '12px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    boxShadow: '0 0 20px var(--shadow-color)'
                }}>
                    {content}
                </div>
            </motion.div>
        </div>
    );
};

export default MemoryCard;
