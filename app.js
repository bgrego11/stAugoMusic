var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/search');
var addRouter = require('./routes/add');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/search', apiRouter);
app.use('/users', usersRouter);
app.use('/add', addRouter);



port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))





// let game = new Game({ 
//     blackCards: ["card 1","card 2"],
//     whiteCards: ["card 1","card 2"],
//     cards: ["card 1","card 2"],
//     players: ["player 1","player 2"],
//     names:["player 1","player 2"],
//     dealer: "ben",
//     cardsinplay: ["player 1","player 2"],
//     score: ["player 1","player 2"]
// });
// game.save(function (err) {
//   if (err) return handleError(err);
//   console.log("SAVED")
//   // saved!
// });


