// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import {LoginPage} from './components/LoginPage/LoginPage';
import { SignupPage } from './components/SignupPage/SignupPage';
// import { Leaderboard } from './components/Leaderboard/Leaderboard';
import GameComputer from './components/Game/GameComputer/GameComputer';
import GamePlayer from './components/Game/GamePlayer/GamePlayer';
import { LandingPage } from './components/LandingPage/LandingPage';

// need to add conditional statement to jsx - if not logged in, show login page, otherwise show landing page. (will need useState and useEffect)

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/compgame' element={<GameComputer/>}/>
        <Route path='/vsgame' element={<GamePlayer/>}/>
        <Route path='/' element={<LandingPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
