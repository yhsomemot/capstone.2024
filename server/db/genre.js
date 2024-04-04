// const { client } = require('../client.js')

// // const fetchGenre = async () => {
// //     const SQL = `
// //       SELECT * FROM genre
// //       `;
// //     const result = await client.query(SQL);
// //     return result.rows;
// // };

// // const fetchSingleGenre = async ({id}) => {
// //     const SQL = `
// //       SELECT * FROM genre WHERE id=$1
// //       `;
// //     const result = await client.query(SQL, [id]);
// //     return result.rows[0];
// // };

// // const createGenre = async ({ name }) => {
// //     const SQL = `
// //       INSERT INTO genre(name) VALUES($1) RETURNING *
// //     `;
// //     const result = await client.query(SQL, [name]);
// //     return result.rows[0];
// //   };

// //   const seeCategoryProducts = async (id) => {
// //     const SQL = `
// //       SELECT *
// //       FROM products
// //       WHERE category_id=$1
// //     `;
// //     const response = await client.query(SQL, [id]);
// //     return response.rows[0];
// //   };

// module.exports = {
//     // fetchGenre,
//     // createGenre,
//     // fetchSingleGenre,

// }