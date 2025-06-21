import { useContext } from "react";
import { WindowSize } from "../../Context/WindowWidthContext";
import Skeleton from "react-loading-skeleton";

export default function HomeParentLoading() {
  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;

  return (
    <>
      <div className="Welcome-page bg-section welcome-page-loading">
        <div className="main-container">
          <section>
            <div className="title">
              <h1>
                <Skeleton className="welcome-title-loadind" height={120} />
              </h1>
            </div>
            <div className="auth-welcome">
              <Skeleton className="welcome-title-loadind" height={59} />
              <Skeleton
                className="welcome-title-loadind"
                height={59}
                width={size < 992 ? 600 : size < 768 ? 300 : ""}
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
