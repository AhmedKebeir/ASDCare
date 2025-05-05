import { Link, useNavigate } from "react-router-dom";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
import { useState } from "react";
import axios from "axios";
import { BaseUrl, CREATEPARENT } from "../../Api/Api";
import Cookie from "cookie-universal";
import LoadingAnimation from "../../Components/WebSite/LoadingAnimation";

export default function ChildAuth() {
  const [loading, setLoading] = useState(false);
  const [accept, setAccept] = useState(false);
  const nav = useNavigate();
  const [form, setForm] = useState({
    childName: "",
    birthday: "",
    gender: "",
    age: 10,
  });

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
  console.log(parsedUser);

  function isValidDate(date) {
    const regex = /^([1-9]|0[1-9]|[12][0-9]|3[01])\/([1-9]|0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    return regex.test(date);
  }
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    setAccept(true);
    e.preventDefault();
    // setForm({ ...form, user: parsedUser.id });

    try {
      setLoading(true);
      if (
        form.childName !== "" &&
        isValidDate(form.birthday) &&
        form.gender !== ""
      ) {
        const res = await axios.post(`${BaseUrl}/childs`, form, {
          headers: {
            Authorization: "Bearer " + parsedUser.token,
            "Content-Type": "application/json",
          },
        });
        console.log(res.status);
        if (res.status === 200) {
          setLoading(false);
          nav("/homeparent");
        }
      } else {
        console.log("not send");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  console.log(form);
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
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="childName"
              id="name"
              placeholder="Childname"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="birthday"
              id="birth"
              placeholder="Chlid's Date of Birth"
              onChange={handleChange}
              required
            />
            {accept && isValidDate(form.birthday) === false ? (
              <p className="err">Birthday must be like this 00/0/0000</p>
            ) : (
              ""
            )}

            {/* <input
              type="text"
              name="age"
              id="age"
              placeholder="Age"
              onChange={handleChange}
              required
            /> */}
            <div className="gender-child">
              <p>Child's Gender:</p>
              <div className="male">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="male">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
            {accept && form.gender === "" ? (
              <p className="err">Gender is required!</p>
            ) : (
              ""
            )}

            <button className="btn-sign" type="submit">
              {loading ? <LoadingAnimation /> : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
