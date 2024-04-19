"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
exports.db = mysql2_1.default.createPool({
    database: "expense",
    host: "localhostexpense",
    port: 3306,
    password: "vikas",
    user: "root",
});
