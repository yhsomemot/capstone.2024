import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../App";

export function SingleBook({ token }) {
    const [book, setBook] = useState({})
    const { bookId } = useParams();
    const [successMessage, setSuccessMessage] = useState("");
    const [error, setError] = useState("");

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

    async function handleClick() {
        try {
            const response = await fetch(`${API_URL}/api/mycart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    book_id: book.id,
                    qty: 1
                })
            });

            setSuccessMessage("Added To Cart!");
            return await response.json();

        } catch (error) {
            setError(error.message);
        }
    }
    // have an input feild to change qty...

    return (
        <div>
            <h2>{book.name}</h2>
            <h2>{book.author}</h2>
            <div id="singlebook">
                <img className="singlebookImg" id="singlebookItem" src={book.coverimage} />
                <p id="singlebookItem">{book.description}</p>
            </div>
            <h3> ${book.price}</h3>
            <div id="singlebuttons">
                {successMessage && <h3>{successMessage}</h3>}
                <button onClick={async () => await handleClick(book.id)}>add to cart</button>
            </div>

        </div>
    );

}