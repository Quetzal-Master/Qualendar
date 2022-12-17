import React, { Component, useState, useEffect } from "react";
import { RiAncientGateFill, RiHonourFill, RiUser3Fill } from "react-icons/ri";
import { wrap } from "popmotion";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const Profil = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="cuisineProfil"
		>
			<div className="cuisineHeader"></div>
		</motion.div>
	);
};

export default Profil;
