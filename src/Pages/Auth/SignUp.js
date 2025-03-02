import { Link } from "react-router-dom";
import "./Sign.css";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";

export default function SignUp() {
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <div className="logo">
            <Link to="/">
              <img
                src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.jpg")}
                alt=""
              />
            </Link>
          </div>
          <h1>Sign Up</h1>
          <form>
            <div className="username">
              <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
              />
            </div>
            <div className="phone">
              <input type="tel" id="phone" placeholder="Phone" name="phone" />
            </div>
            <div className="email">
              <input type="email" id="email" placeholder="Email" name="email" />
            </div>
            <div className="password">
              <input
                type="password"
                id="pasaword"
                placeholder="Password"
                name="password"
              />
            </div>
            <div className="confirm-password">
              <input
                type="password"
                id="confirmpasaword"
                placeholder="Confirm Password"
                name="confirmpassword"
              />
            </div>
            <div className="gender">
              <div className="male">
                <input type="radio" id="male" name="gender" />
                <label htmlFor="male">Male</label>
              </div>
              <div className="male">
                <input type="radio" id="female" name="gender" />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            <button className="btn-sign" type="submit">
              Continue
            </button>
            <div className="or">
              <p>
                Have an account already? <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
