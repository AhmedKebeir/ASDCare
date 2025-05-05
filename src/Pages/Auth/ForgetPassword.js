import { Link } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import axios from "axios";
import { BaseUrl, FORGETPASSWORD } from "../../Api/Api";
import { useState } from "react";

export default function ForgetPassword() {
  const [form, setForm] = useState({
    email: "",
  });
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = axios
        .post(`${BaseUrl}/${FORGETPASSWORD}`, form)
        .then((res) => {
          console.log(res);
        });
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <Logo />
          <h1>Forget Password</h1>
          <p className="page-forget">
            Please enter the email address linked with your account.
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
            />
            <button className="btn-sign" type="submit">
              Send code
            </button>
            <div className="or">
              <p>
                Remember password? <Link to="/login">Log In</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
