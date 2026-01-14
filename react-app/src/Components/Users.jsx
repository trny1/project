import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Users() {
    const navigate = useNavigate();
    const style1 = {
        marginTop:"10px",
        marginBottom:"10px"
    }

    return(
        <div className="users">
            <h2>Manage Account</h2>
            <button onClick={() => navigate("/messages")} style={style1}>Messages</button>
            <button onClick={() => navigate("/login")} style={style1}>Logout</button>

        </div>
    )

}

export default Users;