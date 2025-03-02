import { Link } from "react-router-dom";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";

export default function ChildAuth() {
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
          <form>
            <input type="text" name="name" id="name" placeholder="Childname" />
            <input
              type="text"
              name="birth"
              id="name"
              placeholder="Chlid's Date of Birth"
            />
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
            />
            <div className="gender-child">
              <p>Child's Gender:</p>
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
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
