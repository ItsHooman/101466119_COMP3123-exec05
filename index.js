const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(express.json());

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'home.html'));
});

app.get('/profile', (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data.');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading user data.');
    } else {
      const user = JSON.parse(data);
      if (user.username !== username) {
        res.json({ status: false, message: 'User Name is invalid' });
      } else if (user.password !== password) {
        res.json({ status: false, message: 'Password is invalid' });
      } else {
        res.json({ status: true, message: 'User Is valid' });
      }
    }
  });
});

app.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  res.send(`<b>${username} successfully logged out.</b>`);
});

app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
