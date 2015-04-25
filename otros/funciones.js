var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
app.use(bodyParser.urlencoded({ extended: false }));

exports.modificarBus=function(req, res){
  	var id=req.body.idModificar;    
  	var pg = require("pg");
	var conString = "pg://postgres:123456@localhost:5432/practicaf1";
    var placa=req.body.placa;
    var modelo=req.body.modelo;
    var costo=req.body.costo;
    var tipo=req.body.tipo;    
    var client = new pg.Client(conString);    
    client.connect();
    var query = client.query("Delete from public.\"BUS\" where \"BUS\"="+id+";");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        console.log(JSON.stringify(result.rows, null, "    "));    
        client.end();
        var client2 = new pg.Client(conString);   
        client2.connect();
        var query = client2.query("insert into public.\"BUS\" (placa,modelo,costo,tipo_bus) values ('"+placa+"','"+modelo+"',"+costo+","+tipo+");");
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            console.log(JSON.stringify(result.rows, null, "    "));    
            client2.end();
        });    
        res.end("Bus modificado");
    });
};
exports.crearRuta=function(req, res){
  	var nombre=req.body.nombreRuta;    
	var origen=req.body.origen;
    var destino=req.body.destino;    

  	var pg = require("pg");
	var conString = "pg://postgres:123456@localhost:5432/practicaf1";
    
    var client = new pg.Client(conString);    
    client.connect();
    var query = client.query("insert into public.\"RUTA\" (nombre,origen,destino) values('"+nombre+"','"+origen+"','"+destino+"');");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        console.log(JSON.stringify(result.rows, null, "    "));    
        client.end();        
        res.end("Ruta creada");
    });
};