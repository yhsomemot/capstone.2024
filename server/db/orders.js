const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchOrders = async () => {
    const SQL = `
      SELECT * FROM orders
    `;
    const result = await client.query(SQL);
    return result.rows;
};

const fetchUsersOrders = async ({user_id}) => {
    const SQL = `
      SELECT * FROM orders WHERE user_id=$1
    `;
    const result = await client.query(SQL, [user_id]);
    return result.rows;
};

const createOrder = async ({ user_id }) => {
    const SQL = `
    INSERT INTO orders(id, user_id) VALUES($1, $2) RETURNING *
    `;
    const result = await client.query(SQL, [uuid.v4(), user_id]);
    return result.rows[0];
};

module.exports = {
    fetchOrders,
    createOrder,
    fetchUsersOrders
}