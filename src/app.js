'use strict';

//importing required dependencies
var express = require('express'),
 posts = require('./mock/posts.json');

//initializing some dependencies
var app = express();

//this is use for serving style , js , content files
app.use('/static', express.static(__dirname + '/public'));

//this is use for jade templating
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

//these are used in routing and serving
app.get('/', function(req, res){
    res.render('index');
});

app.get('/blog/:title?', function(req, res){
    var title = req.params.title;
    if (title === undefined) {
        res.status(503);
        res.send("under maintenance");
    } else {
        var post = posts[title] || {};
        res.render('post', {post: post});
    }
});


app.listen(3000, function(){
    console.log("FrontEnd Server running in port 3000");
});