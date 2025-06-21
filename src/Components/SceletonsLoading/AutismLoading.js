import Skeleton from "react-loading-skeleton";
import { WindowSize } from "../../Context/WindowWidthContext";
import { useContext } from "react";

export default function AutismLoading() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  return (
    <div className="autism-test">
      <div className="main-container">
        <div className="autism-title">
          <h2>
            <Skeleton width="80%" />
          </h2>
          <p>
            <Skeleton width="80%" />
          </p>
        </div>
        <div className="start-test">
          <Skeleton width={size < 768 ? 274 : 440} height={59} />
        </div>
      </div>
    </div>
  );
}
