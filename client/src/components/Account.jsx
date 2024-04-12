import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export function Account({ token, setToken }) {
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch (`${API_URL}/api/users/`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                });
                const result = await response.json();
                setUser(result);
                console.log("account" , result)
            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, []);


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