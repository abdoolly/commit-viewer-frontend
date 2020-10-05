import React from 'react';
import BoldText from '../../components/BoldText/BoldText';
import NormalText from '../../components/NormalText/NormalText';
import NumSquare from '../../components/NumSquare/NumSquare';

const Home = () => {
    return (
        <div>
            <BoldText text="Hello world Bold" />
            <NormalText text="Hello world Normal" />
            <NumSquare text="7" />
        </div>
    );
};

export default Home;