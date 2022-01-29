import ReactDOM from "react-dom";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { store } from "@app/store";
import { Provider } from "react-redux";

import Home from "@routes/home/Home";
import "@assets/base.sass";

const App = () => {
  return (
    <div className="blog-ui-html blog-ui">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
