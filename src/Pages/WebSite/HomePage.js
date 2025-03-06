import { Link } from "react-router-dom";
import Header from "../../Components/WebSite/Header";
import "../../CSS/HomePage.css";
import Footer from "../../Components/WebSite/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="Welcome-page">
        <div className="main-container">
          <section>
            <div className="title">
              <h1>
                <span>Talk to your </span>
                therapist online privately&nbsp;
                <span>anytime anywhere!</span>
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
              <h1>Early Autism Assessment and Doctor Recommendations</h1>
              <p>
                Get expert guidance on early autism assessment and personalized
                doctor recommendations. Identify signs early, access
                professional evaluations, and find the right specialists to
                support your child's
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
                Schedule your appointments with ease using our simple online
                booking system. Whether you need expert advice or a professional
                consultation, connect with us from the comfort of your home
                through secure and seamless virtual meetings. Experience
                convenience like never before!
              </p>
            </div>
          </section>
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

      <Footer />
    </>
  );
}
