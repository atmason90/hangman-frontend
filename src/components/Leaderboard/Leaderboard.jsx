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
            <h2 style={{ textAlign: "center"}}>Leaderboard: Top 10 Players</h2>
            <table>
                <thead>
                    <tr style={{ fontWeight: "bold", borderBottom: "4px solid white", fontSize: "30px" }}>
                        <th style={{ fontFamily: "monospace", padding: "5px", borderBottom: '1px solid white', }}>Username</th>
                        <th style={{ fontFamily: "monospace", padding: "5px", borderBottom: '1px solid white', }}>Games</th>
                        <th style={{ fontFamily: "monospace", padding: "5px", borderBottom: '1px solid white', }}>Wins</th>
                        <th style={{ fontFamily: "monospace", padding: "5px", borderBottom: '1px solid white', }}>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => <ListItem key={row.id} row={row} />)}
                </tbody>
            </table>
        </div>
    );
    
}
