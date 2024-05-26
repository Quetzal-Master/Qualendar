import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RiHomeGearFill, RiLoginBoxLine } from "react-icons/ri";
import { monthsList } from "@/constants/dayMonth";
import getUnsplashImage from "@/hooks/ImageUnsplash";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentMonth } from "@/stores/calendar/CalendarSlice";
import { toggleIsLogged } from "@/stores/user/UserSlice";
import { initializeCalendarApi } from "@/common/GoogleCalendarFacade.jsx";
import {daysList} from "../../constants/dayMonth";
import {Scrollbars} from "react-custom-scrollbars-2";
import {MdTransitEnterexit} from "react-icons/md";
import QuentinPIC from "../../styles/images/QuentinFull.jpg";
import JordanPIC from "../../styles/images/JordanFull.jpg";
import MamanPIC from "../../styles/images/mamanFull.jpg";
import PapaPIC from "../../styles/images/papaFull.jpg";
import { setSelectedDay } from "@/stores/calendar/CalendarSlice";
import {BsFillPersonXFill} from "react-icons/bs";
import {joursFeries, getDaysInMonth} from "../../utils/dateUtils";

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

function PaperCalendar() {
	const dispatch = useDispatch();
	const [apiCalendar, setApiCalendar] = useState(null);
	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);

	const { currentMonth, currentYear } = useSelector((state) => state.calendar);
	const { isLogged } = useSelector((state) => state.user);
	const [dayEvents, setDayEvents] = useState([]);
	const events = useSelector((state) => state.calendar.events);
	console.log(events);
	const selectedDay = useSelector((state) => state.calendar.selectedDay);

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

	const EventList = (date) => {
		return events
			.filter((event) => {
				const eventDate = new Date(event.start.dateTime);
				return (
					eventDate.getFullYear() === currentYear &&
					eventDate.getMonth() === currentMonth
				);
			}).map((evenement, i) => {
			let profilPic = null;
			let color = null;
			switch (evenement.creator.email) {
				case "qhattstadt@gmail.com":
					profilPic = <img className="profilPic" src={QuentinPIC} alt="Quentin" />;
					color = "bleu";
					break;
				case "jhattstadt@gmail.com":
					profilPic = <img className="profilPic" src={JordanPIC} alt="Jordan" />;
					color = "orange";
					break;
				case "jasmine.hattstadt@gmail.com":
					profilPic = <img className="profilPic" src={MamanPIC} alt="Maman" />;
					color = "rose";
					break;
				case "thierry.hattstadt@gmail.com":
					profilPic = <img className="profilPic" src={PapaPIC} alt="Papa" />;
					color = "jaune";
					break;
				default:
					profilPic = <BsFillPersonXFill />;
					break;
			}
			const tmpDate = new Date(evenement.start.dateTime);
			if (tmpDate.getDate() === date) {
				return (
					<motion.div
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}
						onClick={() => {}}
						key={i}
						className={`event ${color}`} // ${evenement.couleur}`}
					>
						{profilPic}
						<p>{evenement.summary}</p>
					</motion.div>
				);
			}

			return null;
		});
	};

	const EventListDetails = () => {
		let tabHeurePlacement = [];
		dayEvents.map((evenement, i) => {
			const dateEnd = new Date(evenement.end.dateTime);
			const dateStart = new Date(evenement.start.dateTime);
			const placement = parseInt(dateStart.getHours(), 10) * 10 + parseInt(dateStart.getMinutes(), 10) / 10 - 4;
			const placementEnd = parseInt(dateEnd.getHours(), 10) * 10 + parseInt(dateEnd.getMinutes(), 10) / 10 - 4;
			tabHeurePlacement.push([placement, placementEnd]);
		});
		return dayEvents.map((evenement, i) => {
			let profilPic = null;
			let color = null;
			console.log(evenement);
			switch (evenement.creator.email) {
				case "qhattstadt@gmail.com":
					profilPic = <img className="profilPic" src={QuentinPIC} alt="Quentin" />;
					color = "bleu";
					break;
				case "jhattstadt@gmail.com":
					profilPic = <img className="profilPic" src={JordanPIC} alt="Jordan" />;
					color = "orange";
					break;
				case "jasmine.hattstadt@gmail.com":
					profilPic = <img className="profilPic" src={MamanPIC} alt="Maman" />;
					color = "rose";
					break;
				case "thierry.hattstadt@gmail.com":
					profilPic = <img className="profilPic" src={PapaPIC} alt="Papa" />;
					color = "jaune";
					break;
				default:
					profilPic = <BsFillPersonXFill />;
					break;
			}

			const dateEnd = new Date(evenement.end.dateTime);
			const dateStart = new Date(evenement.start.dateTime);

			const duree = parseInt(dateEnd.getHours(), 10) + parseInt(dateEnd.getMinutes(), 10) / 100 - (parseInt(dateStart.getHours(), 10) + parseInt(dateStart.getMinutes(), 10) / 100);
			const placement = parseInt(dateStart.getHours(), 10) * 10 + parseInt(dateStart.getMinutes(), 10) / 10 - 4;
			const placementEnd = parseInt(dateEnd.getHours(), 10) * 10 + parseInt(dateEnd.getMinutes(), 10) / 10 - 4;
			let nbSame = 0;
			let positionSame = 0;
			tabHeurePlacement.forEach((elem) => {
				console.log(elem);
				if ((placement >= elem[1] && placement <= elem[0]) || (placementEnd >= elem[1] && placementEnd <= elem[0]) || (placementEnd >= elem[1] && placement <= elem[0]) || (placementEnd <= elem[1] && placement >= elem[0])) {
					nbSame++;
					if (elem[2] != null) {
						positionSame++;
					}
				}
			});

			const width = 90 / nbSame - 5;

			tabHeurePlacement[i].push(true);
			console.log(nbSame);
			return (
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => {}}
					key={i}
					className={`DayEvent ${color}`} // ${evenement.couleur}`}
					style={{
						height: duree * 10 + "%",
						top: placement + "%",
						width: width + "%",
						left: 10 + width * positionSame + 5 * positionSame + "%",
					}}
				>
					{profilPic}
					<p>{evenement.summary}</p>
				</motion.div>
			);
		});
	};

	var firstOfMonth = new Date(currentYear, currentMonth, 1);
	var divJours = [];

	const SelectedHandler = function (e) {
		const day = parseInt(e.target.closest("[data-index]").getAttribute("data-index"), 10);
		dispatch(setSelectedDay(day));
	};

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	const dayClassName = (i) => {
		let ret = " ";
		if (daysList[(firstOfMonth.getDay() - 1 + i) % 7] === "Sunday" || daysList[firstOfMonth.getDay() - 1] === "Sunday") {
			ret += "dimanche ";
		}
		if ((selectedDay !== null) & (selectedDay === i)) {
			ret += "selected";
		}
		if ((selectedDay !== null) & (selectedDay !== i)) {
			ret += "unselected";
		}

		return ret;
	};
	const holidays = joursFeries(currentYear);
	for (var i = 0; i < getDaysInMonth(currentYear, currentMonth); i++) {
		const date = new Date(currentYear, currentMonth, i + 1);
		const isHoliday = Object.values(holidays).some((holiday) => holiday.getTime() === date.getTime());

		divJours.push(
			<motion.div
				whileHover={selectedDay === null ? { scale: 1.1 } : { scale: 1 }}
				whileTap={selectedDay === null ? { scale: 0.9 } : { scale: 1 }}
				variants={item}
				layoutId={i}
				data-index={i}
				onClick={(e) => (selectedDay !== null ? null : SelectedHandler(e))}
				key={i}
				className={`jour ${dayClassName(i)}`}
			>
				<motion.div className="jourContainer">
					<div className={`jourInfos${isHoliday ? " vacances" : ""}`}>
						<p>{i + 1}</p>
						<p>{daysList[(firstOfMonth.getDay() - 1 + i) % 7]}</p>
					</div>
					{selectedDay === null && <div className={"jourEvents"}>{EventList(i + 1)}</div>}
					{selectedDay !== null && (
						<Scrollbars className={"jourHeure"}>
							<div className="heure">
								<p>1h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>2h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>3h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>4h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>5h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>6h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>7h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>8h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>9h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>10h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>11h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>12h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>13h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>14h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>15h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>16h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>17h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>18h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>19h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>20h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>21h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>22h</p>
								<div className="line">&nbsp;</div>
							</div>
							<div className="heure">
								<p>23h</p>
								<div className="line">&nbsp;</div>
							</div>
							{EventListDetails()}
						</Scrollbars>
					)}
				</motion.div>
				<motion.div className="addEvent"></motion.div>
				<motion.div whileHover={selectedDay === null ? { scale: 1.1 } : { scale: 1 }} whileTap={selectedDay === null ? { scale: 0.9 } : { scale: 1 }} className="exitDetails" onClick={() =>  dispatch(setSelectedDay(null))}>
					<MdTransitEnterexit />
				</motion.div>
			</motion.div>
		);
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
