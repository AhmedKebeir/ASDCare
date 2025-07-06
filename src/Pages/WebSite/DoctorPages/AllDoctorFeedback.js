import { useEffect, useState } from "react";
import Footer from "../../../Components/WebSite/Footer";
import Header from "../../../Components/WebSite/Header";
import { BaseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";
import axios from "axios";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AllDoctorFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const cookie = Cookie();

  const doctor = cookie.get("userDetails");

  // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
  let parsedUser = {};

  if (typeof doctor === "string") {
    try {
      parsedUser = JSON.parse(doctor);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof doctor === "object" && doctor !== null) {
    parsedUser = doctor; // إذا كان بالفعل كائن، استخدمه كما هو
  }
  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await axios.get(`${BaseUrl}/reviews`, {
          headers: { Authorization: `Bearer ${parsedUser.token}` },
        });
        setFeedbacks(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSessions();
  }, []);
  console.log(feedbacks);

  const sesssionsShow = feedbacks.map((feedback, index) => {
    return (
      <Link
        key={index}
        to={`/doctor/registeredchilds/${feedback?.parent?._id}`}
      >
        <div className="session-item flex justify-between items-center">
          <div className="session-title">
            <img src={feedback?.parent?.image} alt="" />
            <div>
              <h3>
                Parent:
                {feedback?.parent?.userName.split(" ").slice(0, 1).join(" ")}
              </h3>
              <p>
                Child:{" "}
                {feedback?.parent?.childs[0]?.childName
                  .split(" ")
                  .slice(0, 1)
                  .join(" ")}
              </p>
              <p className="child-data">Comments: {feedback?.title}</p>
            </div>
          </div>
          <div className="session-info">
            <span className="session-date">Date: {feedback?.dateOnly}</span>
            <span className="doctor-rate-mobile">
              {Array.from({
                length: Math.round(feedback?.ratings || 0),
              }).map((_, index) => (
                <FontAwesomeIcon key={index} icon={faStar} />
              ))}
            </span>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <>
      <Header />

      <div className="upcoming-sessions pt-50 pb-50 bg-section">
        <div className="title">
          <div className="main-container">
            <h2>My feedbacks</h2>
          </div>
        </div>
        <div className="sessions">
          <div className="main-container">
            <p>Note: The feedbacks are sort by nearest date</p>
            <div className="sessions-list">{sesssionsShow}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
