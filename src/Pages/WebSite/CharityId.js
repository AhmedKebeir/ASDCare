import { Link } from "react-router-dom";

export default function ChartiyId() {
  return (
    <div className="charity-id pt-50 pb-50 bg-section">
      <div className="main-container">
        <div className="char-content bg-white flex justify-between items-center">
          <div className="title-char flex items-center">
            <img src="" alt="" className="" />
            <div className="main-color">
              <h2>Charity’s Name</h2>
              <p>Address will be here.</p>
              <p>Charity’s Owner name</p>
            </div>
          </div>
          <div className="char-links">
            <Link to="">Contact with them</Link>
            <Link to="">Show all available medicine </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
