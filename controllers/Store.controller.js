var Store = require('../models/Store.model');

exports.findStoreByName = (req, res) => {
  console.log('req.body.query: ', req.body.query);
  const nameStore = req.body.query.replace(/\s\s+/g, ' ').trim();
  if(!nameStore) return res.json({stores: []});
  Store.findStoreByName(nameStore, (err, stores) => {
    if(err) {
      console.log(err);
      res.json({err_msg: "Something wrong when find store by name"});
    }
    if(!stores) return res.json({stores: []});
    return res.json({stores: stores});
  })
}
