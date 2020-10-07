import React from 'react';
import Calendar from '../../components/Calendar/Calendar';

const Home = () => {
    const callOnDateSelection = (start, end) => {
        console.log('start, end', start, end);
    }
    return (
        <div>
            <h1>Hello world</h1>
            <Calendar onDateSelection={callOnDateSelection} />
        </div>
    );
};

export default Home;