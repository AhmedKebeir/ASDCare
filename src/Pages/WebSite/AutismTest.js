import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BaseUrl, FINALPREDICTION } from "../../Api/Api";
import Cookie from "cookie-universal";

export default function AutismTest() {
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
  console.log(parsedUser);

  const questions = [
    "Does your child look at you when you call his/her name?",
    "Is eye contact easy between you and your child?",
    "Does your child point to indicate that s/he wants something?",
    "Does your child point to share interest with you?",
    "Does your child pretend?",
    "Does your child follow where you’re looking?",
    "Does your child show signs of wanting to comfort them when you or someone else in the family is visibly upset?",
    "Does your child speaking early?:",
    "Does your child use simple gestures? (e.g. wave goodbye)",
    "Does your child stare at nothing with no apparent purpose?",
    "What is your child’s age in months?",
    "What is the sex of your child (Male/Female)?",
    "Has your child ever had jaundice?",
    "Does there a family member with ASD (Autism Spectrum Disorder)?",
  ];
  const level = [
    "What is your child’s age in years?",
    "What is the sex of your child (Male/Female)?",
    "Please describe your child's communication abilities in your own words.",
    "Please describe your child's social communication and interaction skills.",
    "Please describe your child's non-verbal communication abilities.",
    "How does your child handle developing, maintaining, and understanding relationships?",
    "Can you describe any repetitive behaviors or patterns you have noticed in your child?",
    "How does your child react to various sensory stimuli? Please elaborate.",
    "Apart from Autism, are there any other challenges your child faces? (For example, ADHD, Epilepsy, Specific Learning Difficulties, Speech Delay, or none.)",
  ];
  const [indexx, setIndex] = useState(3);
  const [age, setAge] = useState(1);
  const [answerr, setAnswer] = useState({
    index: 0,
    answer: "",
  });
  function handleChange(e) {
    setAnswer({
      ...answerr,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {
      if (answerr.index === 10) {
        setAnswer({ ...answerr, answer: age });
      } else if (answerr.index === 11) {
        setAnswer({ ...answerr, answer: answerr.answer });
      }
      const res = await axios.post(`${BaseUrl}/${FINALPREDICTION}`, answerr, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setAnswer({ index: answerr.index + 1, answer: "" });
      }
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(answerr);
  console.log(indexx);
  return (
    <>
      <div className="autism-test">
        <div className="main-container">
          <div className="autism-title">
            <h2>Autism Test</h2>
            <p>Question {answerr.index + 1} out of 14</p>
          </div>
          <div className="progress">
            <span
              style={{ width: `${((answerr.index + 1) / 14) * 100}%` }}
            ></span>
          </div>
          <div className="box-test">
            <div className="question">
              <h3>{questions[answerr.index]}</h3>
              <div className="answers">
                {answerr.index === 10 ? (
                  <div className="age-child">
                    <button
                      onClick={() =>
                        setAge((prev) => (prev === 1 ? 1 : prev - 1))
                      }
                    >
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
                ) : answerr.index === 11 ? (
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
                ) : (
                  <div className="other-ques">
                    <input
                      type="text"
                      id="answer"
                      name="answer"
                      placeholder="Answer here."
                      value={answerr.answer}
                      onChange={handleChange}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="btn-test">
              <button
                onClick={() => {
                  setIndex((prev) => (prev === 0 ? 0 : prev - 1));
                }}
              >
                Previous Question
              </button>
              <button onClick={handleSubmit}>Next Question</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
