var data = require("../models/namemodel");

var demo = {
	sayhello: function(){
		console.log('Hello Bro, ' + data.name);
	},
	myalert: function(){
		window.alert('xin chao');
	},
	getname: function(){
		return data.name;
	}

}

module.exports = demo;
