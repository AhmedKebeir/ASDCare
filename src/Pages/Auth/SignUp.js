import { Link, useNavigate } from "react-router-dom";
import "./Sign.css";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useState } from "react";
import axios from "axios";
import { BaseUrl, SIGNUPPARENT } from "../../Api/Api";
import Cookie from "cookie-universal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingAnimation from "../../Components/WebSite/LoadingAnimation";

export default function SignUp() {
  const cookie = Cookie();
  const nav = useNavigate();
  const [isText, setIsText] = useState(false);
  const [accept, setAccept] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    address: "ismailia",
  });
  console.log(form);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function isValidEgyptianPhone(phone) {
    const regex = /^(\+20)?01[0125]\d{8}$/;
    return regex.test(phone);
  }
  // const [data, setData] = useState("");
  const [cookieData, SetCookieData] = useState({
    userName: "",
    role: "",
    id: "",
    token: "",
  });
  async function handleSubmit(e) {
    setAccept(true);
    e.preventDefault();

    try {
      setLoading(true);
      if (
        form.userName !== "" &&
        form.email !== "" &&
        form.password === form.confirmPassword &&
        isValidEgyptianPhone(form.phone)
      ) {
        const res = await axios.post(`${BaseUrl}/${SIGNUPPARENT}`, form);

        SetCookieData({
          userName: res?.data?.parent?.userName,
          role: res?.data?.parent?.role,
          id: res?.data?.parent?._id,
          token: res?.data?.token,
        });
        console.log(res);

        cookie.set(
          "userDetails",
          JSON.stringify({
            userName: res?.data?.parent?.userName,
            role: res?.data?.parent?.role,
            id: res?.data?.parent?._id,
            token: res?.data?.token,
          })
        );
        nav("/signup/opt", { replace: true });
        setLoading(false);
      } else {
        console.log("no submit");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
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
                required
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
                required
              />
            </div>
            {accept && isValidEgyptianPhone(form.phone) !== true ? (
              <p className="err">Phone number is not valid!</p>
            ) : (
              ""
            )}
            <div className="email">
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={form.email}
                required
              />
            </div>
            <div className="new-details flex items-center ">
              <div className="password">
                <input
                  type={isText ? "true" : "password"}
                  id="pasaword"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                  value={form.password}
                  required
                />
                {isText === false ? (
                  <FontAwesomeIcon
                    icon={faEyeSlash}
                    onClick={() => setIsText((prev) => !prev)}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => setIsText((prev) => !prev)}
                  />
                )}
              </div>
              <div className="confirm-password">
                <input
                  type="password"
                  id="confirmpasaword"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={handleChange}
                  value={form.confirmPassword}
                  required
                />
              </div>
              {accept && form.confirmPassword !== form.password ? (
                <p className="err">Confirm password not match password!</p>
              ) : (
                ""
              )}
              <input
                type="number"
                id="age"
                placeholder="Your Age"
                name="age"
                value={form.age}
                onChange={handleChange}
                required
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
              {loading ? <LoadingAnimation /> : "Continue"}
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
