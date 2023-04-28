export const ListItem = ({row}) => {
    const isCurrentUser = (username) => {
        let current = localStorage.getItem("username");
        console.log(username == current)
        return username == current;
    }

    return (
      <tr style={{
        fontWeight: isCurrentUser(row.username) ? "bold" : "normal",
        color: isCurrentUser(row.username) ? "red" : "white",
        fontSize: "20px"
      }}>
        <td style={{ fontFamily: "monospace", textAlign: "center"}}>{row.username}</td>
        <td style={{ fontFamily: "monospace", textAlign: "center"}}>{row.num_games_played}</td>
        <td style={{ fontFamily: "monospace", textAlign: "center"}}>{row.num_wins}</td>
        <td style={{ fontFamily: "monospace", textAlign: "center"}}>{row.total_score}</td>
      </tr>
    );
}