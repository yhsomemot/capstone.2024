const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const checkout = async (user_id) => {
  const SQL = `
  DELETE FROM cart_products WHERE user_id=$1
  `;
  await client.query(SQL, [user_id]);
};

module.exports = {
 
  }