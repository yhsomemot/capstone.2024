const { client } = require('../client.js')
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fetchProducts = async () => {
    const SQL = `
      SELECT * FROM products;
    `;
    const result = await client.query(SQL);
    return result.rows;
  };
const fetchSingleProduct = async ({id}) => {
    const SQL = `
    SELECT * FROM products WHERE id=$1
    `;
    const result = await client.query(SQL, [id]);
    return result.rows[0];
  };
const createProduct = async ({ name, price, description, inventory }) => {
    const SQL = `
      INSERT INTO products(id, name, price, description, inventory) VALUES($1, $2, $3, $4, $5) RETURNING *
    `;
    const result = await client.query(SQL, [uuid.v4(), name, price, description, inventory]);
    return result.rows[0];
  };
const updateProduct = async ({ name, price, description, inventory, id }) => {
    const SQL = `
      UPDATE products
      SET name=$1, price=$2, description=$3, inventory=$4
      WHERE id=$5
      RETURNING *
    `;
    const result = await client.query(SQL,[name, price, description, inventory, id]);
    console.log(result)
    return result.rows[0];
  };
const deleteProduct = async ({ id }) => {
    const SQL = `
    DELETE FROM products WHERE id = $1
  `;
    await client.query(SQL, [id]);
  };

module.exports = {
    fetchProducts,
    fetchSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct
}