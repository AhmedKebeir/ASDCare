import { Link } from "react-router-dom";

import "../../CSS/HomePage.css";
import Footer from "../../Components/WebSite/Footer";
import { useContext } from "react";
import { WindowSize } from "../../Context/WindowWidthContext";

export default function HomePage() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  console.log(size);
  return (
    <>
      <div className="Welcome-page">
        <div className="main-container">
          <section>
            <div className="title">
              <h1>
                <span>Talk to your </span>
                therapist{size < 768 ? <br /> : ""} online privately
                <span>&nbsp;anytime{size < 768 ? <br /> : ""} anywhere!</span>
              </h1>
            </div>
            <div className="auth-welcome">
              <Link to="/login">
                {size < 768
                  ? "Create Account"
                  : "Don't Have an account? Craete one!"}
              </Link>
              <Link to="/signup">
                {size < 768 ? "Log In" : "Let’s continue your progress!"}
              </Link>
            </div>
          </section>
          <div className="welcome-image">
            <img src={require("../../Images/WelcomePage.png")} alt="" />
          </div>
        </div>
      </div>

      <div className="early">
        <div className="main-container">
          <div className="back-image">
            <img src={require("../../Images/2pattern 2.png")} alt="" />
          </div>
          <div className="early-top">
            <h1>Early Autism Assessment and Doctor Recommendations</h1>
            <img src={require("../../Images/Rectangle 6586.png")} alt="" />
          </div>
          <div className="early-grid">
            <div className="box-grid">
              <h2>Autism Test</h2>
              <p>An autism test checks for ASD traits.</p>
            </div>
            <div className="box-grid">
              <h2>Chat Bot Help</h2>
              <p>is an AI that assists through conversation.</p>
            </div>
            <div className="box-grid">
              <h2>Child Progress</h2>
              <p>progress is growth in skills and behavior.</p>
            </div>
            <div className="box-grid">
              <h2>Educational Resources</h2>
              <p>Education resources support learning.</p>
            </div>
            <div className="box-grid">
              <h2>Medican and Pharmacian </h2>
              <p>Search for medicine to find treatment.</p>
            </div>
            <div className="box-grid">
              <h2>Cooperative Charites</h2>
              <p>charities unite to help communities</p>
            </div>
          </div>
        </div>
        <div className="back-image-2">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
      </div>

      <div className="easy">
        <div className="main-container">
          <div className="back-image">
            <img src={require("../../Images/2pattern 2.png")} alt="" />
          </div>
          <div className="easy-top">
            <div className="easy-content">
              <h1>Easy Booking and Online Consultations</h1>
              <p>
                Schedule your appointments with ease using our simple online
                booking system. Whether you need expert advice or a professional
                consultation, connect with us from the comfort of your home
                through secure and seamless virtual meetings. Experience
                convenience like never before!
              </p>
            </div>
            <img src={require("../../Images/Rect02.png")} alt="" />
          </div>
        </div>
        <div className="back-image-2">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
      </div>

      <div className="support">
        <div className="back-image">
          <img src={require("../../Images/2pattern 1.png")} alt="" />
        </div>
        <div className="main-container">
          <h1 className="main-title">Support with Families</h1>
          <div className="support-component">
            <div>
              <h2>Resources</h2>
              <img src={require("../../Images/Group 8.png")} alt="" />
              <p>
                Find expert-approved tools, therapies, and support services
                tailored for individuals with autism and their families.
              </p>
            </div>
            <div>
              <h2>Donations</h2>
              <img src={require("../../Images/Group 7.png")} alt="" />
              <p>
                Help provide vital care and resources for families by
                contributing funds or essential supplies. Every donation makes a
                difference!.
              </p>
            </div>
          </div>
        </div>

        <div className="back-image-2">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
      </div>

      <div className="join-in-home">
        <div className="join-image">
          <img
            src={require("../../Images/doctor-doing-paper-work-2025-02-12-01-58-46-utc 1.png")}
            alt=""
          />
        </div>
        <div className="main-container">
          <div className="logo">
            <img
              src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.jpg")}
              alt=""
            />
            <h1 className="nav-logo">
              ASD<span className="nav-care">CORE</span>
            </h1>
          </div>
          <h1>Join us for better autism care!</h1>
          <div className="auth-join">
            <Link to="/signup">Sign Up Now!</Link>
            <Link to="/login">Login Now!</Link>
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
