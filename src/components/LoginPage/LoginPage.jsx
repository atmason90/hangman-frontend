// This page will hold the component for the login/signup functionality
import { useState } from "react";
import { Link, redirect } from "react-router-dom";
import axios from "axios";

export const LoginPage = () => {
    const [errorMsg, setErrorMsg] = useState(null);
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();
        setErrorMsg(null);

        const { uname, pass } = document.forms[0];

        axios.post(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/login?username=${uname.value}&password=${pass.value}`).then(res => {
            if(res.data.StatusCode == 200) {
                localStorage.setItem("username", res.data.username);
                localStorage.setItem("userid", res.data.UserId);
                window.location.href="/";
            }
        }).catch(err => {
            // if(err.response.status == 400) {
            //     setErrorMsg("Invalid credentials! Please try again")
            // } else {
            //     console.error(err)
            // }
            console.error(err)
        })
    };

    return (
        <div style={{ textAlign: 'center'}}>
            <h2>Hangman Game!</h2>
            {errorMsg !== null && (<h2 style={{color: "red"}}>{errorMsg}</h2>)}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div style={{ marginTop: '5px'}}>
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div style={{ marginTop: '10px'}}>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div style={{ marginTop: '10px'}}>
                New here? <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}
