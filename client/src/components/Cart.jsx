import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

//get order
//post order
//delete order

export function Cart({ token }) {
    const [carts, setCarts] = useState([]);
    const { bookId } = useParams();
    // const [auth, setAuth] = useState({})
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchUserCart() {
            try {
                const response = await fetch(`${API_URL}/api/mycart`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setCarts(result);
                console.log("cart", result)
                // if (response.ok) {
                //     setToken(result);
                // }
                // else {
                //     window.localStorage.removeItem('token');
                // }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserCart();
    }, [token]);


    async function updateCartProductQty() {
        try {
            const response = await fetch(`${API_URL}/api/mycart`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(),
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartProduct() {
        try {
            const response = await fetch(`${API_URL}/api/mycart/${bookId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <h1>My cart</h1>
            {/* <table>
                <thead className="">
                    <tr>
                        <th>name</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody className="">
                    {carts.map((cart) => {
                        return (
                            <tr key={cart.id}>
                                <td>{cart.name}</td>
                                <td>{cart.qty}</td>
                                <td>
                                    <button onClick={async () => await deleteCartProduct(carts.id)}>
                                        delete </button>
                                </td>
                                <td>
                                    <button onClick={async () => await updateCartProductQty(carts.id)}> add </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                <button onClick={() => navigate("/checkout")}>Check out</button> */}
                
            {!token ? (<div> <h1>please log in </h1></div>) : (<div><table>
                <thead className="">
                    <tr>
                        <th>name</th>
                        <th>quantity</th>
                    </tr>
                </thead>
                <tbody className="">
                    {carts.map((cart) => {
                        return (
                            <tr key={cart.id}>
                                <td>{cart.name}</td>
                                <td>{cart.qty}</td>
                                <td>
                                    <button onClick={async () => await deleteCartProduct(carts.id)}>
                                        delete </button>
                                </td>
                                <td>
                                    <button onClick={async () => await updateCartProductQty(carts.id)}> add </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
                <button onClick={() => navigate("/checkout")}>Check out</button>   </div>

            )}

        </>
    )
}