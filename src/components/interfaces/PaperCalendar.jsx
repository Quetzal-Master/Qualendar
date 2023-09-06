import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiHomeGearFill, RiLoginBoxLine } from "react-icons/ri";
import Modal from "../Modal";

function PaperCalendar({ modalOpen, handleLoginLogout, close, modalType, tmpLog, unsplashimg, monthNames, month, year, divJours }) {
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

	const [touchStart, setTouchStart] = useState(0);
	const [touchEnd, setTouchEnd] = useState(0);

	function handleTouchStart(e) {
		setTouchStart(e.targetTouches[0].clientX);
	}

	function handleTouchMove(e) {
		setTouchEnd(e.targetTouches[0].clientX);
	}

	function handleTouchEnd() {
		console.log(touchStart - touchEnd);
		if (touchStart - touchEnd > 250) {
			// do your stuff here for left swipe
			if (month === 11) {
				setYear(year + 1);
			}
			setMonth((month + 1) % 12);
			setSelectedId(null);
		}

		if (touchStart - touchEnd < -250) {
			// do your stuff here for right swipe
			if (month === 0) {
				setYear(year - 1);
				setMonth(11);
			} else {
				setMonth(month - 1);
			}
			setSelectedId(null);
		}
	}

	return (
		<div className="calendrier">
			<AnimatePresence initial={false} exitBeforeEnter={true}>
				{modalOpen && <Modal modalOpen={modalOpen} handleClose={close} type={modalType} />}
			</AnimatePresence>
			<motion.div
				className="params"
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				onClick={() => {
					handleLoginLogout();
				}}
			>
				{tmpLog === false ? <RiLoginBoxLine /> : <RiHomeGearFill />}
			</motion.div>
			<div className="calendrierHeader" onTouchStart={(e) => handleTouchStart(e)} onTouchMove={(e) => handleTouchMove(e)} onTouchEnd={(e) => handleTouchEnd(e)}>
				<img src={unsplashimg.src} alt={unsplashimg.alt} />
				<h1>{monthNames[month]}</h1>
				<h3>{year}</h3>
			</div>
			<motion.div variants={dayEntranceAnimation} initial="hidden" animate="visible" className="calendrierBody">
				{divJours}
			</motion.div>
		</div>
	);
}

export default PaperCalendar;
