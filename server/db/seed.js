const { client } = require('../client.js')
const { createUser } = require("./users.js")
const { createProduct } = require("./products.js")

const createTables = async () => {
    const SQL = `
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
        CREATE TABLE users(
          id UUID DEFAULT gen_random_uuid(),
          email VARCHAR(100) UNIQUE NOT NULL,
          password VARCHAR(100),
          address VARCHAR(255),
          payment_info VARCHAR(16),
          is_admin BOOLEAN DEFAULT FALSE,
          PRIMARY KEY (id)
        );
        CREATE TABLE products(
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
          product_id UUID REFERENCES products(id) NOT NULL,
          qty INTEGER DEFAULT 1,
          CONSTRAINT unique_user_and_product_id UNIQUE (product_id, user_id),
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
const seedProducts = async () => {
    const [foo, bar, bazz, quq, fip] = await Promise.all([
        createProduct({ name: 'foo', price: 9, description: 'fee fi foo fum', inventory: 20 }),
        createProduct({ name: 'bar', price: 14 }),
        createProduct({ name: 'bazz' }),
        createProduct({ name: 'quq' }),
        createProduct({ name: 'fip' }),
    ]);
  }

module.exports = {
    createTables,
    seedUsers,
    seedProducts
}