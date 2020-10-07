import React from 'react';
import NormalText from '../NormalText/NormalText';
import './NumSquare.css';

const NumSquare = ({ text, color, isSelected, removeHover, isDisabled, isToday = false }) => {

    const allowHover = !(isDisabled || isToday || isSelected);

    return (
        <div className={
            `num-square 
            ${allowHover ? 'num-square-hover' : ''}
            ${isSelected ? 'selected' : ''}
            ${removeHover ? 'remove-hover' : ''}
            ${isDisabled ? 'disabled' : ''}
            ${isToday ? 'isToday' : ''}
            `}>
            <NormalText text={text} color={color} />
        </div>
    );
};

export default NumSquare;