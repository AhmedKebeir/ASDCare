import { useEffect, useState } from "react";
import Footer from "../../../Components/WebSite/Footer";
import Header from "../../../Components/WebSite/Header";
import { BaseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AllUpcomingSessions() {
  const [sessions, setSessions] = useState([]);
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
        const res = await axios.get(
          `${BaseUrl}/sessions/allSessionsForDoctor/status/coming`,
          { headers: { Authorization: `Bearer ${parsedUser.token}` } }
        );
        setSessions(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSessions();
  }, []);
  console.log(sessions);

  const sesssionsShow = sessions.map((sessions, index) => {
    return (
      <div
        key={index}
        className="session-item flex justify-between items-center"
      >
        <div className="session-title">
          <img src="" alt="" />
          <div>
            <h3>Session:{sessions?.session_number}</h3>
            <p>Child: {sessions?.parentId?.childs[0]?.childName}</p>
            <p className="child-data">
              Session Status: {sessions?.statusOfSession}
            </p>
          </div>
        </div>
        <div className="session-info">
          <span className="session-date">Date: {sessions?.session_date}</span>
          <Link to={`/doctor/session/${sessions?._id}`}>Session Comments</Link>
        </div>
      </div>
    );
  });
  return (
    <>
      <Header />

      <div className="upcoming-sessions pt-50 pb-50 bg-section">
        <div className="title">
          <div className="main-container">
            <h2>All Upcoming Sessions</h2>
          </div>
        </div>
        <div className="sessions">
          <div className="main-container">
            <p>Note: The sessions are sort by nearest date</p>
            <div className="sessions-list">{sesssionsShow}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
