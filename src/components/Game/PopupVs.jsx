import React, { useEffect } from 'react';
import { checkWin } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom'

const PopupVs = ({correctLetters, wrongLetters, selectedWord, setPlayable, score}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;
  let user = localStorage.getItem('username')

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulations! You won! 😃\nYour final score is' + score;
    playable = false;
    // add POST to add user score and status of win
    fetch('http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/add_user_score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        guesserUser: user,
        Score: score,
        Status: 'win'
      })
    })
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
    // add POST to add user score and status of lose
    fetch('http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/add_user_score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        guesserUser: user,
        Score: 0,
        Status: 'lose'
      })
    })
  }

  useEffect(() => {
    setPlayable(playable);
  });

  const navigate = useNavigate()

  const redirectToLeaderboard = () => {
    navigate('/leaderboard')
  }

  const redirectToLandingPage = () => {
    navigate('/landingpage')
  }

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        {/* need this to say view leaderboard and go to the leaderboard component */}
        <button onClick={redirectToLeaderboard}>View Leaderboard</button>
        <button onClick={redirectToLandingPage}>Go Home</button>
      </div>
    </div>
  )
}

export default PopupVs
