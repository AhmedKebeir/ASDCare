import { Link } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";

export default function ForgetPassword() {
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <Logo />
          <h1>Forget Password</h1>
          <p className="page-forget">
            Please enter the email address linked with your
            <br /> account.
          </p>
          <form>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email Address"
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
