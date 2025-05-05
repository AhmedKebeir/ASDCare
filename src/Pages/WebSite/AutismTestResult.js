import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getuser } from "../../store/actions/user-actions";

export default function AutismResult() {
  const dispatch = useDispatch();
  const children = useSelector(
    (state) => state.user?.children?.data?.data?.childs[0]?.autism_level || []
  );

  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);
  //   console.log(children);
  return (
    <div className="autism-result pt-50 pb-50 bg-section">
      <div className="title">
        <div className="main-container">
          <h2>Autism test result</h2>
        </div>
      </div>

      <div className="main-container">
        <div className="result-notes flex justify-between items-start">
          <section>
            <h3>Some Notes:</h3>
            <ul>
              <li>Lorem ipsum dolor sit amet consectetur adipiscing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipiscing.</li>
              <li>Lorem ipsum dolor sit amet consectetur adipiscing.</li>
            </ul>
          </section>
          <aside>
            <div className="child-level">
              <div>
                <span className={`level level-${Number(children) + 1}`}>
                  {Number(children) + 1}
                </span>
                <h3>Your Autism Level</h3>
              </div>
            </div>
          </aside>
        </div>
        <div className="recommend-doctor">
          <h3>Recommended Doctors for your level:</h3>
          <div className="doc-box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
