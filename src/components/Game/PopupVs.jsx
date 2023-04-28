import React, { useEffect } from 'react';
import { checkWin } from '../../helpers/helpers';
import { useNavigate } from 'react-router-dom'

const PopupVs = ({correctLetters, wrongLetters, selectedWord, setPlayable}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulations! You won! 😃';
    playable = false;
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
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
