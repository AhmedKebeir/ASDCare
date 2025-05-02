import { Link } from "react-router-dom";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

        <div className="char-form">
          <h2 className="main-color">Donate Progress</h2>
          <div className="donate-theam flex justify-between items-center main-color">
            <h3>
              <span>
                <FontAwesomeIcon icon={faMoneyBill} />
              </span>
              Donate them with money
            </h3>
            <span className="check-icon"></span>
          </div>
          <form>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email Address" />
            <input type="number" placeholder="Card Number" />
            <div>
              <input type="number" placeholder="00/00" />
              <input type="number" placeholder="CVV" />
            </div>
            <input type="text" placeholder="What price you’re gonna donate?" />
            <button type="submit" className="flex justify-center items-center">
              Donate now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
