import { useEffect, useState, useContext } from "react";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FilterContext } from "./FilterContext";

export function SingleGenre() {
    const [genreBooks, setGenreBooks] = useState([])
    const { bookId } = useParams();
    const [filter] =useContext(FilterContext);

    useEffect(() => {
        const fetchBooksGenre = async () => {
            try {
                const response = await fetch(`${API_URL}/api/books/genre/${bookId}`);
                const result = await response.json();
                setGenreBooks(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooksGenre();
    }, [bookId])

    return (
        <div>
            {genreBooks.map((genreBook) => {
                return<div key={genreBook.id}><h2>{genreBook.name}</h2><Link to={`/books/${genreBook.id}`}><img src={genreBook.coverimage} /></Link>
                </div>
            })}
        </div>

// {books.filter((book) => book.name.toLocaleLowerCase().match(filter.toLocaleLowerCase())).map((book) => {
//     return <li id="bookImg" key={book.id}>{book.name}
//         <Link to={`/books/${book.id}`}>
//     <img src={book.coverimage} />
// </Link>

// </li>
// })}
    )
}