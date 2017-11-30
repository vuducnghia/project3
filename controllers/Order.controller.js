var Order = require('../models/Order.model');

exports.makeOrder = (req, res) => {
  console.log('Gio Hang: ', req.body.giohang);
  const giohang = req.body.giohang;
  const storeIds = giohang.map((item) => {
    return item.idCuaHang;
  }).filter((elem, index, self) => {
    return index == self.indexOf(elem);
  });
  console.log('storeIds: ', storeIds);
  return res.json({a: 'aaaaaa'});
}
