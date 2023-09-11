import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/RegistrationPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Homepage />} >
          </Route>
          <Route exact path='/register' element={<RegistrationPage />} >
          </Route>
          <Route exact path='/login' element={<LoginPage />} >
          </Route>
          <Route exact path='/error' element={<ErrorPage/>} >
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
