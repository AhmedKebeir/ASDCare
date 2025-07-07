import "../../CSS/ChildProgress.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/user-actions";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import { WindowSize } from "../../Context/WindowWidthContext";
import axios from "axios";
import { BaseUrl, GETALLDOCTORSFORSPECIFICUSER } from "../../Api/Api";

import Cookie from "cookie-universal";
import { Link, useParams } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

export default function ChildProgress() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(186);
  const prependNumber = useRef(1);
  const [signWithDoctors, setSignWithDoctors] = useState([]);
  const [selectDoctor, setSelectDoctor] = useState("");
  const [children, setChildren] = useState([]);
  const cookie = Cookie();

  const user = cookie.get("userDetails");
  const params = useParams();

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
  const [radio, setRadio] = useState("lastnotes");

  const dispatch = useDispatch();
  const child = useSelector(
    (state) => state.user?.children?.data?.data?.childs[0] || null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getuser());
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}/${GETALLDOCTORSFORSPECIFICUSER}`,
          {
            headers: {
              Authorization: `Bearer ${parsedUser.token}`,
            },
          }
        );
        setSignWithDoctors(res.data.doctors);
      } catch (error) {
        if (
          error.response?.status === 403 &&
          error.response?.data?.message ===
            "You have not verified your account yet."
        ) {
          alert("لم يتم تفعيل حسابك بعد. تحقق من بريدك الإلكتروني.");
          // navigate("/verify-account");
        } else {
          console.error("Error fetching appointments:", error);
        }
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (signWithDoctors.length > 0) {
      setSelectDoctor(signWithDoctors[0]._id); // تحديد أول دكتور تلقائيًا
    }
  }, [signWithDoctors]);

  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!selectDoctor) return;

      let statusPath = "";
      if (radio === "sessiondone") statusPath = "/status/done";
      else if (radio === "upcoming") statusPath = "/status/coming";
      // lastnotes => no extra path

      const url = `${BaseUrl}/sessions/ForParentToOneDoctor/${selectDoctor}${statusPath}`;

      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
          },
        });

        setSessions(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.error("❌ Error fetching sessions:", err);
      }
    };

    fetchData();
  }, [selectDoctor, radio]);

  console.log(radio);
  // console.log(parsedUser);

  useEffect(() => {
    async function fetchChildren() {
      if (child && child._id) {
        try {
          const res = await axios.get(`${BaseUrl}/childs/${child._id}`);
          setChildren(res.data.data);
        } catch (err) {
          console.error("❌ Failed to fetch child data", err);
        }
      }
    }

    fetchChildren();
  }, [child]);
  console.log(children);

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? "Today" : `${diffDays} days ago`;
  };
  return (
    <>
      <Header />
      <div className="child-progress">
        <div className="title">
          <div className="main-container">
            <h2>Child Progress</h2>
            <p>Autism progress is growth in skills and behavior.</p>
          </div>
        </div>
        <div className="child-content">
          <div className="main-container">
            <section>
              <Swiper
                modules={[Virtual, Navigation]}
                slidesPerView={size < 768 ? 1 : size < 1200 ? 2 : 3}
                spaceBetween={30}
                navigation={true}
                virtual
                className="mySwiper doctor-list"
              >
                {signWithDoctors.map((doctor, index) => {
                  return (
                    <SwiperSlide key={index} className="doctor-name">
                      <input
                        type="radio"
                        id={`${doctor?._id}`}
                        name="select-doctor"
                        value={`${doctor?._id}`}
                        checked={selectDoctor === doctor._id}
                        onChange={(e) => {
                          setSelectDoctor(e.target.value);
                        }}
                      />
                      <label htmlFor={`${doctor?._id}`}>
                        {doctor?.parent?.userName}
                      </label>
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <div className="prog-content">
                <div className="progress-cont  flex justify-between items-center">
                  <div>
                    <span>
                      <input
                        type="radio"
                        id="lastnotes"
                        name="session"
                        onChange={(e) => setRadio(e.target.id)}
                        checked={radio === "lastnotes"}
                      />
                      <label htmlFor="lastnotes">Last notes</label>
                    </span>
                    <span>
                      <input
                        type="radio"
                        id="sessiondone"
                        name="session"
                        onChange={(e) => setRadio(e.target.id)}
                        checked={radio === "sessiondone"}
                      />
                      <label htmlFor="sessiondone">Sessions Done</label>
                    </span>
                  </div>
                  <span>
                    <input
                      type="radio"
                      id="upcoming"
                      name="session"
                      onChange={(e) => setRadio(e.target.id)}
                      checked={radio === "upcoming"}
                    />
                    <label htmlFor="upcoming">Upcoming sessions</label>
                  </span>
                </div>

                <div className="prog-main-content">
                  {radio === "lastnotes" ? (
                    <>
                      {sessions.length > 0 ? (
                        sessions.map((session, index) => {
                          return (
                            <div key={index} className="doc-boxs">
                              <div className="doc-box">
                                <div className="image">
                                  <img src={session?.doctorId?.image} alt="" />
                                  <h3 className="mobile">
                                    {session?.doctorId?.parent?.userName}
                                    <span>
                                      {getDaysAgo(session?.createdAt)}
                                    </span>
                                  </h3>
                                </div>
                                <div className="doc-title">
                                  <h3>
                                    {session?.doctorId?.parent?.userName}
                                    <span>
                                      {getDaysAgo(session?.createdAt)}
                                    </span>
                                  </h3>
                                  {/* <p>{session.comments.join(<br />)}</p> */}
                                  {session?.comments.map((comment, index) => {
                                    return <p key={index}>{comment}</p>;
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="not-data mt-5">Not available sessions</p>
                      )}
                    </>
                  ) : radio === "sessiondone" ? (
                    <>
                      {sessions.length > 0 ? (
                        sessions.map((session, index) => {
                          return (
                            <div key={index} className="doc-boxs">
                              <div className="doc-box">
                                <div className="image">
                                  <img src={session?.doctorId?.image} alt="" />
                                  <h3 className="mobile">
                                    Session {session?.session_number}
                                    <span>
                                      {getDaysAgo(session?.createdAt)}
                                    </span>
                                  </h3>
                                </div>
                                <div className="doc-title">
                                  <h3>
                                    Session {session?.session_number}
                                    <span>
                                      {getDaysAgo(session?.createdAt)}
                                    </span>
                                  </h3>
                                  {/* <p>{session.comments.join(<br />)}</p> */}
                                  {session?.comments.map((comment, index) => {
                                    return <p key={index}>{comment}</p>;
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <p className="not-data mt-5">Not available sessions</p>
                      )}
                    </>
                  ) : radio === "upcoming" ? (
                    <div className="upcoming">
                      {sessions.length > 0 ? (
                        <>
                          {sessions.map((session, index) => {
                            return (
                              <div key={index} className="doc-boxs">
                                <div className="doc-box">
                                  <div className="image">
                                    <img
                                      src={session?.doctorId?.image}
                                      alt=""
                                    />
                                    <h3 className="mobile">
                                      Session {session?.session_number}
                                      <span>
                                        {getDaysAgo(session?.createdAt)}
                                      </span>
                                    </h3>
                                  </div>
                                  <div className="doc-title">
                                    <h3>
                                      Session {session?.session_number}
                                      <span>
                                        {getDaysAgo(session?.createdAt)}
                                      </span>
                                    </h3>
                                    {/* <p>{session.comments.join(<br />)}</p> */}
                                    {session?.comments.map((comment, index) => {
                                      return <p key={index}>{comment}</p>;
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </>
                      ) : (
                        <p className="not-data mt-5">Not available sessions</p>
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
            {Number(children?.degree_level) ? (
              <aside>
                <div className="child-level">
                  <div>
                    <span
                      className={`level level-${
                        Number(children?.degree_level) + 1
                      }`}
                    >
                      {Number(children?.degree_level) + 1}
                    </span>
                    <h3>Your Autism Level</h3>
                  </div>
                </div>
                <ul>
                  <li className="new-child">
                    <Link
                      to="/signup/childauth"
                      className="flex items-center justify-between"
                    >
                      <span>Add Child</span>
                      <IoAdd />
                    </Link>
                  </li>

                  <li>
                    <div className="child-info">
                      <img src="" alt="" />
                      <div>
                        <h3>{children?.childName || ""}</h3>
                        <span>{children?.gender || ""}</span>
                      </div>
                    </div>
                    <span>{children?.age || ""} yo</span>
                  </li>
                </ul>
              </aside>
            ) : (
              <aside>
                <div className="child-level">
                  <div>
                    {Number(children?.degree_level) ? (
                      <>
                        <span
                          className={`level level-${
                            Number(children?.degree_level) + 1
                          }`}
                        >
                          {Number(children?.degree_level) + 1}
                        </span>
                        <h3>Your Autism Level</h3>
                      </>
                    ) : (
                      <h3>You not do autism test!</h3>
                    )}
                  </div>
                </div>

                <ul>
                  <li className="new-child">
                    <Link
                      to="/signup/childauth"
                      className="flex items-center justify-between"
                    >
                      <span>Add Child</span>
                      <IoAdd />
                    </Link>
                  </li>

                  <li>
                    <div className="child-info">
                      <img src="" alt="" />
                      <div>
                        <h3>{children?.childName || ""}</h3>
                        <span>{children?.gender || ""}</span>
                      </div>
                    </div>
                    <span>{children?.age || ""} yo</span>
                  </li>
                </ul>
              </aside>
            )}
            {/* <aside>
              <div className="child-level">
                <div>
                  {Number(children?.degree_level) ? (
                    <>
                      <span
                        className={`level level-${
                          Number(children?.degree_level) + 1
                        }`}
                      >
                        {Number(children?.degree_level) + 1}
                      </span>
                      <h3>Your Autism Level</h3>
                    </>
                  ) : (
                    <h3>You not do autism test!</h3>
                  )}
                </div>
              </div>

              <ul>
                <li className="new-child">
                  <Link
                    to="/signup/childauth"
                    className="flex items-center justify-between"
                  >
                    <span>Add Child</span>
                    <IoAdd />
                  </Link>
                </li>

                <li>
                  <div className="child-info">
                    <img src="" alt="" />
                    <div>
                      <h3>{children?.childName || ""}</h3>
                      <span>{children?.gender || ""}</span>
                    </div>
                  </div>
                  <span>{children?.age || ""} yo</span>
                </li>
              </ul>
            </aside> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
