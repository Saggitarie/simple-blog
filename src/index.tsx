import React from "react";
import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "@routes/home/Home";
import "@assets/base.sass";

const App = () => {
	return (
		<div className="blog-ui-html blog-ui">
			<React.StrictMode>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</React.StrictMode>
		</div>
	);
};

ReactDOM.render(<App />, document.querySelector("#root"));
