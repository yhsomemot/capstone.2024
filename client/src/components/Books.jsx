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
                setBooks(result.books)
            } catch (error) {
                console.log(error);
            }
        };
        fetchBooks()
    }, []);

    return (
        <div></div>
    )
}