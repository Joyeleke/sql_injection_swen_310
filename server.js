const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware SetUp 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = new sqlite3.Database(':memory:');

// Initialize a table
db.serialize(() => {
  db.run('CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT)');
  db.run("INSERT INTO users (username, password) VALUES ('admin', 'password123'), ('user', 'userpass')");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const validateInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  next();
};

// Unsafe route (prone to SQL injection)
app.post('/unsafe-login', validateInput, (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ query, result: 'No users found.' });
    }

    res.json({ query, result: rows });
  });
});

// Safe route (prevents SQL injection)
app.post('/safe-login', validateInput, (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

  //Paramaterized Query
  db.all(query, [username, password], (err, rows) => {
    if (err) {
      console.error('Database error:', err.message);
      return res.status(500).json({ error: 'Database error.' });
    }

    if (rows.length === 0) {
      return res.status(404).json({ query, result: 'No users found.' });
    }

    res.json({ query, result: rows });
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/** 
 * Todo
 * - Find out how to package it using docker
 * - Make a more complex table (or make it the same as the one in the examples)
 * - add a way to start to package.json
*/