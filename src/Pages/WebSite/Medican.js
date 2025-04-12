import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Medican() {
  return (
    <div className="medican">
      <div className="med-title">
        <div className="main-container flex justify-between  items-center">
          <div className="search text-start  ">
            <p>Can’t find it?</p>
            <div className="flex justify-between  items-center">
              <input type="text" placeholder="Search here" />
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </div>
          </div>
          <div className="title">
            <h2>Medican</h2>
            <p>Search for medicine and pharmacy to find treatment</p>
          </div>
        </div>
      </div>
      <div className="med-contect">
        <div className="main-container"></div>
      </div>
    </div>
  );
}
