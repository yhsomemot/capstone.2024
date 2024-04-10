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
            const response = await fetch(`${API_URL}/api/carts`, {
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
            const result = await response.json();
            setSuccessMessage(result.message);
        } catch (error) {
            setError(error.message);
        }
    }

    //add addCartProducts and make a handle submit for add to cart button

    return (
        <div>
            <h2>{book.name}</h2>
            <h2>{book.author}</h2>
            <div id="singlebook">
                <img className="singlebookImg" id="singlebookItem" src={book.coverimage} />
                <p id="singlebookItem">{book.description}</p>
            </div>
            
            {book.inventory}

            <div id="singlebuttons">
                <select name="qty" className="">
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
                {/* <button onClick={async () => await handleClick(book.id)}>Check Out</button> */}
                <button onClick={async () => await handleClick(book.id)}>add to cart</button>
            </div>

        </div>
    );

}