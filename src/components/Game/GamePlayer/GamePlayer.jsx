import React, { useState, useEffect } from "react";
import Header from "../Header";
import Figure from "../Figure";
import WrongLetters from "../WrongLetters";
import Word from "../Word";
import PopupVs from "../PopupVs";
import Notification from "../Notification";
import { showNotification as show, checkWin } from "../../../helpers/helpers";
// import axios from 'axios'

function GamePlayer() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [score, setScore] = useState(0)

  const user = localStorage.getItem("creator_name");
  
  useEffect(() => {
    const guesser = localStorage.getItem("username");
    const session = localStorage.getItem("sessionId");

    fetch(
      `https://ec2-54-82-112-252.compute-1.amazonaws.com:5000/get_session?SessionId=${session}&username=${user}&guesserUser=${guesser}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSelectedWord(data.Word);
        console.log(selectedWord);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [selectedWord]);

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
  }, [correctLetters, wrongLetters, playable, selectedWord]);

  return (
    <>
      <Header />
      <h3 style={{ marginBottom: '20px'}}>Score: {score}</h3>
      <div className="game-container">
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <PopupVs
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        score={score}
        user={user}
      />
      <Notification showNotification={showNotification} />
    </>
  );
}

export default GamePlayer;
