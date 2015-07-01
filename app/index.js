'use strict';

var express     =   require('express');
var bodyParser  =   require('body-parser');

var app = express();
var port = 80;

app.use(bodyParser.json());

app.use(function(req, res, next){
    console.log("recevied: " + req.method + " " + req.url);
    next();
});

app.post('/sendPayment', function(req, res, next){

    if(req.get('Content-Type') !== 'application/json'){
        return res.status(400).json({error: "you must post a json body"});
    }

    var cbNumber = req.body ? req.body.cb : null;

    if(!cbNumber){
        console.log("missing cb number");
        return res.status(400).json({error: "you must provide a cb number"});
    }

    // Card stating with  aren't valid
    console.log(cbNumber.charAt(0));
    if(cbNumber.charAt(0) === "4"){
        console.log("payment on failure");
        res.status(400).json({error: "payment failure"});
    }

    console.log("payent success");
    res.status(200).send();
});

//404 Middleware
app.use(function(req, res){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('404 - Page introuvable !');
});

app.listen(port);
console.log("server is up");
