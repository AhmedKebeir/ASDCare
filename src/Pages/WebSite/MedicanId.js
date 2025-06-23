import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BaseUrl, GETALLMEDICAN } from "../../Api/Api";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import { ScaleLoader } from "react-spinners";

export default function MedicanId() {
  const [medican, setMedican] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();

  const cookie = Cookie();

  const user = cookie.get("userDetails");

  // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
  let parsedUser = {};

  if (typeof user === "string") {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof user === "object" && user !== null) {
    parsedUser = user; // إذا كان بالفعل كائن، استخدمه كما هو
  }
  useEffect(() => {
    const fetchMedicans = async () => {
      try {
        const res = await axios.get(
          `${BaseUrl}/${GETALLMEDICAN}/${params.id}`,
          {
            headers: { Authorization: "Bearer " + parsedUser.token },
          }
        );
        setMedican(res.data.data);
        console.log(res.data.data);
      } catch (error) {
        console.error("Error fetching medicans:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicans();
  }, []);
  return (
    <>
      <Header />

      <div className="medican-id">
        <div className="title">
          <div className="main-container flex justify-between items-center">
            <Link to="/medican">
              <FontAwesomeIcon
                icon={faLessThan}
                className="text-3xl font-black cursor-pointer"
              />
            </Link>
            <div className="text-right">
              <h2>Medican</h2>
              <p>Search for medicine and pharmacy to find treatment</p>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="medican-loading">
            <ScaleLoader color="#133e87" height={50} width={7} />
          </div>
        ) : (
          <div className="med-id-content">
            <div className="main-container">
              <div className="cont flex justify-between ">
                <section>
                  <h2>{medican?.medican_name}</h2>
                  <p>
                    {medican?.medican_info || "Medican’s place will be here."}
                  </p>
                </section>
                <aside>
                  <img
                    className="main-img"
                    src={`${medican?.medican_image}`}
                    alt=""
                  />
                  <div className="available">
                    <h3>Available at </h3>
                    <div className="pharmacine flex items-center">
                      <img src={`${medican?.medican_image}`} alt="" />
                      <div className="pharm-content">
                        <h3>{medican?.pharmacy?.p_name}</h3>
                        <p>
                          {medican?.pharmacy?.p_location ||
                            "Location not available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
              <p className="p-mobile">
                {medican?.medican_info || "Medican’s place will be here."}
              </p>
            </div>
            <div className="main-container bg">
              <div className="available-mobile">
                <h3>Available at </h3>
                <div className="pharmacine flex items-center">
                  <img src={`${medican?.medican_image}`} alt="" />
                  <div className="pharm-content">
                    <h3>{medican?.pharmacy?.p_name}</h3>
                    <p>
                      {medican?.pharmacy?.p_location ||
                        "Location not available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
