import { Link, useNavigate } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useState } from "react";
import axios from "axios";
import { BaseUrl, LOGIN } from "../../Api/Api";
import LoadingAnimation from "../../Components/WebSite/LoadingAnimation";
import Cookie from "cookie-universal";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();
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
    setLoading(true);
    try {
      const res = await axios.post(`${BaseUrl}/${LOGIN}`, form);
      setUserDetails({
        email: res.data.data.email,
        userName: res.data.data.userName,
        role: res.data.data.role,
        token: res.data.data.toknn,
      });
      setLoading(false);
      console.log(res.data.data);
    } catch (err) {
      setLoading(false);
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
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
            />
            <p className="err">{err}</p>
            <p className="forget">
              <Link to="/forgetpassword">Forget password?</Link>
            </p>
            <button className="btn-sign" type="submit">
              {loading ? <LoadingAnimation /> : "Get Started"}
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
