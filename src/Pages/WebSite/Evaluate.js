import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BaseUrl, GETCHILDFORUSER, GETHESTORYAUTISM } from "../../Api/Api";
import Cookie from "cookie-universal";
import Header from "../../Components/WebSite/Header";
import Footer from "../../Components/WebSite/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/user-actions";
import EvaluateLoading from "../../Components/SceletonsLoading/EvaluateLoading";
import HeaderLoading from "../../Components/SceletonsLoading/HeaderLoading";
import { IoAdd } from "react-icons/io5";

export default function Evaluate() {
  const chooseRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.search);

  const query = new URLSearchParams(location.search);
  const showModal =
    query.get("modal") === "autism-checker" ||
    query.get("modal") === "autism-level";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chooseRef.current && !chooseRef.current.contains(event.target)) {
        navigate("/evaluate"); // إغلاق النافذة
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, navigate]);

  const cookie = Cookie();

  const user = cookie.get("userDetails");

  const nav = useNavigate();

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

  const dispatch = useDispatch();
  const children = useSelector(
    (state) => state.user?.children?.data?.data?.childs || []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getuser());
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);
  console.log(children);

  const childShow = children.map((child, index) => {
    return (
      <div key={index} className="child">
        <div className="info">
          <img src="" alt="" />
          <div>
            <h2>{child?.childName}</h2>
            <p>{child?.gender}</p>
          </div>
        </div>
        <span className="age">{child?.age} yo</span>
      </div>
    );
  });

  return loading ? (
    <>
      <Header />
      <EvaluateLoading />
    </>
  ) : (
    <>
      <Header />
      <div className="eval">
        <div className="main-container">
          <div className="eval-title">
            <h2>Evaluate</h2>
            <p>What test you need?</p>
            <div className="eval-links">
              <Link to="?modal=autism-checker">Autism checker test</Link>
              <Link to="?modal=autism-level">Autism level test</Link>
            </div>
          </div>
        </div>
        <div className="last-autism">
          <div className="main-container">
            <h2>Last autism test</h2>
          </div>
        </div>
        <div className="done-autism">
          <div className="main-container">
            <p>There isn't any test you've done before.</p>
          </div>
        </div>
        {showModal && (
          <div className="choose-child-test">
            <div className="choose" ref={chooseRef}>
              <h3>Choose Child for test</h3>
              <div className="child-info">
                {children.length > 0 ? childShow : ""}
              </div>
              <div className="start">
                {children.length > 0 ? (
                  <Link
                    to={`${
                      location.search === "?modal=autism-level"
                        ? "/evaluate/autism/level"
                        : "/evaluate/autism/checker"
                    }`}
                  >
                    Start the test now!
                  </Link>
                ) : (
                  <Link
                    to="/signup/childauth"
                    className="flex items-center justify-between"
                  >
                    <span>Add Child</span>
                    <IoAdd />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
