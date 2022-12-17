import React, { useState } from "react";
import { RiAncientGateFill, RiHonourFill, RiUser3Fill } from "react-icons/ri";
import { AnimatePresence } from "framer-motion";
import Home from "./cuisine/home";
import Save from "./cuisine/save";
import Profil from "./cuisine/profil";

const Cuisine = () =>  {
	const [modeSelected, setModeSelected] = useState(1);

	return (
		<div className="cuisine">
			<AnimatePresence>
				{modeSelected === 1 && <Home key={1} />}
				{modeSelected === 2 && <Save key={2} />}
				{modeSelected === 3 && <Profil key={3} />}
			</AnimatePresence>
			<div className="cuisineFooter">
				<RiAncientGateFill
					className={`navIcon ${modeSelected === 1 && "selected"}`}
					onClick={() => setModeSelected(1)}
				/>
				<RiHonourFill
					className={`navIcon ${modeSelected === 2 && "selected"}`}
					onClick={() => setModeSelected(2)}
				/>
				<RiUser3Fill
					className={`navIcon ${modeSelected === 3 && "selected"}`}
					onClick={() => setModeSelected(3)}
				/>
			</div>
		</div>
	);
	
};

export default Cuisine;
