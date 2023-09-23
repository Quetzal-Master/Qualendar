import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import { VscDebugDisconnect } from "react-icons/vsc";

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

const LoginModal = ({ handleClose }) => {
	<Backdrop>
		<motion.div onClick={(e) => e.stopPropagation()} className="loginModal" variants={dropIn} initial="hidden" animate="visible" exit="exit">
			<div className="modalHeader">
				<VscDebugDisconnect />
				<h1 className="modalTitle">Paramètres</h1>
			</div>
			<div className="modalBody"></div>
		</motion.div>
	</Backdrop>;
};

export default LoginModal;
