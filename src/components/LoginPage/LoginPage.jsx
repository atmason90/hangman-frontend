// This page will hold the component for the login/signup functionality

import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const LoginPage = () => {
    const [userName, setUserName] = useState("");

    const handleLogin = () => {
        console.log(userName);
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <h1>Please login to continue</h1>
            <TextField
                label="Username"
                variant="outlined"
                value={userName}
                onChange={setUserName}
            />
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </div>
    );
}