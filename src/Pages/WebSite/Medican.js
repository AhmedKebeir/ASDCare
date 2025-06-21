import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getmedicans } from "../../store/actions/medican-actions";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";

export default function Medican() {
  const dispatch = useDispatch();
  const medican = useSelector(
    (state) => state.medicans?.medicans?.data?.data || []
  );
  console.log(medican);

  useEffect(() => {
    try {
      dispatch(getmedicans());
    } catch (error) {
      console.error("Error fetching medicans:", error);
    }
  }, [dispatch]);
  return (
    <>
      <Header />

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
              {medican.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="card bg-white rounded-xl  flex justify-between items-center  "
                  >
                    <div className="card-title">
                      <h2>{item?.medican_name || "Medican’s Name"} </h2>
                      <p>
                        {item?.medican_info || "Medican’s place will be here."}
                      </p>
                      <Link to={`${item?._id || ""}`}>
                        See Medican’s Details
                      </Link>
                    </div>
                    <img src={`${item?.medican_image}`} alt="" />
                  </div>
                );
              })}
            </section>
            <aside>
              <h2>Filter</h2>
              <p>Medican</p>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
