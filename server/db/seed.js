const { client } = require('../client.js')
const { createUser } = require("./users.js")
const { createBook } = require("./book.js");
const { createOrders } = require('./orders.js');

//add a cart table? to keep track of status? no if delete cart is a thing.
const createTables = async () => {
    const SQL = `
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS book;
        CREATE TABLE users(
          id UUID DEFAULT gen_random_uuid(),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100),
          address VARCHAR(255),
          payment_info VARCHAR(16),
          is_admin BOOLEAN DEFAULT FALSE,
          PRIMARY KEY (id)
        );
        CREATE TABLE book(
          id UUID DEFAULT gen_random_uuid(),
          name VARCHAR(100) UNIQUE NOT NULL,
          price INTEGER DEFAULT 0,
          description VARCHAR(255),
          inventory INTEGER DEFAULT 0,
          PRIMARY KEY (id)
        );
        CREATE TABLE orders(
          id UUID DEFAULT gen_random_uuid(),
          user_id UUID REFERENCES users(id) NOT NULL,
          book_id UUID REFERENCES book(id) NOT NULL,
          qty INTEGER DEFAULT 1,
          CONSTRAINT unique_user_and_product_id UNIQUE (book_id, user_id),
          PRIMARY KEY (id)
        );
      `;
    await client.query(SQL);
};

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
        createBook({ name: 'foo', price: 9, description: 'fee fi foo fum', inventory: 20 }),
        createBook({ name: 'bar', price: 14 }),
        createBook({ name: 'bazz' }),
        createBook({ name: 'quq' }),
        createBook({ name: 'fip' }),
    ]);
};
// const seedOrders = async () => {
//     const [moe, lucy, ethyl, curly, foo, bar, bazz, quq, fip]  = await Promise.all([
//         createOrders({ user_id: moe.id, book_id: foo.id, qty: 1 }),
//         createOrders({ user_id: curly.id, book_id: bazz.id, qty: 6 }),
//         createOrders({ user_id: curly.id, book_id: foo.id, qty: 4 })
//       ]);
// };

module.exports = {
    createTables,
    seedUsers,
    seedBooks,
    // seedOrders
}