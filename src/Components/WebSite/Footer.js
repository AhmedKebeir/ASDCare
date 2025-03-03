import "../../CSS/Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="main-container">
        <div className="logo">
          <img
            src={require("../../Images/photo_2024-11-18_17-52-24-removebg-preview 1 1.png")}
            alt=""
          />
          <h1 className="nav-logo">
            ASD<span className="nav-care">CORE</span>
          </h1>
        </div>
        <p>
          ASDcore is dedicated to providing specialized medical care,
          <br /> therapies, and resources for individuals with autism
        </p>
      </div>
    </footer>
  );
}
