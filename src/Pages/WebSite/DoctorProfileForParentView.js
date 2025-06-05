import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../CSS/DoctorProfileForParentView.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function DoctorProfileForParentView() {
  return (
    <div className="doctor-profile-for-parent-view bg-section pt-50 pb-50">
      <div className="main-container">
        <h1>Doctor’s Profile</h1>
      </div>

      <div className="doctor-profile-content">
        <div className="main-container">
          <div className="doctor-details">
            <div className="doctor-info">
              <div className="image">
                <img src="" alt="" />
                <span className="doctor-rate-mobile">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </span>
              </div>
              <div>
                <h2 title="Doctor Name">
                  <span>Doctor’s Name</span>
                  <span className="doctor-rate-web">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </span>
                </h2>
                <p>Doctor’s department</p>
                <p>Address will be here.</p>
              </div>
            </div>
            <div className="contact-with-my">
              <Link to="">Chat with doctor</Link>
            </div>
          </div>
        </div>
      </div>
      {/* Add your content here */}
    </div>
  );
}
