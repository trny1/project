import { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
    const style1 = {
        marginTop:"10px",
        marginBottom:"10px"
    }
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const location = useLocation();
    const navigate = useNavigate();

    const successMessage = location.state?.message;

  useEffect(() => {
    if (successMessage) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const login = async () => {
    
  try {
    const response = await fetch("/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        username: userName, 
        password: password 
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setError(data.message || "Error"); 
      return;
    }

    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/messages");
  } catch (error) {
    setError("Failed to connect to the server.");
  }
};

  return (
    <div className="login">
      <h2>Login</h2>

      
      {error && <p style={{textAlign:"center"}} className="error">{error}</p>}
      
        <input
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={login} style={style1}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}

export default Login;
