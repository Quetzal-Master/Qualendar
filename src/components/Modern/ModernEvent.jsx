import React from 'react';
import { motion } from 'framer-motion';
import getEventByType from '../../constants/EventType';

const ModernEvent = ({ event, status }) => {
    let colorClass = null;
    let backgroundClass = null;
    switch (event.creator.email) {
        case "qhattstadt@gmail.com":
            colorClass = "event-blue";
            backgroundClass = "background-blue";
            break;
        case "jhattstadt@gmail.com":
            colorClass = "event-green";
            backgroundClass = "background-green";
            break;
        case "jasmine.hattstadt@gmail.com":
            colorClass = "event-rose";
            backgroundClass = "background-rose";
            break;
        case "thierry.hattstadt@gmail.com":
            colorClass = "event-yellow";
            backgroundClass = "background-yellow";
            break;
        default:
            break;
    }

    // Get the SVG and typeName for the event
    const attendeeEmail = event.attendees && event.attendees[0] ? event.attendees[0].email : null;
    const { Svg, typeName, SvgOnly } = getEventByType(attendeeEmail, colorClass);

    const startDate = new Date(event.start.dateTime);
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const startTimeString = `${startHours}H${startMinutes < 10 ? '0' + startMinutes : startMinutes}`;


    const endDate = new Date(event.end.dateTime);
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    const endTimeString = `${endHours}H${endMinutes < 10 ? '0' + endMinutes : endMinutes}`;

    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {}}
            key={event.id}
            className={`${backgroundClass} rounded-[10px] mx-2 shadow-event-card flex justify-between p-2`}
        >
            {
                status === 'selected' &&
                <div className={'flex font-inter font-semibold justify-between w-full gap-2'}>
                    <div className={`flex items-center justify-center ${backgroundClass} bg-opacity-20 rounded-xl w-12 h-12`}>
                        <SvgOnly className={`h-full ${colorClass} ${typeName === 'Default' ? 'event-default' : ''}`} />
                    </div>
                    <div className={'flex flex-col font-inter font-semibold items-start gap-0 w-[82%]'}>
                        <div className={'leading-4 font-quiksand w-full'}>{event.summary}</div>
                        <div className={'leading-5 text-text-modern text-sm'}>{startTimeString} > {endTimeString}</div>
                    </div>
                </div>
            }
            {
                status === 'normal' &&  <>
                    <SvgOnly className={`h-full ${colorClass} ${typeName === 'Default' ? 'event-default' : ''}`} />
                    <div className={`${backgroundClass} rounded-full h-full w-1`}>&nbsp;</div>
                    <div className={'flex flex-col font-inter font-semibold items-center justify-center'}>
                        <div className={'leading-5'}>{startTimeString}</div>
                        <div className={'leading-5'}>{endTimeString}</div>
                    </div>
                </>
            }
            {
                status === 'not selected' && Svg
            }
        </motion.div>
    );
};

export default ModernEvent;

export const ModernEventResume = ({ event }) => {
    let colorClass = null;
    let backgroundClass = null;
    switch (event.creator.email) {
        case "qhattstadt@gmail.com":
            colorClass = "event-blue";
            backgroundClass = "background-blue";
            break;
        case "jhattstadt@gmail.com":
            colorClass = "event-green";
            backgroundClass = "background-green";
            break;
        case "jasmine.hattstadt@gmail.com":
            colorClass = "event-rose";
            backgroundClass = "background-rose";
            break;
        case "thierry.hattstadt@gmail.com":
            colorClass = "event-yellow";
            backgroundClass = "background-yellow";
            break;
        default:
            break;
    }

    // Get the SVG and typeName for the event
    const attendeeEmail = event.attendees && event.attendees[0] ? event.attendees[0].email : null;
    const { Svg, SvgOnly, typeName } = getEventByType(attendeeEmail, colorClass);

    const startDate = new Date(event.start.dateTime);
    const startHours = startDate.getHours();
    const startMinutes = startDate.getMinutes();
    const startTimeString = `${startHours}H${startMinutes < 10 ? '0' + startMinutes : startMinutes}`;


    const endDate = new Date(event.end.dateTime);
    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();
    const endTimeString = `${endHours}H${endMinutes < 10 ? '0' + endMinutes : endMinutes}`;

    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Europe/Paris'
    };
    const formattedDate = new Intl.DateTimeFormat('fr-FR', dateOptions).format(event.date);
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {}}
            key={event.id}
            className={`${backgroundClass} rounded-[10px] mx-2 h-full w-full text-text shadow-event-card flex gap-2 p-2`}
        >
            <SvgOnly className={`h-full w-[15%] ${colorClass} ${typeName === 'Default' ? 'event-default' : ''}`} />
            <div className={`${backgroundClass} rounded-full h-full w-1`}>&nbsp;</div>
            <div className={'flex flex-col w-[75%] font-inter justify-center text-sm'}>
                <div className={'leading-5 font-bold'}>{event.summary}</div>
                <div className={'leading-5 uppercase font-medium'}>{formattedDate} | {event.start.dateTime !== null ? startTimeString : ''} {event.end.dateTime !== null ? `- ${endTimeString}` : ''}</div>
            </div>
        </motion.div>
    );
};

