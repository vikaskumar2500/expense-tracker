import http, { IncomingMessage, ServerResponse } from "http";
// Define your request handler function
function requestHandler(req: IncomingMessage, res: ServerResponse) {
  // Extract the request URL and method
  const { url, method } = req;

  // Handle different routes based on URL and method
  if (method === "POST" && url === "/user/signup") {
    res.writeHead(200, { "Content-Type": "text/plain" });

    res.end({ vikas: "kumar" });
  } else if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page");
  } else {
    // Handle 404 - Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
}

// Create an HTTP server with the request handler function
const server = http.createServer(requestHandler);

// Start the server on port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
