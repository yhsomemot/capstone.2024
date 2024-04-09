const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const fetchUserCart = async ({ order_id }) => {
  const SQL = `
    SELECT books.id, books.name, books.price, carts.qty FROM carts
    INNER JOIN books
    ON books.id = carts.book_id
    WHERE carts.order_id = $1
    `;
  const result = await client.query(SQL, [order_id]);
  return result.rows;
};

const addCartProduct = async ({ order_id, book_id, qty }) => {
  const SQL = `
      INSERT INTO carts(id, order_id, book_id, qty) VALUES($1, $2, $3, $4) RETURNING *
    `;
  const result = await client.query(SQL, [order_id, book_id, qty]);
  console.log(result)
  return result.rows[0];
};

const updateCartProductQty = async ({ qty, book_id, order_id }) => {
  const SQL = `
      UPDATE carts
      SET qty=$1
      WHERE book_id=$2 AND order_id=$3
      RETURNING *
  `;
  const result = await client.query(SQL, [qty, book_id, order_id]);
  return result.rows[0];
};


const deleteCartProduct = async ({ order_id, book_id }) => {
  const SQL = `
    DELETE FROM carts WHERE order_id=$1 AND book_id=$2 RETURNING *
  `;
  await client.query(SQL, [order_id, book_id]);
};

// const deleteWholeCart = async ({ order_id, book_id }) => {
//     const SQL = `
//     DELETE FROM carts WHERE order_id=$1 AND id=$2
//   `;
//     await client.query(SQL, [order_id, book_id]);
//   };


module.exports = {
  fetchUserCart,
  updateCartProductQty,
  addCartProduct,
  deleteCartProduct,
  // deleteWholeCart
}