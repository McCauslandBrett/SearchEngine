var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
  hosts:
   [
   'https://[username]:[password]@[server]:[9200]/'
    ]
});
module.exports = elasticClient;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: false}));



//view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));

// Results
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
app.post("/Q",function(req,res){
  //res.send("homePage yall");
  var q = req.body.q;
  console.log(req.body);

  });
});

app.get("/search",function(req,res){
  //res.send("homePage yall");

});

app.listen(3000, function(){
  console.log("server is on port 3000");
});
