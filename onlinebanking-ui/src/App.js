import "./App.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Homepage from "./Components/Homepage";
import LoginPage from "./Components/LoginPage";
import RegistrationPage from "./Components/RegistrationPage";
import ErrorPage from "./Components/ErrorPage";
import { useEffect } from "react";
import ForgotPassword from "./Components/ForgotPassword";
import ChangePassword from "./Components/ChangePassword";
import AdminPage from "./Components/AdminPage";
import AccountStatementPage from "./Components/AccountStatementPage";
import Payments from "./Components/Payments";
import TheDevelopers from "./Components/TheDevelopers";

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
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/register" element={<RegistrationPage />}></Route>
        <Route exact path="/login" element={<LoginPage />}></Route>
        <Route exact path="/admin" element={<AdminPage />}></Route>
        <Route exact path="/payments" element={<Payments />}></Route>
        <Route exact path="/devs" element={<TheDevelopers />}></Route>
        <Route exact path="*" element={<ErrorPage />}>
          {" "}
        </Route>

        <Route
          exact
          path="/forgotPassword"
          element={<ForgotPassword />}
        ></Route>
        <Route
          exact
          path="/changePassword"
          element={<ChangePassword />}
        ></Route>
        <Route
          exact
          path="/accountStatement"
          element={<AccountStatementPage />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
