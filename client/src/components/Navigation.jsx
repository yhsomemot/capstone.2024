import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { FilterContext } from "./FilterContext";

export function Navigations() {
    const [filter, setFilter] = useContext(FilterContext)
    const [books, setBooks] = useState([]);


    function handleFilter(e) {
        setFilter(e.target.value)
    }

    return (
        <div id="navbar">
            <input className="searchbar" type="text" value={filter} placeholder="search" onChange={handleFilter} />

            <Link to="/books" className="linkNav">
                Books
            </Link>
            <Link to="/login" className="linkNav">
                Login
            </Link>
            <Link to="/account" className="linkNav">
                Account
            </Link>
            <Link to="/cart" className="cart">
               Cart
            </Link>
            {/* <span className="hello">Hello, {email} </span> */}
        </div>
    );
}