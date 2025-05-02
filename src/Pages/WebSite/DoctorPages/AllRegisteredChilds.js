import { Link } from "react-router-dom";

export default function AllRegisteredChilds() {
  return (
    <div className="all-registered-childs pt-50 pb-50 bg-section">
      <div className="title">
        <div className="main-container">
          <h2 className="text-right">All registered childs</h2>
        </div>
      </div>
      <div className="redistered-container">
        <div className="main-container">
          <div className="registered-box">
            <div className="registered-info">
              <img src="" alt="" />
              <div>
                <h3>Parent’s name</h3>
                <p>Child’s name</p>
                <p>Age:XX Gender: X</p>
              </div>
            </div>
            <Link to="1">Details</Link>
          </div>
          <div className="registered-box">
            <div className="registered-info">
              <img src="" alt="" />
              <div>
                <h3>Parent’s name</h3>
                <p>Child’s name</p>
                <p>Age:XX Gender: X</p>
              </div>
            </div>
            <Link to="">Details</Link>
          </div>
          <div className="registered-box">
            <div className="registered-info">
              <img src="" alt="" />
              <div>
                <h3>Parent’s name</h3>
                <p>Child’s name</p>
                <p>Age:XX Gender: X</p>
              </div>
            </div>
            <Link to="">Details</Link>
          </div>
          <div className="registered-box">
            <div className="registered-info">
              <img src="" alt="" />
              <div>
                <h3>Parent’s name</h3>
                <p>Child’s name</p>
                <p>Age:XX Gender: X</p>
              </div>
            </div>
            <Link to="">Details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
