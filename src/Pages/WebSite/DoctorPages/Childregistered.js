import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Header from "../../../Components/WebSite/Header";
import Footer from "../../../Components/WebSite/Footer";
import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Api/Api";

export default function Childregistered() {
  const params = useParams();
  const [parent, setParent] = useState({});
  const [sessionsParent, setSessionsParent] = useState([]);
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
    async function fetchParentData() {
      try {
        const res = await axios.get(`${BaseUrl}/parents/${params.id}`, {
          headers: { Authorization: `Bearer ${parsedUser.token}` },
        });
        setParent(res.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchParentData();
  }, []);

  useEffect(() => {
    async function fetchParentData() {
      try {
        const res2 = await axios.get(
          `${BaseUrl}/sessions/allSessionsForDoctorsToOneParent/${params.id}`,
          {
            headers: { Authorization: `Bearer ${parsedUser.token}` },
          }
        );
        setSessionsParent(res2.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchParentData();
  }, []);
  console.log(sessionsParent);
  const sessionParentShow = sessionsParent.map((session, index) => {
    return (
      <Link to={`${session?._id}`} key={index}>
        <div className="child-session flex items-center justify-between">
          <div className="session-info flex items-center gap-10">
            <img src="" alt="" />
            <h3>Session Number{session?.session_number}</h3>
          </div>
          <div className="session-date">
            <span>{session?.session_date}</span>
            <span>{session?.statusOfSession}</span>
          </div>
          <div className="session-mobile">
            <h3>
              Session Number{session?.session_number}
              <span>{session?.session_date}</span>
            </h3>
            <span>{session?.statusOfSession}</span>
          </div>
        </div>
      </Link>
    );
  });
  return (
    <>
      <Header />

      <div className="child-registered pt-50 pb-50 bg-section">
        <div className="title bacground-linear-left">
          <div className="main-container flex items-center justify-between">
            <div className="title-info flex items-center gap-10">
              <Link to="/doctor/registeredchilds">
                <FontAwesomeIcon
                  icon={faLessThan}
                  className="text-3xl font-black cursor-pointer"
                />
              </Link>
              <div>
                <h2>
                  Child:{" "}
                  {parent?.childs?.[0]?.childName
                    ? parent.childs[0].childName
                        .split(" ")
                        .slice(0, 1)
                        .join(" ")
                    : "Name"}
                </h2>
                <p>
                  Parent:{" "}
                  {parent?.userName
                    ? parent.userName.split(" ").slice(0, 2).join(" ")
                    : "Name"}
                </p>
              </div>
            </div>
            <Link to="conversation">Chat with Parent</Link>
          </div>
        </div>

        <div className="child-registered-content">
          <div className="main-container">
            <div className="child-level">
              <div>
                <span className="level">1</span>
                <h3>Child’s Autism level</h3>
              </div>
              <Link to="">Change Autism Level</Link>
            </div>

            <div className="child-sessions">{sessionParentShow}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
