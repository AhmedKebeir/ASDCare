import "../../CSS/Charity.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CharityBax from "../../Components/WebSite/CharityBox";

export default function Charity() {
  return (
    <div className="charity">
      <div className="charity-title">
        <div className="main-container flex justify-between  items-center">
          <div className="search text-start  ">
            <p>Can’t find what you looking for?</p>
            <div className="flex justify-between  items-center">
              <input type="text" placeholder="Search here" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <div className="title">
            <h2>Charity Support</h2>
            <p>Search for Charity and donate them or search for medicine</p>
          </div>
        </div>
      </div>
      <div className="charity-result">
        <div className="main-container">
          <p>Search results </p>
          <div className="charity-boxs">
            <CharityBax
              name="Charity’s Name"
              address="Charity’s Address will be here."
              medican="This charity have this medicine ‘Medicine’s Name’"
              img=""
              alt=""
              link="id"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
