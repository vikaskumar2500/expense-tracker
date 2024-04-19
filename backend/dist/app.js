"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend.js
const http_1 = __importDefault(require("http"));
const db_1 = require("./db");
function requestHandler(req, res) {
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
            console.log("data", data);
            db_1.db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [data.name, data.email, data.password], (err, res) => {
                if (err) {
                    console.error("Error:", err);
                }
                else {
                    console.log("Inserted successfully:", res);
                }
            });
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("success");
        });
    }
    else if (method === "GET" && url === "/") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About page");
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Not Found");
    }
}
const server = http_1.default.createServer(requestHandler);
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
