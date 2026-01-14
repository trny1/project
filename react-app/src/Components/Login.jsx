import { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
    const style1 = {
        marginTop:"10px",
        marginBottom:"10px"
    }
    const [felhasznaloNev, setFelhasznaloNev] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [hiba, setHiba] = useState("");


    const location = useLocation();
    const navigate = useNavigate();

    const sikerUzenet = location.state?.uzenet;

  useEffect(() => {
    if (sikerUzenet) {
      navigate(location.pathname, { replace: true });
    }
  }, []);

  const belepes = async () => {
    
  try {
    const response = await fetch("/api/Auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        username: felhasznaloNev, 
        password: jelszo 
      })
    });

    const adat = await response.json();

    if (!response.ok) {
      setHiba(adat.message || "Hiba történt"); 
      return;
    }

    localStorage.setItem("user", JSON.stringify(adat.user));
    navigate("/messages");
  } catch (error) {
    setHiba("Nem sikerült kapcsolódni a szerverhez.");
  }
};

  return (
    <div className="login">
      <h2>Bejelentkezés</h2>

      
      {hiba && <p style={{textAlign:"center"}} className="hiba">{hiba}</p>}
      
        <input
          placeholder="Felhasználónév"
          value={felhasznaloNev}
          onChange={(e) => setFelhasznaloNev(e.target.value)}
        />

        <input
          type="password"
          placeholder="Jelszó"
          value={jelszo}
          onChange={(e) => setJelszo(e.target.value)}
        />

        <button onClick={belepes} style={style1}>Belépés</button>
        <button onClick={() => navigate("/register")}>Regisztráció</button>
    </div>
  );
}

export default Login;
