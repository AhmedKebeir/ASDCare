import { useEffect, useState } from "react";
import "../../CSS/MyProfile.css";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { IoAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getuser } from "../../store/actions/user-actions";

export default function MyProfile() {
  const [radioData, setRadioData] = useState("payment");

  const user = useSelector((state) => state.user?.children?.data?.data);
  const child = user?.childs || [];
  const dispatch = useDispatch();
  console.log(child);

  useEffect(() => {
    dispatch(getuser());
  }, []);

  function handleRadioChange(e) {
    setRadioData(e.target.value);
  }
  return (
    <div className="my-profile pt-50 pb-50 bg-section ">
      <div className="title">
        <div className="main-container flex items-center justify-between">
          <IoChevronBackOutline />
          <h2>Profile Settings</h2>
        </div>
      </div>
      <div className="profile-content">
        <div className="main-container flex ">
          <section>
            <div
              className={`radio-boxs flex items-center  ${
                radioData === "payment" ? "rad-payment" : "rad-profile"
              }`}
            >
              <div className="payment-info">
                <input
                  type="radio"
                  id="pay-info"
                  value="payment"
                  name="profile-data"
                  checked={radioData === "payment"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="pay-info">Payment Info</label>
              </div>
              <div className="profile-info">
                <input
                  type="radio"
                  id="prof-info"
                  value="profile"
                  name="profile-data"
                  checked={radioData === "profile"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="prof-info">Profile Info</label>
              </div>
            </div>
            <div
              className={`sec-data ${
                radioData === "payment" ? "payment-content" : "profile-content"
              }`}
            >
              <div className="payment-content">
                <ul>
                  <li>There is no any payment</li>

                  <li>
                    <div className="doc-name">
                      <h3>Doctor’s name</h3>
                      <span>Name of the session</span>
                    </div>
                    <span>Date Hare</span>
                  </li>
                </ul>
              </div>
              <div className="profile-content">
                <div className="info">
                  <ul className="flex items-center ">
                    <li>
                      <h3>Name</h3>
                      <span>{user?.userName || ""}</span>
                    </li>
                    <li>
                      <h3>Gender</h3>
                      <span>Male</span>
                    </li>
                    <li>
                      <h3>Phone Number</h3>
                      <span>{user?.phone || ""}</span>
                    </li>
                    <li>
                      <h3>Age</h3>
                      <span>{user?.age || ""} yo</span>
                    </li>
                    <li>
                      <h3>Email Address</h3>
                      <span>{user?.email || ""}</span>
                    </li>
                    <li>
                      <h3>Address</h3>
                      <span>Egypt - {user?.address || ""}</span>
                    </li>
                  </ul>
                </div>
                <div className="buttons">
                  <Link>Change Info</Link>

                  <Link>Change Password</Link>

                  <button>Log Out</button>
                </div>
              </div>
            </div>
          </section>
          <aside>
            <div className="proff">
              <img src="" alt="" />
              <div className="personal-data">
                <h3>{user?.userName || ""}</h3>
                <span>Balance: 0:00 EGP</span>
              </div>
            </div>
            <ul>
              <li className="new-child">
                <Link className="flex items-center justify-between">
                  <span>Add Child</span>
                  <IoAdd />
                </Link>
              </li>
              {child.map((childrn, index) => {
                return (
                  <li key={index}>
                    <div className="child-info">
                      <img src="" alt="" />
                      <div>
                        <h3>{childrn?.childName || ""}</h3>
                        <span>{childrn?.gender || ""}</span>
                      </div>
                    </div>
                    <span>{childrn?.age || ""} yo</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
