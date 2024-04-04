const { client } = require('../client.js')

const fetchGenre = async () => {
    const SQL = `
      SELECT * FROM genre
      `;
    const result = await client.query(SQL);
    return result.rows;
};

const createGenre = async ({ name }) => {
    const SQL = `
      INSERT INTO genre(name) VALUES($1) RETURNING *
    `;
    const result = await client.query(SQL, [name]);
    return result.rows[0];
  };

    // INSERT INTO genre (name) VALUES ('Fantasy');
    //       INSERT INTO genre (name) VALUES ('Non-Fiction');
    //       INSERT INTO genre (name) VALUES ('Fiction');
    //       INSERT INTO genre (name) VALUES ('Sci-Fi');
    //       INSERT INTO genre (name) VALUES ('Historical');

module.exports = {
    fetchGenre,
    createGenre
}