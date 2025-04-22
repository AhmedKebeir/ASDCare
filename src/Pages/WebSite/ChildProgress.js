import "../../CSS/ChildProgress.css";
import React, { useContext, useRef, useState } from "react";
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
          </section>
          <aside>side</aside>
        </div>
      </div>
    </div>
  );
}
