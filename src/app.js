'use strict';

//importing required dependencies
var express = require('express'),
 posts = require('./mock/posts.json');

//initializing some dependencies
var postsLists = Object.keys(posts).map(function(value){
    return posts[value]
});
var app = express();

//this is use for serving style , js , content files
app.use('/static', express.static(__dirname + '/public'));

//this is use for jade templating
app.set('view engine', 'jade');
app.set('views', __dirname + '/templates');

//these are used in routing and serving
app.get('/', function(req, res){
    var path = req.path;
    res.locals.path = path;
    res.render('index');
});

app.get('/blog/:title?', function(req, res){
    var title = req.params.title;
    if (title === undefined) {
        res.status(503);
        res.render('blog', {posts: postsLists});
    } else {
        var post = posts[title] || {};
        res.render('post', {post: post});
    }
});

//for WEB API
app.get('/posts', function(req, res){
    if (req.query.raw) {
        res.json(posts);
    } else {
        res.json(postsLists);
    };
});

app.listen(3000, function(){
    console.log("FrontEnd Server running in port 3000");
});