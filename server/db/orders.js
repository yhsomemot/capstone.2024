const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const fetchAllOrders = async () => {
    const SQL = `
      SELECT * FROM orders
    `;
    const result = await client.query(SQL);
    return result.rows;
  };
const fetchOrders = async ({ user_id }) => {
    const SQL = `
      SELECT * FROM orders WHERE user_id = $1
    `;
    const result = await client.query(SQL, [user_id]);
    return result.rows;
  };
const updateOrders = async ({ qty, book_id, user_id }) => {
    const SQL = `
      UPDATE orders
      SET qty=$1
      WHERE book_id=$2 AND user_id=$3
      RETURNING *
  `;
  const result = await client.query(SQL,[qty, book_id, user_id]);
  return result.rows[0];
  };
const createOrders = async ({ user_id, book_id, qty }) => {
    const SQL = `
      INSERT INTO orders( user_id, book_id, qty) VALUES($1, $2, $3) RETURNING *
    `;
    const result = await client.query(SQL, [user_id, book_id, qty ]);
    console.log(result)
    return result.rows[0];
  };
const deleteOrderProducts = async ({ user_id, book_id }) => {
    const SQL = `
    DELETE FROM orders WHERE user_id=$1 AND book_id=$2
  `;
    await client.query(SQL, [user_id, book_id]);
  };
const deleteWholeOrder = async ({ user_id, book_id }) => {
    const SQL = `
    DELETE FROM orders WHERE user_id=$1 AND id=$2
  `;
    await client.query(SQL, [user_id, book_id]);
  };
  

module.exports = {
    fetchAllOrders,
    fetchOrders,
    updateOrders,
    createOrders,
    deleteOrderProducts,
    deleteWholeOrder
}