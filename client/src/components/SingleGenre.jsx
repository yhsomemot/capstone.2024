import { useEffect, useState } from "react";
import { API_URL } from "../App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export function SingleGenre() {
    const [book, setBook] = useState({})
    const { bookId } = useParams();

    useEffect(() => {
        const fetchBooksGenre = async () => {
            try {
                const response = await fetch(`${API_URL}/api/books/genre/${bookId}`);
                const result = await response.json();
                setBook(result);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooksGenre();
    }, [bookId])

    return (
        <div>
            <Link to={`/books/${book.id}`}>
                    <img src={book.coverimage} />
                </Link>
            <h2>{book.name}</h2>
            <h2>{book.author}</h2>
        </div>
    )
}