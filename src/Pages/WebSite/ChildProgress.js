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

export default function ChildProgress() {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(186);
  const prependNumber = useRef(1);

  const [radio, setRadio] = useState("lastnotes");

  const dispatch = useDispatch();
  const children = useSelector(
    (state) => state.user?.children?.data?.data?.childs[0] || []
  );

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);
  // console.log(radio);
  console.log(children);
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
                slidesPerView={3}
                spaceBetween={30}
                navigation={true}
                virtual
                className="mySwiper doctor-list"
              >
                <SwiperSlide className="doctor-name">
                  <input type="radio" id="doctor1" name="doctor" />
                  <label htmlFor="doctor1">Doctor’s Name</label>
                </SwiperSlide>
                <SwiperSlide className="doctor-name">
                  <input type="radio" id="doctor1" name="doctor" />
                  <label htmlFor="doctor1">Doctor’s Name</label>
                </SwiperSlide>
                <SwiperSlide className="doctor-name">
                  <input type="radio" id="doctor1" name="doctor" />
                  <label htmlFor="doctor1">Doctor’s Name</label>
                </SwiperSlide>
                <SwiperSlide className="doctor-name">
                  <input type="radio" id="doctor1" name="doctor" />
                  <label htmlFor="doctor1">Doctor’s Name</label>
                </SwiperSlide>
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
                    <div className="doc-boxs">
                      <div className="doc-box">
                        <img src="" alt="" />
                        <div className="doc-title">
                          <h3>
                            Doctor’s Name <span>5 days ago</span>
                          </h3>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipiscing
                            elit.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : radio === "sessiondone" ? (
                    <div className="session-boxs"></div>
                  ) : radio === "upcoming" ? (
                    <div className="upcoming"></div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </section>
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
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
