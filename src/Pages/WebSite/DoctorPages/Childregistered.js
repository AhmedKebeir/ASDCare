import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Childregistered() {
  return (
    <div className="child-registered pt-50 pb-50 bg-section">
      <div className="title bacground-linear-left">
        <div className="main-container flex items-center justify-between">
          <div className="title-info flex items-center gap-10">
            <Link to="/doctor/registeredchilds">
              <FontAwesomeIcon
                icon={faLessThan}
                className="text-3xl font-black cursor-pointer"
              />
            </Link>
            <div>
              <h2>Child’s Name</h2>
              <p>Parent’s Name</p>
            </div>
          </div>
          <Link to="conversation">Chat with Parent</Link>
        </div>
      </div>

      <div className="child-registered-content">
        <div className="main-container">
          <div className="child-level">
            <div>
              <span className="level">1</span>
              <h3>Child’s Autism level</h3>
            </div>
            <Link to="">Change Autism Level</Link>
          </div>

          <div className="child-sessions">
            <Link to="session">
              <div className="child-session flex items-center justify-between">
                <div className="session-info flex items-center gap-10">
                  <img src="" alt="" />
                  <h3>Session Number</h3>
                </div>
                <div className="session-date">
                  <span>Date here</span>
                  <span>Upcoming session</span>
                </div>
                <div className="session-mobile">
                  <h3>
                    Parent’s Name <span>Date here</span>
                  </h3>
                  <span>Done!</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
