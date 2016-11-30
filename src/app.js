'use strict';

var express = require('express'),
 posts = require('./mock/posts.json');

var app = express();

app.get('/', function(req, res){
    res.send("<h1>Hello World your</h1>");
});

app.get('/blog/:title?', function(req, res){
    var title = req.params.title;
    if (title === undefined) {
        res.status(503);
        res.send("under maintenance");
    };
    var post = posts[title];
    res.send(post);
});

app.listen(3000, function(){
    console.log("FrontEnd Server running in port 3000");
});