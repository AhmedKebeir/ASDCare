import { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { WindowSize } from "../../Context/WindowWidthContext";

export default function EvaluateLoading() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  return (
    <>
      <div className="eval eval-loading">
        <div className="main-container">
          <div className="eval-title">
            <h2>
              <Skeleton />
            </h2>
            <p>
              <Skeleton />
            </p>
            <div className="eval-links">
              <Skeleton height={59} width={size < 992 ? 300 : 440} />
              <Skeleton height={59} width={size < 992 ? 300 : 440} />
            </div>
          </div>
        </div>
        <div className="last-autis bg-white mt-50">
          <div className="main-container ">
            <Skeleton width={size < 768 ? "100%" : 500} height={59} />
          </div>
        </div>
        <div className="done-autism">
          <div className="main-container ">
            <p>
              <Skeleton width={size < 768 ? 310 : 800} height={59} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
