import { useState } from "react";
import { API_URL } from "../App";

export function Register({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/users/register`, {
                method: "POST",
                headers: {'Content-Type': "application/json"}, 
                body: JSON.stringify({ email: username, password: password })
            });
            const result = await response.json();
            setSuccessMessage(result.message);
            setToken(result.token)
            setIsLoggedIn(true);
        } catch (error) { setError(error.message); }

    }


    return (
        <>
            <h1>
                Register
            </h1>
            <div>
                {successMessage && <p>{successMessage}</p>}
                {error && <p>{error}</p>}
            </div>


            <form className="registerForm" onSubmit={handleSubmit}>

                <label>
                    <input type="email" value={username} placeholder="Email" onChange={(e) => { setUsername(e.target.value) }} />
                </label>
                <br />
                <label>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br />
                <button type="submit">Register</button>
            </form>
        </>
    )
}