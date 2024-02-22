import { Link } from "react-router-dom";
import "./Dog.css";

const Dog = ({ image, link = "", name }) => {
  if (link) {
    return (
      <Link className="Dog link" to={link}>
        <img alt={name} src={image || "woofer.svg"} />
        <h2 className="name">{name}</h2>
      </Link>
    );
  } else {
    return <img alt={name} className="Dog image" src={image || "woofer.svg"} />;
  }
};
export default Dog;
