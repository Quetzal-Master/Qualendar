import "./App.css";
import React from "react";
import Qualendar from "@/routes/Qualendar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import calendarStore from "@/stores/calendar/calendarStore";

function App() {
	return (
		<Provider store={calendarStore}>
			<Router>
				<Routes>
					<Route path="/" element={<Qualendar />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
