import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Figure from '../Figure';
import WrongLetters from '../WrongLetters';
import Word from '../Word';
import Popup from '../Pupup';
import Notification from '../Notification';
import { showNotification as show, checkWin } from '../../../helpers/helpers';
// import axios from 'axios'
    
// get info required to get_session
const user = 'johndoe'
const guesser = 'david'
const session = 6
let selectedWord;

// -----------THIS WORKS------------
// fetch('http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/create_game', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify({
//         username: 'johndoe',
//         Word: 'hello'
//     })
// })
// .then((response) => response.json())
// .then((data) => console.log(data))
// ----------------------------------

// fetch('https://l6hxmsh3jd.execute-api.us-east-1.amazonaws.com/getLeaderBoard')
// .then((response) => response.json())
// .then((data) => {
//     console.log(data)
// })

fetch(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/get_session?SessionId=${session}&username=${user}&guesserUser=${guesser}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'}
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    selectedWord = data.Word;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// fetch(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/get_session`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         SessionId: session,
//         username: user,
//         guesserUser: guesser
//     })
// })
// .then((response) => response.json())
// .then((data) => {
//     console.log(data)
//     selectedWord = data.Word
// })

function GamePlayer() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
    const handleKeydown = event => {
        const { key, keyCode } = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
            setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
            show(setShowNotification);
            }
        } else {
            if (!wrongLetters.includes(letter)) {
            setWrongLetters(currentLetters => [...currentLetters, letter]);
            } else {
            show(setShowNotification);
            }
        }
        }
    }
    window.addEventListener('keydown', handleKeydown);

    return () => window.removeEventListener('keydown', handleKeydown);
    }, [correctLetters, wrongLetters, playable]);

    function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    
    // selectedWord = ;
    }

    return (
    <>
        <Header />
        <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain} />
        <Notification showNotification={showNotification} />
    </>
    );
}

export default GamePlayer;
