"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer((req, res) => {
    if (req.url === "/user") {
        res.write(`
    <html>  
    <head></head>
    <body>
      <main>  
        <div>User Dashaboard</div>
      </main>
    </body>
    </html>
    
  `);
        return res.end();
    }
    res.write(`
    <html>  
    <head></head>
    <body>
      <main>  
        <div>Vikas Kumard</div>
      </main>
    </body>
    </html>
    
  `);
    res.end();
});
server.listen(3000);
