import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress }) => {
    return (
        <div style={{
            width: '100%',
            maxWidth: '400px',
            height: '10px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                    boxShadow: '0 0 10px rgba(255, 215, 0, 0.5)'
                }}
            />
        </div>
    );
};

export default ProgressBar;
