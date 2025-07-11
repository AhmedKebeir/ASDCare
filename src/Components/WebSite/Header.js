import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../CSS/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { getuser, logOut } from "../../store/actions/user-actions";
import { useContext, useEffect, useState } from "react";
import { WindowSize } from "../../Context/WindowWidthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Cookie from "cookie-universal";

export default function Header() {
  const cookie = Cookie();
  const location = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [typeRole, setTypeRole] = useState("");
  const user = useSelector((state) => state.user?.children?.data?.data || "");

  const WindowWidth = useContext(WindowSize);
  const size = WindowWidth.windowSize;
  useEffect(() => {
    dispatch(getuser());
  }, [dispatch]);

  useEffect(() => {
    setActiveUser(user);
    setTypeRole(user.role);
  }, [user]);
  useEffect(() => {
    setShow(false); // أغلق المينيو
  }, [location.pathname]);

  const [activUser, setActiveUser] = useState("");
  // console.log(activUser.role);

  const [show, setShow] = useState(false);
  // console.log(user);
  // console.log(typeRole);
  const parentLiks = (
    <>
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
    </>
  );

  const doctorLinks = (
    <>
      <li>
        <NavLink to="/doctor" activeClassName="active">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/doctor-profile" activeClassName="active">
          My Clinic
        </NavLink>
      </li>
      <li>
        <NavLink to="/doctor/registeredchilds" activeClassName="active">
          My Clients
        </NavLink>
      </li>

      <li>
        <NavLink to="/charity" activeClassName="active">
          Charity
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="nav-bar">
      <div className="main-container">
        <div className="logo">
          <Link
            to={
              activUser?.role === "parent"
                ? "/homeparent"
                : activUser.role === "doctor"
                ? "/doctor"
                : ""
            }
          >
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
                {typeRole === "parent"
                  ? parentLiks
                  : typeRole === "doctor"
                  ? doctorLinks
                  : ""}
                {size < 768 ? (
                  <li>
                    <button
                      onClick={() => {
                        cookie.remove("userDetails");
                        nav("/");
                        dispatch(logOut);
                      }}
                    >
                      Log Out
                    </button>
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
              <Link
                to={
                  activUser?.role === "parent"
                    ? "/my-profile"
                    : "/doctor-profile"
                }
              >
                <div className="user-box">
                  <h3>
                    {typeRole === "parent"
                      ? user.userName.split(" ").slice(0, 2).join(" ")
                      : user?.parent?.userName.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  {user?.image ? (
                    <img
                      src={user.image}
                      alt="User"
                      className="header-user-image"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faCircleUser} />
                  )}
                </div>
              </Link>
            )}
          </>
        ) : (
          <div className="auth-header">
            <Link className="btn" to="/login">
              Log In
            </Link>
            <Link className="btn" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
