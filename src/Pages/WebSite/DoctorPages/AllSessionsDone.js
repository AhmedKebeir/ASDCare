import { Link } from "react-router-dom";
import Footer from "../../../Components/WebSite/Footer";
import Header from "../../../Components/WebSite/Header";

export default function AllSessionsDone() {
  return (
    <>
      <Header />

      <div className="upcoming-sessions pt-50 pb-50 bg-section">
        <div className="title">
          <div className="main-container">
            <h2>All Sessions Done</h2>
          </div>
        </div>
        <div className="sessions">
          <div className="main-container">
            <p>Note: The sessions are sort by nearest date</p>
            <div className="sessions-list">
              <div className="session-item flex justify-between items-center">
                <div className="session-title">
                  <img src="" alt="" />
                  <div>
                    <h3>Parent's name</h3>
                    <p>Child’s name</p>
                    <p className="child-data">
                      <span>Age:XX</span> <span>Gender:X</span>
                    </p>
                  </div>
                </div>
                <div className="session-info">
                  <span className="session-date">Date: XX/XX/XXXX</span>
                  <Link to="1">Session Comments</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
