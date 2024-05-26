import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {getDaysInMonth, joursFeries} from "../../utils/dateUtils";
import {monthMapping} from "../../constants/dayMonth";
import ModernEvent, {ModernEventResume} from "./ModernEvent";
import {motion} from "framer-motion";
import axios from "axios";
import WeatherInfo, {WeatherInfoResume} from "./WeatherInfo";


function ModernCalendar({ setScrollToCurrentMonth }) {
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [selectedDay, setSelectedDay] = useState(null);
    const currentMonth = useSelector((state) => state.calendar.currentMonth);
    const currentYear = useSelector((state) => state.calendar.currentYear);
    const events = useSelector((state) => state.calendar.events);
    const monthRefs = useRef({});

    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        const storedHolidays = JSON.parse(localStorage.getItem('holidays')) || [];
        setHolidays(storedHolidays);
    }, []);

    const [workdays, setWorkdays] = useState([]);

    useEffect(() => {
        const storedWorkdays = JSON.parse(localStorage.getItem('workdays')) || [];
        setWorkdays(storedWorkdays);
    }, []);


    const [monthList, setMonthList] = useState([]);

    useEffect(() => {
        setMonthList(generateMonthList());
    }, [currentMonth, currentYear]);



    const [weatherData, setWeatherData] = useState(null);
    const [weatherForHour, setWeatherForHour] = useState(null);
    const fetchWeatherData = async () => {
        try {
            const response = await axios.get('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/47.473347%2C%207.351734', {
                params: {
                    unitGroup: 'metric',
                    key: 'PBK4K2T24WL9WGZ92BWWP2A5K',
                    contentType: 'json',
                    iconSet: 'icons1'
                }
            });
            console.log(response.data);
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeatherData();
        const intervalId = setInterval(fetchWeatherData, 6 * 60 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    const scrollToCurrentMonth = () => {
        if (monthRefs.current[12]) {
            monthRefs.current[12].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    useEffect(() => {
        setScrollToCurrentMonth(() => scrollToCurrentMonth);
        scrollToCurrentMonth();
    }, [monthList]);

    const generateMonthList = () => {
        let monthList = [];
        const currentDate = new Date(currentYear, currentMonth);
        currentDate.setMonth(currentDate.getMonth() - 12);

        for (let i = 0; i < 24; i++) {
            const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
            monthList.push(monthYear);
            currentDate.setMonth(currentDate.getMonth() + 1);
        }

        return monthList;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            const date = new Date();
            const dateOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Europe/Paris'
            };
            const timeOptions = {
                hour: 'numeric',
                minute: 'numeric',
                timeZone: 'Europe/Paris'
            };
            const formattedDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(date);
            const formattedTime = new Intl.DateTimeFormat('fr-FR', timeOptions).format(date);
            setCurrentDate(formattedDate);
            setCurrentTime(formattedTime);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const getUserColor = (user) => {
        switch (user) {
            case 'Jasmine':
                return 'rose';
            case 'Thierry':
                return 'yellow';
            case 'Quentin':
                return 'blue';
            case 'Jordan':
                return 'green';
            default:
                return 'primary';
        }
    };

    const isSameWeek = (d1, d2) => {
        // Check if d1 and d2 are in the same month
        if (d1.getMonth() !== d2.getMonth()) {
            return false;
        }

        // Adjust the day number to consider Monday as the first day of the week
        const dayNumber = d1.getDay() || 7;

        // Get the date for the start of the week
        const startOfWeek = new Date(d1);
        startOfWeek.setDate(d1.getDate() - dayNumber + 1);

        // Get the week number of the start of the week
        const weekNumberStart = Math.ceil(((startOfWeek - new Date(startOfWeek.getFullYear(), 0, 1)) / 86400000 + 1) / 7);

        // Get the week number of d2
        const weekNumberD2 = Math.ceil(((d2 - new Date(d2.getFullYear(), 0, 1)) / 86400000 + 1) / 7);

        // Check if d1 and d2 are in the same week
        return weekNumberStart === weekNumberD2;
    }

    const getNextThreeEvents = (events) => {
        const now = new Date();

        // Filter the events that are in the future
        const futureEvents = events.filter(event => {
            const eventDate = new Date(event.start.dateTime || event.start.date);
            return eventDate > now;
        });

        // Sort the future events in ascending order of their start date/time
        futureEvents.sort((a, b) => {
            const dateA = new Date(a.start.dateTime || a.start.date);
            const dateB = new Date(b.start.dateTime || b.start.date);
            return dateA - dateB;
        });

        // Return the first three events
        return futureEvents.slice(0, 3);
    };

    const getCurrentHourWeather = () => {
        if (!weatherData) return null;
        const date = new Date();
        const weatherForDay = weatherData?.days.find(d => {
            const eventDate = new Date(d.datetime);
            return eventDate.getFullYear() === date.getFullYear() &&
                eventDate.getMonth() === date.getMonth() &&
                eventDate.getDate() === date.getDate();
        });

        if (!weatherForDay) return null;

        // Find the weather data for the current hour
        return weatherForDay.hours.find(h => {
            const hourDate = new Date(`${weatherForDay.datetime.split('T')[0]}T${h.datetime}`);
            return hourDate.getHours() === date.getHours();
        });
    };

    useEffect(() => {
        setWeatherForHour(getCurrentHourWeather());
        const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, [weatherData]);

    return (
        <div className='h-[100vh] w-[100vw] bg-background flex flex-col overflow-hidden'>
            <div className='w-[90%] h-[10%] fixed z-50 self-end flex-col bg-primary bg-opacity-10 backdrop-blur-md  shadow-date-card rounded-bl-[100px] py-4 pl-8'>
                <div className='w-full flex gap-4 mb-2'>
                    <div className='font-montserrat font-extrabold text-text text-6xl uppercase'>{currentDate}</div>
                    <div className='font-montserrat font-bold text-primary text-6xl uppercase'>{currentTime}</div>
                    <WeatherInfoResume weatherForHour={weatherForHour}/>
                </div>
                <div className='w-full flex flex-col pl-8 h-[39%] mt-[-15px]'>
                    <div className='font-montserrat font-extrabold text-text text-opacity-20 text-xl uppercase mb-1'>événement à venir</div>
                    <div className='flex justify-between w-full h-full'>
                    {getNextThreeEvents(events).map((event) => (
                        <ModernEventResume key={event.id} event={event}/>
                    ))}
                    </div>
                </div>
            </div>
            <div className={"overflow-scroll flex flex-col  gap-16 w-full overflow-hidden no-scrollbar"}>
                {monthList.map((month, index) => {
                    const [monthName, year] = month.split(' ');
                    const publicHolidays = joursFeries(year);
                    const date = new Date(year, monthMapping[monthName.toLowerCase()]);
                    const daysInMonth = getDaysInMonth(year, date.getMonth());
                    const days = Array.from({length: daysInMonth}, (_, i) => i + 1);
                    let firstDayOfWeek = new Date(year, monthMapping[monthName.toLowerCase()]).getDay() - 1;
                    if (firstDayOfWeek === -1) firstDayOfWeek = 6;
                    return (
                        <div
                            className={'pt-[22%] flex flex-col text-text gap-4 w-full no-scrollbar'}
                            key={index}
                            ref={el => monthRefs.current[index] = el} // Assign a ref to each month
                        >
                            <div className={'text-4xl uppercase font-montserrat font-extrabold px-8'}>{month}</div>
                            <div className={'uppercase text-primary flex flex-row gap-3 font-poppins text-opacity-20 font-bold text-4xl pl-4'}>
                                <div className={'w-[13%] text-center'}>Lun</div>
                                <div className={'w-[13%] text-center'}>Mar</div>
                                <div className={'w-[13%] text-center'}>Mer</div>
                                <div className={'w-[13%] text-center'}>Jeu</div>
                                <div className={'w-[13%] text-center'}>Ven</div>
                                <div className={'w-[13%] text-center'}>Sam</div>
                                <div className={'w-[13%] text-center'}>Dim</div>
                            </div>
                            <div className={'flex flex-row flex-wrap items-center gap-3 w-full pl-4'}>

                                {Array(firstDayOfWeek).fill(null).map((_, i) => {
                                    const date = new Date(year, monthMapping[monthName.toLowerCase()], 1);
                                    return (
                                        <motion.div
                                            className={`${(
                                                selectedDay !== null &&
                                                isSameWeek(date, new Date(selectedDay.year, monthMapping[selectedDay.month.toLowerCase()], selectedDay.day)) &&
                                                date.getMonth() === new Date(selectedDay.year, monthMapping[selectedDay.month.toLowerCase()], selectedDay.day).getMonth() &&
                                                date.getFullYear() === new Date(selectedDay.year, monthMapping[selectedDay.month.toLowerCase()], selectedDay.day).getFullYear()
                                            ) ? 'w-[6%]' : 'w-[13%]'}`}
                                            key={`empty-${i}`}
                                        ></motion.div>
                                    );
                                })}
                                {days.map(day => {
                                    const date = new Date(year, monthMapping[monthName.toLowerCase()], day);
                                    const isPublicHoliday = Object.values(publicHolidays).some((holiday) => holiday.getTime() === date.getTime());
                                    const isHoliday = holidays.some(holiday => {
                                        const startDate = new Date(holiday.startDate);
                                        const endDate = new Date(holiday.endDate);
                                        return date >= startDate && date <= endDate;
                                    });

                                    const holidayUsers = [];
                                    if (isHoliday) {
                                        const matchingHolidays = holidays.filter(holiday => {
                                            const startDate = new Date(holiday.startDate);
                                            const endDate = new Date(holiday.endDate);
                                            return date >= startDate && date <= endDate;
                                        });
                                        matchingHolidays.forEach(holiday => {
                                            const userColor = getUserColor(holiday.user);
                                            holidayUsers.push(userColor);
                                        });
                                    }

                                    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }).toLowerCase();
                                    const jourDeLaSemaine = date.toLocaleString('fr-FR', { weekday: 'long' });
                                    const jourDeLaSemaineCapitalized = jourDeLaSemaine.charAt(0).toUpperCase() + jourDeLaSemaine.slice(1);let workdayPeriod;
                                    let j = 0;
                                    let firstWorkdayStart;
                                    if (workdays.length > 0) {
                                        firstWorkdayStart = new Date(workdays[0].from);
                                    }

                                    if (firstWorkdayStart && date >= firstWorkdayStart) {
                                        while (j < workdays.length) {
                                            const startDate = new Date(workdays[j].from);
                                            let endDate;
                                            if (workdays[j + 1]) {
                                                endDate = new Date(workdays[j + 1].from);
                                                if (date < endDate) {
                                                    workdayPeriod = workdays[j];
                                                    break;
                                                } else {
                                                    j++;
                                                }
                                            } else {
                                                endDate = new Date(9999, 11, 31);
                                                if (date >= startDate && date < endDate) {
                                                    workdayPeriod = workdays[j];
                                                }
                                                break;
                                            }
                                        }
                                    }

                                    const isWorkday = workdayPeriod && workdayPeriod[dayOfWeek];
                                    const isSelected = (day === selectedDay?.day && monthName === selectedDay?.month && year === selectedDay?.year);
                                    const notSelected = (selectedDay !== null && isSameWeek(new Date(year, monthMapping[monthName.toLowerCase()], day), new Date(selectedDay.year, monthMapping[selectedDay.month.toLowerCase()], selectedDay.day)));

                                    const weatherForDay = weatherData?.days.find(d => {
                                        const eventDate = new Date(d.datetime);
                                        return eventDate.getFullYear() === date.getFullYear() &&
                                            eventDate.getMonth() === date.getMonth() &&
                                            eventDate.getDate() === date.getDate();
                                    });

                                    return (
                                        <motion.div
                                            onClick={() => setSelectedDay(prevState => {
                                                if (day === prevState?.day && monthName === prevState?.month && year === prevState?.year) {
                                                    return null; // deselect the day if it's the currently selected day
                                                } else {
                                                    return { day, month: monthName, year }; // select the day if it's not the currently selected day
                                                }
                                            })}
                                            className={`flex flex-col justify-between ${isPublicHoliday ? 'bg-opacity-50 bg-accent'  :  'bg-opacity-10'} bg-primary shadow-date-card rounded-[50px] h-[14vh] overflow-hidden ${isSelected ? 'w-[55%]' : (notSelected ? 'w-[6%]' : 'w-[13%]')}`}
                                            key={day}
                                        >
                                            { !isSelected && <>
                                                <div
                                                    className={"text-center flex flex-col gap-2 font-poppins font-semibold text-3xl py-3 w-[90%] self-center"}>
                                                    <div>{day}</div>
                                                    {holidayUsers.length > 0 ? holidayUsers.map((userColor, index) => (
                                                        <div key={index} className={`w-full rounded-full h-1 background-${userColor} bg-opacity-20`}>&nbsp;</div>
                                                    )) : <div className={"w-full rounded-full h-1 bg-primary bg-opacity-20"}>&nbsp;</div>}
                                                </div>
                                                <div className={"w-full h-full flex flex-col gap-2"}>
                                                    {events.filter(event => {
                                                        const eventDate = new Date(event.start.dateTime || event.start.date);
                                                        return eventDate.getDate() === day && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
                                                    }).map(event => (
                                                        <ModernEvent key={event.id} event={event} status={isSelected ? 'selected' : notSelected ? 'not selected' : 'normal'}/>
                                                    ))}
                                                </div>
                                                <div className={`${isWorkday && !isPublicHoliday && !holidayUsers.some(user => user.userColor === 'rose') ? 'bg-primary' :  ''} bg-opacity-20 w-full h-[35%]`}>
                                                    &nbsp;
                                                </div>
                                            </>
                                            }
                                            {
                                                isSelected &&
                                                <div className={"flex w-full h-full"}>
                                                    <div className={"w-[35%]  flex flex-col"}>
                                                        <div className={"h-[25%] bg-primary bg-opacity-10 font-poppins font-semibold pl-8 py-2"}>
                                                            <div className={"text-2xl"}>{jourDeLaSemaineCapitalized} {day}</div>
                                                            <div className={'uppercase text-xl leading-5'}>{selectedDay.month}</div>
                                                        </div>
                                                        <div className={"h-[75%]"}>
                                                            {weatherForDay && (
                                                                <WeatherInfo weatherForDay={weatherForDay} />
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={"w-[65%] bg-primary bg-opacity-5 flex flex-col gap-2 pr-8 py-4 px-2"}>{events.filter(event => {
                                                        const eventDate = new Date(event.start.dateTime || event.start.date);
                                                        return eventDate.getDate() === day && eventDate.getMonth() === date.getMonth() && eventDate.getFullYear() === date.getFullYear();
                                                    }).map(event => (
                                                        <ModernEvent key={event.id} event={event} status={isSelected ? 'selected' : notSelected ? 'not selected' : 'normal'}/>
                                                    ))}</div>
                                                </div>

                                            }
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ModernCalendar;