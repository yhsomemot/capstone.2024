import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App";

export function Account({token}) {
    // const [user, setUser] = useState({});
    const [auth, setAuth] = useState({})
    const [books, setBooks] = useState([]);

    // useEffect(() =>{
    //     const fetchUser = async () => {
    //         const response = await fetch(`${API_URL}/api/users/me`,
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         const json = await response.json();
    //         if (response.ok) {
    //             setUser(json);
    //         } else {
    //             window.localStorage.removeItem('token');
    //         }
    //     };
    //     fetchUser();
    // },[])

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

// export function Account({ token, email }) {
//     const [successMessage, setSuccessMessage] = useState("")
//     const [book, setBook] = useState([]);
//     const [error, setError] =useState("")

//     useEffect(() => {
        
//         async function fetchUserData() {
//             try {
//                 const response = await fetch(`${API_URL}/api/users/me`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${token}`
//                     },
//                 });
//                 const result = await response.json();
//                 setBook(result.books ?? []);
//                 setSuccessMessage(result.message);
//             } catch (error) {
//                 setError(error.message);
//             }
//         }
//         fetchUserData();
//     }, []);



//     return (
//         <>
//             <h1>Hello, {email} </h1>
//             <h2 className="account"> My library</h2>
//             <table>
//                 <thead className="">
//                     <tr>
//                         <th>name</th>
//                         <th>action</th>
//                     </tr>
//                 </thead>
//                 <tbody className="">
//                     {book.map((book) => {
//                         return (
//                             <tr key={book.id}>
//                                 <td>{book.title}</td>
//                             </tr>
//                         )
//                     })}
//                 </tbody>
//             </table>



//         </>

//     )
// }
