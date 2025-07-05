import { useEffect, useState } from "react";
import Footer from "../../../Components/WebSite/Footer";
import Header from "../../../Components/WebSite/Header";
import { BaseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";
import axios from "axios";

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
            <div className="sessions-list">
              <div className="session-item flex justify-between items-center">
                <div className="session-title">
                  <img src="" alt="" />
                  <div>
                    <h3>Parent's name</h3>
                    <p>Child’s name</p>
                    <p className="child-data">
                      <span>Age:XX</span> <span>Gender:X</span>
                    </p>
                  </div>
                </div>
                <span className="session-date">Date: XX/XX/XXXX</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
