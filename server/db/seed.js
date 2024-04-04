const { client } = require('../client.js')
const { createUser } = require("./users.js")
const { createBook } = require("./books.js");
const { createOrders } = require('./orders.js');

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
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(100) UNIQUE, 
          PRIMARY KEY (id)
        );
        CREATE TABLE books(
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(100) UNIQUE NOT NULL,
          price INTEGER DEFAULT 0,
          description VARCHAR(255),
          inventory INTEGER DEFAULT 0,
          coverimage TEXT NOT NULL,
          genre_name TEXT REFERENCES genre(name),
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
const seedUsers = async () => {
  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ email: 'moe@email.com', password: 'm_pw', address: 'Texas', is_admin: false }),
    createUser({ email: 'lucy@email.com', password: 'l_pw', address: 'Canada', is_admin: true }),
    createUser({ email: 'ethyl@email.com', password: 'e_pw', address: 'Norway', is_admin: false }),
    createUser({ email: 'curly@email.com', password: 'c_pw', address: 'Miami', is_admin: false })
  ]);
};
const seedBooks = async () => {
  const [foo, bar, bazz, quq, fip] = await Promise.all([
    createBook({ name: 'foo', price: 9, description: 'fee fi foo fum', inventory: 20, coverimage: 'https://picsum.photos/200/300' }),
    createBook({ name: 'bar', price: 14, coverimage: 'https://picsum.photos/200/300' }),
    createBook({ name: 'bazz', coverimage: 'https://picsum.photos/200/300' }),
    createBook({ name: 'quq', coverimage: 'https://picsum.photos/200/300' }),
    createBook({ name: 'fip', coverimage: 'https://picsum.photos/200/300' }),
  ]);
};

const seedGenre = async () => {
  
}

module.exports = {
  createTables,
  seedUsers,
  seedBooks,
  // seedTable
}