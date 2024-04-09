import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App";

export function Account({token}) {
    const [auth, setAuth] = useState({})

    useEffect(()=> {
        attemptLoginWithToken();
      }, []);

    const attemptLoginWithToken = async () => {
        const token = window.localStorage.getItem('token');
        console.log("token " + token)
        if (token) {
            const response = await fetch(`${API_URL}/api/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
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
    
    const logout = ()=> {
        window.localStorage.removeItem('token');
        setAuth({});
      };

      //get user data
      //update user
      //delete user


    return(
        <div className="accountButton">
        <h2> Links:</h2>
        <button onClick={ logout }>Logout { auth.email }</button>
        <br />
        <button>order history</button>
        <br />
        <button>update profile</button>
        <br />
        <button>view cart</button>
        <br />
        <button>delete account</button>
        </div>
    )
}