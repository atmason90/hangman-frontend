// This page will hold the component that shows after a user logs in/signs up
// Will have option to select:
    // play vs. computer
        // takes user to game component to guess against user generated word
    // play vs. another person
        // takes user to game component where they can view other players guesses in real time

import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
        
export const LandingPage = () => {
    const [vsgame, setVsgame] = useState(false);
    const [createGameSelected, setCreateGameSelected] = useState(false);
    const [joinGameSelected, setJoinGameSelected] = useState(false);

    const [sessionId, setSessionId] = useState(null);

    const isLoggedIn = () => {
        let username = localStorage.getItem("username");
        return username !== null;
    }

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("userid");
        window.location.href="/";
    }

    const gameMenu = () => {
        return (
            <>
                <button onClick={() => setCreateGameSelected(true)}>Create Game</button>
                <button onClick={() => setJoinGameSelected(true)}>Join</button>
            </>
        )
    }

    const createGame = () => {
        const handleGameCreate = (e) => {
            e.preventDefault();

            const {word} = document.forms[0];
            const username = localStorage.getItem("username");

            axios.post(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/create_game?username=${username}&Word=${word.value}`)
                .then(response => {
                    setSessionId(response.data.SessionId);
                }).catch(err => console.error(err));
        }
        return (
            <>
                <form onSubmit={handleGameCreate}>
                    <label htmlFor="word">Enter word to be guessed: </label>
                    <input name="word"/>
                    <input type="submit" />
                </form>
            </>
        );
    }

    const joinGame = () => {
        const handleJoinGame = (e) => {
            e.preventDefault();
            const { friendname, sessionId } = document.forms[0];


            localStorage.setItem("sessionId", sessionId.value);
            localStorage.setItem("creator_name", friendname.value);

            // axios.get(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/get_session?SessionId=${sessionId.value}&username=${friendname.value}&guesserUser=${current_username}`)
            //     .then(response => {
            //         localStorage.setItem("selectedWord", response.data.Word);
            //     })
            window.location.href="/vsgame";
        }
        return (
            <>
                <form onSubmit={handleJoinGame}>
                    <label htmlFor="friendname">Enter your friend's username: </label>
                    <input name="friendname"/><br/>
                    <label htmlFor="name">Enter the session-id: </label>
                    <input name="sessionId"/><br/>
                    <input type="submit" />
                </form>
            </>
        )
    }

    const displaySessionId = () => {
        const username = localStorage.getItem("username");
        return (
            <>
                <h4>Please share the following details with your friend - <i>Username: <b>{username}</b> sessionId: <b>{sessionId}</b></i></h4>
            </>
        );
    }

    const gamePage = () => {
        return (
            <>
            <div>
                <h4>Choose your opponent</h4>
                <Link to="/compgame"><button>Computer</button></Link>
                <button onClick={() => setVsgame(true)}>Friend</button>
                <button onClick={handleLogout}>Logout</button>

                <div>
                    Check your position on the <Link to="/leaderboard">Leaderboard</Link>
                </div>
                {vsgame && gameMenu()}
                {createGameSelected && createGame()}
                {sessionId !== null && displaySessionId()}
                {joinGameSelected && joinGame()}

            </div>
            <br />
            <div>
              Check your position on the <Link to="/leaderboard">Leaderboard</Link>
            </div>
            </>
        );
    }

    return (
        <div>
            {isLoggedIn() ? gamePage() : window.location.href="/login" }
        </div>
    );
}