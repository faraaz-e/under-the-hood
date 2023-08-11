let products = require("../utils/productsData");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils/writeFile");

const getAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
};

const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./utils/productsData.json", products);
    resolve(newProduct);
  });
};

const update = (id, product) => {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    writeDataToFile("./utils/productsData.json", products);
    resolve(products[index]);
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    products = products.filter((p) => p.id !== id);
    writeDataToFile("./utils/productsData.json", products);
    resolve();
  });
};

module.exports = { getAll, getById, create, update, remove };
