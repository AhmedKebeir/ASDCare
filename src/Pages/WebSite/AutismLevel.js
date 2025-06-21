import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, DEGREEAI } from "../../Api/Api";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import AutismLoading from "../../Components/SceletonsLoading/AutismLoading";

export default function AutismLevel() {
  const cookie = Cookie();
  const user = cookie.get("userDetails");
  const navigate = useNavigate();

  const parsedUser = typeof user === "string" ? JSON.parse(user || "{}") : user;

  const questions = [
    "What is your child’s age in years?",
    "What is the sex of your child (Male/Female)?",
    "Please describe your child's communication abilities in your own words.",
    "Please describe your child's social communication and interaction skills.",
    "Please describe your child's non-verbal communication abilities.",
    "How does your child handle developing, maintaining, and understanding relationships?",
    "Can you describe any repetitive behaviors or patterns you have noticed in your child?",
    "How does your child react to various sensory stimuli? Please elaborate.",
    "Apart from Autism, are there any other challenges your child faces? (e.g., ADHD, Speech Delay, or none.)",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [age, setAge] = useState(1);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setAnswer(e.target.value);
    setError("");
  };

  const handleSubmit = async () => {
    if (answer === "" && currentIndex !== 0) {
      setError("Please provide an answer before continuing.");
      return;
    }

    const finalAnswer = currentIndex === 0 ? age : answer;

    try {
      const res = await axios.post(
        `${BaseUrl}/${DEGREEAI}`,
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
      setError("There was an error submitting your answer.");
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
    if (currentIndex === 0) {
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

    if (currentIndex === 1) {
      return (
        <div className="sex-child">
          <div className="female">
            <input
              type="radio"
              name="answer"
              id="female"
              value="female"
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
        <AutismLoading />
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
                {error && <p className="err">{error}</p>}
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
