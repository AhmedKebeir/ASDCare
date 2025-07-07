import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "../../../Components/WebSite/Footer";
import Header from "../../../Components/WebSite/Header";
import "../../../CSS/DoctorStyle/DoctorIsProfile.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { GrAddCircle, GrFormNext } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getuser, logOut } from "../../../store/actions/user-actions";
import axios from "axios";
import { BaseUrl, CREATEDATETIMEDOCTOR } from "../../../Api/Api";
import Cookie from "cookie-universal";
import { ScaleLoader } from "react-spinners";
import { BsPencilSquare } from "react-icons/bs";

export default function DoctorIsProfile() {
  const [radioDay, setRadioDay] = useState(null);
  const [radioDayName, setRadioDayName] = useState(null);
  const [radioActive, setRadioActive] = useState(null);
  const [radioTime, setRadioTime] = useState(false);
  const [inpTime, setInpTime] = useState("");
  const [curUser, setCurUser] = useState({});
  const nav = useNavigate();

  const [showChangePassword, setShowChangePassword] = useState(false);

  const [changePass, setChangePass] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [accept, setAccept] = useState(false);
  const [err, setErr] = useState(false);

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

  useEffect(() => {
    if (user) {
      setCurUser(user);
    }
  }, [user]);

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

      const slotToSend = {
        ...availableSlots,
        time: time12,
      };

      try {
        const res = await axios.post(
          `${BaseUrl}/${CREATEDATETIMEDOCTOR}`,
          {
            availableSlots: [slotToSend],
          },
          { headers: { Authorization: `Bearer ${parsedUser.token}` } }
        );

        // ✅ أضف الوقت الجديد يدويًا للمصفوفة:
        setTime((prev) => [...prev, time12]);

        // ✅ امسح حقل الوقت بعد الإضافة
        setInpTime("");

        console.log("تمت الإضافة:", res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!availableSlots?.date || !availableSlots?.day) {
        console.warn("❌ البيانات غير كاملة:", availableSlots);
        setLoading(false);
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
  console.log(curUser);
  function handleChange(e) {
    setCurUser({ ...curUser, [e.target.name]: e.target.value });
  }

  async function handleChangeInfo() {
    try {
      const formData = new FormData();

      // إذا كانت الصورة كائن File أضفها إلى FormData
      if (curUser?.image instanceof File) {
        formData.append("image", curUser.image);
      }

      // أضف بقية الحقول النصية
      if (curUser?.Session_price)
        formData.append("Session_price", curUser.Session_price);
      if (curUser?.speciailization)
        formData.append("speciailization", curUser.speciailization);
      if (curUser?.qualifications)
        formData.append("qualifications", curUser.qualifications);
      if (curUser?.parent?.userName)
        formData.append("userName", curUser.parent.userName);

      const res = await axios.put(`${BaseUrl}/doctors/updateMe`, formData, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
          // لا تضف Content-Type, المتصفح سيضيفه تلقائيًا
        },
      });

      console.log("✅ تم التحديث:", res.data);
      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("❌ خطأ أثناء التحديث:", err);
      alert("❌ Failed to update profile. Please try again.");
    }
  }

  function handleLogout() {
    // Implement logout functionality here
    console.log("User logged out");
    cookie.remove("userDetails");

    dispatch(logOut());

    nav("/");
    window.location.reload();
  }

  const chooseRef = useRef(null);

  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const showModal = query.get("modal") === "doctor-profile";

  useEffect(() => {
    if (showChangePassword) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
    const handleClickOutside = (event) => {
      if (chooseRef.current && !chooseRef.current.contains(event.target)) {
        setShowChangePassword(false); // ⬅️ إغلاق النافذة بدلاً من nav()
      }
    };

    if (showChangePassword) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showChangePassword]);

  function handleChangePass(e) {
    setChangePass({ ...changePass, [e.target.name]: e.target.value });
  }

  async function changePassword() {
    setAccept(true);
    if (
      changePass.currentPassword !== "" &&
      changePass.password !== "" &&
      changePass.confirmPassword !== "" &&
      changePass.password === changePass.confirmPassword
    ) {
      try {
        const res = await axios.put(
          `${BaseUrl}/doctors/updateMypassword`,
          changePass,
          { headers: { Authorization: `Bearer ${parsedUser.token}` } }
        );

        if (res.status === 200) {
          setShowChangePassword(false); // ✅ أغلق النافذة
          setErr(false);
          nav("/doctor-profile"); // يمكنك حذفه إذا لا تريد التنقل
        }

        console.log(res);
      } catch (err) {
        setErr(true);
      }
    }
  }

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
                  <div className="doctor-profile-image">
                    <div className="change-image">
                      <input
                        type="file"
                        id="profile-image"
                        name="image"
                        onChange={(e) =>
                          setCurUser({
                            ...curUser,
                            image: e.target.files[0],
                          })
                        }
                      />
                      <label htmlFor="profile-image">
                        <BsPencilSquare />
                      </label>
                    </div>

                    <img
                      src={
                        curUser?.image instanceof File
                          ? URL.createObjectURL(curUser.image)
                          : curUser?.image
                      }
                      alt=""
                    />
                  </div>
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
                    <span>{curUser?.parent?.userName || ""}</span>
                    <span className="doctor-rate-web">
                      {Array.from({
                        length: Math.round(curUser?.ratingsAverage || 0),
                      }).map((_, index) => (
                        <FontAwesomeIcon key={index} icon={faStar} />
                      ))}
                    </span>
                  </h2>
                  <p>Department: {curUser?.speciailization || ""}</p>
                  <p>Address: {curUser?.qualifications || ""}</p>
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
                  type="number"
                  placeholder="EGP"
                  value={curUser?.Session_price || ""}
                  name="Session_price"
                  onChange={(e) =>
                    setCurUser({
                      ...curUser,
                      Session_price: e.target.value,
                    })
                  }
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
                              value={curUser?.parent?.userName || ""}
                              name="userName"
                              onChange={(e) => {
                                setCurUser({
                                  ...curUser,
                                  parent: {
                                    ...curUser.parent,
                                    userName: e.target.value,
                                  },
                                });
                              }}
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
                              value={curUser?.speciailization || ""}
                              name="speciailization"
                              onChange={handleChange}
                              placeholder="Department here"
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="data-item">
                      <ul className="">
                        <li>
                          <h4>Qualifications</h4>
                          <span>
                            <input
                              type="text"
                              value={curUser?.qualifications || ""}
                              placeholder="XXXXXXXXXXXXX"
                              onChange={handleChange}
                            />
                          </span>
                        </li>
                      </ul>
                    </div>
                    <div className="data-item">
                      <div className="buttons">
                        <button onClick={handleChangeInfo}>Change Info</button>

                        <Link onClick={() => setShowChangePassword(true)}>
                          Change Password
                        </Link>

                        <button onClick={handleLogout}>Log Out</button>
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
      {showChangePassword && (
        <div className="choose-child-test change-pass">
          <div className="choose" ref={chooseRef}>
            <h3>Change Password</h3>
            <div className="child-info">
              <input
                className="buton-form"
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={changePass.currentPassword}
                onChange={handleChangePass}
              />
              {err ? <p className="err">Current password is not valid!</p> : ""}
              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={changePass.password}
                onChange={handleChangePass}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={changePass.confirmPassword}
                onChange={handleChangePass}
              />
            </div>
            {accept && changePass.password !== changePass.confirmPassword ? (
              <p className="err">Confirm password not match password!</p>
            ) : (
              ""
            )}
            <div className="start">
              <Link onClick={changePassword}>Change Password</Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
