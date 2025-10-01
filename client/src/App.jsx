import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import Dashboard from "./components/Dashboard";
import AddStudyLog from "./components/AddStudyLog";
import StudyHistory from "./components/StudyHistory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addLogs" element={<AddStudyLog />} />
        <Route path="/history" element={<StudyHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
