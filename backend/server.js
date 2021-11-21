
require('dotenv').config({ path: './../.env' });
const express = require('express');
const routes = require('./routes/routes');


const app = express();

app.use(express.json({
    limit: '10mb'
}));


// route midllwares
app.use(routes);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

// running server
app.listen(process.env.PORT || 5000, () => {
    console.log(`the server is running on port 5000`);
});