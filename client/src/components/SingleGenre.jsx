import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function SingleGenre() {
    const [genreBooks, setGenreBooks] = useState([])
    const { bookId } = useParams();

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
    )
}