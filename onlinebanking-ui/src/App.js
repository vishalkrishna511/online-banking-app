import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Homepage from "./Components/Homepage";
import LoginPage from "./Components/LoginPage";
import RegistrationPage from "./Components/RegistrationPage";
import ErrorPage from "./Components/ErrorPage";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("EXECUTED");
    const id = sessionStorage.getItem("userId");
    console.log(location.pathname);
    if (
      !id &&
      !location.pathname.includes("register") &&
      !location.pathname.includes("login")
    ) {
      navigate("/login");
    } else if (
      id &&
      (location.pathname.includes("register") ||
        location.pathname.includes("login"))
    ) {
      navigate("/");
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/register" element={<RegistrationPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/error" element={<ErrorPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
