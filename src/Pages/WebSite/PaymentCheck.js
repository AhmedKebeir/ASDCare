import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../CSS/DoctorProfileForParentView.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl, GETAllDOCTORS } from "../../Api/Api";
import Cookie from "cookie-universal";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/user-actions";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";

export default function PaymentCheck() {
  const [dayAndDate, setDayAndDate] = useState({
    day: "",
    date: "",
  });
  const [radioTime, setRadioTime] = useState("");
  const [time, setTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
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

  async function handelBooking() {
    if (radioTime !== "" || dayAndDate.date !== "" || dayAndDate.day !== "") {
      try {
        const res = await axios.post(
          `https://asd-final-project-soat.vercel.app/api/v1/appointment/bookAppointment/${params.id}`,
          {
            date: dayAndDate.date,
            day: dayAndDate.day,
            time: radioTime,
          },
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 201) {
          nav(`/doctors/${params.id}/payment`);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      <div className="doctor-date-avaliable">
        <div className="date-title">
          <h2>Choose your Date</h2>
          <div>
            <GoChevronLeft />
            <p>Date will be here</p>
            <GoChevronRight />
          </div>
        </div>
        <div className="date-list">
          {days.map((day, index) => {
            return (
              <>
                <div key={index} className="date-item">
                  <input
                    type="radio"
                    name="date"
                    id={day.date}
                    onChange={(e) => {
                      setDayAndDate({
                        day: day.label.split(",")[0],
                        date: day.date,
                      });
                    }}
                  />
                  <label htmlFor={day.date}>
                    <span>{day.date.split("-")[2]}</span>
                    <p>{day.label.split(",")[0]}</p>
                  </label>
                </div>
              </>
            );
          })}
        </div>
        <div className="break-line"></div>

        <div className="doctor-time-avaliable">
          <div className="date-title">
            <h2>Choose your Date</h2>
          </div>
          <div className="time-list">
            {time.length > 0 ? (
              time.map((tim, index) => {
                return (
                  <div key={index} className="time-item">
                    <input
                      type="radio"
                      name="time"
                      id={`${tim}`}
                      value={tim}
                      onChange={(e) => {
                        setRadioTime(e.target.value);
                      }}
                      checked={radioTime === tim}
                    />
                    <label htmlFor={`${tim}`}>
                      <span>{tim.split(" ")[1]}</span> {/* AM/PM */}
                      <p>{tim.split(" ")[0]}</p> {/* الساعة */}
                    </label>
                  </div>
                );
              })
            ) : (
              <>Not available time</>
            )}
          </div>
        </div>

        <div className="children-list flex justify-center items-center">
          <h2>Choose your child</h2>
          <div className="child">
            {child?.map((childrenn, index) => (
              <div key={index} className="select-child">
                <input
                  type="radio"
                  name="select-child"
                  id={`${childrenn._id}`}
                />
                <label htmlFor={`${childrenn._id}`}>
                  <div className="child-box flex justify-between">
                    <div className="child-info">
                      <img src="" alt="" />
                      <div>
                        <h3>{childrenn?.childName}</h3>
                        <p>{childrenn?.gender}</p>
                      </div>
                    </div>
                    <span>{childrenn?.age} yo</span>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="booking">
            <p>The price will be: {doctor?.Session_price || "000"} EGP</p>
            <button onClick={handelBooking}>Book Now</button>
          </div>
        </div>

        <div className="doctor-reviews">
          <h2>Reviews</h2>
          <div className="review-list">
            {doctor?.reviews?.map((review, index) => (
              <div
                key={review._id || index}
                className="review-item flex justify-between"
              >
                <div className="reviewer-info flex justify-between items-center gap-2">
                  <img src="" alt="" />
                  <div>
                    <h3>{review.parent?.userName || "Anonymous"}</h3>
                    <p>{review.title}</p>
                  </div>
                </div>
                <span>
                  {review.createdAt
                    ? formatTimeAgo(review.createdAt)
                    : "Just now"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
}
