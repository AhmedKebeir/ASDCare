import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "../../CSS/HomeParent.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Navigation } from "swiper/modules";

export default function HomeSlide() {
  return (
    <div className="doctors-slide">
      <div className="main-container">
        <div className="card-wrapper">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper card-list"
          >
            <SwiperSlide className="card-item">
              <Link to="" className="card-link">
                <img src="" alt="" className="card-image" />

                <div>
                  <h2 className="card-title">Doctor Name</h2>
                  <FontAwesomeIcon icon={faStar} />
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
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <p className="badge">Department Name</p>
                <button className="card-button">Book Now!</button>
              </Link>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
