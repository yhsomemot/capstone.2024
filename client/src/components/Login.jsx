import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export function Login({ token, setToken }) {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const [error, setError] = useState("");

    const submitLogin = ev => {
        ev.preventDefault();
        login({ email, password });

    }
    // useEffect(() => {
    //     attemptLoginWithToken();
    // }, []);

    // const attemptLoginWithToken = async () => {
    //     console.log("token " + token)
    //     if (token) {
    //         const response = await fetch(`${API_URL}/api/users/me`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const json = await response.json();
    //         console("json", json)
    //         if (response.ok) {
    //             setToken(json);
    //         }
    //         else {
    //             window.localStorage.removeItem('token');
    //         }
    //     }
    // };

    const login = async (credentials) => {
        console.log("token", token)
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (response.ok) {
            window.localStorage.setItem('token', result.token);
            setToken(result.token)
            // attemptLoginWithToken();
            setSuccessMessage("Logged in")
        }
        else {
            setError(error)
            console.log(result);
        }
    };

    return (
        <div>
            <h1 className="logIn">Log In</h1>
            {/* <h2>hello {email}</h2> */}

            <form className="loginForm">
                <label id="email">
                    <input type="email" value={email} placeholder = "email" onChange={(e) => { setEmail(e.target.value) }} />
                </label>
                <br />
                <label id="password">
                    <input type="password" value={password} placeholder = "password" onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br />
                {error && <p>{error}</p>}
                {successMessage && <h3>{successMessage}</h3>}
                <button onClick={submitLogin} disabled={ !email || !password }>Login</button>
                {/* <Link to="/books"><button>Link</button></Link> */}
                
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