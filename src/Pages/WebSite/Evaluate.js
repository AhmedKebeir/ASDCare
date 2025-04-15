import { Link } from "react-router-dom";

export default function Evaluate() {
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
          <div className="choose">
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
            </div>
            <div className="start">
              <Link to="">Start the test now!</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
