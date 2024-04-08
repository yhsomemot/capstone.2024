const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const fetchCarts = async () => {
    const SQL = `
      SELECT * FROM carts
    `;
    const result = await client.query(SQL);
    return result.rows;
  };

const fetchUserCart = async ({ user_id }) => {
    const SQL = `
      SELECT * FROM carts WHERE user_id = $1
    `;
    const result = await client.query(SQL, [user_id]);
    return result.rows;
  };

const updateCartProductQty = async ({ qty, book_id, user_id }) => {
    const SQL = `
      UPDATE carts
      SET qty=$1
      WHERE book_id=$2 AND user_id=$3
      RETURNING *
  `;
  const result = await client.query(SQL,[qty, book_id, user_id]);
  return result.rows[0];
  };

const addCartProduct = async ({ user_id, book_id, qty }) => {
    const SQL = `
      INSERT INTO carts( user_id, book_id, qty) VALUES($1, $2, $3) RETURNING *
    `;
    const result = await client.query(SQL, [user_id, book_id, qty ]);
    console.log(result)
    return result.rows[0];
  };

const deleteCartProduct = async ({ user_id, book_id }) => {
    const SQL = `
    DELETE FROM carts WHERE user_id=$1 AND book_id=$2 RETURNING *
  `;
    await client.query(SQL, [user_id, book_id]);
  };

// const deleteWholeCart = async ({ user_id, book_id }) => {
//     const SQL = `
//     DELETE FROM carts WHERE user_id=$1 AND id=$2
//   `;
//     await client.query(SQL, [user_id, book_id]);
//   };
  

module.exports = {
    fetchUserCart,
    fetchCarts,
    updateCartProductQty,
    addCartProduct,
    deleteCartProduct,
    // deleteWholeCart
}