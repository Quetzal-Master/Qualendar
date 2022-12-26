import React, { useState, useEffect } from "react";
import { RiHomeGearFill, RiLoginBoxLine  } from "react-icons/ri";
import { BsFillPersonXFill } from "react-icons/bs";
import { MdTransitEnterexit } from "react-icons/md";
import getUnsplashImage from "../hooks/ImageUnsplash";
import { AnimatePresence, motion } from "framer-motion";
import { Scrollbars } from 'react-custom-scrollbars-2';
import Modal from "../components/Modal";
import ApiCalendar from 'react-google-calendar-api';
//import { useLocalStorage } from "../hooks/useLocalStorage";
import QuentinPIC from "../styles/images/QuentinFull.jpg";
import JordanPIC from "../styles/images/JordanFull.jpg";
import MamanPIC from "../styles/images/mamanFull.jpg";
import PapaPIC from "../styles/images/papaFull.jpg";

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;

const config = {
	"clientId": calendarID,
	"apiKey": apiKey,
	"scope": "https://www.googleapis.com/auth/calendar",
	"discoveryDocs": [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
	]
}



const apiCalendar = new ApiCalendar(config);


function Calendrier () {

	//const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

	const [monthEvents, setMonthEvents] = useState([]);
	const [dayEvents, setDayEvents] = useState([]);
	  
	const EventList = (date) => {
		return monthEvents.map((evenement, i) => {
			let profilPic = null;
			let color = null;
			switch(evenement.creator.email) {
				case "qhattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={QuentinPIC} alt="Quentin"/>;
					color = "bleu";
					break;
				case "jhattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={JordanPIC} alt="Jordan"/>;
					color = "orange";
					break;
				case "jasmine.hattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={MamanPIC} alt="Maman"/>;
					color = "rose";
					break;
				case "thierry.hattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={PapaPIC} alt="Papa"/>;
					color = "jaune";
					break;
				default: 
					profilPic = <BsFillPersonXFill/>;
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
						className={`event ${color}`}// ${evenement.couleur}`}
					>
						{profilPic}
						<p>{evenement.summary}</p>
					</motion.div>
				);
			}

			return null
		});
	};

	const [tmpLog, setTmpLog] = useState(false);

	const EventListDetails = () => {
		let tabHeurePlacement = [];
		dayEvents.map((evenement, i) => {
			const dateEnd = new Date(evenement.end.dateTime);
			const dateStart = new Date(evenement.start.dateTime);
			const placement = (parseInt(dateStart.getHours(), 10)*10 + parseInt(dateStart.getMinutes(),10)/10) - 4;
			const placementEnd = (parseInt(dateEnd.getHours(), 10)*10 + parseInt(dateEnd.getMinutes(),10)/10) - 4;
			tabHeurePlacement.push([placement, placementEnd]);
		});
		return dayEvents.map((evenement, i) => {
			let profilPic = null;
			let color = null;
			console.log(evenement);
			switch(evenement.creator.email) {
				case "qhattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={QuentinPIC} alt="Quentin"/>;
					color = "bleu";
					break;
				case "jhattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={JordanPIC} alt="Jordan"/>;
					color = "orange";
					break;
				case "jasmine.hattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={MamanPIC} alt="Maman"/>;
					color = "rose";
					break;
				case "thierry.hattstadt@gmail.com" : 
					profilPic = <img className="profilPic" src ={PapaPIC} alt="Papa"/>;
					color = "jaune";
					break;
				default: 
					profilPic = <BsFillPersonXFill/>;
					break;
				
			}

			const dateEnd = new Date(evenement.end.dateTime);
			const dateStart = new Date(evenement.start.dateTime);

			const duree = (parseInt(dateEnd.getHours(),10) + parseInt(dateEnd.getMinutes(),10)/100 ) - (parseInt(dateStart.getHours(), 10) + parseInt(dateStart.getMinutes(),10)/100);
			const placement = (parseInt(dateStart.getHours(), 10)*10 + parseInt(dateStart.getMinutes(),10)/10) - 4;
			const placementEnd = (parseInt(dateEnd.getHours(), 10)*10 + parseInt(dateEnd.getMinutes(),10)/10) - 4;
			let nbSame = 0;
			let positionSame = 0;
			tabHeurePlacement.forEach((elem) => {
				console.log(elem);
				if (placement >= elem[1] && placement <= elem[0] || placementEnd >= elem[1] && placementEnd <= elem[0] || placementEnd >= elem[1] && placement <= elem[0] || placementEnd <= elem[1] && placement >= elem[0]) {
					nbSame++;
					if(elem[2] != null){
						positionSame++;
					}
				}
			})

			const width = 90 / nbSame - 5;

			tabHeurePlacement[i].push(true);
			console.log(nbSame);
			return (
				<motion.div
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => {}}
					key={i}
					className={`DayEvent ${color}`}// ${evenement.couleur}`}
					style={{height: duree*10 + '%', top: placement + '%', width: width + '%', left: 10 + width*(positionSame) + 5*(positionSame) + '%'}}
				>
					{profilPic}
					<p>{evenement.summary}</p>
				</motion.div>
			);
		});
	};



	
	function handleLoginLogout() {
        if (tmpLog === false) {
				apiCalendar.tokenClient.requestAccessToken({ prompt: 'consent' });
				apiCalendar.setCalendar("a6950e1b642d8663865fd2351d5107fae9e1537514f7e9d8b301364aa53d9568@group.calendar.google.com");
				setTmpLog(true);
        } else {
			apiCalendar.listUpcomingEvents(10).then(({ result }) => {
				console.log(result.items);
			});
			setmodalType(1);
			modalOpen ? close() : open();
        }
    }

	
	//Partie calcul des mois
	function getDaysInMonth(year, month) {
		return new Date(year, month, 0).getDate();
	}
	const current = new Date();
	const monthNames = [
		"Janvier",
		"Fevrier",
		"Mars",
		"Avril",
		"Mai",
		"Juin",
		"Juillet",
		"Août",
		"Septembre",
		"Octobre",
		"Novembre",
		"Decembre",
	];
	const monthNamesEn = [
		"January",
		"February",
		"Mars",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	var daysName = [
		"Lundi",
		"Mardi",
		"Mercredi",
		"Jeudi",
		"Vendredi",
		"Samedi",
		"Dimanche",
	];
	const [month, setMonth] = useState(current.getMonth());
	const [year, setYear] = useState(current.getFullYear());

	var unsplashimg = getUnsplashImage(monthNamesEn[month]);

	var firstOfMonth = new Date(year, month, 1);
	var divJours = [];

	const [selectedId, setSelectedId] = useState(null);

	const SelectedHandler = function(e){
		setSelectedId(parseInt(e.target.getAttribute("data-index"), 10)); 
	};

	//Tests animations jours
	const container = {
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

	const item = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};
	const [modalOpen, setModalOpen] = useState(false);

	const close = () => {
		setModalOpen(false);
		console.log("Close modal");
	};
	const open = () => {
		setModalOpen(true);
		console.log("Open modal");
	};

	const onClickDivJour = (e) => {
		// if(modalOpen ? close() : open()
		console.log("Position y: " + e.clientY);
	};

	const dayClassName = (i) => {
		let ret = " ";
		if(daysName[(firstOfMonth.getDay() - 1 + i) % 7] === "Dimanche" || daysName[firstOfMonth.getDay() - 1] === "Dimanche") {
			ret += "dimanche ";
		}
		if(selectedId !== null & selectedId === i ){
			ret += "selected";
		} 
		if(selectedId !== null & selectedId !== i ){
			ret += "unselected";
		} 

		return ret;
	} 

	for (var i = 0; i < getDaysInMonth(current.getFullYear(), month + 1); i++) {
		divJours.push(
			<motion.div
				whileHover={selectedId === null ? {scale: 1.1} : {scale: 1}}
				whileTap={selectedId === null ? {scale: 0.9} : {scale: 1}}
				variants={item}
				layoutId={i}
				onClick={(e) => onClickDivJour(e)}
				key={i}
				className={`jour ${
					dayClassName(i)
				}`}
			>
				<motion.div className="jourContainer">
					<div className={`jourInfos${i <= 12 ? " vacances" : ""}`}>
						<p>{i + 1}</p>
						<p>{daysName[(firstOfMonth.getDay() - 1 + i) % 7]}</p>
					</div>
					{selectedId === null && <div className={"jourEvents"}>
						{EventList(
							i + 1
						)}
					</div>}
					{selectedId !== null && <Scrollbars className={"jourHeure"}>
						<div className="heure"><p>1h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>2h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>3h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>4h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>5h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>6h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>7h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>8h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>9h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>10h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>11h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>12h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>13h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>14h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>15h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>16h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>17h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>18h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>19h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>20h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>21h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>22h</p><div className="line">&nbsp;</div></div>
						<div className="heure"><p>23h</p><div className="line">&nbsp;</div></div>
						{EventListDetails()}
					</Scrollbars>}
				</motion.div>
				<motion.div
					className="addEvent"
					data-index={i}
					onClick={SelectedHandler}
				></motion.div>
				<motion.div whileHover={selectedId === null ? {scale: 1.1} : {scale: 1}}
				whileTap={selectedId === null ? {scale: 0.9} : {scale: 1}}
				className="exitDetails"
				onClick={() => setSelectedId(null)}
				>

					<MdTransitEnterexit/>
				</motion.div>
			</motion.div>
		);
	}


	//Partie swipe change month

	const [touchStart, setTouchStart] = React.useState(0);
	const [touchEnd, setTouchEnd] = React.useState(0);

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

	useEffect(() => {
		if(apiCalendar != null && tmpLog){
			const dateStart = new Date(year,month);
			const dateEnd =  new Date(year,month, getDaysInMonth(year,month + 1));
			apiCalendar.listEvents({
				timeMin: dateStart.toISOString(),
				timeMax: dateEnd.toISOString(),
				showDeleted: true,
				maxResults: 100,
				orderBy: 'updated'
			}).then(({ result }) => {
			setMonthEvents(result.items);
			});
		}
	}, [month, year, tmpLog]);

	useEffect(() => {
		if(apiCalendar != null && tmpLog && selectedId !== null){
			const date = new Date(year,month, selectedId + 1);
			const dateEnd = new Date(year,month, selectedId + 2);
			apiCalendar.listEvents({
				timeMin: date.toISOString(),
				timeMax: dateEnd.toISOString(),
				showDeleted: true,
				maxResults: 10,
				orderBy: 'updated'
			}).then(({ result }) => {
			setDayEvents(result.items);
			});

			
		}
	}, [selectedId]);

	const [modalType, setmodalType] = React.useState(0);

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
				onClick={() => {
					handleLoginLogout();
				}}
			>
				{tmpLog === false ? <RiLoginBoxLine /> : <RiHomeGearFill />}
			</motion.div>
			<div
				className="calendrierHeader"
				onTouchStart={(e) => handleTouchStart(e)}
				onTouchMove={(e) => handleTouchMove(e)}
				onTouchEnd={(e) => handleTouchEnd(e)}
			>
				<img src={unsplashimg.src} alt={unsplashimg.alt} />
				<h1>{monthNames[month]}</h1>
				<h3>{year}</h3>
			</div>
			<motion.div
				variants={container}
				initial="hidden"
				animate="visible"
				className="calendrierBody"
			>
				{divJours}
			</motion.div>
		</div>
	);
};

export default Calendrier;
