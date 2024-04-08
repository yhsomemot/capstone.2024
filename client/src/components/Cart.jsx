import { useEffect, useState } from "react";
import { API_URL } from "../App";

//get order
//post order
//delete order

export function Cart({ token }) {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        async function fetchUserCart() {
            try {
                const response = fetch(`${API_URL}/api/carts/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: token
                    }
                });
                const result = await response.json();
                setCart(result);
            } catch (error) {
            console.log(error);
        }
    }
    fetchUserCart(); 
    },[]);

    async function update

    return()
}