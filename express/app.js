const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require('cors'),
app = express(),
port = 3000

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
  } else {
    console.log("Успешно подключено к базе данных SQLite");
  }
});

app.post('/api/transactions', (req, res) => {
  // console.log("req: ", req);
  console.log("body: ", req.body);
  console.log("res ", res)
  const { dateTime, author, sum, category, comment } = req.body;
  const sql = "INSERT INTO transactions (dateTime, author, sum, category, comment) VALUES (?, ?, ?, ?, ?)";
  const params = [dateTime, author, sum, category, comment];

  db.run(sql, params, function (err) {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Ошибка при добавлении транзакции");
    }
    res.status(201).json({ id: this.lastID, ...req.body });
  });
});

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("server started on port: ", port)
})