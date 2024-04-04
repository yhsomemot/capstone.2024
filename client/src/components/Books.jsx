import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App";

export function Books() {

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
        <>
            <h1>Books</h1>
            <ul>
                {books.map((book) => {
                    return <li id="bookImg" key={book.id}>{book.name}
                        <Link to={`/books/${book.id}`}>
                    <img src={book.coverimage} />
                </Link>

                </li>
                })}
            </ul>
            
        </>
    )
}