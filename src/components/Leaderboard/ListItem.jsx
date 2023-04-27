export const ListItem = ({row}) => {
    const isCurrentUser = (username) => {
        let current = localStorage.getItem("current_username");
        return username == current;
    }
    return (
        <li className="item" style={{
            display: "flex",
            alignItems: "center",
            fontWeight: isCurrentUser(row.id) ? "bold" : "normal"
        }}>
          <span className="item__name" style={{marginLeft: "10px"}}>{row.id}</span>
          <span className="item__score" style={{fontFamily: "monospace", marginLeft: "10px"}}>{row.title}</span>
        </li>
      );
}