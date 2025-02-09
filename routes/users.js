import express from 'express';
import fs from 'node:fs/promises';

const filePath = './data/users.json';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(users));
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, username, email, gender } = req.body;

    if (!name || !username || !email || !gender) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Read existing users
    let users = [];
    // Check if the file exists
    try {
      const usersData = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(usersData);
    } catch (err) {
      if (err.code === 'ENOENT') {
        // If the file doesn't exist, initialize with an empty array
        console.log('File not found, creating a new one');
        users = [];
      } else {
        throw err;
      }
    }

    // Create new user entry
    const newUser = {
      id: users.length + 1, // Simple auto-increment ID (you can refine this logic)
      name,
      username,
      email,
      gender,
    };

    // Add the new user to the start of the array
    users.push(newUser); // Add at the beginning

    // Write back updated data
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    res.status(201).json({ message: 'User added successfully!', user: newUser });
  } catch (err) {
    console.error('Error:', err); // Log error details to the console
    next(err);
  }
});


export default router;