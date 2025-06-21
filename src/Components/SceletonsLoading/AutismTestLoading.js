import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

export default function AutismTestloading() {
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
        <div className="half-width">
          <Skeleton width="100%" />
        </div>

        <div className="box-test">
          <div className="question">
            <h3>
              <Skeleton height={70} />
            </h3>
            <div className="answers">
              <div className="other-ques">
                <Skeleton height={59} />
              </div>
            </div>
          </div>
          <div className="btn-test">
            <Link>
              <Skeleton />
            </Link>
            <Link>
              <Skeleton />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
