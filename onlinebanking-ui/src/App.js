import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Homepage from './Components/Homepage';
import LoginPage from './Components/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Homepage/>} >
        </Route>
        <Route exact path='/login' element={<LoginPage/>} >
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
