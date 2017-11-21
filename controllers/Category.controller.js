var poolConnection = require('../models/pool.connection');
var bcrypt = require('bcryptjs');

exports.getAll = (req, res) => {
  //Get a connection from pool
  console.log("start query category");
  poolConnection.getConnection((err, connection) => {
    if(err) return console.log(err);
    const sellectQuery = 'SELECT cat.idCategory, cat.name as catName, sub_cat.idSub_Category, sub_cat.name as subcatName FROM ecommerce.category cat LEFT JOIN ecommerce.sub_Category sub_cat ON cat.idCategory = sub_cat.category_idCategory;';

    connection.query(sellectQuery, (error, results, fields) => {
      if (err) {
        console.log(err);
        return res.json({err_msg: 'Something wrong!'});
      };
      console.log('results: ', results);
      const cates = [];
      const idCates = [];
      results.forEach((row) => {
        const idCate = row.idCategory;
        const nameCat = row.catName;
        const idSubcat = row.idSub_Category;
        const nameSubcat = row.subcatName;
        if(!idCates.includes(idCate)) {
          idCates.push(idCate);
          cates.push(
            {
              id: idCate,
              name: nameCat,
              subCate: [{id: idSubcat,name: nameSubcat}]
            }
          );
          return;
        }
        cates.forEach((cate) => {
          if(cate.id === idCate) {
            cate.subCate.push({id: idSubcat,name: nameSubcat})
          }
        })

      })
      console.log('cates: ', JSON.stringify(cates));
      res.json(cates);
    });
    //Release connection back to pool
    connection.release();
  })

}
