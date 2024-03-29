const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchAllOrders = async () => {
    const SQL = `
      SELECT * FROM carted_products
    `;
    const result = await client.query(SQL);
    return result.rows;
  };

module.exports = {
    fetchAllOrders
}