import React, { useEffect } from 'react';
import { checkWin } from '../../helpers/helpers';

const PopupComp = ({correctLetters, wrongLetters, selectedWord, setPlayable, playAgain, score}) => {
  let finalMessage = '';
  let finalMessageRevealWord = '';
  let playable = true;

  if( checkWin(correctLetters, wrongLetters, selectedWord) === 'win' ) {
    finalMessage = 'Congratulations! You won! 😃 \nYour final score is ' + score;
    playable = false;
  } else if( checkWin(correctLetters, wrongLetters, selectedWord) === 'lose' ) {
    finalMessage = 'Unfortunately you lost. 😕';
    finalMessageRevealWord = `...the word was: ${selectedWord}`;
    playable = false;
  }

  useEffect(() => {
    setPlayable(playable);
  });

  return (
    <div className="popup-container" style={finalMessage !== '' ? {display:'flex'} : {}}>
      <div className="popup">
        <h2>{finalMessage}</h2>
        <h3>{finalMessageRevealWord}</h3>
        {/* need this to say view leaderboard and go to the leaderboard component */}
        <button onClick={playAgain}>Play Again</button>
      </div>
    </div>
  )
}

export default PopupComp
