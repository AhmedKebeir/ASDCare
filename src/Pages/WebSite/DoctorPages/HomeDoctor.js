import {
  faBell,
  faCheck,
  faFileCirclePlus,
  faLayerGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../CSS/DoctorStyle/HomeDoctor.css";
import { Link } from "react-router-dom";
import Header from "../../../Components/WebSite/Header";
import Footer from "../../../Components/WebSite/Footer";

export default function HomeDoctor() {
  return (
    <>
      <Header />

      <div className="home-doc bg-section">
        <div className="main-container">
          <h2>Welcome ,Dr.Doctor’s Name!</h2>
          <p>
            <FontAwesomeIcon icon={faLayerGroup} /> Quick Access
          </p>
          <div className="home-doc-content">
            <Link to="allsessionsdone">
              <div>
                <h3>
                  <FontAwesomeIcon icon={faCheck} />{" "}
                  <span>All sessions done</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit.
                </p>
              </div>
            </Link>
            <Link to="allupcomingsessions">
              <div>
                <h3>
                  <FontAwesomeIcon icon={faBell} />{" "}
                  <span>All upcoming sessions</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit.
                </p>
              </div>
            </Link>
            <Link to="feedbacks">
              <div>
                <h3>
                  <FontAwesomeIcon icon={faFileCirclePlus} />
                  <span>My Feedbacks</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit.
                </p>
              </div>
            </Link>
            <Link to="registeredchilds">
              <div>
                <h3>
                  <FontAwesomeIcon icon={faUsers} />
                  <span>All registered childs</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
