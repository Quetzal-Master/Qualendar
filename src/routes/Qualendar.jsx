import React, { useState, useEffect } from "react";
import { BsFillPersonXFill } from "react-icons/bs";
import { MdTransitEnterexit } from "react-icons/md";
import { motion } from "framer-motion";
import { Scrollbars } from "react-custom-scrollbars-2";
import useEventSource from "@/hooks/useEventSource.jsx";
import LoginModal from "@/components/LoginModal.jsx";
import QuentinPIC from "../styles/images/QuentinFull.jpg";
import JordanPIC from "../styles/images/JordanFull.jpg";
import MamanPIC from "../styles/images/mamanFull.jpg";
import PapaPIC from "../styles/images/papaFull.jpg";
import { daysList } from "../constants/dayMonth";
import { useSelector, useDispatch } from "react-redux";
import { initializeCalendarApi } from "@/common/ApiCalendar.jsx";

import { joursFeries, getDaysInMonth } from "@/utils/dateUtils";

import PaperCalendar from "../components/interfaces/PaperCalendar";

function Qualendar() {
	const dispatch = useDispatch();
	const [apiCalendar, setApiCalendar] = useState(null);
	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);
	const { gapiInitialized, isLogged } = useSelector((state) => state.user);
	const { currentMonth, currentYear } = useSelector((state) => state.calendar);

	const [monthEvents, setMonthEvents] = useState([]);
	const [dayEvents, setDayEvents] = useState([]);

	const EventList = (date) => {
		return monthEvents.map((evenement, i) => {
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

	const [selectedId, setSelectedId] = useState(null);

	const SelectedHandler = function (e) {
		setSelectedId(parseInt(e.target.closest("[data-index]").getAttribute("data-index"), 10));
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
		if ((selectedId !== null) & (selectedId === i)) {
			ret += "selected";
		}
		if ((selectedId !== null) & (selectedId !== i)) {
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
				whileHover={selectedId === null ? { scale: 1.1 } : { scale: 1 }}
				whileTap={selectedId === null ? { scale: 0.9 } : { scale: 1 }}
				variants={item}
				layoutId={i}
				data-index={i}
				onClick={(e) => (selectedId !== null ? null : SelectedHandler(e))}
				key={i}
				className={`jour ${dayClassName(i)}`}
			>
				<motion.div className="jourContainer">
					<div className={`jourInfos${isHoliday ? " vacances" : ""}`}>
						<p>{i + 1}</p>
						<p>{daysList[(firstOfMonth.getDay() - 1 + i) % 7]}</p>
					</div>
					{selectedId === null && <div className={"jourEvents"}>{EventList(i + 1)}</div>}
					{selectedId !== null && (
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
				<motion.div whileHover={selectedId === null ? { scale: 1.1 } : { scale: 1 }} whileTap={selectedId === null ? { scale: 0.9 } : { scale: 1 }} className="exitDetails" onClick={() => setSelectedId(null)}>
					<MdTransitEnterexit />
				</motion.div>
			</motion.div>
		);
	}

	useEffect(() => {
		if (gapiInitialized && isLogged) {
			const dateStart = new Date(currentYear, currentMonth);
			const dateEnd = new Date(currentYear, currentMonth, getDaysInMonth(currentYear, currentMonth + 1));
			apiCalendar
				.listEvents({
					timeMin: dateStart.toISOString(),
					timeMax: dateEnd.toISOString(),
					showDeleted: false,
					maxResults: 100,
					orderBy: "updated",
				})
				.then(({ result }) => {
					console.log(result);
					setMonthEvents(result.items);
				})
				.catch((err) => {
					console.error("Error fetching events:", err);
				});
		}
	}, [currentMonth, currentYear]);

	useEffect(() => {
		if (apiCalendar != null && isLogged && selectedId !== null) {
			const date = new Date(currentYear, currentMonth, selectedId + 1);
			const dateEnd = new Date(currentYear, currentMonth, selectedId + 2);
			apiCalendar
				.listEvents({
					timeMin: date.toISOString(),
					timeMax: dateEnd.toISOString(),
					showDeleted: true,
					maxResults: 10,
					orderBy: "updated",
				})
				.then(({ result }) => {
					setDayEvents(result.items);
				});
		}
	}, [selectedId]);

	const [needRelog, setNeedRelog] = useState(false);

	const fetchEvents = (dateStart, dateEnd) => {
		apiCalendar
			.listEvents({
				timeMin: dateStart.toISOString(),
				timeMax: dateEnd.toISOString(),
				showDeleted: false,
				maxResults: 100,
				orderBy: "updated",
			})
			.then(({ result }) => {
				console.log(result);
				setMonthEvents(result.items);
			})
			.catch((error) => {
				if (error.status === 401) {
					setNeedRelog(true);
				}
			});
	};

	const handleMessageReceived = (event) => {
		if (gapiInitialized && isLogged) {
			console.log(event.data);

			if (event.data !== "heartbeat") {
				const dateStart = new Date(currentYear, currentMonth);
				const dateEnd = new Date(currentYear, currentMonth, getDaysInMonth(currentYear, currentMonth + 1));

				fetchEvents(dateStart, dateEnd);
			}
		} else {
			console.log("Api isn't loaded for the moment:", apiCalendar, "isLogged:", isLogged);
		}
	};

	useEventSource(handleMessageReceived);

	return (
		<>
			<PaperCalendar divJours={divJours} />
			{needRelog && (
				<LoginModal
					onClose={() => {
						apiCalendar.handleAuthClick().then(() => {
							setNeedRelog(false);
						});
					}}
				/>
			)}
		</>
	);
}

export default Qualendar;
