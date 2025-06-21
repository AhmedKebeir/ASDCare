import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { WindowSize } from "../../Context/WindowWidthContext";
import { useContext } from "react";
import EvaluateLoading from "./EvaluateLoading";
export default function HeaderLoading() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  return (
    <>
      <div className="nav-bar">
        <div className="main-container">
          <div className="logo">
            {size < 768 ? (
              <Skeleton width={60} height={60} className="" />
            ) : (
              <Skeleton width={60} height={60} className="br-50" />
            )}
          </div>
          <>
            {size > 767 ? (
              <ul className="header-links">
                <li>
                  <Skeleton width={70} height={20} />
                </li>
                <li>
                  <Skeleton width={70} height={20} />
                </li>
                <li>
                  <Skeleton width={70} height={20} />
                </li>

                <li>
                  <Skeleton width={70} height={20} />
                </li>
                <li>
                  <Skeleton width={70} height={20} />
                </li>
                {size < 768 ? (
                  <li>
                    <Skeleton width={70} height={20} />
                  </li>
                ) : (
                  ""
                )}
              </ul>
            ) : (
              ""
            )}

            {size < 768 ? (
              <Skeleton width={60} height={60} className="br-50" />
            ) : (
              <Link to="">
                <div className="user-box">
                  <Skeleton width={70} height={20} />
                  <Skeleton width={60} height={60} className="br-50" />
                </div>
              </Link>
            )}
          </>
        </div>
      </div>
    </>
  );
}
