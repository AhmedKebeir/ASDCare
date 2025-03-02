import { Link } from "react-router-dom";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";

export default function AccountType() {
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <div className="logo">
            <Link to="/">
              <img
                src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.jpg")}
                alt="logo"
              />
            </Link>
          </div>
          <h1>Choose account type</h1>
          <form>
            <div className="account-type">
              <div className="doctor">
                <input type="radio" name="account-type" id="doctor" />
                <label htmlFor="doctor">Doctor</label>
              </div>
              <div className="parent">
                <input type="radio" name="account-type" id="parent" />
                <label htmlFor="parent">Parent</label>
              </div>
            </div>
            <button className="btn-sign" type="submit">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
