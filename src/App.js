// import logo from './logo.svg';
import './App.css';

// import {LoginPage} from './components/LoginPage/LoginPage';
// import { Leaderboard } from './components/Leaderboard/Leaderboard';
// import GameComputer from './components/Game/GameComputer/GameComputer';
import GamePlayer from './components/Game/GamePlayer/GamePlayer';

// need to add conditional statement to jsx - if not logged in, show login page, otherwise show landing page. (will need useState and useEffect)

function App() {
  return (
    <div className="App">
      {/* <LoginPage/>
      <Leaderboard/> */}
      {/* <GameComputer/> */}
      <GamePlayer />
    </div>
  );
}

export default App;
