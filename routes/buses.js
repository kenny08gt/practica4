/* GET home page. */
exports.buses = function(req, res){
  res.render('buses', { title: 'Buses' });
};

var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/buses',function(req,res){
  var user_name=req.body.placa;
  var password=req.body.modelo;
  console.log("User name = "+user_name+", password is "+password);
  res.end("yes");
});