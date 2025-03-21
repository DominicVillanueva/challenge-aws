import jwt from "jsonwebtoken";

const SECRET_KEY = "test_key_secret_token";
const token = jwt.sign({ sub: "usuario123" }, SECRET_KEY, { expiresIn: "1h" });

console.log("Token JWT:", token);
