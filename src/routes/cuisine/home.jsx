import React, { Component, useState, useEffect } from "react";
import { RiSearchLine, RiStackFill } from "react-icons/ri";
import { wrap } from "popmotion";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

const Home = () => {
	const [researchTypeOpen, setResearchTypeOpen] = useState(false);

	function onChange(input) {
		console.log("Input changed", input);
	}

	function onKeyPress(button) {
		console.log("Button pressed", button);
	}
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="cuisineHome"
		>
			<div className="cuisineHomeHeader">
				Trouve les meilleures recettes
			</div>
			<div className="cuisineResearchWrapper">
				<div className="cuisineResearch">
					<RiSearchLine />
					<input type="text" name="name" placeholder="Recherche" />
				</div>
				<RiStackFill
					fill={researchTypeOpen === true ? "#1abc66" : "#dbdfeb"}
					className={
						researchTypeOpen === true
							? "cuisineResearchType-selected"
							: "cuisineResearchType"
					}
					onClick={() => {
						researchTypeOpen === true
							? setResearchTypeOpen(false)
							: setResearchTypeOpen(true);
					}}
				/>
			</div>
			<Keyboard
				className="keyboard"
				onChange={(e) => onChange(e)}
				onKeyPress={(e) => onKeyPress(e)}
			/>
		</motion.div>
	);
};

export default Home;
