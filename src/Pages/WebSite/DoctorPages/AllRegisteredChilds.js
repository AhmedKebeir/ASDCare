import { Link } from "react-router-dom";
import Header from "../../../Components/WebSite/Header";
import Footer from "../../../Components/WebSite/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";

export default function AllRegisteredChilds() {
  const [parents, setParents] = useState([]);
  const cookie = Cookie();

  const doctor = cookie.get("userDetails");

  // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
  let parsedUser = {};

  if (typeof doctor === "string") {
    try {
      parsedUser = JSON.parse(doctor);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof doctor === "object" && doctor !== null) {
    parsedUser = doctor; // إذا كان بالفعل كائن، استخدمه كما هو
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${BaseUrl}/appointment/allRegisterParent`,
          { headers: { Authorization: `Bearer ${parsedUser.token}` } }
        );
        console.log(res.data.parents);
        setParents(res.data.parents);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const dataShow = parents.map((parent, index) => {
    return (
      <div key={index} className="registered-box">
        <div className="registered-info">
          <img src="" alt="" />
          <div>
            <h3>{parent?.userName.split(" ").slice(0, 2).join(" ")}</h3>
            <p>
              Child:
              {parent?.childs[0]?.childName.split(" ").slice(0, 1).join(" ")}
            </p>
            <p>
              Age: {parent?.childs[0]?.age} Gender: {parent?.childs[0]?.gender}
            </p>
          </div>
        </div>
        <Link to={`${parent?._id}`}>Details</Link>
      </div>
    );
  });
  return (
    <>
      <Header />

      <div className="all-registered-childs pt-50 pb-50 bg-section">
        <div className="title">
          <div className="main-container">
            <h2 className="text-right">All registered childs</h2>
          </div>
        </div>
        <div className="redistered-container">
          <div className="main-container">{dataShow}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
