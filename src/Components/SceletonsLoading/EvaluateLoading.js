import Skeleton from "react-loading-skeleton";

export default function EvaluateLoading() {
  return (
    <>
      <div className="eval">
        <div className="main-container">
          <div className="eval-title">
            <h2>
              <Skeleton />
            </h2>
            <p>
              <Skeleton />
            </p>
            <div className="eval-links">
              <Skeleton height={59} width={440} />
              <Skeleton height={59} width={440} />
            </div>
          </div>
        </div>
        <div className="last-autis bg-white mt-50">
          <div className="main-container ">
            <Skeleton width={500} height={59} />
          </div>
        </div>
        <div className="done-autism">
          <div className="main-container ">
            <p>
              <Skeleton width={800} height={59} />
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
