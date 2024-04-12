// make a check out page that takes in the user's dummy billing information.
// have a confirmation page?
import { useEffect, useState } from "react";
import { API_URL } from "../App";

export function Checkout({ token }) {
    const [state, setState] =useState("");
    const [card, setCard] = useState("");

    //show list of books
    //have sum of books
    const submitCheckout = ev => {
        ev.preventDefault();
        checkout({ state, card });

    }

    async function checkout() {
        try {
            const response = await fetch(`${API_URL}/api/checkout/`, {
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
            <h1>Checkout page</h1>

            <form>
                <label></label>
                <label>
                    <input type="text" value={state} placeholder="State" onChange={(e) => { setState(e.target.value) }} />
                </label>
                <br />
                <label>
                    <input type="text" value={card} placeholder="Credit Card Number" onChange={(e) => { setCard(e.target.value) }} />
                </label>
                <br />
                {/* Thank you for shopping at bookstore! */}
                <button onClick={submitCheckout} disabled={!state || !card}>Check Out</button>
            </form>

            {/* <button onClick={async () => await checkout()}>Check out</button> */}
        </>
    )
}