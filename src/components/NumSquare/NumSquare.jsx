import React from 'react';
import NormalText from '../NormalText/NormalText';
import './NumSquare.css';

const NumSquare = ({ text, color, isSelected, removeHover, isToday = false }) => {

    const allowHover = !(isToday || isSelected);

    return (
        <div className={
            `num-square 
            ${allowHover ? 'num-square-hover' : ''}
            ${isSelected ? 'selected' : ''}
            ${removeHover ? 'remove-hover' : ''}
            ${isToday ? 'isToday' : ''}
            `}>
            <NormalText text={text} color={color} />
        </div>
    );
};

export default NumSquare;