import { Link } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useRef, useState } from "react";

export default function OPT() {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, ""); // السماح فقط بالأرقام
    const newOtp = [...otp];

    if (value) {
      newOtp[index] = value;
      setOtp(newOtp);

      // الانتقال للحقل التالي عند الإدخال
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus(); // الانتقال للحقل السابق عند الحذف
    }
  };

  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <Logo />
          <h1>OPT Verification</h1>
          <p className="page-opt">
            Enter the verification code. We just sent on your <br />
            email address.
          </p>

          <form>
            <div className="input-opt">
              {otp.map((_, index) => (
                <input
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  placeholder="_"
                />
              ))}
            </div>
            <button className="btn-sign" type="submit">
              Get Started
            </button>
            <div className="or">
              <p>
                Don't received code? <Link to="/signup">Resend code</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
