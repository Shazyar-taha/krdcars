const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: false
}));



// running server
app.listen(process.env.PORT || 5000, () => {
    console.log("the backend server is running");
});