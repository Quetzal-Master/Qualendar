import React, { useState, useEffect } from "react";
import { RiHomeGearFill, RiLoginBoxLine  } from "react-icons/ri";
import getUnsplashImage from "../hooks/ImageUnsplash";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../components/Modal";
import ApiCalendar from 'react-google-calendar-api';

const calendarID = process.env.REACT_APP_CALENDAR_ID;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const accessToken = process.env.REACT_APP_GOOGLE_ACCESS_TOKEN;

const config = {
	"clientId": calendarID,
	"apiKey": apiKey,
	"scope": "https://www.googleapis.com/auth/calendar",
	"discoveryDocs": [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
	]
}
	  
const EventList = (events, date, modalOpen, close, open) => {
	// return events.map((evenement, i) => {
	// 	if (evenement.date == date) {
	// 		return (
	// 			<motion.div
	// 				whileHover={{ scale: 1.1 }}
	// 				whileTap={{ scale: 0.9 }}
	// 				onClick={() => {}}
	// 				key={i}
	// 				className={`event ${evenement.couleur}`}
	// 			>
	// 				{evenement.titre}
	// 			</motion.div>
	// 		);
	// 	}
	// });
	return [];
};

function Calendrier () {

	const [apiCalendar, setApiCalendar] = useState(null)

	useEffect(() => {
		setApiCalendar(new ApiCalendar(config));
		
	  }, []);

	  useEffect(() => {
		if(apiCalendar != null){
			apiCalendar.onLoadCallback = () => {
				apiCalendar.setCalendar("a6950e1b642d8663865fd2351d5107fae9e1537514f7e9d8b301364aa53d9568@group.calendar.google.com");
				
				// apiCalendar.handleAuthClick();
				// apiCalendar.listUpcomingEvents(10).then(({ result }) => {
				// 		console.log(result.items);
				// });

			};
		}
		
	  }, [apiCalendar])
	
	function handleLoginLogout() {
        if (!isLog) {
			//console.log(apiCalendar.tokenClient.requestAccessToken({ prompt: '' }));
			//console.log(apiCalendar.handleAuthClick());
			console.log(apiCalendar.tokenClient);
			console.log(apiCalendar.sign);
			
			setIsLog(true);
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
	const [month, setMonth] = React.useState(current.getMonth());
	const [year, setYear] = React.useState(current.getFullYear());

	//console.log(monthNames[month]);

	var unsplashimg = getUnsplashImage(monthNamesEn[month]);

	//console.log(unsplashimg);
	var firstOfMonth = new Date(current.getFullYear(), current.getMonth(), 1);
	var divJours = [];
	//Generation d'evenement aléatoire
	const [selectedId, setSelectedId] = useState(null);

	// <AnimatePresence>
	// {selectedId && (
	//     <motion.div  layoutId={selectedId} >
	//             <div className="jourContainer">
	//                 <div className={`jourInfos  ${(i <= 12)?"vacances":""}`}>
	//                     <p>{i+1}</p><p>{daysName[((firstOfMonth.getDay()-1)+i)%7]}</p>
	//                 </div>
	//                 <div className="jourEvents">{data && EventList(data, ((i+1)+"/"+month+"/"+year))}</div>
	//             </div>
	//             <div className="addEvent">
	//             </div>
	//     </motion.div>
	// )}
	// </AnimatePresence>
	const min = -1;
	const max = 3;
	const rand = min + Math.random() * (max - min);

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

	var events = [];

	const onClickDivJour = (e) => {
		// if(modalOpen ? close() : open()
		console.log("Position y: " + e.clientY);
	};
	const onClickDivEvent = (e) => {
		// if(modalOpen ? close() : open()
		console.log("Position y EVENT: " + e.clientY);
	};

	for (var i = 0; i < getDaysInMonth(current.getFullYear(), month + 1); i++) {
		const min = -1;
		const max = 3;
		const rand = min + Math.random() * (max - min);
		for (var j = 0; j < rand; j++) {
			events.push(
				<div key={j + 1} className="event">
					Evenement {j + 1}
				</div>
			);
		}
		var monthDate = month < 10 ? "0" + (month + 1) : month + 1;
		divJours.push(
			<motion.div
				whileHover={{ scale: 1.1 }}
				whileTap={{ scale: 0.9 }}
				variants={item}
				layoutId={i}
				onClick={(e) => onClickDivJour(e)}
				key={i}
				className={`jour ${
					daysName[(firstOfMonth.getDay() - 1 + i) % 7] === "Dimanche"
						? "dimanche"
						: ""
				}`}
			>
				<motion.div className="jourContainer">
					<div className={`jourInfos  ${i <= 12 ? "vacances" : ""}`}>
						<p>{i + 1}</p>
						<p>{daysName[(firstOfMonth.getDay() - 1 + i) % 7]}</p>
					</div>
					{/* <div className={"jourEvents"}>
						{EventList(
							data,
							i + 1 + "/" + monthDate + "/" + year,
							modalOpen,
							close,
							open
						)}
					</div> */}
				</motion.div>
				<motion.div
					className="addEvent"
					onClick={() => {
						setmodalType(0);
						modalOpen ? close() : open();
					}}
				></motion.div>
			</motion.div>
		);
		events = [];
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
			console.log(month);
		}

		if (touchStart - touchEnd < -250) {
			// do your stuff here for right swipe
			if (month === 0) {
				setYear(year - 1);
				setMonth(11);
			} else {
				setMonth(month - 1);
			}

			console.log(month);
		}
	}

	const [modalType, setmodalType] = React.useState(0);
	const [isLog, setIsLog] = React.useState(false);

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
				{!isLog ? <RiLoginBoxLine /> : <RiHomeGearFill />}
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
