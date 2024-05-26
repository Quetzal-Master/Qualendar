// ApiCalendar.js
import ApiCalendar from "react-google-calendar-api";
import { useDispatch } from "react-redux";
import { gapiIsInitialized } from "@/stores/user/UserSlice.jsx";

let calendarApi;

export const initializeCalendarApi = (dispatch) => {
	if (calendarApi) {
		return calendarApi;
	}

	const config = {
		clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
		apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
		scope: "https://www.googleapis.com/auth/calendar",
		discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
		onLoadCallback: () => {
			dispatch(gapiIsInitialized());
		},
		calendarId: import.meta.env.VITE_CALENDAR_ID,
	};

	calendarApi = new ApiCalendar(config);
	return calendarApi;
};

export const getCalendarApi = () => {
	if (!calendarApi) {
		throw new Error("ApiCalendar is not initialized. Call initializeCalendarApi first.");
	}
	return calendarApi;
};

export const fetchEvents = async (apiCalendar, dateStart, dateEnd) => {
	try {
		const response = await apiCalendar.listEvents({
			timeMin: dateStart.toISOString(),
			timeMax: dateEnd.toISOString(),
			showDeleted: false,
			maxResults: 1000,
			orderBy: "updated",
		});
		return response.result.items;
	} catch (error) {
		console.error("Error fetching events:", error);
		throw error;
	}
};