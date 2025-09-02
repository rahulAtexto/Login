import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "texto",
  port:3306
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected");
});

export default db;
