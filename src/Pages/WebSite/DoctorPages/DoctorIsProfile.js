import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../../Components/WebSite/Footer";
import Header from "../../../Components/WebSite/Header";
import "../../../CSS/DoctorStyle/DoctorIsProfile.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { GrAddCircle, GrFormNext } from "react-icons/gr";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../../store/actions/user-actions";
import axios from "axios";
import { BaseUrl, CREATEDATETIMEDOCTOR } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { ScaleLoader } from "react-spinners";

export default function DoctorIsProfile() {
  const [radioDay, setRadioDay] = useState(null);
  const [radioDayName, setRadioDayName] = useState(null);
  const [radioActive, setRadioActive] = useState(null);
  const [radioTime, setRadioTime] = useState(false);
  const [inpTime, setInpTime] = useState("");

  const [loading, setLoading] = useState(false);

  const [time, setTime] = useState([]);

  const [availableSlots, setAvailableSlots] = useState({
    date: "",
    day: "",
    time: "",
  });

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
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user?.children?.data?.data || "");
  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getuser());
    };
    fetchUser();
  }, [dispatch]);

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

  const formatTo12Hour = (time24) => {
    const [hour, minute] = time24.split(":");
    const hourNum = parseInt(hour, 10);
    const suffix = hourNum >= 12 ? "PM" : "AM";
    const hour12 = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${hour12}:${minute} ${suffix}`;
  };

  const days = getNext7Days();

  const daysShow = days.map((day, index) => {
    return (
      <div className="avaulible-day-item" key={index}>
        <input
          type="radio"
          name="day"
          id={day.date}
          value={day.date}
          onClick={(e) => {
            setRadioDay(e.target.value);
            setRadioDayName(day.label.split(",")[0]);
            setAvailableSlots({
              ...availableSlots,
              day: day.label.split(",")[0],
              date: day.date,
            }); // حفظ اسم اليوم
          }}
          checked={radioDay === day.date}
        />
        <label htmlFor={day.date}>
          <div className="avaulible-day-item-content">
            <span>{day.label.split(",")[0]}</span> {/* اسم اليوم فقط */}
            <span>
              {radioActive === index && radioDay === day.date
                ? "Open"
                : "Close"}
            </span>
          </div>
          <div className="day-setting">
            <span>Close this day?</span>
            <div className="active">
              <input
                type="radio"
                name={`active-${index}`} // كل يوم له مجموعة منفصلة
                id={`active-${index}`}
                onClick={() => {
                  setRadioActive(radioActive === index ? null : index);
                }}
                checked={radioActive === index}
              />
              <label htmlFor={`active-${index}`}></label>
            </div>
          </div>
        </label>
      </div>
    );
  });

  const timeShow = time.map((tim, index) => {
    return (
      <>
        <div
          key={index}
          className="avaulible-time-item flex items-center justify-between"
        >
          <div className="span-time">{tim}</div>
          <button className="add-time-btn">Remove</button>
        </div>
      </>
    );
  });

  // console.log(availableSlots);
  // console.log(user);

  async function CreateDateTime() {
    setLoading(true);
    if (inpTime !== "") {
      const time12 = formatTo12Hour(inpTime);
      setTime([...time, time12]);
      setAvailableSlots({
        ...availableSlots,
        time: time12,
      });
      const slotToSend = {
        ...availableSlots,
        time: time12,
      };

      try {
        const res = await axios.post(
          `${BaseUrl}/${CREATEDATETIMEDOCTOR}`,
          {
            availableSlots: [slotToSend], // ✅ المصفوفة هنا
          },
          { headers: { Authorization: `Bearer ${parsedUser.token}` } }
        );
        console.log(res);
        setAvailableSlots({ ...availableSlots, time: res.data.data });
      } catch (err) {
        console.log(err);
      }
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!availableSlots?.date || !availableSlots?.day) {
        console.warn("❌ البيانات غير كاملة:", availableSlots);
        return;
      }

      try {
        const res = await axios.post(
          `https://asd-final-project-soat.vercel.app/api/v1/appointment/getAvailableTimesForDayAndDate/${parsedUser.id}`,
          {
            date: availableSlots.date,
            day: availableSlots.day,
          },
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setTime(res.data.data);

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
  }, [availableSlots]);

  return (
    <>
      <Header />
      <div className="clinic pb-50 pt-50 bg-section ">
        <div className="title">
          <div className="main-container">
            <h1>My Clinic & Profile </h1>
          </div>
        </div>

        <div className="doctor-profile-content">
          <div className="main-container">
            <div className="doctor-details">
              <div className="doctor-info">
                <div className="image">
                  <img src={user?.image || ""} alt="" />
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
                    <span>{user?.parent?.userName || ""}</span>
                    <span className="doctor-rate-web">
                      {Array.from({
                        length: Math.round(user?.ratingsAverage || 0),
                      }).map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} />
                      ))}
                    </span>
                  </h2>
                  <p>Department: {user?.speciailization || ""}</p>
                  <p>Address: {user?.qualifications || ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="doctor-avaulible">
          <div className="main-container">
            <div className="avaulible-title flex items-center justify-between">
              <h2>My Clinic</h2>
              <div>
                <p>Consultation fee</p>
                <input
                  type="text"
                  placeholder={`${user?.Session_price} EGP` || "Price"}
                  value={`${user?.Session_price} EGP` || "Price"}
                  readOnly
                />
              </div>
            </div>

            <div className="avaulible-content">
              <div className="avaulible-day">
                <h3>Manage days</h3>
                <div className="avaulible-day-list hide-scrollbar">
                  {daysShow}
                </div>
              </div>
              <div className="avaulible-time">
                <h3>Manage times</h3>
                <div className="avaulible-time-list hide-scrollbar">
                  <div className="add-time  ">
                    <div className="add-time-title flex items-center justify-between">
                      <span>Add time</span>
                      <GrAddCircle />
                    </div>
                    <div className="add-time-content">
                      <div className="time-inputs">
                        <input
                          type="time"
                          placeholder="What time you will add?"
                          value={inpTime}
                          onChange={(e) => {
                            setInpTime(e.target.value);
                          }}
                        />
                        {/* <span>
                          AM <GrFormNext />
                        </span> */}
                      </div>
                      <button className="add-time-btn" onClick={CreateDateTime}>
                        Add
                      </button>
                    </div>

                    {loading ? (
                      <div className="medican-loading">
                        <ScaleLoader color="#133e87" height={50} width={7} />
                      </div>
                    ) : (
                      timeShow
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-info">
              <div className="main-container">
                <div className="profile-info-title">
                  <h2>My Profile</h2>
                </div>
              </div>
              <div className="profile-info-content">
                <div className="main-container">
                  <h3>Profile Info</h3>
                  <div className="data-list">
                    <div className="data-item">
                      <ul className="">
                        <li>
                          <h4>Name</h4>
                          <span>
                            <input
                              type="text"
                              placeholder="Name will be here."
                              value={user?.parent?.userName || ""}
                            />
                          </span>
                        </li>

                        <li>
                          <h4>Phone Number</h4>
                          <span>
                            <input
                              type="text"
                              value=""
                              placeholder="012XXXXXXXXX"
                            />
                          </span>
                        </li>

                        <li>
                          <h4>Email Address</h4>
                          <span>
                            <input
                              type="text"
                              value={user?.parent?.email || ""}
                              placeholder="Example@gmail.com"
                              readOnly
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="data-item">
                      <ul className="">
                        <li>
                          <h4>Gender</h4>
                          <span>
                            <input type="text" value="" placeholder="Male" />
                          </span>
                        </li>

                        <li>
                          <h4>Age</h4>
                          <span>
                            <input type="text" value="" placeholder="XX yo" />
                          </span>
                        </li>

                        <li>
                          <h4>Department</h4>
                          <span>
                            <input
                              type="text"
                              value={user?.speciailization || ""}
                              placeholder="Department here"
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="data-item">
                      <ul className="">
                        <li>
                          <h4>Address</h4>
                          <span>
                            <input
                              type="text"
                              value={user?.qualifications || ""}
                              placeholder="XXXXXXXXXXXXX"
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="data-item">
                      <div className="buttons">
                        <Link>Change Info</Link>

                        <Link>Change Password</Link>

                        <button>Log Out</button>
                      </div>
                    </div>
                  </div>
                  <h3>Clinic Info</h3>
                  <div className="clinic-info flex items-center  justify-between">
                    <ul>
                      <li>
                        <h4>Clinic’s Address</h4>
                        <span>
                          <input
                            type="text"
                            value=""
                            placeholder="Address will be here.."
                          />
                        </span>
                      </li>
                    </ul>
                    <button>Change Address</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
