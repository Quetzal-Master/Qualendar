import React, { useState, useEffect, useRef } from 'react';
import { getDaysInMonth } from '../../utils/dateUtils';

const DatePicker = ({ onDateChange, onPeriodChange, mode = 'single' }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const monthRef = useRef(null);
    const yearRef = useRef(null);

    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const years = Array.from({ length: 101 }, (_, i) => i + (new Date().getFullYear() - 50));

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const handleDayClick = (day) => {
        const selectedDate = new Date(currentYear, currentMonth, day);

        if (mode === 'single') {
            setStartDate(selectedDate);
            onDateChange(selectedDate);
        } else if (mode === 'period') {
            if (!startDate || (startDate && endDate)) {
                setStartDate(selectedDate);
                setEndDate(null);
            } else if (startDate && !endDate) {
                if (selectedDate < startDate) {
                    setEndDate(startDate);
                    setStartDate(selectedDate);
                } else {
                    setEndDate(selectedDate);
                }
            }
        }
    };

    useEffect(() => {
        if (mode === 'period' && startDate && endDate) {
            onPeriodChange(startDate, endDate);
        }
    }, [startDate, endDate, mode, onPeriodChange]);

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value);
        setCurrentMonth(newMonth);
        if (monthRef.current) {
            monthRef.current.blur();
        }
    };

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value);
        setCurrentYear(newYear);
        if (yearRef.current) {
            yearRef.current.blur();
        }
    };

    const isDayInRange = (day) => {
        if (!startDate || !endDate) return false;
        const date = new Date(currentYear, currentMonth, day);
        return date >= startDate && date <= endDate;
    };

    const formatDate = (date) => {
        return date ? date.toDateString() : '';
    };

    return (
        <div className="flex w-full flex-col gap-0 bg-transparent">
            <div className="flex w-full items-center justify-center gap-2">
                <div className="flex flex-col text-2xl">
                    <select
                        id="month-select"
                        value={currentMonth}
                        onChange={handleMonthChange}
                        ref={monthRef}
                        className="mt-1 p-2 rounded font-poppins outline-none text-text-modern bg-transparent focus:text-sm"
                    >
                        {months.map((m, index) => (
                            <option key={index} value={index}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col text-2xl">
                    <select
                        id="year-select"
                        value={currentYear}
                        onChange={handleYearChange}
                        ref={yearRef}
                        className="mt-1 p-2 rounded font-poppins outline-none text-text-modern bg-transparent focus:text-sm"
                    >
                        {years.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="flex flex-wrap mt-[-2%]">
                {days.map((day) => (
                    <div key={day} className="relative">
                        <div
                            className={`absolute inset-0 ${isDayInRange(day) ? 'bg-primary' : ''} ${
                                startDate && new Date(currentYear, currentMonth, day).toDateString() === startDate.toDateString()
                                    ? 'bg-primary rounded-l-full'
                                    : ''
                            } ${
                                endDate && new Date(currentYear, currentMonth, day).toDateString() === endDate.toDateString()
                                    ? 'bg-primary rounded-r-full'
                                    : ''
                            }`}
                        ></div>
                        <button
                            className={`w-[58px] h-[58px] flex font-poppins bg-transparent text-lg font-semibold items-center justify-center rounded-full cursor-pointer relative z-10 ${
                                startDate && new Date(currentYear, currentMonth, day).toDateString() === startDate.toDateString()
                                    ? 'text-white'
                                    : endDate && new Date(currentYear, currentMonth, day).toDateString() === endDate.toDateString()
                                        ? 'text-white'
                                        : isDayInRange(day)
                                            ? 'text-white'
                                            : 'text-text-modern'
                            }`}
                            onClick={() => handleDayClick(day)}
                            style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                        >
                            {day}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DatePicker;
