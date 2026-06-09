

var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();

const helmet = require('helmet')
console.log(process.env.PORT)
// Connect to database


mongoose.connect(`mongodb+srv://pavani:pavani123@cluster0.27pimqi.mongodb.net/?retryWrites=true&w=majority`)

	.then(() => console.log('Connected!'));



var app = express();
app.set('trust proxy', 1);
const rateLimiter = require('express-rate-limit');
const limiter = rateLimiter({
    windowMs: 2 * 60 * 1000,
    max:5,
    message:'Too many requests'
})
app.use(helmet())
// app.use(limiter)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,Authorization,Access-Token,Refresh-Token,User-Agent,Browser');
    res.setHeader('Access-Control-Expose-Headers', 'Origin,X-Requested-With,content-type,Authorization,Access-Token,Refresh-Token,User-Agent,Browser');
    next();
});
app.use((req, res, next) => {
    console.log('Request received:');
    next();
});
app.get('/', function (req, res) {
    res.send('Hello World from server');
});

var housesRoutes = require('./src/app/houses.route');
console.log('Mounting houses routes at /houses');
app.use('/houses', housesRoutes, limiter, function (err, req, res, next) {
console.log("logged")
});

app.listen('9002', function () {
	console.log('Express server listening on %d, in %s mode', 9002, app.get('env'));
});

exports = module.exports = app;
