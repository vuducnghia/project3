var db = require('./db');

var data = {
    list: function(){
		db.query('SELECT * FROM brand', function(err, results) {
		    if (err) throw err

		    console.log('aaaaaaaaaaaa');
		    console.log('aaaaaaaaaaaa');

		    return results[0];
		});
    }
};

console.log('return data(models/brand.js): ', data.list());
module.exports = data;
