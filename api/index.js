'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

//COnexion Database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/curso_mean_social',{useMongoClient: true})
		 .then(() => {
		 	console.log("La conexion a DB curso_mean_social se producido correctamente");

		 	//Crear servidor
		 	app.listen(port, () => {
		 		console.log("servidor corriendo en http://localhost:3800");
		 	});
		 })
		 .catch(err => console.log(err));
