import { Link } from "react-router-dom";

export default function CharityBax(props) {
  return (
    <div className="char-box flex justify-between items-center">
      <div className="box-content">
        <h3>{props.name}</h3>
        <p className="char-address">{props.address}</p>
        <p className="char-available">{props?.medican?.join(" | ")}</p>
        <Link to={props.link}>Details and Donation progress</Link>
      </div>
      <div className="image-logo">
        <img src={props.img} alt={props.alt} />
      </div>
    </div>
  );
}
