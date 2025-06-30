import { Link, useNavigate, useParams } from "react-router-dom";
import "../../CSS/Payment.css";
import { MdOutlinePayment } from "react-icons/md";
import { useState } from "react";
import axios from "axios";
import Cookie from "cookie-universal";
export default function PaymentCheckOut() {
  const [typePayment, setTypePayment] = useState("");
  const [cash, setCash] = useState(false);
  const params = useParams();
  const nav = useNavigate();
  console.log(params.id);
  const cookie = Cookie();

  const user = cookie.get("userDetails");

  // تحقق مما إذا كانت البيانات نصًا قبل محاولة JSON.parse
  let parsedUser = {};

  if (typeof user === "string") {
    try {
      parsedUser = JSON.parse(user);
    } catch (error) {
      console.error("❌ خطأ في تحويل JSON:", error);
    }
  } else if (typeof user === "object" && user !== null) {
    parsedUser = user; // إذا كان بالفعل كائن، استخدمه كما هو
  }

  async function handelPayment() {
    if (typePayment !== "") {
      try {
        if (typePayment === "cash") {
          setCash(true);
        } else if (typePayment === "card") {
          const res = await axios.get(
            `https://asd-final-project-soat.vercel.app/api/v1/orders/checkout-session/${params.id}`,
            {
              headers: { Authorization: "Bearer " + parsedUser.token },
            }
          );
          window.location.href = res.data.session.url;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  return (
    <>
      <div className="break-line"></div>
      <div className="payment">
        <h2>Payment Details</h2>
        {cash ? (
          <div className="cash-payment">
            <p>The payment process was completed successfully.</p>
            <p>
              Go <Link to="/child-progress">Child Tracking</Link> Child Tracking
              to check the upcoming sessions
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="chose-payment">
          <div>
            <input
              type="radio"
              name="payment"
              id="cash"
              value="cash"
              onChange={(e) => {
                setTypePayment(e.target.value);
              }}
            />
            <label htmlFor="cash">
              <div className="payment-icon">
                <MdOutlinePayment />
                <h3>Payment is cash</h3>
              </div>
              <span className="checkmark"></span>
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="payment"
              id="card"
              value="card"
              onChange={(e) => {
                setTypePayment(e.target.value);
              }}
            />
            <label htmlFor="card">
              <div className="payment-icon">
                <MdOutlinePayment />
                <h3>Credit Card or E-wallet</h3>
              </div>
              <span className="checkmark"></span>
            </label>
          </div>
        </div>
        <div className="payment-links flex items-center justify-around">
          <button className="cancel">Cancel</button>
          <button onClick={handelPayment}>Continue</button>
        </div>
      </div>
    </>
  );
}
