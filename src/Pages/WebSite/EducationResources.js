import { Link } from "react-router-dom";

import "../../CSS/Education.css";
import Footer from "../../Components/WebSite/Footer";

export default function EducationRsources() {
  return (
    <>
      {/* <Header /> */}
      <div className="education-res">
        <div className="title">
          <div className="main-container">
            <h2>Educational Resources</h2>
            <p>Education resources support learning</p>
          </div>
        </div>
        <div className="article">
          <div className="main-container">
            <div className="article-grids">
              <div className="art-grid">
                <div className="art">
                  <div className="art-title">
                    <h3>Article’s Title </h3>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipiscing elit Ut
                      et massa mi. Aliquam in hendrerit urna. Pellentesque sit
                      amet sapien fringilla, mattis ligula consectetur, ultrices
                      mauris. Maecenas vitae mattis tellus..
                    </p>
                    <span className="creator-web">
                      <span className="creator-name">By Article creator</span>
                    </span>
                  </div>
                  <div className="image">
                    <img src="" alt="" />
                  </div>
                </div>
                <div className="art-link">
                  <Link to="/evaluate/article">Read the article</Link>
                  <span className="creator-web">
                    <span className="creator-name">By Article creator</span>
                    <span className="time">2024, 10, 25</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
