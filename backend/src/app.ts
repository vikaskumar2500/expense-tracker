// backend.js
import http, { IncomingMessage, ServerResponse } from "http";
import { db } from "./db";

function requestHandler(req: IncomingMessage, res: ServerResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  const { url, method } = req;

  if (method === "POST" && url === "/user/signup") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const data = JSON.parse(body);
      // console.log("data", data);
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [data.name, data.email, data.password],
        (err, res) => {
          if (err) {
            console.error("Error:", err);
          } else {
            console.log("Inserted successfully:", res);
          }
        }
      );
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("success");
    });
  } else if (method === "POST" && url === "/user/signin") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const incomingData = JSON.parse(body);
      db.query(
        "select email, password from users where email = ?",
        [incomingData.email],
        (e, data: any) => {
          if(data.length===0) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("User not found");
          }
          else if (e) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end(e?.message);
          }
          const extData = data[0];
          res.writeHead(200, { "Content-Type": "text/plain" });
          return res.end(JSON.stringify(extData));
        }
      );
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Not Found");
  }
}

const server = http.createServer(requestHandler);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
