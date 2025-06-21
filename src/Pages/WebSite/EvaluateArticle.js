import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { WindowSize } from "../../Context/WindowWidthContext";
import axios from "axios";
import { ARTICLES, BaseUrl } from "../../Api/Api";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";

export default function EvaluateArticle() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;

  const [article, setArticle] = useState([]);

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
    axios
      .get(`${BaseUrl}/${ARTICLES}/${params.id}`, {
        headers: {
          Authorization: "Bearer " + parsedUser.token,
        },
      })
      .then((res) => {
        setArticle(res.data.data);
      })
      .catch((err) => {
        console.error("❌ خطأ أثناء جلب المقالات:", err);
      });
  }, []);
  console.log(article);
  return (
    <>
      <Header />
      <div className="article">
        <div className="title">
          <div className="main-container flex justify-between items-center">
            <Link to="/educational-resources">
              <FontAwesomeIcon
                icon={faLessThan}
                className="text-3xl font-black cursor-pointer"
              />
            </Link>
            <div className="text-right">
              <h2>Educational Resources</h2>
              <p>Education resources support learning</p>
            </div>
          </div>
        </div>
        <div className="article-content ">
          <div className="main-container  ">
            <div className="cont flex justify-between">
              <div className="article-title">
                <h2>{article?.title}</h2>
                <span className="mobile-creator">
                  <span className="creator-name">Author Name</span>
                  <span className="time">Create Date</span>
                </span>
                <p>{article?.info}</p>
              </div>
              <div className="image-details">
                <img src={article?.image} alt="" />
                <span className="creator-web">
                  <span className="creator-name">By Article creator</span>
                  <span className="time">2024, 10, 25</span>
                </span>
              </div>
            </div>
            <p className="p-mobile">{article.info}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
