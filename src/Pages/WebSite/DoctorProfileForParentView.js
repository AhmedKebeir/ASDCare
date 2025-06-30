import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../CSS/DoctorProfileForParentView.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, Outlet, useParams } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl, GETAllDOCTORS } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/user-actions";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";

export default function DoctorProfileForParentView() {
  const [dayAndDate, setDayAndDate] = useState({
    day: "",
    date: "",
  });
  const [radioTime, setRadioTime] = useState("");
  const [time, setTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const userr = useSelector((state) => state.user?.children?.data?.data);
  const child = userr?.childs || [];
  const dispatch = useDispatch();
  console.log(child);

  useEffect(() => {
    dispatch(getuser());
  }, []);

  const params = useParams();

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

  const [doctor, setDoctor] = useState("");

  const formatTo12Hour = (time24) => {
    const [hour, minute] = time24.split(":");
    const hourNum = parseInt(hour, 10);
    const suffix = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${hour12}:${minute} ${suffix}`;
  };
  function getNext7Days() {
    const days = [];
    const options = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    }; // لتنسيق التاريخ

    for (let i = 0; i < 7; i++) {
      const date = new Date(); // اليوم الحالي
      date.setDate(date.getDate() + i); // نضيف عدد الأيام
      days.push({
        date: date.toISOString().split("T")[0], // التنسيق: yyyy-mm-dd
        label: date.toLocaleDateString("en", options), // مثلاً: الجمعة، 27 يونيو 2025
      });
    }

    return days;
  }

  const days = getNext7Days();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}/${GETAllDOCTORS}/${params.id}`,
          {
            headers: { Authorization: "Bearer " + (parsedUser?.token || "") },
          }
        );
        setDoctor(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const formatTimeAgo = (dateString) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return `${days} days ago`;
  };
  console.log(dayAndDate);
  console.log(days[0].date.split("-")[2]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!dayAndDate?.date || !dayAndDate?.day) {
        console.warn("❌ البيانات غير كاملة:", dayAndDate);
        return;
      }

      try {
        const res = await axios.post(
          `https://asd-final-project-soat.vercel.app/api/v1/appointment/getAvailableTimesForDayAndDate/${params.id}`,
          {
            date: dayAndDate.date,
            day: dayAndDate.day,
          },
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setTime(res.data.data);
        console.log("✅ البيانات المسترجعة:", res.data.data);
        // ضع النتائج في state لعرضها إن أحببت
      } catch (error) {
        if (error.response?.status === 404) {
          alert("⚠️ لا توجد مواعيد متاحة لهذا اليوم.");
          setTime([]);
        } else {
          console.error("❌ Axios Error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dayAndDate]);
  return (
    <>
      <Header />

      <div className="doctor-profile-for-parent-view bg-section pt-50 pb-50">
        <div className="main-container">
          <h1>Doctor’s Profile</h1>
        </div>

        <div className="doctor-profile-content">
          <div className="main-container">
            <div className="doctor-details">
              <div className="doctor-info">
                <div className="image">
                  <img src={doctor?.image || ""} alt="" />
                  <span className="doctor-rate-mobile">
                    {Array.from({
                      length: Math.round(user?.ratingsAverage || 0),
                    }).map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} />
                    ))}
                  </span>
                </div>
                <div>
                  <h2 title="Doctor Name">
                    <span>{doctor?.parent?.userName || ""}</span>
                    <span className="doctor-rate-web">
                      {Array.from({
                        length: Math.round(doctor?.ratingsAverage || 0),
                      }).map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} />
                      ))}
                    </span>
                  </h2>
                  <p>Department: {doctor?.speciailization || ""}</p>
                  <p>Address will be here.</p>
                </div>
              </div>
              <div className="contact-with-my">
                <Link to="">Chat with doctor</Link>
              </div>
            </div>
            {/* doctor date avalibale  */}
            <Outlet />
            {/* end doctor date  */}
          </div>
        </div>

        {/* Add your content here */}
      </div>

      <Footer />
    </>
  );
}
