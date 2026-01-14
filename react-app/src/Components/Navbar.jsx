import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/login") {
    return null;
  }

    if (location.pathname === "/users") {
    return null;
  }

  const exit = () => {
    localStorage.clear();
    setOpen(false);
    navigate("/login");
  };

  const isRegisterPage = location.pathname === "/register";

  return (
    <div className="navbar-wrapper">
    <nav className="navbar">
      <button className="menu-button" onClick={() => setOpen(!open)}>
        ☰
      </button>
      {open && (
        <div className="dropdown-menu">
           {isRegisterPage ? (
              <button onClick={() => { navigate("/login"); setOpen(false); }}>
                Log in
              </button>
            ) : (
              <>
                <button onClick={() => { navigate("/users"); setOpen(false); }}>
                  Manage Account
                </button>
                <button style={{marginBottom:"10px"}} onClick={exit}>
                  Log out
                </button>
              </>
            )}
        </div>
      )}
    </nav>
  </div>
);
}

export default Navbar;