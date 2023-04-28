import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Figure from '../Figure';
import WrongLetters from '../WrongLetters';
import Word from '../Word';
import Popup from '../Pupup';
import Notification from '../Notification';
import { showNotification as show, checkWin } from '../../../helpers/helpers';
// import axios from 'axios'


function GamePlayer() {
    const [playable, setPlayable] = useState(true);
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [selectedWord, setSelectedWord] = useState('')

    // get info required to get_session

    // const user = 'johndoe'
    // const guesser = 'david'
    // const session = 6

    // fetch(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/get_session?SessionId=${session}&username=${user}&guesserUser=${guesser}`, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json'}
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //     console.log(data);
    //     setSelectedWord = data.Word;
    //     console.log(selectedWord)
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    useEffect(() => {
        const user = 'johndoe';
        const guesser = 'david';
        const session = 6;

        fetch(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/get_session?SessionId=${session}&username=${user}&guesserUser=${guesser}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            setSelectedWord(data.Word);
            console.log(selectedWord);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [selectedWord]);

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
    }, [correctLetters, wrongLetters, playable, selectedWord]);


    return (
    <>
        <Header />
        <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
        </div>
        <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} />
        <Notification showNotification={showNotification} />
    </>
    );
}

export default GamePlayer;
