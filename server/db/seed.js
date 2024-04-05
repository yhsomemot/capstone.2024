const { client } = require('../client.js')
const { createUser } = require("./users.js")
const { createBook } = require("./books.js");
const { createOrders } = require('./orders.js');
const { createGenre } = require('./books.js');

//add a cart table? to keep track of status? no if delete cart is a thing.
const createTables = async () => {
  const SQL = `
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS books;
        DROP TABLE IF EXISTS genre;
        
        CREATE TABLE users(
          id UUID DEFAULT gen_random_uuid(),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100),
          address TEXT,
          payment_info VARCHAR(16),
          is_admin BOOLEAN DEFAULT FALSE,
          PRIMARY KEY (id)
        );
        CREATE TABLE genre(
          id SERIAL,
          name VARCHAR(100) UNIQUE, 
          PRIMARY KEY (id)
        );
        CREATE TABLE books(
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(100) UNIQUE NOT NULL,
          author VARCHAR(255) NOT NULL,
          price INTEGER DEFAULT 0,
          description VARCHAR(255),
          inventory INTEGER DEFAULT 0,
          coverimage TEXT NOT NULL,
          genre_id INTEGER REFERENCES genre(id) NOT NULL,
          PRIMARY KEY (id)
        );
        CREATE TABLE orders(
          id UUID DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) NOT NULL,
          book_id UUID REFERENCES books(id) NOT NULL,
          qty INTEGER DEFAULT 1,
          CONSTRAINT unique_user_and_book_id UNIQUE (book_id, user_id),
          PRIMARY KEY (id)
        );
        CREATE TABLE carts(
          id UUID DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) NOT NULL,
          order_id UUID REFERENCES orders(id) NOT NULL,
          CONSTRAINT unique_user_and_order_id UNIQUE (order_id, user_id),
          PRIMARY KEY (id)
          );
    
      `;
  await client.query(SQL);
};
// const seedTable = async () => {
//   const [moe, lucy, ethyl, curly] = await Promise.all([
//     createUser({ email: 'moe@email.com', password: 'm_pw', address: 'Texas', is_admin: false }),
//     createUser({ email: 'lucy@email.com', password: 'l_pw', address: 'Canada', is_admin: true }),
//     createUser({ email: 'ethyl@email.com', password: 'e_pw', address: 'Norway', is_admin: false }),
//     createUser({ email: 'curly@email.com', password: 'c_pw', address: 'Miami', is_admin: false })
//   ]);
//   const [foo, bar, bazz, quq, fip] = await Promise.all([
//     createBook({ name: 'foo', price: 9, description: 'fee fi foo fum', inventory: 20, coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'bar', price: 14, coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'bazz', coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'quq', coverimage: 'https://picsum.photos/200/300' }),
//     createBook({ name: 'fip', coverimage: 'https://picsum.photos/200/300' })
//   ]);
//   await Promise.all([
//     createOrders({ user_id: moe.id, book_id: foo.id, qty: 1 }),
//     createOrders({ user_id: curly.id, book_id: bazz.id, qty: 6 }),
//     createOrders({ user_id: curly.id, book_id: foo.id, qty: 4 })
//   ]);
// }

const seedGenre = async () => {
  const [Fantasy, NonFiction, Romance, Science_Fiction, Historical] = await Promise.all([
    createGenre({ name: 'Fantasy' }),
    createGenre({ name: 'NonFiction' }),
    createGenre({ name: 'Romance' }),
    createGenre({ name: 'Science_Fiction' }),
    createGenre({ name: 'Historical' })
  ])
};
const seedUsers = async () => {
  const [moe, lucy, ethyl, curly,] = await Promise.all([
    createUser({ email: 'moe@email.com', password: 'm_pw', address: 'Texas', is_admin: false }),
    createUser({ email: 'lucy@email.com', password: 'l_pw', address: 'Canada', is_admin: true }),
    createUser({ email: 'ethyl@email.com', password: 'e_pw', address: 'Norway', is_admin: false }),
    createUser({ email: 'curly@email.com', password: 'c_pw', address: 'Miami', is_admin: false })
  ]);
};
const seedBooks = async () => {
  const [foo, bar, bazz, quq, fip, pippin, lorel, dog, cat, bat] = await Promise.all([
    createBook({ name: 'foo', author: 'foo', price: 9, description: 'fee fi foo fum', inventory: 20, coverimage: 'https://picsum.photos/200/300', genre_id: 'Fantasy' }),
    createBook({ name: 'bar', author: 'foo', price: 14, coverimage: 'https://picsum.photos/200/300', genre_id: 'Fantasy' }),
    createBook({ name: 'bazz', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Science_Fiction' }),
    createBook({ name: 'quq', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Historical' }),
    createBook({ name: 'fip', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Science_Fiction' }),
    createBook({ name: 'pippin', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Science_Fiction' }),
    createBook({ name: 'lorel', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'NonFiction' }),
    createBook({ name: 'dog', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Romance' }),
    createBook({ name: 'cat', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Romance' }),
    createBook({ name: 'bat', author: 'foo', coverimage: 'https://picsum.photos/200/300', genre_id: 'Science_Fiction' }),
  ]);
};






module.exports = {
  createTables,
  seedUsers,
  seedBooks,
  seedGenre
  // seedTable
}