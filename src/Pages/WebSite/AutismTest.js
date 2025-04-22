import { Link } from "react-router-dom";

export default function AutismTest() {
  return (
    <>
      <div className="autism-test">
        <div className="main-container">
          <div className="autism-title">
            <h2>Autism Test</h2>
            <p>Question 1 out of 3</p>
          </div>
          <div className="progress">
            <span></span>
          </div>
          <div className="box-test"></div>
        </div>
      </div>
    </>
  );
}
