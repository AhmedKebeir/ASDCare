import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, FINALPREDICTION } from "../../Api/Api";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import AutismTestloading from "../../Components/SceletonsLoading/AutismTestLoading";

export default function AutismTest() {
  const cookie = Cookie();
  const user = cookie.get("userDetails");
  const navigate = useNavigate();

  const parsedUser = typeof user === "string" ? JSON.parse(user || "{}") : user;

  const questions = [
    "Does your child look at you when you call his/her name?",
    "Is eye contact easy between you and your child?",
    "Does your child point to indicate that s/he wants something?",
    "Does your child point to share interest with you?",
    "Does your child pretend?",
    "Does your child follow where you’re looking?",
    "Does your child show signs of wanting to comfort others when upset?",
    "Did your child start speaking early?",
    "Does your child use simple gestures? (e.g. wave goodbye)",
    "Does your child stare at nothing with no apparent purpose?",
    "What is your child’s age in months?",
    "What is the sex of your child (Male/Female)?",
    "Has your child ever had jaundice?",
    "Is there a family member with ASD (Autism Spectrum Disorder)?",
  ];

  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [age, setAge] = useState(1);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setAnswer(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (answer === "" && currentIndex !== 10) {
      setError("Please provide an answer before continuing.");
      return;
    }

    const finalAnswer = currentIndex === 10 ? age : answer;

    try {
      const res = await axios.post(
        `${BaseUrl}/${FINALPREDICTION}`,
        {
          index: currentIndex,
          answer: finalAnswer,
        },
        {
          headers: {
            Authorization: `Bearer ${parsedUser.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const updatedAnswers = [
          ...answers,
          { index: currentIndex, answer: finalAnswer },
        ];
        setAnswers(updatedAnswers);
        setAnswer("");
        setAge(1);
        setError("");

        if (currentIndex === questions.length - 1) {
          navigate("/autism/test/result");
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      }
    } catch (err) {
      setError("The answer is not relevant to the question.");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prev = answers.find((ans) => ans.index === currentIndex - 1);
      if (prev) {
        setAnswer(prev.answer);
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const renderInput = () => {
    if (currentIndex === 10) {
      return (
        <div className="age-child">
          <button onClick={() => setAge((prev) => Math.max(1, prev - 1))}>
            <FontAwesomeIcon
              icon={faLessThan}
              className="text-3xl font-black cursor-pointer"
            />
          </button>
          <p>{age} yo</p>
          <button onClick={() => setAge((prev) => prev + 1)}>
            <FontAwesomeIcon
              icon={faLessThan}
              className="text-3xl font-black cursor-pointer"
            />
          </button>
        </div>
      );
    }

    if (currentIndex === 11) {
      return (
        <div className="sex-child">
          <div className="female">
            <input
              type="radio"
              name="answer"
              id="female"
              value="female"
              // checked={answer === "Female"}
              onChange={handleChange}
            />
            <label htmlFor="female">Female</label>
          </div>
          <div className="male">
            <input
              type="radio"
              name="answer"
              id="male"
              value="male"
              onChange={handleChange}
              // checked={answer === "Male"}
            />
            <label htmlFor="male">Male</label>
          </div>
        </div>
      );
    }

    return (
      <div className="other-ques">
        <input
          type="text"
          id="answer"
          name="answer"
          placeholder="Answer here."
          value={answer}
          onChange={handleChange}
        />
      </div>
    );
  };
  return (
    <>
      <Header />
      {loading ? (
        <AutismTestloading />
      ) : (
        <div className="autism-test">
          <div className="main-container">
            <div className="autism-title">
              <h2>Autism Test</h2>
              <p>
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="progress">
              <span
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              ></span>
            </div>
            <div className="box-test">
              <div className="question">
                <h3>{questions[currentIndex]}</h3>
                {error && <p className="err color-red">{error}!</p>}
                <div className="answers">{renderInput()}</div>
              </div>

              <div className="btn-test">
                <button onClick={handlePrevious} disabled={currentIndex === 0}>
                  Previous Question
                </button>
                <button onClick={handleSubmit}>Next Question</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
