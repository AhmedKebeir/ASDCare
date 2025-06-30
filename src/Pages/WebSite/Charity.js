import "../../CSS/Charity.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CharityBax from "../../Components/WebSite/CharityBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl, CHARITES } from "../../Api/Api";
import Cookie from "cookie-universal";
import Footer from "../../Components/WebSite/Footer";
import Header from "../../Components/WebSite/Header";
import { ScaleLoader } from "react-spinners";

export default function Charity() {
  const [charities, setCharities] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BaseUrl}/${CHARITES}`, {
          headers: {
            Authorization: "Bearer " + parsedUser.token,
          },
        });
        setCharities(res.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(charities);

  const charShow = charities.map((char, index) => {
    return (
      <CharityBax
        key={index}
        name={`${char?.charity_name}`}
        address={`${char?.charity_address}`}
        medican={char?.charity_medican?.map((med) => med?.medican_name)}
        img={`${char?.logo}`}
        alt="medican"
        link={`${char?._id}`}
      />
    );
  });
  return (
    <>
      <Header />
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
              {loading ? (
                <div className="medican-loading">
                  <ScaleLoader color="#133e87" height={50} width={7} />
                </div>
              ) : (
                charShow
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
