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
            <div id="books">
                {books.filter((book) => book.name.toLocaleLowerCase().match(filter.toLocaleLowerCase())).map((book) => {
                    return <div id="bookImg" key={book.id}>
                        <Link to={`/books/${book.id}`}> <img className= "bookImg" src={book.coverimage} /> </Link>
                        <br />
                        <h2>{book.name}</h2>
                        <h3>{book.author}</h3>
                        <h3>${book.price}</h3>
                        
                </div>
                })}
            </div>
            
        </div>
    )
}