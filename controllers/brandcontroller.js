var brand = require("../models/brand");

var brandcontroller = {
	index: function(){
		var listbrand = brand.list();

		console.log(listbrand);
		return listbrand;
	}

}

module.exports = brandcontroller;
