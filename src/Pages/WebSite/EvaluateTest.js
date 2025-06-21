import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Components/WebSite/Footer";

export default function EvaluateTest() {
  const chooseRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const showModal = query.get("modal") === "autism-checker";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chooseRef.current && !chooseRef.current.contains(event.target)) {
        navigate("/evaluate"); // إغلاق النافذة
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, navigate]);
  return (
    <>
      <div className="eval">
        <div className="main-container">
          <div className="eval-title">
            <h2>Evaluate</h2>
            <p>What test you need?</p>
            <div className="eval-links">
              <Link to="">Autism checker test</Link>
              <Link to="">Autism level test</Link>
            </div>
          </div>
        </div>
        <div className="last-autism">
          <div className="main-container">
            <h2>Last autism test</h2>
          </div>
        </div>
        <div className="done-autism">
          <div className="main-container">
            <p>There isn't any test you've done before.</p>
          </div>
        </div>
        <div className="choose-child-test">
          <div className="choose" ref={chooseRef}>
            <h3>Choose Child for test</h3>
            <div className="child-info">
              <div className="child">
                <div className="info">
                  <img src="" alt="" />
                  <div>
                    <h2>Child’s Name</h2>
                    <p>Female</p>
                  </div>
                </div>
                <span className="age">8yo</span>
              </div>
              <div className="child">
                <div className="info">
                  <img src="" alt="" />
                  <div>
                    <h2>Child’s Name</h2>
                    <p>Female</p>
                  </div>
                </div>
                <span className="age">8yo</span>
              </div>
            </div>
            <div className="start">
              <Link to="/autism">Start the test now!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
