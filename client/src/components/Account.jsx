import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../App";

export function Account({login, register}) {
    const [auth, setAuth] = useState({});
    const [books, setBooks] = useState([]);

    useEffect(()=> {
        attemptLoginWithToken();
      }, []);

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

    const logout = ()=> {
        window.localStorage.removeItem('token');
        setAuth({});
      };
    


    return(
        <>
        {/* {books.map(book => {
            const isOrdered = 
        })} */}
  
         <Link to={`/login`}><button onClick={ logout }>Logout { auth.email }</button></Link>
        </>
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
