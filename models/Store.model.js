var poolConnection = require('../models/pool.connection');

exports.findStoreByName = (query, callback) => {
  poolConnection.getConnection((err, connection) => {
    if(err) {
      console.log("Loi fasf253tsg");
      return callback(err, null);
    }
    const queryString = "SELECT * FROM ecommerce.store st "
      +"WHERE st.name LIKE ?";
    const params = ['%'+query+'%'];
    connection.query({sql: queryString, nestTables: true}, params, (err, results, fields) => {
      if(err) {
        console.log('Something wrong when find store by name!');
        return callback(err, null);
      };
      if(!results || !results[0]) return callback(null, []);
      const stores = results.map((result) => {
        return {
          id: result.st.idstore,
          name: result.st.name,
          phonenumber: result.st.phone,
          address: result.st.address,
          description: result.st.description,
          imagesLink: result.st.linkImage
        }
      })
      return callback(null, stores);
    })
    connection.release();
  })
}
