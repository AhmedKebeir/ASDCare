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
  const [searchTerm, setSearchTerm] = useState(""); // 🔍 حالة البحث
  const [loading, setLoading] = useState(true);

  const cookie = Cookie();
  const user = cookie.get("userDetails");

  let parsedUser = {};
  if (typeof user === "string") {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof user === "object" && user !== null) {
    parsedUser = user;
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

  // 🔍 تصفية الجمعيات حسب الاسم أو العنوان أو الأدوية المدعومة
  const filteredCharities = charities.filter((char) => {
    const name = char?.charity_name?.toLowerCase() || "";
    const address = char?.charity_address?.toLowerCase() || "";
    const medicans =
      char?.charity_medican?.map((m) => m?.medican_name?.toLowerCase()) || [];
    return (
      name.includes(searchTerm.toLowerCase()) ||
      address.includes(searchTerm.toLowerCase()) ||
      medicans.some((med) => med.includes(searchTerm.toLowerCase()))
    );
  });

  const charShow = filteredCharities.map((char, index) => {
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
          <div className="main-container flex justify-between items-center">
            <div className="search text-start">
              <p>Can’t find what you’re looking for?</p>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>
            <div className="title">
              <h2>Charity Support</h2>
              <p>Search for a charity and donate to them or request medicine</p>
            </div>
          </div>
        </div>

        <div className="charity-result">
          <div className="main-container">
            <p>Search results</p>
            <div className="charity-boxs">
              {loading ? (
                <div className="medican-loading">
                  <ScaleLoader color="#133e87" height={50} width={7} />
                </div>
              ) : charShow.length > 0 ? (
                charShow
              ) : (
                <p className="not-data mt-1">Not available sessions</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
