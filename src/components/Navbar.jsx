import React, {useContext, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {AnimatePresence, motion} from 'framer-motion';
import { setCalendarMode } from '../stores/ui/UiSlice';
import CalendarMode from '../constants/CalendarMode';
import ScrollContext from '@/contexts/ScrollContext';
import { ReactComponent as CalendarPlus } from '../assets/navbar/calendar-plus.svg';
import { ReactComponent as Gear } from '../assets/navbar/gear.svg';
import { ReactComponent as Home } from '../assets/navbar/home.svg';
import { ReactComponent as LayerGroup } from '../assets/navbar/layer-group.svg';
import { ReactComponent as PlateWheat } from '../assets/navbar/plate-wheat.svg';
import ModernConnectionModal from "./Modern/Modal/ModernConnectionModal";
import ModernCreateEventModal from "./Modern/Modal/ModernCreateEventModal";

const Navbar = ({gearFunction}) => {
    const dispatch = useDispatch();
    const calendarMode = useSelector(state => state.ui.calendarMode);
    const scrollToCurrentMonth = useContext(ScrollContext);

    const toggleCalendarMode = () => {
        const newMode = calendarMode === CalendarMode.MODERN ? CalendarMode.PAPER : CalendarMode.MODERN;
        dispatch(setCalendarMode(newMode));
    };

    const [isModalSetting, setIsModalSetting] = useState(false);
    const [isModalCreateEvent, setIsModalCreateEvent] = useState(false);

    return (
        <>
            { calendarMode === CalendarMode.MODERN ?
                <nav className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[70%] bg-primary bg-opacity-20 backdrop-blur-md shadow-date-card rounded-[100px] z-50 flex justify-between items-center px-14 py-6">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <PlateWheat className="text-white h-15 w-15" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsModalCreateEvent(!isModalCreateEvent)}>
                        <CalendarPlus className="text-white h-15 w-15" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={scrollToCurrentMonth}>
                        <Home className="text-white h-25 w-25 cursor-pointer" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleCalendarMode}>
                        <LayerGroup className="text-white h-15 w-15 cursor-pointer" />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsModalSetting(!isModalSetting)}>
                        <Gear className="text-white h-15 w-15" />
                    </motion.div>
                </nav>
                :
                <motion.div className="fixed top-5 left-5 z-50 text-white cursor-pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleCalendarMode}
                >
                    <LayerGroup className={"h-10 w-10"} />
                </motion.div>
            }
            <AnimatePresence>
                {
                    isModalSetting && (
                        <ModernConnectionModal handleClose={() => setIsModalSetting(false)} type={0} />
                    )
                }
            </AnimatePresence>
            <AnimatePresence>
                {
                    isModalCreateEvent && (
                        <ModernCreateEventModal handleClose={() => setIsModalCreateEvent(false)} type={0} />
                    )
                }
            </AnimatePresence>
        </>
    );
};

export default Navbar;