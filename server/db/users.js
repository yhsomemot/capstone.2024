const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchUsers = async () => {
    const SQL = `
      SELECT * FROM users;
    `;
    const result = await client.query(SQL);
    return result.rows;
  };
const createUser = async ({ email, password, address, payment_info, is_admin }) => {
    const SQL = `
        INSERT INTO users(id, email, password, address, payment_info, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
      `;
    const result = await client.query(SQL, [uuid.v4(), email, await bcrypt.hash(password, 5), address, payment_info, is_admin]);
    return result.rows[0];
  };

module.exports = {
    fetchUsers,
    createUser
}