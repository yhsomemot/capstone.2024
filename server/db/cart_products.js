const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchUserCart = async (user_id) => {
  const SQL = `
    SELECT books.id, books.name, books.price, cart_products.qty FROM cart_products
    INNER JOIN books
    ON books.id = cart_products.book_id
    WHERE cart_products.user_id = $1
  `;
  const result = await client.query(SQL, [user_id]);
  return result.rows;
};

const addCartProduct = async ({ user_id, book_id, qty }) => {
  const SQL = `
      INSERT INTO cart_products(id, user_id, book_id, qty) VALUES($1, $2, $3, $4) RETURNING *
    `;
  const result = await client.query(SQL, [uuid.v4(), user_id, book_id, qty]);
  return result.rows[0];
};

const updateCartProductQty = async ({ qty, book_id, user_id }) => {
  const SQL = `
      UPDATE cart_products
      SET qty=$1
      WHERE book_id=$2 AND user_id=$3
      RETURNING *
  `;
  const result = await client.query(SQL, [qty, book_id, user_id]);
  return result.rows[0];
};

const deleteCartProduct = async (user_id, book_id) => {
  const SQL = `
    DELETE FROM cart_products WHERE user_id=$1 AND book_id=$2
  `;
  await client.query(SQL, [user_id, book_id]);
};

const checkout = async (user_id) => {
  const SQL = `
  DELETE FROM cart_products WHERE user_id=$1
  `;
  await client.query(SQL, [user_id]);
};

module.exports = {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
  checkout
}