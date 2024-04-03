import { Link } from "react-router-dom";

export function Navigations() {

    return (
        <div id="navbar">
            <Link to="/books" className="books">
                Books
            </Link>
            <Link to="/login" className="login">
                Login
            </Link>
            <Link to="/account" className="account">
                Account
            </Link>
            {/* <Link to="/cart" className="cart">
               Cart
            </Link> */}
            {/* <span className="hello">Hello, {username} </span> */}
        </div>
    );
}