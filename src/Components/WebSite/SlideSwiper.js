import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../SlideShowAuth.css"; // تأكد من استيراد أنماطك الخاصة

const slides = [
  {
    image: require("../../Images/Rectangle 2.jpg"),
    title: `Comprehensive Support for
               Your Child Starts Here.`,
  },
  {
    image: require("../../Images/slied2.png"),
    title: `Easy Assessment and
  Diagnosis.`,
  },
  {
    image: require("../../Images/slide3.jpg"),
    title: `Your First Step Toward 
  Change`,
  },
];

export default function SlideShowAuth() {
  return (
    <div className="slide welcome">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="swiper-container"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className="slide-image"
            />
            <h1 className="slide-title">{slide.title}</h1>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
