import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App";
// import { FilterContext } from "./FilterContext";
// import {handleFilter} from "./Navigation"
import { useFilter } from "../useFilter";

export function Books() {
    // const [filter] = useContext(FilterContext)
    const [filter] = useFilter()
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch(`${API_URL}/api/books/`);
                const result = await response.json();
                setBooks(result)
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <ul id="books">
                {books.filter((book) => book.name.toLocaleLowerCase().match(filter.toLocaleLowerCase())).map((book) => {
                    return <li id="bookImg" key={book.id}>
                        <Link to={`/books/${book.id}`}> <img src={book.coverimage} /> </Link>
                        <br />
                        {book.name}
                        <br />
                        {book.price}
                </li>
                })}
            </ul>
            
        </div>
    )
}