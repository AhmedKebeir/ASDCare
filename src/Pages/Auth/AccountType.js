import { Link, useNavigate } from "react-router-dom";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useState } from "react";

export default function AccountType() {
  const [type, setType] = useState("");
  const nav = useNavigate();

  function handleChange(e) {
    setType(e.target.value);
  }
  console.log(type);
  function handleSubmit(e) {
    e.preventDefault();
    if (type !== "") {
      if (type === "parent") nav("/signup", { replace: false });
      else nav("/signup/doctor", { replace: false });
    }
  }
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
          <form onSubmit={handleSubmit}>
            <div className="account-type">
              <div className="doctor">
                <input
                  type="radio"
                  name="account-type"
                  id="doctor"
                  value="doctor"
                  onChange={handleChange}
                />
                <label htmlFor="doctor">Doctor</label>
              </div>
              <div className="parent">
                <input
                  type="radio"
                  name="account-type"
                  id="parent"
                  value="parent"
                  onChange={handleChange}
                />
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
