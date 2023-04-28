// This page will hold the component that shows after a user logs in/signs up
// Will have option to select:
    // play vs. computer
        // takes user to game component to guess against user generated word
    // play vs. another person
        // takes user to game component where they can view other players guesses in real time

import { Link } from "react-router-dom";
        
export const LandingPage = () => {
    const isLoggedIn = () => {
        let username = localStorage.getItem("username");
        return username !== null;
    }

    const gamePage = () => {
        return (
            <div>
                Choose your opponent
                <Link to="/compgame"><button>Computer</button></Link>
                <Link to="/compgame"><button>Friend</button></Link>
            </div>
        );
    }

    return (
        <div>
            {isLoggedIn() ? gamePage() : window.location.href="/login" }
        </div>
    );
}