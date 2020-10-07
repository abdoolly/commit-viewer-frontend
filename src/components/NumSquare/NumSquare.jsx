import React from 'react';
import NormalText from '../NormalText/NormalText';
import './NumSquare.css';

const NumSquare = ({
    text,
    color,
    removeHover,
    isDisabled,
    isToday = false,
    onClick,
    date,
    selectedDateRange,
    selectedDates
}) => {

    const isHighlighted = () => {
        if (!selectedDateRange)
            return false;

        let { start, end } = selectedDateRange;

        // if this is the start or the end then it's selected already and do not need to be highlighted
        if (date === start || date === end) {
            return false;
        }

        start = new Date(start);
        end = new Date(end);
        let dateObj = new Date(date);

        // if the start is after the end then the date should exist between before the start and after the end
        if (start > end && (dateObj < start && dateObj > end)) {
            return true;
        }

        // if the start is before the end then the date should exist after the start and before the end
        if (start < end && (dateObj > start && dateObj < end)) {
            return true;
        }
    };

    const isSelected = selectedDates ? Boolean(selectedDates[date]) : false;
    const allowHover = !(isDisabled || isToday || isSelected);

    const onClickInternal = () => {
        // call the onClick coming from the paretn component sending this components data
        if (onClick) onClick({ date, dayNum: text });
    };

    return (
        <div className={
            `num-square 
            ${allowHover ? 'num-square-hover' : ''}
            ${isHighlighted() ? 'highlight' : ''}
            ${isSelected ? 'selected' : ''}
            ${removeHover ? 'remove-hover' : ''}
            ${isDisabled ? 'disabled' : ''}
            ${isToday ? 'isToday' : ''}
            `}
            onClick={isDisabled ? null : onClickInternal}
        >
            <NormalText text={text} color={color} />
        </div>
    );
};

// putting react memo to optimize the rendering of this component
export default React.memo(NumSquare);