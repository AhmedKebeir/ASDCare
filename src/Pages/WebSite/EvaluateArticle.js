import { faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { WindowSize } from "../../Context/WindowWidthContext";

export default function EvaluateArticle() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  return (
    <>
      <div className="article">
        <div className="title">
          <div className="main-container flex justify-between items-center">
            <Link to="/evaluate/res">
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
                <h2>Article’s Title</h2>
                <span className="mobile-creator">
                  <span className="creator-name">Author Name</span>
                  <span className="time">Create Date</span>
                </span>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
                  sapien fringilla, mattis ligula consectetur, ultrices mauris.
                  Maecenas vitae mattis tellus. Nullam quis imperdiet augue.
                  Vestibulum auctor ornare leo, non suscipit magna interdum eu.
                  Curabitur pellentesque nibh nibh, at maximus ante fermentum
                  sit amet. Pellentesque commodo lacus at sodales sodales.
                  Quisque sagittis orci ut diam condimentum, vel euismod erat
                  placerat. In iaculis arcu eros, eget tempus orci facilisis id.
                  Praesent lorem orci, mattis non efficitur id, ultricies vel
                  nibh. Sed volutpat lacus vitae gravida viverra. Fusce vel
                  tempor elit. Proin tempus, magna id scelerisque vestibulum,
                  nulla ex pharetra sapien, tempor posuere massa neque nec
                  felis. Aliquam sem ipsum, vehicula ac tortor vel, egestas
                  ullamcorper dui. Curabitur at risus sodales, tristique est id,
                  euismod justo. Mauris nec leo non libero sodales lobortis.
                  Quisque a neque pretium, dictum tellus vitae, euismod neque.
                  Nulla facilisi. Phasellus ultricies dignissim nibh ut cursus.
                  Nam et quam sit amet turpis finibus maximus tempor eget augue.
                  Aenean at ultricies lorem. Sed egestas ligula tortor, sit amet
                  mattis ex feugiat non. Duis purus diam, dictum et ante at,
                  commodo iaculis urna. Aenean lacinia, nisl id vehicula
                  condimentum, enim massa tempor nibh, vitae volutpat sapien
                  metus aliquet nisl. Etiam dui eros, tincidunt tristique
                  blandit id, gravida vitae augue. Proin imperdiet mi nec justo
                  convallis gravida.
                </p>
              </div>
              <div className="image-details">
                <img src="" alt="" />
                <span className="creator-web">
                  <span className="creator-name">By Article creator</span>
                  <span className="time">2024, 10, 25</span>
                </span>
              </div>
            </div>
            <p className="p-mobile">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris. Maecenas
              vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum
              auctor ornare leo, non suscipit magna interdum eu. Curabitur
              pellentesque nibh nibh, at maximus ante fermentum sit amet.
              Pellentesque commodo lacus at sodales sodales. Quisque sagittis
              orci ut diam condimentum, vel euismod erat placerat. In iaculis
              arcu eros, eget tempus orci facilisis id. Praesent lorem orci,
              mattis non efficitur id, ultricies vel nibh. Sed volutpat lacus
              vitae gravida viverra. Fusce vel tempor elit. Proin tempus, magna
              id scelerisque vestibulum, nulla ex pharetra sapien, tempor
              posuere massa neque nec felis. Aliquam sem ipsum, vehicula ac
              tortor vel, egestas ullamcorper dui. Curabitur at risus sodales,
              tristique est id, euismod justo. Mauris nec leo non libero sodales
              lobortis. Quisque a neque pretium, dictum tellus vitae, euismod
              neque. Nulla facilisi. Phasellus ultricies dignissim nibh ut
              cursus. Nam et quam sit amet turpis finibus maximus tempor eget
              augue. Aenean at ultricies lorem. Sed egestas ligula tortor, sit
              amet mattis ex feugiat non. Duis purus diam, dictum et ante at,
              commodo iaculis urna. Aenean lacinia, nisl id vehicula
              condimentum, enim massa tempor nibh, vitae volutpat sapien metus
              aliquet nisl. Etiam dui eros, tincidunt tristique blandit id,
              gravida vitae augue. Proin imperdiet mi nec justo convallis
              gravida.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
