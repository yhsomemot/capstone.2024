import { useEffect, useState } from "react";
import { API_URL } from "../App";

export function Account() {

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
            const json = await response.json();
            if (response.ok) {
                setAuth(json);
            }
            else {
                window.localStorage.removeItem('token');
            }
        }
    };

    const removeBooks = async(id) => {
        const response = await fetch(`${API_URL}/api/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authorizaation': window.localStorage.getItem('token')
            }
        })
    }

    return(
        <>
        {}
        </>
    )
}
