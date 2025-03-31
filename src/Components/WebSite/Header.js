import { Link, NavLink } from "react-router-dom";
import "../../CSS/Header.css";

export default function Header() {
  return (
    <div className="nav-bar">
      <div className="main-container">
        <div className="logo">
          <img
            src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.jpg")}
            alt=""
          />
          <h1 className="nav-logo">
            ASD<span className="nav-care">CARE</span>
          </h1>
        </div>
        <ul className="header-links">
          <li>
            <NavLink to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/doctors" activeClassName="active">
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink to="/evaluate" activeClassName="active">
              Evaluate
            </NavLink>
          </li>
          <li>
            <NavLink to="/progress" activeClassName="active">
              Progress
            </NavLink>
          </li>
        </ul>
        <div className="auth-header">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
