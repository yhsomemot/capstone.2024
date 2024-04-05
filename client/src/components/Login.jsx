import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";


export function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [auth, setAuth] = useState({});

    const submitLogin = ev => {
        ev.preventDefault();
        login({ email, password });
    }

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
            attemptLoginWithToken();
        }
        else {
            setError(error.message)
            console.log(json);
        }
    };

    useEffect(() => {
        if (
            loggedIn
        ) {
            navigate("/account")
        }
    }, [loggedIn])

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