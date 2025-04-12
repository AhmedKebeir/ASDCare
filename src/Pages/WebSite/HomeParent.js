import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import "../../CSS/HomeParent.css";
import Footer from "../../Components/WebSite/Footer";
import { Link } from "react-router-dom";

import React, { useContext, useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { WindowSize } from "../../Context/WindowWidthContext";

export default function HomeParent() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;

  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(400);
  const prependNumber = useRef(1);
  // const [slides, setSlides] = useState(
  //   Array.from({ length: 10 }).map((_, index) => `Slide ${index + 1}`)
  // );
  // const prepend = () => {
  //   setSlides([
  //     `Slide ${prependNumber.current - 2}`,
  //     `Slide ${prependNumber.current - 1}`,
  //     ...slides,
  //   ]);
  //   prependNumber.current = prependNumber.current - 2;
  //   swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  // };

  // const append = () => {
  //   setSlides([...slides, "Slide " + ++appendNumber.current]);
  // };

  // const slideTo = (index) => {
  //   swiperRef.slideTo(index - 1, 0);
  // };

  return (
    <>
      <div className="Welcome-page-parent">
        <div className="main-container">
          <section>
            <div className="title">
              <h2>Hello, Name!</h2>
              <p>What are you looking for?</p>
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search here" name="search" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </section>
          <div className="welcome-image">
            <img src={require("../../Images/WelcomePage.png")} alt="" />
          </div>
        </div>
      </div>

      {/* start service  */}

      <div className="service">
        <div className="back-image">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
        <div className="main-container">
          <div className="serv-title">
            <p className="cust-serv">Customer Service</p>
            <h2>Our Service</h2>
            <div className="serv-content">
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/autism (1) 1.png")} alt="" />
                  <div>
                    <h3>Autism Test</h3>
                    <p>An autism test checks for ASD traits.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img
                    src={require("../../Images/icon-park-solid_medicine-bottle 1.png")}
                    alt=""
                  />
                  <div>
                    <h3>Medican and Pharmacian</h3>
                    <p>Search for medicine and pharmacy to find treatment.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/bot 1.png")} alt="" />
                  <div>
                    <h3>Chat Bot Help</h3>
                    <p>A chatbot is an AI that assists through conversation.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img
                    src={require("../../Images/volunteering 1 1.png")}
                    alt=""
                  />
                  <div>
                    <h3>Cooperative Charites</h3>
                    <p>Cooperative charities unite to help communities.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/Group 35.png")} alt="" />
                  <div>
                    <h3>Educational Resources</h3>
                    <p>Education resources support learning.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/Group 34 1.png")} alt="" />
                  <div>
                    <h3>Child Progress</h3>
                    <p>Autism progress is growth in skills and behavior.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="doctors-slide">
        <div className="back-image">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
        <div className="main-container">
          <div className="title">
            <h2>Recommended Doctors</h2>
            <p>We connect you with the best therapists in every department!</p>
          </div>
          <div className="card-wrapper">
            <Swiper
              modules={[Virtual, Navigation]}
              // onSwiper={setSwiperRef}
              slidesPerView={
                (size < 1200) & (size > 991) ? 2 : size < 992 ? 1 : 3
              }
              // centeredSlides={true}
              spaceBetween={60}
              // pagination={{
              //   type: "fraction",
              // }}
              navigation={true}
              virtual
              className="mySwiper card-list"
            >
              <SwiperSlide className="card-item">
                <Link to="" className="card-link">
                  <img src="" alt="" className="card-image" />

                  <div>
                    <h2 className="card-title">Doctor Name</h2>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                      3.0
                    </span>
                  </div>
                  <p className="badge">Department Name</p>
                  <button className="card-button">Book Now!</button>
                </Link>
              </SwiperSlide>
              <SwiperSlide className="card-item">
                <Link to="" className="card-link">
                  <img src="" alt="" className="card-image" />

                  <div>
                    <h2 className="card-title">Doctor Name</h2>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                      3.0
                    </span>
                  </div>
                  <p className="badge">Department Name</p>
                  <button className="card-button">Book Now!</button>
                </Link>
              </SwiperSlide>
              <SwiperSlide className="card-item">
                <Link to="" className="card-link">
                  <img src="" alt="" className="card-image" />

                  <div>
                    <h2 className="card-title">Doctor Name</h2>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                      3.0
                    </span>
                  </div>
                  <p className="badge">Department Name</p>
                  <button className="card-button">Book Now!</button>
                </Link>
              </SwiperSlide>
              <SwiperSlide className="card-item">
                <Link to="" className="card-link">
                  <img src="" alt="" className="card-image" />

                  <div>
                    <h2 className="card-title">Doctor Name</h2>
                    <span>
                      <FontAwesomeIcon icon={faStar} />
                      3.0
                    </span>
                  </div>
                  <p className="badge">Department Name</p>
                  <button className="card-button">Book Now!</button>
                </Link>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <div className="back-image-2">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
}
