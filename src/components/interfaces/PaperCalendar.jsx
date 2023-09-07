import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiHomeGearFill, RiLoginBoxLine } from "react-icons/ri";
import { v4 as uuidv4 } from "uuid";
import { monthsList } from "@/constants/dayMonth";
import getUnsplashImage from "@/hooks/ImageUnsplash";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMonth } from "@/stores/calendar/calendarSlice";
import Modal from "@/components/Modal";
import { toggleIsLogged } from "../../stores/user/UserSlice";

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

function PaperCalendar({ apiCalendar, divJours }) {
	const dispatch = useDispatch();
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

	const delay = (ms) => new Promise((res) => setTimeout(res, ms));

	const setWatchingCalendar = async () => {
		let isOver = false;
		let i = 0;
		while (!isOver) {
			console.log(i);
			if (apiCalendar.authenticated) {
				isOver = true;
				apiCalendar
					.watchEvents({
						id: uuidv4(),
						type: "web_hook",
						address: "https://tablette-maman.herokuapp.com/webhook",
					})
					.then(({ result }) => {
						console.log("Webhook result  : " + JSON.stringify(result));
					});
			} else {
				await delay(1000);
			}
		}
	};

	function handleLoginLogout() {
		if (!isLogged) {
			apiCalendar.tokenClient.requestAccessToken({ prompt: "consent" });
			apiCalendar.setCalendar("a6950e1b642d8663865fd2351d5107fae9e1537514f7e9d8b301364aa53d9568@group.calendar.google.com");
			setWatchingCalendar();
			console.log("token client before : " + apiCalendar.sign);
		} else {
			console.log(apiCalendar.authenticated);
			console.log("token client after : " + apiCalendar.sign);
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
