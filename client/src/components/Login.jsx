import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export function Login({ token, setToken }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const submitLogin = ev => {
        ev.preventDefault();
        login({ email, password });
    }

    const login = async (credentials) => {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        if (response.ok) {
            window.localStorage.setItem('token', json.token);
            setToken(json.token)
        }
        else {
            setError(error.message)
            console.log(json);
        }
    };

    //use navigate for login to main page

    return (
        <div>
            <h1 className="logIn">Log In</h1>

            <form className="loginForm">
                <label id="email">
                    <input type="email" value={email} placeholder = "email" onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <br />
                <label id="password">
                    <input type="password" value={password} placeholder = "password" onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br />
                
                <button onClick={submitLogin} disabled={ !email || !password }>Login</button>
                <br />
                <div>
                    <Link to="/register" className="nav">
                        Create account
                    </Link>
                </div>
            </form>



        </div>

    )
}