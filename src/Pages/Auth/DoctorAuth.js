import { Link } from "react-router-dom";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";

export default function DoctorAuth() {
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
            <div className="department">
              <input type="text" placeholder="Department" name="department" />
            </div>
            <div className="Edu">
              <label htmlFor="Education">
                {/* Educational Qualification <FontAwesomeIcon icon={faCamera} /> */}
              </label>
              <input type="file" />
            </div>
            <div className="licen">
              <input type="file" />
            </div>
            <div className="address-doc">
              <input type="text" placeholder="Clinic Address" name="address" />
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
