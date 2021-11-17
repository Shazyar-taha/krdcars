const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));

app.use(routes);


// running server
app.listen(process.env.PORT || 5000, () => {
    console.log(`the server is running on port 5000`);
});