require('dotenv').config({
    path: './../.env'
});
const express = require('express');
const routes = require('./routes/routes');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');


const app = express();


// allowing request body
app.use(express.json({
    limit: '10mb'
}));
// allowing CORS requests
app.use(cors())


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    expires: new Date(Date.now() + (30 * 86400 * 1000))
}));

app.use(passport.initialize());
app.use(passport.session());


// apis route midllwares
app.use('/apis', routes);



// static files for frontend
app.use(express.static(path.resolve(__dirname, '../frontend/build')))
// serving app frontend
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
});



// running server
app.listen(process.env.PORT || 5000, () => {
    console.log(`the server is running on port ${process.env.PORT || 5000}`);
});