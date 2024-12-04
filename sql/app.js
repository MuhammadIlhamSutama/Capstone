const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('./db');
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Create a new user endpoint
app.post('/createUser', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send('Name, email, and password are required');
  }

  try {
    // Check if user already exists by email
    const searchQuery = 'SELECT * FROM users WHERE email = ?';
    const [searchResults] = await connection.promise().query(searchQuery, [email]);

    if (searchResults.length > 0) {
      console.log('User already exists');
      return res.status(409).send('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const insertQuery = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const [insertResults] = await connection.promise().query(insertQuery, [name, email, hashedPassword]);

    console.log('Created new user:', insertResults.insertId);
    return res.status(201).send('User created successfully');
  } catch (error) {
    console.error('Error during user creation:', error);
    return res.status(500).send('Server error');
  }
});

// Example endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const [results] = await connection.promise().query('SELECT user_id, name FROM users');
    console.log('Fetched results:', results);  // Log the fetched results
    res.json(results);
  } catch (error) {
    console.error('Error fetching users:', error);  // Log the error in detail
    res.status(500).send('Error fetching data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
