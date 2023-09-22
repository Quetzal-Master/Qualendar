import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

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

const Modal = ({ handleClose, type }) => {
	return type === 0 ? (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="modal"
				variants={scalingCenter}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<p></p>
				<button onClick={handleClose}>Close</button>
			</motion.div>
		</Backdrop>
	) : (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="modalParam"
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div className="modalHeader">
					<h1 className="modalTitle">Paramètres</h1>
				</div>
				<div className="modalBody"></div>
			</motion.div>
		</Backdrop>
	);
};

export default Modal;
