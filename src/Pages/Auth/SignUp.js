import { Link, useNavigate } from "react-router-dom";
import "./Sign.css";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useState } from "react";
import axios from "axios";
import { BaseUrl, SIGNUP } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function SignUp() {
  const cookie = Cookie();
  const nav = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // const [data, setData] = useState("");
  const [cookieData, SetCookieData] = useState({
    userName: "",
    role: "",
    id: "",
    token: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${BaseUrl}/${SIGNUP}`, form);

      SetCookieData({
        userName: res.data.data.userName,
        role: res.data.data.role,
        id: res.data.data._id,
        token: res.data.token,
      });

      cookie.set(
        "userDetails",
        JSON.stringify({
          userName: res.data.data.userName,
          role: res.data.data.role,
          id: res.data.data._id,
          token: res.data.token,
        })
      );
      nav("/signup/opt", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }
  console.log(cookieData);
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
          <form onSubmit={handleSubmit}>
            <div className="username">
              <input
                type="text"
                placeholder="Username"
                name="userName"
                id="username"
                onChange={handleChange}
                value={form.userName}
              />
            </div>
            <div className="phone">
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                name="phone"
                onChange={handleChange}
                value={form.phone}
              />
            </div>
            <div className="email">
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={form.email}
              />
            </div>
            <div className="password">
              <input
                type="password"
                id="pasaword"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={form.password}
              />
            </div>
            <div className="confirm-password">
              <input
                type="password"
                id="confirmpasaword"
                placeholder="Confirm Password"
                name="confirmPassword"
                onChange={handleChange}
                value={form.confirmPassword}
              />
            </div>
            <div className="gender">
              <div className="male">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  onChange={() => {
                    console.log("ahmed");
                  }}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="male">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  onChange={() => {
                    console.log("mohamed");
                  }}
                />
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
