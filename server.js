const http = require("http");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");

const server = http.createServer((request, response) => {
  if (request.url === "/api/v1/products" && request.method === "GET") {
    getProducts(request, response);
  } else if (
    request.url.match(/\/api\/v1\/products\/([0-9]+)/) &&
    request.method === "GET"
  ) {
    const id = request.url.split("/").pop();
    getProductById(request, response, id);
  } else if (request.url === "/api/v1/products" && request.method === "POST") {
    createProduct(request, response);
  } else if (
    request.url.match(/\/api\/v1\/products\/([0-9]+)/) &&
    request.method === "PUT"
  ) {
    const id = request.url.split("/").pop();
    updateProduct(request, response, id);
  } else if (
    request.url.match(/\/api\/v1\/products\/([0-9]+)/) &&
    request.method === "DELETE"
  ) {
    const id = request.url.split("/").pop();
    deleteProduct(request, response, id);
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Data not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
