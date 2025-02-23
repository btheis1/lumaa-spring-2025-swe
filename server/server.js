const PORT = 8000;
const express = require('express');
const app = express();

app.get('/', (req, resp) => {
    resp.send("Hello");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});