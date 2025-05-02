import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
export default function CommentsForSession() {
  return (
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
            <h2>Session’s number</h2>
            <p>Session Address will be here</p>
          </div>
        </div>
      </div>

      <div className="comments">
        <div className="main-container flex ">
          <section>
            <div className="do-comment flex items-center ">
              <input type="text" placeholder="Type a comment here..." />
              <button>Send</button>
            </div>
            <div className="comments-list ">
              <div className="comment-mobile">
                <img src="" alt="" />
                <div className="comment-content">
                  <h3>Parent's name</h3>
                  <p>Child’s name</p>
                  <p className="child-data">
                    <span>Age:XX </span> <span> Gender: X</span>
                  </p>
                </div>
              </div>
              <div className="comment-item comment-web flex  justify-between">
                <div className="comment-info flex items-center justify-between">
                  <img src="" alt="" />
                  <p>His comment will be here.</p>
                </div>
                <span className="comment-ago">5 days ago</span>
              </div>
              <div className="comment-item-mobile">
                <div className="comment-info flex items-center justify-between">
                  <h3>Parent's Name</h3>
                  <span className="comment-ago">5 days ago</span>
                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              </div>
            </div>
          </section>
          <aside>
            <img src="" alt="" />
            <div className="comment-content">
              <h3>Parent's name</h3>
              <p>Child’s name</p>
              <p className="child-data">
                <span>Age:XX </span> <span> Gender: X</span>
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
