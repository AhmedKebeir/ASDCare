import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getmedicans } from "../../store/actions/medican-actions";

export default function Medican() {
  const dispatch = useDispatch();
  const medican = useSelector((state) => state.medicans?.medicans || []);
  console.log(medican);

  useEffect(() => {
    dispatch(getmedicans());
  }, [dispatch]);
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
      <div className="med-content mt-10">
        <div className="main-container flex justify-between gap-20">
          <section className="">
            <div className="card bg-white rounded-xl  flex justify-between items-center  ">
              <div className="card-title">
                <h2>Medican’s Name </h2>
                <p>Medican’s place will be here.</p>
                <Link to="1">See Medican’s Details</Link>
              </div>
              <img src="" alt="" />
            </div>
          </section>
          <aside>
            <h2>Filter</h2>
            <p>Medican</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
