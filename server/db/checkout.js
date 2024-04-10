const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkoutCart = async ({user_id}) => {
    const SQL = `
    DELETE from cart_products
    WHERE order_id IN (SELECT id FROM carts WHERE user_id = $1)
    `;
    await client.query(SQL, [user_id])
;}

module.exports = {
 
  }