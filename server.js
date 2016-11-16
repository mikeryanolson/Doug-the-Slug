var express = require("express");

var app = express();

var PORT = process.env.PORT || 8000;

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static('public'))

app.use(function(req, res, next) {
	res.status(404);
	res.send("404 Error - File Not Found");
});


app.get('/',(req,res)=>{
	console.log("test");
    res.sendFile(__dirname + "/public/ninja.html");
});


// 500 error catcher
app.use(function(err, req, res, next) {
	console.log(err);
	res.status(500);
	res.send("500 Error - Server Error");
});




// actually start the server
app.listen(PORT, function() {
	console.log("Listening on port " + PORT);
});


