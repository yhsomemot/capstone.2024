import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../App";

export function Cart({ token }) {
    const [carts, setCarts] = useState([]);
    // const { bookId } = useParams();
    const navigate = useNavigate();
    const [qty, setQty] = useState("")


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
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserCart();
    }, [token]);

    const submitQty = ev => {
        ev.preventDefault();
        updateCartProductQty({qty})
    }
    async function updateCartProductQty(bookId) {
        try {
            const response = await fetch(`${API_URL}/api/mycart/${bookId}`, {
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

    async function deleteCartProduct(bookId) {
        console.log(bookId)
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
            console.log(error);
        }
    }



    return (
        <>
            <h1>My cart</h1>
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
                                    <form action="">
                                        <input type="number" placeholder="qty" min="1" max= "10" onChange={((e) => { setQty(e.target.value) })}/>
                                    </form>
                                </td>
                                <td><button onClick={submitQty}> add </button></td>                             
                                <td>
                                    <button onClick={async () => await deleteCartProduct(cart.id)}>
                                        delete </button>
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