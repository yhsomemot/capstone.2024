const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchUsersOrders = async ({ user_id }) => {
  const SQL = `
    SELECT * FROM orders WHERE user_id=$1
  `;
  const result = await client.query(SQL, [user_id]);
  console.log(result.rows)
  return result.rows[result.rows.length - 1];
};

const createOrder = async ({ user_id }) => {
  const CREATE_ORDER = `
  INSERT into orders (id, user_id, order_status) 
  VALUES($1,$2,$3) 
  RETURNING *
  `;
  const response = await client.query(CREATE_ORDER, [uuid.v4(), user_id, 'pending']);
  //return response;
  return response.rows[0];
}

const fetchUserCart = async ({ order_id }) => {
  const SQL = `
    SELECT books.id, books.name, books.price, cart_products.qty FROM cart_products
    INNER JOIN books
    ON books.id = cart_products.book_id
    WHERE cart_products.order_id = $1
    `;
  const result = await client.query(SQL, [order_id]);
  return result.rows;
};

const addCartProduct = async ({ order_id, book_id, qty }) => {
  const SQL = `
      INSERT INTO cart_products(id, order_id, book_id, qty) VALUES($1, $2, $3, $4) RETURNING *
    `;
  const result = await client.query(SQL, [uuid.v4(), order_id, book_id, qty]);
  return result.rows[0];
};

const updateCartProductQty = async ({ qty, book_id, order_id }) => {
  const SQL = `
      UPDATE cart_products
      SET qty=$1 + qty
      WHERE book_id=$2 AND order_id=$3
      RETURNING *
  `;
  const result = await client.query(SQL, [qty, book_id, order_id]);
  return result.rows[0];
};


const deleteCartProduct = async ({ order_id, book_id }) => {
  const SQL = `
    DELETE FROM cart_products WHERE order_id=$1 AND book_id=$2 RETURNING *
  `;
  await client.query(SQL, [order_id, book_id]);
};

//create product?

module.exports = {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
  fetchUsersOrders,
  createOrder
}