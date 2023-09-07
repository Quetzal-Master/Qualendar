import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiHomeGearFill, RiLoginBoxLine } from "react-icons/ri";
import { monthsList } from "@/constants/dayMonth";
import getUnsplashImage from "@/hooks/ImageUnsplash";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMonth } from "@/stores/calendar/calendarSlice";
import Modal from "@/components/Modal";

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

function PaperCalendar({
	modalOpen,
	close,
	modalType,
	tmpLog, //TODO: Passer par le store user
	divJours,
}) {
	const dispatch = useDispatch();
	const { currentMonth, currentYear } = useSelector(
		(state) => state.calendar
	);

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

	return (
		<div className="calendrier">
			<AnimatePresence initial={false} exitBeforeEnter={true}>
				{modalOpen && (
					<Modal
						modalOpen={modalOpen}
						handleClose={close}
						type={modalType}
					/>
				)}
			</AnimatePresence>
			<motion.div
				className="params"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => {}}
			>
				{tmpLog === false ? <RiLoginBoxLine /> : <RiHomeGearFill />}
			</motion.div>
			<div
				className="calendrierHeader"
				onTouchStart={(e) => setTouchStart(e.targetTouches[0].clientX)}
				onTouchEnd={(e) => handleTouchEnd(e.targetTouches[0].clientX)}
			>
				<img src={unsplashimg.src} alt={unsplashimg.alt} />
				<h1>{monthsList[currentMonth]}</h1>
				<h3>{currentYear}</h3>
			</div>
			<motion.div
				variants={dayEntranceAnimation}
				initial="hidden"
				animate="visible"
				className="calendrierBody"
			>
				{divJours}
			</motion.div>
		</div>
	);
}

export default PaperCalendar;
