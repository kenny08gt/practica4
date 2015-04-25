/* GET home page. */

exports.buses = function(req, res){
	var cont='holis';
  res.render('buses', { title: 'Buses',contenido: cont });
};
