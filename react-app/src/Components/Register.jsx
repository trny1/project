import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Register() {
  const [UserName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  const register = async () => {
    if (!UserName || !password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    setLoading(true);

    try {

      const response = await fetch("/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/", {
          state: { message: "Successful registration" }
        });
      } else {
        setError(data.message || "Failed to register.");
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <h2>Registration</h2>

      {error && <p className="error" style={{color: "red", textAlign:"center"}}>{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={UserName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <button 
        onClick={register} 
        style={{marginTop:"10px"}}
        disabled={loading}
      >
        {loading ? "Loading..." : "Register"}
      </button>
    </div>
  );
}

export default Register;