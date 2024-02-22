import "./Header.css";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

const Header = ({}) => {
  return (
    <header className="Header">
      <Link className="link" to="/">
        <img aria-hidden={true} src="woofer.svg" className="App-logo" alt="" />
        Woofer
      </Link>
      <Search />
    </header>
  );
};

export default Header;
