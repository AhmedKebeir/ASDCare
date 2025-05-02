import "../../CSS/ChildProgress.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function ChildProgress() {
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(186);
  const prependNumber = useRef(1);

  const [radio, setRadio] = useState("lastnotes");

  // console.log(radio);
  return (
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
              <SwiperSlide className="doctor-name">Doctor’s Name</SwiperSlide>
              <SwiperSlide>Doctor’s Name</SwiperSlide>
              <SwiperSlide>Doctor’s Name</SwiperSlide>
              <SwiperSlide>Doctor’s Name</SwiperSlide>
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
          <aside>side</aside>
        </div>
      </div>
    </div>
  );
}
