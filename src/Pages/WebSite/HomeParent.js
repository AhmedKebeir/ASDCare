import Header from "../../Components/WebSite/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../../CSS/HomeParent.css";
import Footer from "../../Components/WebSite/Footer";
import { Link } from "react-router-dom";

export default function HomeParent() {
  return (
    <>
      <Header />
      <div className="Welcome-page-parent">
        <div className="main-container">
          <section>
            <div className="title">
              <h2>Hello, Name!</h2>
              <p>What are you looking for?</p>
            </div>
            <div className="search-box">
              <input type="text" placeholder="Search here" name="search" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </section>
          <div className="welcome-image">
            <img src={require("../../Images/WelcomePage.png")} alt="" />
          </div>
        </div>
      </div>

      {/* start service  */}

      <div className="service">
        <div className="back-image">
          <img src={require("../../Images/2pattern 2.png")} alt="" />
        </div>
        <div className="main-container">
          <div className="serv-title">
            <p className="cust-serv">Customer Service</p>
            <h2>Our Service</h2>
            <div className="serv-content">
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/autism (1) 1.png")} alt="" />
                  <div>
                    <h3>Autism Test</h3>
                    <p>An autism test checks for ASD traits.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img
                    src={require("../../Images/icon-park-solid_medicine-bottle 1.png")}
                    alt=""
                  />
                  <div>
                    <h3>Medican and Pharmacian</h3>
                    <p>Search for medicine and pharmacy to find treatment.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/bot 1.png")} alt="" />
                  <div>
                    <h3>Chat Bot Help</h3>
                    <p>A chatbot is an AI that assists through conversation.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img
                    src={require("../../Images/volunteering 1 1.png")}
                    alt=""
                  />
                  <div>
                    <h3>Cooperative Charites</h3>
                    <p>Cooperative charities unite to help communities.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/Group 35.png")} alt="" />
                  <div>
                    <h3>Educational Resources</h3>
                    <p>Education resources support learning.</p>
                  </div>
                </div>
              </Link>
              <Link to="">
                <div className="serv-grid">
                  <img src={require("../../Images/Group 34 1.png")} alt="" />
                  <div>
                    <h3>Child Progress</h3>
                    <p>Autism progress is growth in skills and behavior.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
