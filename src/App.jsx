import "./App.css";
import React from "react";
import Qualendar from "@/routes/Qualendar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "@/stores/Store";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path="/" element={<Qualendar />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
