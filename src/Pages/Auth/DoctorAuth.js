import { Link, useNavigate } from "react-router-dom";
import SlideShowAuth from "../../Components/WebSite/SlideShowAuth";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function DoctorAuth() {
  const cookie = Cookie();

  const user = cookie.get("userDetails");

  const nav = useNavigate();

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

  const [form, setForm] = useState({
    speciailization: "",
    qualifications: "",
    medicalLicense: "",
    address: "",
    Session_price: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("speciailization", form.speciailization);
    formData.append("address", form.address);
    formData.append("Session_price", form.Session_price);
    formData.append("qualifications", form.qualifications); // يجب أن يكون ملف
    formData.append("medicalLicense", form.medicalLicense);
    try {
      const res = await axios.post(
        `${BaseUrl}/auth/singupForDoctor`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + parsedUser.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
    } catch (err) {
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
            <div className="department">
              <input
                type="text"
                placeholder="Department"
                name="speciailization"
                onChange={handleChange}
                value={form.speciailization}
              />
            </div>
            <div className="Edu edu-file">
              {/* <label htmlFor="Education">
                Educational Qualification
              </label> */}
              <FaCamera />
              <input
                type="file"
                name="qualifications"
                onChange={(e) =>
                  setForm({ ...form, qualifications: e.target.files[0] })
                }
              />
            </div>
            <div className="Edu">
              <FaCamera />
              <input
                type="file"
                name="medicalLicense"
                onChange={(e) =>
                  setForm({ ...form, medicalLicense: e.target.files[0] })
                }
              />
            </div>
            <div className="address-doc">
              <input
                type="text"
                placeholder="Clinic Address"
                name="address"
                onChange={handleChange}
                value={form.address}
              />
            </div>
            <div className="session-price">
              <input
                type="number"
                placeholder="Session Price"
                name="Session_price"
                onChange={handleChange}
                value={form.Session_price}
              />
            </div>
            <button className="btn-sign" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
