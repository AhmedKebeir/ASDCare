import { Link } from "react-router-dom";
import "../../CSS/Autism.css";

export default function Autism() {
  return (
    <>
      <div className="autism-test">
        <div className="main-container">
          <div className="autism-title">
            <h2>Autism Test</h2>
            <p>An autism test checks for ASD traits.</p>
          </div>
          <div className="start-test">
            <Link to="test">Start the test now!</Link>
          </div>
        </div>
      </div>
    </>
  );
}
