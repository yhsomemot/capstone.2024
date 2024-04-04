import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../App";

export function SingleBook() {
    const [book, setBook] = useState({})
    const { bookId } = useParams();

    useEffect(() => {
        async function fetchSingleBook() {
            try {
                const response = await fetch(`${API_URL}/api/books/${bookId}`);
                const result = await response.json();
                setBook(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchSingleBook();
    }, [bookId])

    return (
        <div>
            <img src={book.coverimage} />
            <h2>{book.name}</h2>
            <h2>{book.author}</h2>
            <button>add to cart</button>
        </div>
    );

}