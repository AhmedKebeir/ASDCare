import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };
  return (
    <div className="slide welcome">
      <motion.img
        key={index}
        src={slides[index].image}
        alt="slide-show"
        className="slide-image"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 0 }}
        transition={{ duration: 1.5 }}
      />

      <AnimatePresence>
        <motion.h1
          key={slides[index].title}
          initial={{ opacity: 0, y: 100 }} // يبدأ من الأسفل
          animate={{ opacity: 1, y: 0 }} // يظهر بشكل طبيعي
          exit={{ opacity: 0, y: -150 }} // يخرج للأعلى
          transition={{ duration: 1.5 }}
          className="slide-title"
        >
          {slides[index].title}
        </motion.h1>
      </AnimatePresence>

      <div className="icon">
        {slides.map((_, i) => (
          <span
            key={i}
            size={12}
            className={`cursor-pointer ${
              i === index ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
