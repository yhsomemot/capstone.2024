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
        <div>
            {genreBooks.filter((genreBook) => genreBook.name.toLocaleLowerCase().match(filter.toLocaleLowerCase())).map((genreBook) => {
                return <div key={genreBook.id}><h2>{genreBook.name}</h2><Link to={`/books/${genreBook.id}`}><img src={genreBook.coverimage} /></Link>
                </div>
            })}
        </div>
    )
}