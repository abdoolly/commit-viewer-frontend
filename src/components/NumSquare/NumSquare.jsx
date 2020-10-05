import React from 'react';
import NormalText from '../NormalText/NormalText';
import './NumSquare.css';

const NumSquare = ({ text, isSelected }) => {
    return (
        <div className={`num-square ${isSelected ? '.selected' : ''}`}>
            <NormalText text={text} />
        </div>
    );
};

export default NumSquare;