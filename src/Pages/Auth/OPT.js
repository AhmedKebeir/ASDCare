import { Link, replace, useNavigate } from "react-router-dom";
import Logo from "../../Components/WebSite/Logo";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useRef, useState } from "react";
import axios from "axios";
import { BaseUrl, VERIFYEMAIL } from "../../Api/Api";
import Cookie from "cookie-universal";
import LoadingAnimation from "../../Components/WebSite/LoadingAnimation";

export default function OPT() {
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(["", "", "", ""]);
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, ""); // السماح فقط بالأرقام
    const newOtp = [...otp];
    // console.log(newOtp);

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

  const cookie = Cookie();

  const user = cookie.get("userDetails");

  // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
  let parsedUser = {};

  if (typeof user === "string") {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof user === "object" && user !== null) {
    parsedUser = user; // إذا كان بالفعل كائن، استخدمه كما هو
  }

  console.log("✅ بيانات المستخدم:", parsedUser);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      // تحويل OTP إلى نص بدلاً من مصفوفة
      const otpString = otp.join(""); // ["4", "4", "4", "7"] -> "4447"

      const response = await axios.post(
        `${BaseUrl}/${VERIFYEMAIL}`,
        { resetCode: otpString },
        {
          headers: {
            Authorization: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);

      console.log("✅ OTP تم التحقق بنجاح!", response.data);
      nav("/account-type", { replace: false });
    } catch (error) {
      setLoading(false);
      console.error(
        "❌ خطأ عند إرسال OTP:",
        error.response ? error.response.data : error.message
      );
    }
  }

  console.log(user);
  return (
    <div className="sign">
      <div className="container">
        <SlideShowAuth />
        <div className="form">
          <Logo />
          <h1>OPT Verification</h1>
          <p className="page-opt">
            Enter the verification code. We just sent on your email address.
          </p>

          <form onSubmit={handleSubmit}>
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
              {loading ? <LoadingAnimation /> : "Get Started"}
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
