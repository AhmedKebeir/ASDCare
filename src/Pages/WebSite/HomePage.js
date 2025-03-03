import { Link } from "react-router-dom";
import Header from "../../Components/WebSite/Header";
import "../../CSS/HomePage.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="Welcome-page">
        <div className="main-container">
          <section>
            <div className="title">
              <h1>
                <span>Talk to your</span>
                <br />
                therapist online privately&nbsp;
                <span>
                  anytime <br />
                  anywhere!
                </span>
              </h1>
            </div>
            <div className="auth-welcome">
              <Link to="/login">Don't Have an account? Craete one!</Link>
              <Link to="/signup">Let’s continue your progress!</Link>
            </div>
          </section>
          <div className="welcome-image">
            <img src={require("../../Images/Group 2.png")} alt="" />
          </div>
        </div>
      </div>
      <div className="early">
        <div className="back-image">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
        <div className="main-container">
          <section>
            <div className="title">
              <h1>
                Early Autism Assessment and
                <br /> Doctor Recommendations
              </h1>
              <p>
                Get expert guidance on early autism
                <br /> assessment and personalized doctor
                <br /> recommendations. Identify signs early, access
                <br /> professional evaluations, and find the right
                <br /> specialists to support your child's
              </p>
            </div>
            <div className="auth-early">
              <Link to="/signup">Sign Up now!</Link>
            </div>
          </section>
          <div className="early-image">
            <img
              src={require("../../Images/clipboard, notepad as time management instruments 1.png")}
              alt=""
            />
          </div>
        </div>
        <div className="back-image-2">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
      </div>
      <div className="easy">
        <div className="back-image">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
        <div className="main-container">
          <div className="easy-image">
            <img src={require("../../Images/easy.png")} alt="" />
          </div>
          <section>
            <div className="title">
              <h1>Easy Booking and Online Consultations</h1>
              <p>
                Schedule your appointments with ease using
                <br /> our simple online booking system. Whether you
                <br /> need expert advice or a professional
                <br /> consultation, connect with us from the comfort
                <br /> of your home through secure and seamless
                <br />
                virtual meetings. Experience convenience like
                <br />
                never before!
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
