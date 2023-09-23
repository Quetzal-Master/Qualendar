import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiHomeGearFill, RiLoginBoxLine } from "react-icons/ri";
import { monthsList } from "@/constants/dayMonth";
import getUnsplashImage from "@/hooks/ImageUnsplash";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMonth } from "@/stores/calendar/CalendarSlice";
import { toggleIsLogged } from "@/stores/user/UserSlice";
import { initializeCalendarApi } from "@/common/ApiCalendar.jsx";

const dayEntranceAnimation = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

function PaperCalendar({ divJours }) {
	const dispatch = useDispatch();
	const [apiCalendar, setApiCalendar] = useState(null);
	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);

	const { currentMonth, currentYear } = useSelector((state) => state.calendar);
	const { isLogged } = useSelector((state) => state.user);

	const [touchStart, setTouchStart] = useState(0);
	function handleTouchEnd(touchEnd) {
		if (touchStart - touchEnd > 250) {
			dispatch(setCurrentMonth(currentMonth + 1));
		}
		if (touchStart - touchEnd < -250) {
			dispatch(setCurrentMonth(currentMonth - 1));
		}
	}

	var unsplashimg = getUnsplashImage(monthsList[currentMonth]);

	function handleLoginLogout() {
		if (!isLogged) {
			apiCalendar.handleAuthClick();
		} else {
			apiCalendar.handleSignoutClick();
		}
		dispatch(toggleIsLogged());
	}

	return (
		<div className="calendrier">
			<motion.div
				className="params"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => {
					handleLoginLogout();
				}}
			>
				{isLogged === false ? <RiLoginBoxLine /> : <RiHomeGearFill />}
			</motion.div>
			<div className="calendrierHeader" onTouchStart={(e) => setTouchStart(e.targetTouches[0].screenX)} onTouchEnd={(e) => handleTouchEnd(e.changedTouches[0].screenX)}>
				<img src={unsplashimg.src} alt={unsplashimg.alt} />
				<h1>{monthsList[currentMonth]}</h1>
				<h3>{currentYear}</h3>
			</div>
			<motion.div variants={dayEntranceAnimation} initial="hidden" animate="visible" className="calendrierBody">
				{divJours}
			</motion.div>
		</div>
	);
}

export default PaperCalendar;
