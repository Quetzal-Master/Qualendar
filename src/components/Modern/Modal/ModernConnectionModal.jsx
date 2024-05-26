import { motion } from "framer-motion";
import ModernBackdrop from "./ModernBackdrop";
import { ReactComponent as GoogleSvg } from '../../../assets/modal/google.svg';
import { ReactComponent as Sync } from '../../../assets/modal/sync.svg';
import {useDispatch, useSelector} from "react-redux";
import { toggleIsLogged } from "@/stores/user/UserSlice";
import {useEffect, useState} from "react";
import {initializeCalendarApi} from "../../../common/GoogleCalendarFacade";

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

const scalingCenter = {
	hidden: {
		opacity: 0,
		transform: "scale(0)",
	},
	visible: {
		opacity: 1,
		transform: "scale(1)",
		transition: {
			duration: 1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		opacity: 0,
		transform: "scale(0)",
	},
};

const Modal = ({ handleClose }) => {
	const dispatch = useDispatch();
	const [apiCalendar, setApiCalendar] = useState(null);
	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);


	const { isLogged } = useSelector((state) => state.user);
	function handleLoginLogout() {
		if (!isLogged) {
			dispatch(toggleIsLogged());
		}
		apiCalendar.handleAuthClick().then(() => {
			handleClose();
			window.location.reload();
		});
	}
		return (<ModernBackdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="w-[60%] h-[40%] bg-primary bg-opacity-20 backdrop-blur-md shadow-date-card rounded-[100px] flex flex-col items-center justify-between"
				variants={scalingCenter}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<Sync className={"h-[25%] mt-8 fill-primary"}/>
				<div className={"w-full h-auto font-poppins flex flex-col items-center px-16 gap-4"}>
					<div className={"text-text text-4xl font-semibold"}>Synchronisation rapide</div>
					<div className={'text-text-modern text-2xl font-medium text-center'}>Connectez votre calendrier pour une mise à jour automatique de vos événements et rendez-vous directement depuis votre téléphone.</div>
				</div>
				<div className={'w-full h-[40%] flex flex-col gap-6 items-center'}>
					<motion.div className={"bg-primary h-[40%] w-[90%] rounded-[100px] flex items-center justify-center"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => {handleLoginLogout();}}>
						<div className={"text-text font-poppins font-semibold text-4xl"}>Connection</div>
					</motion.div>
					<motion.div className={"bg-modern-grey bg-opacity-40 h-[40%] w-[90%] rounded-[100px] flex items-center justify-center"} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleClose}>
						<div className={"text-text-modern font-poppins font-medium text-4xl"}>Retour</div>
					</motion.div>
				</div>
			</motion.div>
		</ModernBackdrop>);
};

export default Modal;
