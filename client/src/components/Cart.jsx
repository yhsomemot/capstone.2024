import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../App";

//get order
//post order
//delete order

export function Cart({ token }) {
    const [carts, setCarts] = useState([]);
    const { id } = useParams();
    const { orderId } = useParams();
    const { bookId } = useParams();
    const [auth, setAuth] = useState({})

    useEffect(() => {
        async function fetchUserCart() {
            try {
                const response = fetch(`${API_URL}/api/carts`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                });
                const result = await response.json();
                setCarts(result);
                console.log("cart", result)
                if (response.ok) {
                    setAuth(result);
                }
                else {
                    window.localStorage.removeItem('token');
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserCart();
    }, []);


    async function updateCartProductQty() {
        try {
            const response = await fetch(`${API_URL}/api/carts/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteCartProduct() {
        try {
            console.log("book has been returned!")
            const response = await fetch(`${API_URL}/api/carts/${bookId}`, {
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
            <table>
                <thead className="">
                    <tr>
                        <th>name</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody className="">
                    {carts.map((cart) => {
                        return (
                            <tr key={cart.id}>
                                <td>{cart.name}</td>
                                <td>
                                    <button onClick={async () => await deleteCartProduct(carts.id)}>
                                        Return </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}