var express = require("express");
var bodyParser = require("body-parser");
var passport = require("passport");
var localStrategy = require('passport-local').Strategy;
var session = require("express-session");


var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(session({
    secret: 'something',
    cookie: {
        maxAge: 100000 * 50 * 5
    }
}));
app.use(passport.session());

passport.use(new localStrategy(
    (username, password, done) => {
        if (username == 'IronSpider') {
            if (password == "HelloWorld") {
                return done(null, username);
            } else {
                return done(null, false);
            }
        } else {
            return done(null, false);
        }
    }
))
passport.serializeUser((username, done) => {
    done(null, username);
})
passport.deserializeUser((name, done) => {
    if (name == 'user') {
        return done(null, name)
    } else {
        return done(null, false)
    }
})
app.set('view engine', 'ejs');

app.route('/')
    .get((req, res) => res.render('index', { status: "" }))
    .post(passport.authenticate('local', {
        failureRedirect: '/messages',
        successRedirect: '/loginDone'
    }));
app.get('/loginDone', (req, res) => res.render('index', { status: "Hello" }));
app.get('/loginFail', (req, res) => res.render('index', { status: "Hey, nhập lại đi nào ~~" }));
app.get('/messages', (req, res) => {
    res.render('messages');
})
app.get('/timeline', (req, res) => {
    res.render('timeline');
})


io.on('connection', (socket) => {
    console.log('a user connected');
});
app.listen(1007);