import { useState } from "react";
import { API_URL } from "../App";

export function Register({ token, setToken }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const submitRegister = ev => {
        ev.preventDefault();
        register({ email, password });
    }

    const register = async (credentials) => {
        const response = await fetch(`${API_URL}/api/users/register`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
            setToken(result.token)
            console.log(result)
            console.log(response)
    };

    return (
        <>
            <h1>
                Register
            </h1>

            <form>
                <label>
                    <input type="email" value={email} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <br />
                <label>
                    <input type="password" value={password} placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br />
                <button onClick={submitRegister} disabled={!email || !password}>Register</button>
            </form>
        </>
    )
}