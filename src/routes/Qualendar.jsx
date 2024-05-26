import React, { useState, useEffect } from "react";
import useEventSource from "@/hooks/useEventSource.jsx";
import LoginModal from "@/components/LoginModal.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "../stores/calendar/CalendarSlice";
import { initializeCalendarApi, fetchEvents } from "@/common/GoogleCalendarFacade.jsx";
import ScrollContext from "@/contexts/ScrollContext.jsx";

import ModernCalendar from '../components/Modern/ModernCalendar';
import PaperCalendar from '../components/interfaces/PaperCalendar';
import Navbar from "../components/Navbar";
import CalendarMode from "../constants/CalendarMode";

function Qualendar() {
	const dispatch = useDispatch();
	const [apiCalendar, setApiCalendar] = useState(null);
	const { gapiInitialized, isLogged } = useSelector((state) => state.user);
	const { currentMonth, currentYear } = useSelector((state) => state.calendar);
	const calendarMode = useSelector(state => state.ui.calendarMode);
	const [needRelog, setNeedRelog] = useState(false);
	const [scrollToCurrentMonth, setScrollToCurrentMonth] = useState(null);


	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);

	useEffect(() => {
		if (gapiInitialized && isLogged) {
			const dateStart = new Date(currentYear-1, currentMonth);
			const dateEnd = new Date(currentYear+1, currentMonth);
			fetchEvents(apiCalendar, dateStart, dateEnd)
				.then(items => dispatch(setEvents(items)))
				.catch(err => console.error("Error fetching events:", err));
		}
	}, [apiCalendar, calendarMode]);


	useEventSource();

	return (
		<div className={"overflow-hidden"}>
			<ScrollContext.Provider value={scrollToCurrentMonth}>
				{calendarMode === CalendarMode.MODERN ? <ModernCalendar setScrollToCurrentMonth={setScrollToCurrentMonth} /> : <PaperCalendar />}
				{needRelog && (
					<LoginModal
						onClose={() => {
							apiCalendar.handleAuthClick().then(() => {
								setNeedRelog(false);
							});
						}}
					/>
				)}
				<Navbar />
			</ScrollContext.Provider>
		</div>
	);
}

export default Qualendar;
