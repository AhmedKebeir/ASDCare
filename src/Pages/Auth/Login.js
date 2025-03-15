import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useState } from "react";
import axios from "axios";
import { BaseUrl, LOGIN } from "../../Api/Api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
    role: "",
    token: "",
  });

  const nav = useNavigate();
  const [err, setErr] = useState("");
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(`${BaseUrl}/${LOGIN}`, form);
      setUserDetails({
        email: res.data.data.email,
        userName: res.data.data.userName,
        role: res.data.data.role,
        token: res.data.data.toknn,
      });
      console.log(res.data.data);
    } catch (err) {
      setErr("email or password is faild!");
    }
  }
  console.log(userDetails);
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <Logo />
          <h1>Log In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              value={form.email}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
            />
            <p className="forget">
              <Link to="/forgetpassword">Forget password?</Link>
            </p>
            <button className="btn-sign" type="submit">
              Get Started
            </button>
            <div className="or">
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
