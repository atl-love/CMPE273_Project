var fs = require("fs");
var config = JSON.parse(fs.readFileSync("/Applications/XAMPP/xamppfiles/htdocs/CMPE273_Project/config.json"));
var host = config.host;
var port = config.port;
var express = require("express");
//autocomplete=require('./routes/autocomplete');
var mongo = require("mongodb");
var mongoose = require('mongoose');

var config = {"USER"    : "",
              "PASS"    : "",
              "HOST"    : "ec2-54-187-119-188.us-west-2.compute.amazonaws.com",         
              "PORT"    : "27017",        
              "DATABASE" : "webpage"};
var dbPath  = "mongodb://"+config.USER + ":"+     
				config.PASS + "@"+     
				config.HOST + "/"+     
				config.DATABASE+":"+    
				config.PORT;

var app = express.createServer();


app.use(app.router);
app.use(express.static(__dirname + "/public"));
app.use(express.bodyParser());
app.use(express.methodOverride());
  
app.get("/", function(request, response){
	response.send("hello!");
	});

var databaseUrl = "webpage"; // "username:password@example.com/mydb"
var collections = ["advertisement", "score"]
var db = require("mongojs").connect(databaseUrl, collections);
//mongoose.connect('mongodb://localhost/webpage');

console.log("We are connected! " + host + ":" + port);

app.get("/user/id", function(request,response){

});

app.get("/urlCrawl", function(request, response) {
   var regex = new RegExp(request.query["did"], 'i');
   db.advertisement.find({did: regex}, { 'did': 1 }).sort({"updated_at":-1}).sort({"created_at":-1},
		  // Execute query in a callback and return users list
		 function(err, users) {
		  if (!err) {
			 // Method to construct the json result set
			 var result = buildResultSet(users); 
			 response.send(result, {
				'Content-Type': 'application/json'
			 }, 200);
		  } else {
			 response.send(JSON.stringify(err), {
				'Content-Type': 'application/json'
			 }, 404);
		  }
	});
});


app.get("/CMPE273_Vickrey/:text", function(request,response){
	response.send("Hello " + request.params.text);	
});

app.listen(port, host);

var AdvSchema = new mongoose.Schema({
  advName: String
, advId: Number
, clicks: Number
, cpc: Number
, advLink: String
, keywords: String
});


db.advertisement.find(function(err, users) {
  if( err || !users) console.log("No  users found");
  else users.forEach( function(femaleUser) {
    console.log(femaleUser);
  } );
});

app.get('/getangularusers', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://127.0.0.1:1339");
	res.header("Access-Control-Allow-Methods", "GET, POST");
        // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross           // Domain Request
	db.advertisement.find('', function(err, users) { // Query in MongoDB via Mongo JS Module
	if( err || !users) console.log("No users found");
	  else 
	{
		res.writeHead(200, {'Content-Type': 'application/json'}); // Sending data via json
		str='[';
		users.forEach( function(user) {
			str = str + '{ "advName" : "' + user.advName + '"},' + '{"advLink" : "' + user.advLink + '"},'+ '{"keywords" : "' + user.keywords + '"},\n';
		});
		str = str.trim();
		str = str.substring(0,str.length-1);
		str = str + ']';
		res.end( str);
                // Prepared the jSon Array here
	}
  });
});

app.post('/insertangularmongouser', function (req, res){
  console.log("POST: ");
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  // The above 2 lines are required for Cross Domain Communication(Allowing the methods that come as Cross 
  // Domain Request
  console.log(req.body);
  console.log(req.body.mydata);
  var jsonData = JSON.parse(req.body.mydata);

  db.advertisement.save({advName: jsonData.advName, advLink: jsonData.advLink, keywords: jsonData.keywords, advId: jsonData.advId},
       function(err, saved) { // Query in MongoDB via Mongo JS Module
           if( err || !saved ) res.end( "User not saved"); 
           else {console.log("AdvName:" + jsonData.advName + "AdvLink:" + jsonData.advLink + "keywords: "+jsonData.keywords+"advId: " + jsonData.advId); res.end( "User saved")};
       });
});


function getAdvertiser(advId,callback){	db.open(function(error){
	//var db = new mongo.Db("webpage", new mongo.Server(host,port,{}));
	mongoose.connect(dbPath);
		console.log("We are connected! " + host + ":" + port);
	mongoose.model('advertisement', {advName: String});
	app.get('/advName', function(request, response){
		mongoose.model('users').find(function(err,advertisement){
			res.send(advertisement);
		});
	});
		
		//db.collection("advertisement", function(error, collection){
			console.log("We have the collection");
			collection.find({"advId":101},function(error, cursor){
				cursor.toArray(function(error, advertisements){
					if(advertisements.length == 0){
						callback(false);
						//console.log("No advertiser found");
					} else {
						callback(advertisements[0]);
						//console.log("Found a user", advertisements[0]);
					}
				});
			});
		});

}