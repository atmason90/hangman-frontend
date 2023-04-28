// This component will hold the gameplay page

// games vs. computer:
// randomly generated word
// user guesses against the computers randomly generated word

// games vs. another player
// other user guesses the word that user1 provided

import React, { useState, useEffect } from "react";
import Header from "../Header";
import Figure from "../Figure";
import WrongLetters from "../WrongLetters";
import Word from "../Word";
import PopupComp from "../PupupComp";
import Notification from "../Notification";
import { showNotification as show, checkWin } from "../../../helpers/helpers";
import randomWords from "random-words";

const words = randomWords(10);
let selectedWord = words[Math.floor(Math.random() * words.length)];

function GameComputer() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [score, setScore] = useState(0)

  useEffect(() => {
    const handleKeydown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
            setScore((currentScore) => currentScore + 25)
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);
    setScore(0)
    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <PopupComp
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
        score={score}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default GameComputer;
