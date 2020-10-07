import { DateTime } from 'luxon';
import React, { useCallback, useMemo, useState } from 'react';
import Arrow from '../Arrow/Arrow';
import BoldText from '../BoldText/BoldText';
import NumSquare from '../NumSquare/NumSquare';
import './Calendar.css';
import { filterMonthDays, getMonthName, getYear } from './Calender.helpers';

const weekdays = [
    <td key='1'><NumSquare text='Mon' color="grey" removeHover={true} /></td>,
    <td key='2'><NumSquare text='Tue' color="grey" removeHover={true} /></td>,
    <td key='3'><NumSquare text='Wed' color="grey" removeHover={true} /></td>,
    <td key='4'><NumSquare text='Thu' color="grey" removeHover={true} /></td>,
    <td key='5'><NumSquare text='Fri' color="grey" removeHover={true} /></td>,
    <td key='6'><NumSquare text='Sat' color="grey" removeHover={true} /></td>,
    <td key='7'><NumSquare text='Sun' color="grey" removeHover={true} /></td>,
];

// check if this date is the current month now so, that we should remove the right arrow 
const isThisLastMonth = (current) => {
    const today = DateTime.fromJSDate(new Date());
    return getMonthName(today) === getMonthName(current) && getYear(today) === getYear(current);
};

const Calendar = ({
    onDateSelection
}) => {
    let [current, setCurrentDate] = useState(DateTime.fromJSDate(new Date()));
    let [prev, setPrevDate] = useState(current.minus({ months: 1 }));
    const [selectedDates, setSelectedDates] = useState({});
    const [dateRange, setDateRange] = useState(null);

    let filteredCurrent = useMemo(() => filterMonthDays(current), [current]);
    let filteredPrev = useMemo(() => filterMonthDays(prev), [prev]);
    let shouldRemoveRightArrow = useMemo(() => isThisLastMonth(current), [current]);

    // get the previous two months
    const onClickLeftArrow = useCallback(() => {
        setCurrentDate(current.minus({ months: 1 }));
        setPrevDate(prev.minus({ months: 1 }));
    }, [current, prev]);

    const onClickRightArrow = useCallback(() => {
        // get the next two months
        setCurrentDate(current.plus({ months: 1 }));
        setPrevDate(prev.plus({ months: 1 }));
    }, [current, prev]);

    // on click today navigate the user to today in the calendar
    const onClickToday = useCallback(() => {
        let today = DateTime.fromJSDate(new Date());
        setCurrentDate(today);
        setPrevDate(today.minus({ months: 1 }));
    }, []);

    const onClickStart = useCallback(() => {
        if (!dateRange || Object.keys(dateRange).length !== 2)
            return;

        let startDate = new Date(dateRange.start);
        let endDate = new Date(dateRange.end);

        if (startDate > endDate) {
            startDate = DateTime.fromJSDate(startDate);
            setCurrentDate(startDate);
            setPrevDate(startDate.minus({ months: 1 }));
        }

        if (startDate < endDate) {
            startDate = DateTime.fromJSDate(startDate);
            setCurrentDate(startDate.plus({ months: 1 }));
            setPrevDate(startDate);
        }
    }, [dateRange]);

    const onClickEnd = useCallback(() => {
        if (!dateRange || Object.keys(dateRange).length !== 2)
            return;

        let startDate = new Date(dateRange.start);
        let endDate = new Date(dateRange.end);

        if (startDate < endDate) {
            endDate = DateTime.fromJSDate(endDate);
            setCurrentDate(endDate);
            setPrevDate(endDate.minus({ months: 1 }));
        }

        if (startDate > endDate) {
            endDate = DateTime.fromJSDate(endDate);
            setCurrentDate(endDate.plus({ months: 1 }));
            setPrevDate(endDate);
        }
    }, [dateRange]);

    const onClickDayNum = useCallback(({ date }) => {
        const numDates = Object.keys(selectedDates).length;

        // if more than 2 then reset and only select the newly selected value
        if (numDates >= 2) {
            setSelectedDates({ [date]: true });
            setDateRange(null);
        }

        if (numDates < 2) {
            const newSelectedDates = Object.assign({ [date]: true }, selectedDates);
            setSelectedDates(newSelectedDates);
            const keys = Object.keys(newSelectedDates);
            if (keys.length === 2) {
                // set the dateRange
                setDateRange({ start: keys[1], end: keys[0] });

                // call the other functions outside here
                onDateSelection(new Date(keys[1]), new Date(keys[0]));
            }
        }
    }, [selectedDates]);

    return (
        <div className="calendar">
            <div className="left-comp">
                <div className="upper-part-left" >
                    <Arrow direction="left" size={25} onClick={onClickLeftArrow} />
                    <BoldText text={`${getMonthName(prev)} ${getYear(prev)}`} />
                </div>
                <br />
                <table>
                    <thead>
                        <tr>
                            {weekdays}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredPrev.map((week, index) => {
                                return (
                                    <tr key={index.toString()}>
                                        {week.map((dayObject, i) => {
                                            if (dayObject)
                                                return (<td key={i.toString()}><NumSquare date={dayObject.date} onClick={onClickDayNum} selectedDateRange={dateRange} selectedDates={selectedDates} isToday={dayObject.isToday} text={dayObject.dayNum} isDisabled={dayObject.isDisabled} /></td>);

                                            return (<td key={i.toString()}><NumSquare text='' isDisabled={true} /></td>);
                                        })}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="left-comp">
                <div className="upper-part-right" >
                    <BoldText text={`${getMonthName(current)} ${getYear(current)}`} />
                    {<Arrow size={25} isVisible={!shouldRemoveRightArrow} onClick={onClickRightArrow} />}
                </div>
                <br />
                <table>
                    <thead>
                        <tr>
                            {weekdays}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredCurrent.map((week, index) => {
                                return (
                                    <tr key={index.toString()}>
                                        {week.map((dayObject, i) => {

                                            if (dayObject)
                                                return (<td key={i.toString()}><NumSquare date={dayObject.date} onClick={onClickDayNum} selectedDateRange={dateRange} selectedDates={selectedDates} isToday={dayObject.isToday} text={dayObject.dayNum} isDisabled={dayObject.isDisabled} /></td>);

                                            return (<td key={i.toString()}><NumSquare text='' isDisabled={true} /></td>);
                                        })}
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className="cal-footer">
                <hr />
                <div >
                    <a href="#" onClick={onClickToday}>Today</a>
                    <a href="#" onClick={onClickStart}>Start</a>
                    <a href="#" onClick={onClickEnd}>End</a>
                </div>
            </div>
        </div>

    );
};

export default Calendar;