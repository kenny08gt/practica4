var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
app.use(bodyParser.urlencoded({ extended: false }));

function insertarBuses(req,res){
  var placa=req.body.placa;
  var modelo=req.body.modelo;
  console.log("placa= "+user_name+", modelo is "+modelo);
  res.end("yes");	
}