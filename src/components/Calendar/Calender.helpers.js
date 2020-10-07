import * as _ from 'ramda';
import { DateTime } from 'luxon';

// null handlers
export const handleNullParam = _.curry((fn, param) => handleNull(param) === '' ? '' : fn(param));
export const handleNull = (value) => value ? value : '';

// functions to ease out access
export const getMonthName = handleNullParam((date) => date.monthLong);
export const getMonth = handleNullParam((date) => date.month);
export const getDayName = handleNullParam((date) => date.weekdayShort);
export const getYear = handleNullParam((date) => date.year);
export const getDayNumber = handleNullParam((date) => date.day);

export const filterMonthDays = (date) => {
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

const getWeekdayCounter = (weekday) => {
    if (weekday > 7) {
        return 0;
    }

    return weekday - 1;
}