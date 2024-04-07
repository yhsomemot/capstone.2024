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
        <div id="books">
            <img className= "bookImg" src={book.coverimage} />
            <h2>{book.name}</h2>
            <h2>{book.author}</h2>
            <p>{book.description}</p>
            <select name="qty" id="sty">
                <option value="1">Quantity: 1</option>
                <option value="2">Quantity: 2</option>
                <option value="3">Quantity: 3</option>
                <option value="4">Quantity: 4</option>
                <option value="5">Quantity: 5</option>
                <option value="6">Quantity: 6</option>
                <option value="7">Quantity: 7</option>
                <option value="8">Quantity: 8</option>
                <option value="9">Quantity: 9</option>
                <option value="10">Quantity: 10</option>
            </select>
            <button>add to cart</button>
        </div>
    );

}