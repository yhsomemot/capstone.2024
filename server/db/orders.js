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

const createOrder = async ({ user_id }) => {
    const CREATE_ORDER = `
    INSERT into orders (id, user_id, current_status) 
    VALUES($1,$2,$3) 
    RETURNING *
    `;
    const response = await client.query(CREATE_ORDER, [uuid.v4(), user_id, 'pending']);
    //return response;
    return response.rows[0];
  }

module.exports = {
    createOrder,
    fetchUsersOrders
}

