export const ListItem = ({row}) => {
    const isCurrentUser = (username) => {
        let current = localStorage.getItem("username");
        console.log(username == current)
        return username == current;
    }
    return (
        <li style={{
            display: "flex",
            alignItems: "center",
            fontWeight: isCurrentUser(row.username) ? "bold" : "normal",
            color: isCurrentUser(row.username) ? "red" : "white"
        }}>
          <span style={{marginLeft: "10px"}}>{row.username}</span>
          <span style={{fontFamily: "monospace", marginLeft: "10px"}}>{row.num_games_played}</span>
          <span style={{fontFamily: "monospace", marginLeft: "10px"}}>{row.num_wins}</span>
          <span style={{fontFamily: "monospace", marginLeft: "10px"}}>{row.total_score}</span>
        </li>
      );
}