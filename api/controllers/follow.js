'use strict'


var path  = require('path');
var fs = require('fs');
var bcrypt = require('bcrypt-nodejs');

var mongoosePaginate =require('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');

function saveFollow(req,res){

	var params = req.body;

	var follow = new Follow();
	follow.user = req.user.sub;
	console.log(params);
	follow.followed = params.followed;

	follow.save((err, followStored) => {
		if(err) return res.status(500).send({message:'Error de seguimineto'});
		if(!followStored) return res.status(404).send({message:' El seguimento no se ha guardado'});

		return res.status(200).send({follow:followStored});

	});
}

function deleteFollow(req,res){
	var userId = req.user.sub;
	var followId = req.params.id;

	Follow.find({'user':userId, 'followed':followId}).remove(err => {
		if(err) return res.status(500).send({message:'Error al dejar de seguir'});

		return res.status(200).send({message: 'El follow se ha eliminado'});

	})
}

function getFollowingUsers(req,res){
	var userId = req.user.sub;
    console.log('user '+ userId);
        console.log('page '+ req.params.id); //Primer parametro peticion get de routes. No quiere decir que sea el id

	if(req.params.id && req.params.page){
		userId = req.params.id;
		console.log('pasa1');
	}

	var page = 1;

	if(req.params.page){
		page = req.params.page;
	}else{
		page = req.params.id;
				console.log('pasa '+ page);

	}

	var itemsPerPage = 2;

	Follow.find({user:userId}).populate({path:'followed'}).paginate(page,itemsPerPage, (err,follows,total) =>{

		if(err) return res.status(500).send({message:'Error al dejar de seguir'});

			if (!follows) return res.status(404).send({message: 'No estas siguiendo ningun usuario'});

			return res.status(200).send({
				total: total,
				pages: Math.ceil(total/itemsPerPage),
				follows
			});
	});

	
}

function getFollowedUsers(req,res){
	var userId = req.user.sub;//id de usuario identificado
    console.log('user '+ userId);
        console.log('page '+ req.params.id); //Primer parametro peticion get de routes. No quiere decir que sea el id

	if(req.params.id && req.params.page){
		userId = req.params.id;
		console.log('pasa1');
	}

	var page = 1;

	if(req.params.page){
		page = req.params.page;
	}else{
		page = req.params.id;
				console.log('pasa '+ page);

	}

	var itemsPerPage = 2;

	Follow.find({followed:userId}).populate('user ').paginate(page,itemsPerPage, (err,follows,total) =>{

		if(err) return res.status(500).send({message:'Error al dejar de seguir'});

			if (!follows) return res.status(404).send({message: 'No te sigue  ningun usuario'});

			return res.status(200).send({
				total: total,
				pages: Math.ceil(total/itemsPerPage),
				follows
			});
	});
}
//Devolver usuarios que sigo
function getMyFollows(req,res){
	var userId = req.user.sub;
	var find = Follow.find({user:userId});

	if(req.params.followed){//devolver usuarios que me siguen
		find = Follow.find({followed:userId});
	}

	find.populate('user followed').exec((err,follows) => {
		if(err) return res.status(500).send({message:'Error al dejar de seguir'});

			if (!follows) return res.status(404).send({message: 'No te sigue  ningun usuario'});

			return res.status(200).send({follows});
	});

}



module.exports = {

	saveFollow,
	deleteFollow,
	getFollowingUsers,
	getFollowedUsers,
	getMyFollows


}