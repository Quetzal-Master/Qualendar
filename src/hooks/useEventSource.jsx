import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

export default function useEventSource(url, isLogged, apiCalendar, callback) {
	const { gapiInitialized } = useSelector((state) => state.user);

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
						console.log(
							"EventSource closed. Attempting to reconnect..."
						);
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
	}, [isLogged, apiCalendar]);
}
