import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import Header from "../../../Components/WebSite/Header";
import Footer from "../../../Components/WebSite/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { BaseUrl } from "../../../Api/Api";
import Cookie from "cookie-universal";
export default function CommentsForSession() {
  const [sessions, setSessions] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [doComment, setDoComment] = useState("");
  const cookie = Cookie();
  const params = useParams();

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
    async function fetchSessions() {
      try {
        const res = await axios.get(`${BaseUrl}/sessions/${params.id}`, {
          headers: { Authorization: `Bearer ${parsedUser.token}` },
        });
        setSessions(res.data.data);
        setComments(res?.data?.data?.comments);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSessions();
  }, []);
  console.log(sessions);

  async function handelDoComment() {
    if (doComment !== "") {
      try {
        const res = await axios.post(
          `${BaseUrl}/sessions/${params.id}/comments`,
          { comment: doComment },
          { headers: { Authorization: `Bearer ${parsedUser.token}` } }
        );
        setComments([...comments, res.data.data.comments[comments.length - 1]]);
        console.log(res.data.data.comments[comments.length - 1]);
      } catch (err) {
        console.log(err);
      }
    }
  }

  const commentsShow = [...comments].reverse().map((comment, index) => {
    return (
      <div
        key={index}
        className="comment-item comment-web flex justify-between"
      >
        <div className="comment-info flex items-center justify-between">
          {comment.imageUrl && (
            <img
              src={comment.imageUrl}
              alt="User"
              className="w-10 h-10 rounded-full"
            />
          )}
          <p>{comment}</p>
        </div>
        <span className="comment-ago">{comment.timeAgo || "5 days ago"}</span>
      </div>
    );
  });
  return (
    <>
      <Header />

      <div className="comments-session pt-50 pb-50 bg-section">
        <div className="title">
          <div className="main-container flex items-center gap-10 main-color">
            <Link to="/doctor/allsessionsdone">
              <FontAwesomeIcon
                icon={faLessThan}
                className="text-3xl font-black cursor-pointer"
              />
            </Link>
            <div className="">
              <h2>Session: {sessions?.session_number}</h2>
              <p>Session Date: {sessions?.session_date}</p>
            </div>
          </div>
        </div>

        <div className="comments">
          <div className="main-container flex ">
            <section>
              <div className="do-comment flex items-center ">
                <input
                  type="text"
                  placeholder="Type a comment here..."
                  name="doComment"
                  value={doComment}
                  onChange={(e) => {
                    setDoComment(e.target.value);
                  }}
                />
                <button onClick={handelDoComment}>Send</button>
              </div>
              <div className="comments-list ">
                <div className="comment-mobile">
                  <img src="" alt="" />
                  <div className="comment-content">
                    <h3>Parent's name:{sessions?.parentId?.userName}</h3>
                    <p>Child:{sessions?.parentId?.childs[0]?.childName}</p>
                    <p className="child-data">
                      <span>Age:{sessions?.parentId?.childs[0]?.age} </span>{" "}
                      <span>
                        {" "}
                        Gender: {sessions?.parentId?.childs[0]?.gender}
                      </span>
                    </p>
                  </div>
                </div>
                {commentsShow}
              </div>
            </section>
            <aside>
              <img src="" alt="" />
              <div className="comment-content">
                <h3>Parent: {sessions?.parentId?.userName}</h3>
                <p>Child:{sessions?.parentId?.childs[0]?.childName}</p>
                <p className="child-data">
                  <span>Age:{sessions?.parentId?.childs[0]?.age} </span>{" "}
                  <span> Gender: {sessions?.parentId?.childs[0]?.gender}</span>
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
