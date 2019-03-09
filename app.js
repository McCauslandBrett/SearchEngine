var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  hosts: 'http://rogith:%5Finalproject@127.0.0.1:9200/'

});
module.exports = elasticClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));

elasticClient.ping({
  requestTimeout: 30000,
}, function(error){
  if (error){
    console.error('elasticsearch is down');
  } else {
    console.log('all is well');
  }
});

//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:true}));

// Results
var hits = [];
var pages =
  [
    {
      address:"https://google.com",
      relevance: 1,
      title: "Okay",
    },
    {
      address:"https://yahoo.com",
      relevance: 1,
      title: "Go fish",
    },
    {
      address:"https://bing.com",
      relevance: 1,
      title: "Marco",
    }
]


// static path
app.use(express.static(path.join(__dirname,'public')));

app.get("/",function(req,res){
  //res.send("homePage yall");
  res.render("s",{
    pages:pages

  });
});
app.post("/search",function(req,res){
  //res.send("homePage yall");
  console.log(req.body.query);
  var str = req.body.query;
  var results = elasticClient.search( {
    index:'movies',
    type: 'movie',
    body:{
      query: {
          match: {"title": str}
       }}}).then(function (resp) {
         console.log(resp);
   hits = resp.hits.hits;
   console.log(hits);
  }, function (err) {
    console.trace(err.message);
  });






  console.log("searched");
 //console.log(results);
 //console.log(hits);
  res.render("s",{
    pages:hits

  });

});


app.listen(3000, function(){
  console.log("server is on port 3000");
});
