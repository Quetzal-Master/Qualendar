// src/hooks/useEventSource.jsx
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { initializeCalendarApi, fetchEvents } from "@/common/GoogleCalendarFacade.jsx";
import { setEvents } from "@/stores/calendar/CalendarSlice";

export default function useEventSource() {
	const dispatch = useDispatch();
	const url = import.meta.env.VITE_BACKEND_URL;
	const { gapiInitialized, isLogged } = useSelector((state) => state.user);
	const { currentMonth, currentYear } = useSelector((state) => state.calendar);
	const [apiCalendar, setApiCalendar] = useState(null);

	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);

	const handleMessageReceived = (event) => {
		if (gapiInitialized && isLogged) {
			console.log(event.data);

			if (event.data !== "heartbeat") {
				const dateStart = new Date(currentYear-1, currentMonth);
				const dateEnd = new Date(currentYear+1, currentMonth);

				fetchEvents(apiCalendar, dateStart, dateEnd)
					.then(items => dispatch(setEvents(items)))
					.catch(err => console.error("Error fetching events:", err));
			}
		} else {
			console.log("Api isn't loaded for the moment:", apiCalendar, "isLogged:", isLogged);
		}
	};

	useEffect(() => {
		let eventSource;

		if (isLogged && gapiInitialized) {
			apiCalendar.watchEvents({
				id: uuidv4(),
				type: "web_hook",
				address: url + "/webhook",
			});

			console.log("Watch events sent");
		}

		const initEventSource = () => {
			if (isLogged && gapiInitialized) {
				eventSource = new EventSource(url + "/events");

				eventSource.onopen = (event) => {
					console.log("SSE connection established", event);
				};

				eventSource.onmessage = handleMessageReceived;

				eventSource.onerror = (error) => {
					console.error("EventSource failed:", error);
					eventSource.close();

					if (eventSource.readyState === EventSource.CLOSED) {
						console.log("EventSource closed. Attempting to reconnect...");
						setTimeout(() => {
							initEventSource();
						}, 3000);
					}
				};
			}
		};

		initEventSource();

		return () => {
			if (eventSource) {
				eventSource.close();
			}
		};
	}, [isLogged, gapiInitialized]);
}