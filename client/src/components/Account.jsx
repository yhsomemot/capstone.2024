import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export function Account({ token, setToken }) {
    const [auth, setAuth] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        attemptLoginWithToken();
    }, []);

    const attemptLoginWithToken = async () => {
        console.log("token " + token)
        if (token) {
            const response = await fetch(`${API_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                setToken(json);
            }
            else {
                window.localStorage.removeItem('token');
            }
        }
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        setToken({});
        console.log("logged out")
    };

    //get user data
    //update user
    //delete user


    return (
        <div className="accountButton">
            <h2> Links:</h2>
            <button onClick={logout}>Logout</button>
            {/* <button onClick={logout}>Logout {auth.email}</button> */}
            <br />

            <button onClick={() => navigate("/orderhistory")}>order history</button>
            <br />
            <button  onClick={() => navigate("/updateprofile")}>update profile</button>
            <br />
            <button onClick = {() => navigate("/cart")}>view cart</button>
            <br />
            <button>delete account</button>
        </div>
    )
}