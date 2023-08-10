const http = require("http");
const products = require("./utils/productData");

const server = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/api/products") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(products)); //send data
  } else {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ message: "Data Not found" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
