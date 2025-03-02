import { Link } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";

export default function CreateNewPass() {
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <Logo />
          <h1 className="newpass">Create new password</h1>
          <p className="page-forget newpass">
            Your new password must be unique from those
            <br /> previously used.
          </p>
          <form>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <input
              type="confirmpassword"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
            />
            <button className="btn-sign" type="submit">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
