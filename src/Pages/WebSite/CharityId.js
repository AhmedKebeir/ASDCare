import { Link, useParams } from "react-router-dom";
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { BaseUrl, CHARITES } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import { ScaleLoader } from "react-spinners";

export default function ChartiyId() {
  const [char, setChar] = useState([]);
  const [loading, setLoading] = useState(true);

  const cookie = Cookie();

  const user = cookie.get("userDetails");
  const params = useParams();

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
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/${CHARITES}/${params.id}`, {
          headers: {
            Authorization: "Bearer " + parsedUser.token,
          },
        });
        setChar(res.data.data);
      } catch (err) {
        console.error("❌ خطأ أثناء جلب المقالات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(char);
  return (
    <>
      <Header />
      {loading ? (
        <div className="charity-id-loading">
          <ScaleLoader color="#133e87" height={50} width={7} />
        </div>
      ) : (
        <div className="charity-id pt-50 pb-50 bg-section">
          <div className="main-container">
            <div className="char-content bg-white flex justify-between items-center">
              <div className="title-char flex items-center">
                <img src={char?.logo} alt="" className="" />
                <div className="main-color">
                  <h2>{char?.charity_name}</h2>
                  <p>{char?.charity_address}</p>
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
                <input
                  type="text"
                  placeholder="What price you’re gonna donate?"
                />
                <button
                  type="submit"
                  className="flex justify-center items-center"
                >
                  Donate now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
