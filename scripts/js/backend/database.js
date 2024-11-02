import express from "express";
import mysql from "mysql"

const app = express();
const PORT = 4040;
app.use(express.json());

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodejstest"
});

app.post("/save", async (req, res) => {
  if (error) throw new Error("Failed to connect to db");
  console.log("Connected to db !");

  let sql = ``

  connection.query(sql, (error, result) => {

  });
});

app.listen(PORT, () => {
  console.log("Port activated for database.");
});