// This page will hold the component that renders the leaderboard

import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";
import axios from "axios";

export const Leaderboard = () => {
    const API = "http://ec2-54-82-112-252.compute-1.amazonaws.com:5000/leaderboard";

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(API).then(response => setData(response.data.leaderboard))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <ul style={{listStyle: "none"}}>
                <li style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "bold"
                }}>
                <span style={{marginLeft: "10px"}}>Username</span>
                <span style={{fontFamily: "monospace", marginLeft: "10px"}}>Total games</span>
                <span style={{fontFamily: "monospace", marginLeft: "10px"}}>Wins</span>
                <span style={{fontFamily: "monospace", marginLeft: "10px"}}>Score</span>
                </li>
                {
                    data.map(row => <ListItem
                        key={row.id}
                        row={row}
                    />)
                }
            </ul>
        </div>
    );
}
