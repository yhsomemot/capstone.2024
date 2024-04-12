// make a check out page that takes in the user's dummy billing information.
// have a confirmation page?
import { API_URL } from "../App";

export function Checkout() {

    async function checkout() {
        try {
            const response = await fetch(`${API_URL}/api/mycart/checkout`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:  `Bearer ${token}`
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

        <button onClick={async () => await checkout()}>Check out</button>
        </>
    )
}