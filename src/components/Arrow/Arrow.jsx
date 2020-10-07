import React, { useState } from 'react';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import './Arrow.css';

const Arrow = ({ direction = 'right', size = 30, isVisible = true, onClick }) => {
    const [color, setColor] = useState('#cecece');
    const onMouseOver = () => setColor('black');
    const onMouseOut = () => setColor('#cecece');

    return (
        <ArrowIcon
            height={size}
            width={size}
            className={`arrow ${direction === 'right' ? 'right' : 'left'}`}
            fill={color}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            visibility={isVisible ? 'visible' : 'hidden'}
            onClick={onClick}
        />
    );
};

export default Arrow;