import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../CSS/DoctorProfileForParentView.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
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
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
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
                <div className="date-item">
                  <input type="radio" name="date" id="date1" />
                  <label htmlFor="date1">
                    <span>1</span>
                    <p>Monday</p>
                  </label>
                </div>
                <div className="date-item">
                  <input type="radio" name="date" id="date2" />
                  <label htmlFor="date2">
                    <span>1</span>
                    <p>Monday</p>
                  </label>
                </div>
                <div className="date-item">
                  <input type="radio" name="date" id="date3" />
                  <label htmlFor="date3">
                    <span>1</span>
                    <p>Monday</p>
                  </label>
                </div>
                <div className="date-item">
                  <input type="radio" name="date" id="date1" />
                  <label htmlFor="date1">
                    <span>1</span>
                    <p>Monday</p>
                  </label>
                </div>
                <div className="date-item">
                  <input type="radio" name="date" id="date1" />
                  <label htmlFor="date1">
                    <span>1</span>
                    <p>Monday</p>
                  </label>
                </div>
                <div className="date-item">
                  <input type="radio" name="date" id="date1" />
                  <label htmlFor="date1">
                    <span>1</span>
                    <p>Monday</p>
                  </label>
                </div>
              </div>
              <div className="break-line"></div>

              <div className="doctor-time-avaliable">
                <div className="date-title">
                  <h2>Choose your Date</h2>
                </div>
                <div className="time-list">
                  <div className="time-item">
                    <input type="radio" name="time" id="time1" />
                    <label htmlFor="time1">
                      <span>Am</span>
                      <p>9:00</p>
                    </label>
                  </div>
                  <div className="time-item">
                    <input type="radio" name="time" id="time1" />
                    <label htmlFor="time1">
                      <span>Am</span>
                      <p>9:00</p>
                    </label>
                  </div>
                  <div className="time-item">
                    <input type="radio" name="time" id="time1" />
                    <label htmlFor="time1">
                      <span>Am</span>
                      <p>9:00</p>
                    </label>
                  </div>
                  <div className="time-item">
                    <input type="radio" name="time" id="time1" />
                    <label htmlFor="time1">
                      <span>Am</span>
                      <p>9:00</p>
                    </label>
                  </div>
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
                  <p>The price will be: 1000 EGP</p>
                  <button>Book Now</button>
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
            {/* end doctor date  */}
          </div>
        </div>

        {/* Add your content here */}
      </div>

      <Footer />
    </>
  );
}
