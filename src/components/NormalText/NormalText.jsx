import React from 'react';
import './NormalText.css';

const NormalText = ({ text, color }) => {
    return (
        <p className="normal-text" style={{ color: color }}>{text}</p>
    );
};

export default NormalText;