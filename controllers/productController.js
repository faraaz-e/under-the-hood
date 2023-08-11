const Product = require("../models/productModel");
const { getPostData } = require("../utils/writeFile");

/**
 * [GET: All products]
 * /api/products
 */

const getProducts = async (request, response) => {
  try {
    const products = await Product.getAll();
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(products)); //send data
  } catch (error) {
    console.log(error);
  }
};

/**
 * [GET: Product by id]
 * /api/products/:id
 */

const getProductById = async (request, response, id) => {
  try {
    const product = await Product.getById(id);
    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Product not found" }));
    } else {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(product)); //send data
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * [POST: Add new product]
 * /api/products
 */

const createProduct = async (request, response) => {
  try {
    const body = await getPostData(request);

    const { name, color, price } = JSON.parse(body);
    const product = { name, color, price };

    const newProduct = await Product.create(product);
    response.writeHead("201", { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        message: "Product added successfully",
        data: newProduct,
      })
    );
  } catch (error) {
    console.log(error);
  }
};

/**
 * [PUT: Update product]
 * /api/products/:id
 */

const updateProduct = async (request, response, id) => {
  try {
    const product = await Product.getById(id);

    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Product not found" }));
    } else {
      const body = await getPostData(request);
      const { name, color, price } = JSON.parse(body);
      const productData = {
        name: name || product.name,
        color: color || product.color,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          message: "Product updated successfully",
          data: updatedProduct,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * [DELETE: Delete product]
 * /api/products/:id
 */

const deleteProduct = async (request, response, id) => {
  try {
    const product = await Product.getById(id);
    if (!product) {
      response.writeHead(404, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ message: "Product not found" }));
    } else {
      await Product.remove(id);
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({ message: `Product ${id} deleted successfully` })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
