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

  const fetchGenre = async () => {
    const SQL = `
      SELECT * FROM genre;
      `;
    const result = await client.query(SQL);
    return result.rows;
};
  const fetchGenreBooks = async ({id}) => {
    const SQL = `
        SELECT * FROM books
        WHERE genre_id=$1
    `;
    const result = await client.query(SQL,[id]);
    return result.rows;
};

const fetchSingleBook = async ({id}) => {
    const SQL = `
    SELECT * FROM books WHERE id=$1
    `;
    const result = await client.query(SQL, [id]);
    return result.rows[0];
  };

const createGenre = async ({ name }) => {
    const SQL = `
      INSERT INTO genre(name) VALUES($1) RETURNING *
    `;
    const result = await client.query(SQL, [name]);
    return result.rows[0];
  };

  //create books
const createBook = async ({ name, author, price, description, inventory, coverimage, genre_id }) => {
    const SQL = `
      INSERT INTO books(id, name, author, price, description, inventory, coverimage, genre_id) VALUES($1, $2, $3, $4, $5, $6, $7, (SELECT id FROM genre WHERE name=$8)) RETURNING *
    `;
    const result = await client.query(SQL, [uuid.v4(), name, author, price, description, inventory, coverimage, genre_id]);
    return result.rows[0];
  };
const updateBook = async ({ name, price, description, inventory, coverimage, id }) => {
    const SQL = `
      UPDATE books
      SET name=$1, price=$2, description=$3, inventory=$4, coverimage=$5
      WHERE id=$6
      RETURNING *
    `;
    const result = await client.query(SQL,[name, price, description, inventory, coverimage, id]);
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
    deleteBook,
    fetchGenreBooks,
    fetchGenre,
    createGenre
}