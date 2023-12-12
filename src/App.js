import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import MusicDashboard from "./pages/MusicDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<MusicDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
