import { useEffect, useState } from "react";
import { API_URL } from "../App";


export function Account({ token, email, username }) {
    const [successMessage, setSuccessMessage] = useState("")
    const [book, setBook] = useState([]);
    const [error, setError] =useState("")
    const [auth, setAuth] = useState({});


    useEffect(()=> {
        attemptLoginWithToken();
      }, []);
     
    const attemptLoginWithToken = async () => {
        const token = window.localStorage.getItem('token');
        console.log("token " + token)
        if (token) {
            const response = await fetch(`${API_URL}/api/users/me`, {
                headers: {
                    authorization: token
                }
            });
            const result = await response.json();
            setBook(result ?? []);
            setSuccessMessage(result.message);
            if (response.ok) {
                setAuth(result);
            }
            else {
                window.localStorage.removeItem('token');
            }
        }
    };

    return (
        <>
        <h1>CART!! and order history??</h1>

        </>

    )
}
