const PORT = 8000;
const express = require('express');
const app = express();
const pool = require('./db');



app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});