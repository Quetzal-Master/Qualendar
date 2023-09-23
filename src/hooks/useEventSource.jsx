import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { initializeCalendarApi } from "@/common/ApiCalendar.jsx";

export default function useEventSource(callback) {
	const dispatch = useDispatch();
	const url = import.meta.env.VITE_BACKEND_URL;
	const { gapiInitialized, isLogged } = useSelector((state) => state.user);
	const [apiCalendar, setApiCalendar] = useState(null);
	useEffect(() => {
		const api = initializeCalendarApi(dispatch);
		setApiCalendar(api);
	}, []);

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

				eventSource.onmessage = callback;

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
