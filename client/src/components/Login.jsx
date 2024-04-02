import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const [password, setPassword] = useState("");

    return (
        <div>
            <h1 className="logIn">Log In</h1>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}

            <form className="loginForm" onSubmit={handleSubmit}>
                <label >
                    First Name: {""}
                </label>
                <label id="username">
                    Username: {""}
                    <input type="email" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                </label>
                <br />
                <label id="password">
                    Password: {""}
                    <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                </label>
                <br />

                <button type="submit">Submit</button>
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