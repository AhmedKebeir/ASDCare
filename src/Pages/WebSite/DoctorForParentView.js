import { Link } from "react-router-dom";
import "../../CSS/DoctorForParentView.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getdoctors } from "../../store/actions/doctors-actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import { ScaleLoader } from "react-spinners";

export default function DoctorForParentView() {
  const [searchTerm, setSearchTerm] = useState("");

  const doctors = useSelector(
    (state) => state.doctors.doctors?.data?.data || []
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor?.parent?.userName?.toLowerCase() || "";
    const qualification = doctor?.qualifications?.toLowerCase() || "";
    const address = doctor?.address?.toLowerCase() || "";
    return (
      name.includes(searchTerm) ||
      qualification.includes(searchTerm) ||
      address.includes(searchTerm)
    );
  });

  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoad(true);
      try {
        await dispatch(getdoctors());
      } catch (err) {
        console.error("Failed to fetch doctors", err);
      } finally {
        setLoad(false);
      }
    };

    fetchDoctors();
  }, [dispatch]);

  const doctorList = filteredDoctors.map((doctor, index) => (
    <div key={index} className="doctor-item">
      <div className="doctor-details">
        <div className="doctor-info">
          <img src={doctor?.image} alt={doctor?.parent?.userName} />
          <div>
            <h2 title={doctor?.parent?.userName}>
              {doctor?.parent?.userName?.split("_").slice(0, 2).join("_")}
            </h2>
            <p>{doctor?.qualifications}</p>
          </div>
        </div>
        <div className="doctor-rate">
          <FontAwesomeIcon icon={faStar} />
          {doctor?.ratingsAverage || 0}
        </div>
      </div>
      <p className="doctor-address">
        {doctor?.address || "Address will be here."}.
      </p>
      <div className="doctor-price">
        Price start with <span>{doctor?.Session_price}EGP</span>
      </div>
      <Link to={`${doctor?._id}`}>View Doctor Profile</Link>
    </div>
  ));
  return (
    <>
      <Header />
      <div className="doctor-for-parent-view pt-50 pb-50 bg-section">
        <div className="main-container">
          <h1 className="title">Doctors</h1>
          <div className="doctors-content">
            {load ? (
              <div className="medican-loading">
                <ScaleLoader color="#133e87" height={50} width={7} />
              </div>
            ) : (
              <div className="doctor-list">{doctorList}</div>
            )}

            <div className="doctor-search">
              <h2>Looking for a doctor?</h2>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search here"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>

              <div className="dont-know-doctor">
                <p>Don't know</p>
                <p>which doctor to choose</p>
                <Link to="/evaluate">Go to autism test</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
