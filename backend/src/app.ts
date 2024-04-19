// backend.js
import http, { IncomingMessage, ServerResponse } from "http";
import { db } from "./db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

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

    req.on("end", async () => {
      const data = JSON.parse(body);
      // console.log("data", data);
      const password = data.password;
      const hashedPassword = await bcrypt.hash(
        password,
        +process.env.AUTH_SALT!
      );
      console.log(hashedPassword);

      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [data.name, data.email, hashedPassword],
        (err, data: any) => {
          if (err) {
            res.statusCode = 401;
            res.statusMessage = "Failed to signup";
            return res.end();
          } else if (data.affectedRows !== 1) {
            res.statusCode = 500;
            res.statusMessage = "Internal Error";
            return res.end();
          }
          res.statusCode = 200;
          res.statusMessage = "Signup succesful";
          return res.end();
        }
      );
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
        async (e, data: any) => {
          if (e) {
            res.statusCode = 500;
            res.statusMessage = "Something went wrong!";
            return res.end();
          } else if (data.length === 0) {
            res.statusCode = 404;
            res.statusMessage = "User not found";
            return res.end();
          }
          const extData = data[0];
          const hashedPassword = extData.password;
          const typedPassword = incomingData.password;
          const isMatched = await bcrypt.compare(typedPassword, hashedPassword);
          if (isMatched) {
            res.statusCode = 200;
            res.statusMessage = "Login successful";
            res.end();
          } else {
            res.statusCode = 401;
            res.statusMessage = "Password does not matched";
          }
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
