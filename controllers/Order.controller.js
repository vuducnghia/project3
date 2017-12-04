"use strict";
var Order = require('../models/Order.model');
var poolConnection = require('../models/pool.connection');

exports.makeOrder = (req, res) => {
  console.log('user: ', req.user);
  if(!req.isAuthenticated()) return res.json({err_msg: 'Xac thuc khong thanh cong', isAuthenticated: false});
  const giohang = req.body.giohang;
  const thongTinNguoiNhan = req.body.thongTinNguoiNhan;
  const storeIdsCatched = [];
  const storeIds = giohang.map((item) => {
    return item.idCuaHang;
  }).filter((item) => {
    let isCatched = storeIdsCatched.indexOf(item) > -1 ? true : false;
    if(isCatched) {
      return false;
    }
    storeIdsCatched.push(item);
    return true;
  })
  console.log('storeIds: ', storeIds);

  if(!storeIds || !storeIds.length) {
    console.log("Thieu id cua store!!");
    return res.json({err_msg: "Thieu id cua store!!"});
  }
  storeIds.forEach((storeId) => {
    const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');;
    const orderInfo = {
      createDate: createdDate,
      storeId: storeId,
      totalPrice: 0,
      customerInfo: {
        name: thongTinNguoiNhan.tenNguoiNhan,
        phone: thongTinNguoiNhan.sdtNguoiNhan,
        address: thongTinNguoiNhan.noiNhan
      },
      items: [
      ]
    }
    giohang.forEach((item) => {
      if(storeId == item.idCuaHang) {
        orderInfo.items.push({
          idProduct: item.idSanPham,
          idStore: item.idCuaHang,
          quantity: item.number
        });
        orderInfo.totalPrice += item.number*item.price;
      }
    })
    Order.makeOrder(orderInfo, req.user, (err, order) => {
      if(err) {
        console.log(err);
        res.json({err_msg: "Some thing wrong when make order!!!"})
      }
      console.log('Id cua order moi tao: ', order);
    })

  })
  return res.json({a: 'aaaaaa'});
}
