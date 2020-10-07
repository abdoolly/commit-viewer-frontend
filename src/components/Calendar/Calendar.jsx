import { DateTime } from 'luxon';
import * as _ from 'ramda';
import React, { useCallback, useMemo, useState } from 'react';
import Arrow from '../Arrow/Arrow';
import BoldText from '../BoldText/BoldText';
import NumSquare from '../NumSquare/NumSquare';
import './Calendar.css';

// null handlers
const handleNullParam = _.curry((fn, param) => handleNull(param) === '' ? '' : fn(param));
const handleNull = (value) => value ? value : '';

// functions to ease out access
const getMonthName = handleNullParam((date) => date.monthLong);
const getMonth = handleNullParam((date) => date.month);
const getDayName = handleNullParam((date) => date.weekdayShort);
const getYear = handleNullParam((date) => date.year);
const getDayNumber = handleNullParam((date) => date.day);

const weekdays = [
    <td key='1'><NumSquare text='Mon' color="grey" removeHover={true} /></td>,
    <td key='2'><NumSquare text='Tue' color="grey" removeHover={true} /></td>,
    <td key='3'><NumSquare text='Wed' color="grey" removeHover={true} /></td>,
    <td key='4'><NumSquare text='Thu' color="grey" removeHover={true} /></td>,
    <td key='5'><NumSquare text='Fri' color="grey" removeHover={true} /></td>,
    <td key='6'><NumSquare text='Sat' color="grey" removeHover={true} /></td>,
    <td key='7'><NumSquare text='Sun' color="grey" removeHover={true} /></td>,
];

const filterMonthDays = (date) => {
    console.log('xxx');
    let today = DateTime.fromJSDate(new Date());
    let monthName = getMonthName(date);
    let monthNum = getMonth(date);
    let year = getYear(date);

    let weekdays = [];
    let weekCounter = 0;
    let weekdayCounter = 0;

    for (let i = 1; ; i++) {
        let initialStart = DateTime.fromJSDate(new Date(`${year}-${monthNum}-${i}`));

        let dayNum = getDayNumber(initialStart);
        let weekday = initialStart.weekday;
        let weekArr = null;

        let dayObject = {
            dayNum,
            dayName: getDayName(initialStart),
            weekday: weekday,
            isToday: today.toISODate() === initialStart.toISODate(),
            date: initialStart.toISODate()
        }

        if (i === 1) {
            weekArr = makeWeekArr(weekday, dayObject);
            weekdays[weekCounter] = weekArr;
            weekdayCounter = getWeekdayCounter(weekday + 1);
            continue;
        }

        if (weekdayCounter === 0) {
            weekCounter++;
            weekdays[weekCounter] = [];
            weekdays[weekCounter][weekdayCounter] = dayObject;
            weekdayCounter = getWeekdayCounter(weekday + 1);

        } else if (weekdayCounter > 0) {

            weekdays[weekCounter][weekdayCounter] = dayObject;
            weekdayCounter = getWeekdayCounter(weekday + 1);
        }

        // if the next day was in the next month then break
        if (getMonthName(initialStart.plus({ days: 1 })) !== monthName) {
            // weekdays[weekCounter] = completeWeekArr(weekdays[weekCounter]);
            break;
        }
    }

    return weekdays;
};

const makeWeekArr = (weekday, dayNum) => {
    let week = new Array(7).fill(0);
    week[weekday - 1] = dayNum;
    return week;
}

const completeWeekArr = (weekArr) => {
    if (weekArr.length === 7)
        return weekArr;

    for (let i = weekArr.length; i < 7; i++) {
        weekArr[i] = undefined;
    }

    return weekArr;
}

const getWeekdayCounter = (weekday) => {
    if (weekday > 7) {
        return 0;
    }

    return weekday - 1;
}

const isThisLastMonth = (current) => {
    const today = DateTime.fromJSDate(new Date());
    return getMonthName(today) === getMonthName(current) && getYear(today) === getYear(current);
};

const Calendar = () => {
    let [current, setCurrentDate] = useState(DateTime.fromJSDate(new Date()));
    let [prev, setPrevDate] = useState(current.minus({ months: 1 }));

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
                                                return (<td key={i.toString()}><NumSquare isToday={dayObject.isToday} text={dayObject.dayNum} isDisabled={dayObject.isDisabled} /></td>);

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
                                                return (<td key={i.toString()}><NumSquare isToday={dayObject.isToday} text={dayObject.dayNum} isDisabled={dayObject.isDisabled} /></td>);

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
                    <a href="#">Today</a>
                    <a href="#">Start</a>
                    <a href="#">End</a>
                </div>
            </div>
        </div>

    );
};

export default Calendar;