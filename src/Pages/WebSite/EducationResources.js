import { Link } from "react-router-dom";

import "../../CSS/Education.css";
import Footer from "../../Components/WebSite/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { ARTICLES, BaseUrl } from "../../Api/Api";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";

export default function EducationRsources() {
  const [articles, setArticles] = useState([]);

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
    axios
      .get(`${BaseUrl}/${ARTICLES}`, {
        headers: {
          Authorization: "Bearer " + parsedUser.token,
        },
      })
      .then((res) => {
        setArticles(res.data.data);
      })
      .catch((err) => {
        console.error("❌ خطأ أثناء جلب المقالات:", err);
      });
  }, []);
  console.log(articles);

  const articleShow = articles.map((art, index) => {
    return (
      <div key={index} className="art-grid">
        <div className="art">
          <div className="art-title">
            <h3>{art?.title || ""} </h3>
            <p>{art?.info || ""}</p>
            <span className="creator-web">
              <span className="creator-name">By Article creator</span>
            </span>
          </div>
          <div className="image">
            <img src={art.image} alt="" />
          </div>
        </div>
        <div className="art-link">
          <Link to={`${art._id}`}>Read the article</Link>
          <span className="creator-web">
            <span className="creator-name">By Article creator</span>
            <span className="time">2024, 10, 25</span>
          </span>
        </div>
      </div>
    );
  });
  return (
    <>
      <Header />
      <div className="education-res">
        <div className="title">
          <div className="main-container">
            <h2>Educational Resources</h2>
            <p>Education resources support learning</p>
          </div>
        </div>
        <div className="article">
          <div className="main-container">
            <div className="article-grids">{articleShow}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
