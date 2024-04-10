const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchUsersOrders = async ({user_id}) => {
    const SQL = `
      SELECT * FROM orders WHERE user_id=$1
    `;
    const result = await client.query(SQL, [user_id]);
    console.log(result.rows)
    return result.rows[result.rows.length-1];
};

// const fetchCart = async ({ order_id }) => {
//     const SQL = `
//     SELECT books.id, books.name, books.price, carts.qty FROM carts
//     INNER JOIN books
//     ON books.id = carts.book_id
//     WHERE carts.order_id = $1
//     `;
//     const result = await client.query(SQL, [uuid.v4(), order_id]);
//     return result.rows[0];
// };

module.exports = {
    // createOrder,
    fetchUsersOrders
}

