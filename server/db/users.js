const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchUser = async (user_id) => {
    const SQL = `
      SELECT * FROM users;
    `;
    const result = await client.query(SQL,[user_id]);
    return result.rows;
  };
  // const fetchUsers = async () => {
  //   const SQL = `
  //     SELECT * FROM users;
  //   `;
  //   const result = await client.query(SQL,[]);
  //   return result.rows;
  // };
const createUser = async ({ email, password, address, payment_info, is_admin }) => {
    const SQL = `
        INSERT INTO users(id, email, password, address, payment_info, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
      `;
    const result = await client.query(SQL, [uuid.v4(), email, await bcrypt.hash(password, 5), address, payment_info, is_admin]);
    return result.rows[0];
  };
const updateUser = async ({ email, password, address, payment_info, is_admin, id }) => {
    const SQL = `
      UPDATE users
      SET email=$1, password=$2, address=$3, payment_info=$4, is_admin=$5
      WHERE id=$6
      RETURNING *
    `;
    const result = await client.query(SQL,[email, await bcrypt.hash(password, 5), address, payment_info, is_admin, id ]);
    return result.rows[0];
  };
const deleteUser = async ({id}) => {
    const SQL = `
    DELETE FROM users WHERE id = $1
      `;
    await client.query(SQL, [id]);
  };


module.exports = {
    fetchUser,
    createUser,
    updateUser,
    deleteUser
}