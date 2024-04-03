import { useEffect, useState } from "react";
import { API_URL } from "../App";


export function Account({ token, email, username }) {
    const [successMessage, setSuccessMessage] = useState("")
    const [book, setBook] = useState([]);
    const [error, setError] =useState("")

    useEffect(() => {
        
        async function fetchUserData() {
            try {
                const response = await fetch(`${API_URL}/api/users/me`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                const result = await response.json();
                setBook(result.books ?? []);
                setSuccessMessage(result.message);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchUserData();
    }, []);


    async function deleteCheckOuts(bookId) {
        try {
            console.log("book has been returned!")
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <>
            <h1>Hello, {username} </h1>
            <h2 className="account"> My library</h2>
            <table>
                <thead className="">
                    <tr>
                        <th>name</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody className="">
                    {book.map((book) => {
                        return (
                            <tr key={book.id}>
                                <td>{book.title}</td>
                                <td>
                                    <button onClick={async () => await deleteCheckOuts(book.id)}>
                                        Return </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>



        </>

    )
}
