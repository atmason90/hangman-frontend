import logo from './logo.svg';
import './App.css';

import {LoginPage} from './components/LoginPage/LoginPage';
import { Leaderboard } from './components/Leaderboard/Leaderboard';


function App() {
  return (
    <div className="App">
      <LoginPage/>
      <Leaderboard/>
    </div>
  );
}

export default App;
