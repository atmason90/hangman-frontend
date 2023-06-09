import axios from "axios";
import { Link } from "react-router-dom";

export const SignupPage = () => {
    const handleSubmit = (event) => {
        // Prevent page reload
        event.preventDefault();

        const { uname, pass, fname } = document.forms[0];

        axios.post(`http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/create_user?username=${uname.value}&password=${pass.value}&full_name=${fname.value}`).then(response => {
            if(response.status == 200) {    
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("userid", response.data.UserId);
                localStorage.setItem("fullname", response.data.full_name);
                window.location.href="/";
            }
        }).catch(err => console.error(err));
    };

    return (
        <div style={{ textAlign: 'center'}}>
            <h2>Hangman Game!</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username </label>
                    <input type="text" name="uname" required />
                </div>
                <div style={{ marginTop: '10px'}}>
                    <label>Password </label>
                    <input type="password" name="pass" required />
                </div>
                <div style={{ marginTop: '10px'}}>
                    <label>Full Name </label>
                    <input type="text" name="fname" required />
                </div>
                <div style={{ marginTop: '10px'}}>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div style={{ marginTop: '10px'}}>
            Existing user? <Link to="/login">Login</Link>
            </div>
        </div>
    );
}