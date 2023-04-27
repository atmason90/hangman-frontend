// This page will hold the component that renders the leaderboard

import { useEffect, useState } from "react";
import { ListItem } from "./ListItem";

export const Leaderboard = () => {
    const API = "https://ec2-54-82-112-252.compute-1.amazonaws.com:5000/leaderboard";
    const dummy = "https://jsonplaceholder.typicode.com/todos";

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(dummy).then(response => response.json()).then(json => setData(json))
                .catch(err => console.error(err));
    }, []);

    const sortedData = () => {
        return data.sort((a, b) => a.id > b.id ? 1 : -1);
    }

    return (
        <div>
            <ul style={{listStyle: "none"}}>
                {
                    sortedData().map(row => <ListItem
                        key={row.id}
                        row={row}
                    />)
                }
            </ul>
        </div>
    );
}
