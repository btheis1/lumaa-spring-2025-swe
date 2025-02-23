const PORT = 8000;
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

// register
app.post('/auth/register', async (req, resp) => {
    const id = uuidv4();
    const { username, password } = req.body;

    // hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const registerResult = await pool.query(`INSERT INTO users (id, username, password) VALUES($1, $2, $3);`, 
            [id, username, hashedPassword]);

        const token = jwt.sign({ username }, 'secret', { expiresIn: '1hr' });
        resp.json({id, username, token});
    } catch (err) {
        console.error(err);
        if (err) {
            resp.json({ detail: err.detail });
        }
    }
});

// log in
app.post('/auth/login', async (req, resp) => {
    const { username, password } = req.body;
    console.log('req body', req.body)
    try {
        const users = await pool.query('SELECT * FROM users WHERE username = $1;', [username]);
        console.log('users', users);

        if (!users.rows.length) {
            return resp.json({ detaill : 'User does not exist.' });
        } 

        const success = await bcrypt.compare(password, users.rows[0].password);
        const token = jwt.sign({ username }, 'secret', { expiresIn: '1hr' });

        if (success) {
            resp.json({'id': users.rows[0].id, 'username' : users.rows[0].username, token: token});
        } else {
            resp.json({detail: 'Login failed.'});
        }
    } catch (err) {
        console.error(err);
    }
});

// create task
app.post('/tasks', async (req, resp) => {
    const { title, description, iscomplete, userid } = req.body;
    console.log('req.body >', req.body);
    const id = uuidv4();

    try {
        const newTask = await pool.query(`INSERT INTO tasks(id, title, description, isComplete, userId) VALUES($1, $2, $3, $4, $5);`,
            [id, title, description, iscomplete, userid]
        );
        resp.json(newTask);
    }
    catch (err) {
        console.error(err);
    }
});

// get tasks by userId
app.get('/tasks/:userId', async (req, resp) => {

    const { userId } = req.params;
    
    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE userId = $1', [userId]);
        resp.json(tasks.rows);
    } catch (err) {
        console.error(err);
    }
});

// update task
app.put('/tasks/:id', async (req, resp) => {
    const { id } = req.params;
    const {title, description, iscomplete, userid } = req.body;

    try {
        const updateTask = await pool.query('UPDATE tasks SET title = $1, description = $2, isComplete = $3, userId = $4 WHERE id = $5;', 
            [title, description, iscomplete, userid, id]);
        resp.json(updateTask);
    } catch (err) {
        console.error(err);
    }
});

// delete task
app.delete('/tasks/:id', async (req, resp) => {
    try {
        const { id } = req.params;
        const deleteTask = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
        resp.json(deleteTask);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});