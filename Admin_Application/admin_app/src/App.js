import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ErrorPage from "./Components/ErrorPage";
import { useEffect } from "react";
import AdminPage from "./Components/AdminPage"

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const id = sessionStorage.getItem("userId");

    if (
      !id &&
      !location.pathname.includes("register") &&
      !location.pathname.includes("login") &&
      !location.pathname.includes("error")
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
        <Route exact path="/" element={<AdminPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        {/* <Route exact path="/admin" element={<AdminPage />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
