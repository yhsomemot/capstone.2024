const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchBooks = async () => {
    const SQL = `
      SELECT * FROM books;
    `;
    const result = await client.query(SQL);
    return result.rows;
  };
const fetchSingleBook = async ({id}) => {
    const SQL = `
    SELECT * FROM books WHERE id=$1
    `;
    const result = await client.query(SQL, [id]);
    return result.rows[0];
  };
const createBook = async ({ name, price, description, inventory }) => {
    const SQL = `
      INSERT INTO books(id, name, price, description, inventory) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const result = await client.query(SQL, [uuid.v4(), name, price, description, inventory]);
    return result.rows[0];
  };
const updateBook = async ({ name, price, description, inventory, id }) => {
    const SQL = `
      UPDATE books
      SET name=$1, price=$2, description=$3, inventory=$4
      WHERE id=$5
      RETURNING *
    `;
    const result = await client.query(SQL,[name, price, description, inventory, id]);
    console.log(result)
    return result.rows[0];
  };
const deleteBook = async ({ id }) => {
    const SQL = `
    DELETE FROM books WHERE id = $1
  `;
    await client.query(SQL, [id]);
  };

module.exports = {
    fetchBooks,
    fetchSingleBook,
    createBook,
    updateBook,
    deleteBook
}