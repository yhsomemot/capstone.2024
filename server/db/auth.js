const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT || 'shhh';


const authenticate = async ({ email, password }) => {
    const SQL = `
        SELECT id, password, email
        FROM users
        WHERE email = $1
      `;
    const result = await client.query(SQL, [email]);
    console.log(result)
    if (!result.rows.length || (await bcrypt.compare(password, result.rows[0].password)) === false) {
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    const token = await jwt.sign({ id: result.rows[0].id }, JWT);
    return { token: token };
  };
const findUserWithToken = async (token) => {
    let id;
    console.log("insidefinduserwithtoken")
    console.log(token)
    try {
      const payload = await jwt.verify(token, JWT);
      id = payload.id;
    } catch (ex) {
      const error = Error('not authorized1');
      error.status = 401;
      throw error;
  
    }
    const SQL = `
        SELECT id, email, is_admin FROM users WHERE id=$1;
      `;
    const result = await client.query(SQL, [id]);
    if (!result.rows.length) {
      const error = Error('not authorized');
      error.status = 401;
      throw error;
    }
    return result.rows[0];
  };

  const isLoggedIn = async (req, res, next) => {
    try {
      req.user = await findUserWithToken(req.headers.authorization);
      next();
    }
    catch (ex) {
      next(ex);
    }
  };


  module.exports = {
    client,
    authenticate,
    findUserWithToken,
    isLoggedIn
  }