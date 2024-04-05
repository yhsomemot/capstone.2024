import { useState } from "react";
import { API_URL } from "../App";

export function Register() {
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

        const json = await response.json();
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
// export function Register({ setToken }) {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [successMessage, setSuccessMessage] = useState("");
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     async function handleSubmit(e) {
//         e.preventDefault();
//         try {
//             const response = await fetch(`${API_URL}/api/users/register`, {
//                 method: "POST",
//                 headers: {'Content-Type': "application/json"}, 
//                 body: JSON.stringify({ email: email, password: password })
//             });
//             const result = await response.json();
//             setSuccessMessage(result.message);
//             setToken(result.token)
//             setIsLoggedIn(true);
//         } catch (error) { setError(error.message); }

//     }


//     return (
//         <>
//             <h1>
//                 Register
//             </h1>
//             <div>
//                 {successMessage && <p>{successMessage}</p>}
//                 {error && <p>{error}</p>}
//             </div>


//             <form className="registerForm" onSubmit={handleSubmit}>

//                 <label>
//                     email: {""}
//                     <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
//                 </label>
//                 <br />
//                 <label>
//                     Password: {""}
//                     <input type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
//                 </label>
//                 <br />
//                 <button type="submit">Register</button>
//             </form>
//         </>
//     )
// }