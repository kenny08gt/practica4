var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var Bus = require('./routes/buses');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);


app.get('/', routes.index);
app.get('/users', users.list);
app.get('/buses', function(req, res) {  
  res.render('buses.jade');
});
app.get('/rutas', function(req, res) {  
  res.render('rutas.jade');
});
/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
//Coneccion postgres
var pg = require("pg");
var conString = "pg://postgres:123456@localhost:5432/practicaf1";


app.post('/buses/raro', function(req, res) {
    var placa=req.body.placa;
    var modelo=req.body.modelo;
    var costo=req.body.costo;
    var tipo=req.body.tipo;
    
    var client = new pg.Client(conString);    
    client.connect();
    var query = client.query("insert into public.\"BUS\" (placa,modelo,costo,tipo_bus) values ('"+placa+"','"+modelo+"',"+costo+","+tipo+");");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        console.log(JSON.stringify(result.rows, null, "    "));    
        client.end();
    });

    res.end("Insercion exitosa");    
});

app.post('/buses/raro1', function(req, res) {
    var id=req.body.idEliminar;        
    var client = new pg.Client(conString);    
    client.connect();
    var query = client.query("Delete from public.\"BUS\" where \"BUS\"="+id+";");
    query.on("row", function (row, result) {
        result.addRow(row);
    });
    query.on("end", function (result) {
        console.log(JSON.stringify(result.rows, null, "    "));    
        client.end();
    });

    res.end("Bus borrado");    
});

app.post('/buses/raro2', function(req, res) {
    var f1=require("./otros/funciones");
    f1.modificarBus(req,res);
});
app.post('/rutas/crear', function(req, res) {
    var f1=require("./otros/funciones");
    f1.crearRuta(req,res);
});
app.post('/rutas/punto', function(req, res) {
    var f1=require("./otros/funciones");
    f1.crearPunto(req,res);
});