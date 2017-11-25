var poolConnection = require('../../models/pool.connection');

exports.getAllCategories = (req, res)=>{
    console.log(111);
    console.log(req)
    res.json({admin:' req.user'});
}