/* eslint-disable */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Nav from "./components/Nav";

import "./App.css";

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav />
      <Routes>
        <Route
          basename={process.env.PUBLIC_URL}
          path="/"
          element={<Home />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
