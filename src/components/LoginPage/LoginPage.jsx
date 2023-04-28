// This page will hold the component for the login/signup functionality
import { Link } from "react-router-dom";

export const LoginPage = () => {
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const { uname, pass } = document.forms[0];

        fetch("http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/login", {
            method: "post",
            body: {
                "username": uname.value,
                "password": pass.value
            }
        }).then(response => response.json()).then(data => {
            localStorage.setItem("username", data.username);
            localStorage.setItem("userid", data.UserId);
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div>
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div>
                    <input type="submit" />
                </div>
            </form>
            <div>
                New here? <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
}