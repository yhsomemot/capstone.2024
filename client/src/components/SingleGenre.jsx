import { useEffect, useState } from "react";
// import { useContext } from "react";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
// import { FilterContext } from "./FilterContext";
import { useFilter } from "../useFilter";

export function SingleGenre() {
    const [genreBooks, setGenreBooks] = useState([])
    const { bookId } = useParams();
    // const [filter] = useContext(FilterContext)
    const [filter] = useFilter()

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
        <ul id="books">
            {genreBooks.filter((genreBook) => genreBook.name.toLocaleLowerCase().match(filter.toLocaleLowerCase())).map((genreBook) => {
                return <li key={genreBook.id}><Link to={`/books/${genreBook.id}`}><img className="bookImg" src={genreBook.coverimage} /></Link>
                    <br />
                    <h2>{genreBook.name}</h2>
                    <h3>{genreBook.author}</h3>
                    <h3>{genreBook.price}</h3>
                </li>
            })}
        </ul>
    )
}