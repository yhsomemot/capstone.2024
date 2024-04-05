import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export function Navigations() {
    const [filter, setFilter] = useState("");
    const [books, setBooks] = useState([]);


    function handleFilter(e) {
        setFilter(e.target.value)
    }

    return (
        <div id="navbar">
            <input type="text" value={filter} placeholder="search" onChange={handleFilter} />

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
            {/* <span className="hello">Hello, {email} </span> */}
        </div>
    );
}