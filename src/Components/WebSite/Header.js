import { Link, NavLink, useLocation } from "react-router-dom";
import "../../CSS/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/user-actions";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowWidthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.children?.data?.data || "");

  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    setActiveUser(user);
  }, [user]);
  useEffect(() => {
    setShow(false); // أغلق المينيو
  }, [location.pathname]);

  const [activUser, setActiveUser] = useState("");
  // console.log(activUser);

  const [show, setShow] = useState(false);
  // console.log(user);
  // console.log(size);
  return (
    <div className="nav-bar">
      <div className="main-container">
        <div className="logo">
          <Link to="/">
            <img
              src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.jpg")}
              alt=""
            />
            <h1 className="nav-logo">
              ASD<span className="nav-care">CARE</span>
            </h1>
          </Link>
        </div>
        {user !== "" ? (
          <>
            {show || size > 767 ? (
              <ul className="header-links">
                <li>
                  <NavLink to="/homeparent" activeClassName="active">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/doctors" activeClassName="active">
                    Doctors
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/evaluate" activeClassName="active">
                    Evaluate
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/child-progress" activeClassName="active">
                    Progress
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/charity" activeClassName="active">
                    Charities
                  </NavLink>
                </li>
                {size < 768 ? (
                  <li>
                    <button>Log Out</button>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            ) : (
              ""
            )}

            {size < 768 ? (
              <FontAwesomeIcon
                onClick={() => setShow((prev) => !prev)}
                icon={faBars}
              />
            ) : (
              <Link>
                <div className="user-box">
                  <h3>{user.userName}</h3>
                  <FontAwesomeIcon icon={faCircleUser} />
                </div>
              </Link>
            )}
          </>
        ) : (
          <div className="auth-header">
            <Link to="/login">Log In</Link>
            <Link to="/account-type">Sign Up</Link>
          </div>
        )}
      </div>
    </div>
  );
}
