import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/">
        <img
          src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.jpg")}
          alt=""
        />
      </Link>
    </div>
  );
}
