console.log('start');
var app = angular.module('storeApp', []);
app.themVaoGioHang = function(idSanPham, idCuaHang, name, price){
        data = {
            idSanPham: idSanPham,
            idCuaHang: idCuaHang,
            name: name,
            price: price,
            number: 1
        }
        console.log('new Data');
        console.log(data);
        console.log('JSON.stringify(new data)');
        console.log(JSON.stringify(data));
        olderData =window.localStorage.getItem('gioHang');
        if(!olderData) {
          window.localStorage.setItem('gioHang', '') ;
          olderData =window.localStorage.getItem('gioHang');
        }
        // console.log('JSON.parse(olderData)');
        // console.log(JSON.parse(olderData));
        console.log('old Data');
        console.log(olderData);
        if( olderData.length != 0){
            newData = olderData + ";" + JSON.stringify(data);
            console.log(newData);
            window.localStorage.setItem('gioHang',newData) ;
        }else{
            window.localStorage.setItem('gioHang',JSON.stringify(data)) ;
        }



    }

app.controller("account", function ($scope, $http, $window, $rootScope) {
    // $window.localStorage.setItem('gioHang','') ;
    $rootScope.user = $window.localStorage.getItem('user');
    $scope.dang_xuat = function () {

        console.log('CLickkk');
        $http({
            method: "POST",
            url: "/users/logout"
        }).success(function () {
            $window.localStorage.setItem('user', '');
            $rootScope.user = $window.localStorage.getItem('user');
            $window.localStorage.setItem('gioHang','');
            console.log("Log out successful");
            // console.log(data);
            // $window.location.href = '/';
        }).error(function (err) {
            console.log("Unable to connect to the server.");
            console.log(err);
        });
    }
    $scope.timKiemSanPham = function() {
        console.log('Tim kiem san pham');
        console.log('Cau lenh tim kiem: ', $scope.querySanPham);
        data = {
            query: $scope.querySanPham
        }
        $http({
            method: "POST",
            url: "/product/timKiemSanPham",
            data: data
        }).success(function (data) {
            console.log(data);

        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }
    $scope.timKiemCuaHang = function() {
        console.log('Tim kiem cua hang');
        console.log('Cau lenh tim kiem: ', $scope.queryCuaHang);
        data = {
            query: $scope.queryCuaHang
        }
        $http({
            method: "POST",
            url: "/store/timkiemcuahang",
            data: data
        }).success(function (data) {
            console.log(data);

        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }

})
app.controller('sign-up', function ($http, $scope, $window) {

    $scope.register = function () {
        console.log('lol');
        console.log($scope);
        var data = {
            username: $scope.name,
            email: $scope.email,
            password: $scope.password
        };

        console.log(data);
        console.log(data);
        $http({
            method: "POST",
            url: "users/signup",
            data: data
        }).success(function (data) {

            console.log("signup successful");
            console.log(data);
            $window.location.href = '/login';
        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }
});
app.controller('dang_nhap', function ($http, $scope, $window, $rootScope, $location) {
    console.log('$window.lastUrl: ', $window.lastUrl);
    $window.localStorage.setItem('user', '');//Thanh fix
    $rootScope.user = null;
    $scope.dangNhap = function (username, password) {
        var user = {
          username: username,
          password: password
        }

        $http.post('/users/login', user)
            .success(function (data) {
                console.log(data);
                $window.localStorage.setItem('user', data.user.username);
                $rootScope.user = $window.localStorage.getItem('user');
                if($window.history && $window.history.back) {
                  return $window.history.back();
                }
                $window.location.href = '/';
            }).error(function (err) {
                console.log("err: ", err);
                if(err == 'Unauthorized') return $window.location.href = '/login';
                alert("Unable to connect to the server.");
            });
    }
});
// app.controller('profile', function())
app.controller("loaiSanPham", function ($scope, $http) {
    $http.get("/category").then(function (result) {
        console.log('startaaa');
        console.log(result);
        $scope.categories = result.data;
    });

    $scope.cat = function (id) {
        console.log(id);
        $http.get("/category/{{id}}").then(function (result) {
            console.log('startaaa');
            console.log(result);
            $scope.categories = result.data;
        });
    }
});
app.controller("sanPham", function ($scope, $http,$location,$window) {
    // console.log($stateParams);
    console.log('$location');
    console.log($location.$$absUrl);
    maLoaiSanPham = $location.$$absUrl.split('/')[4];
    console.log(maLoaiSanPham);
   
    $http.post("/product/subcate/"+ maLoaiSanPham).then(function (result) {
        console.log('startaaa');
        console.log(result);
        nhaSanXuat=[];
        $scope.sanPhams = result.data.products;
        for(sp in result.data.products){
            if(nhaSanXuat.indexOf(result.data.products[sp].brand.name) < 0 ){
                nhaSanXuat.push(result.data.products[sp].brand.name);

            }
        }
        $scope.nhaSanXuat = nhaSanXuat;
    });
   
    
    $scope.themVaoGioHang = app.themVaoGioHang;
    $scope.filterByBrand = function(nsx, clicks ,stt){
        console.log(nsx);
        // console.log($scope.isClick);
        $http.post("/product/subcate/"+ maLoaiSanPham).then(function (result) {
            console.log('loc san pham boi ' + nsx);
            console.log(result);
            sanPhamLoc = [];
            console.log(stt);
            for(i in nhaSanXuat){
                if(i != stt){
                    clicks[i] = false;
                }
            }
            console.log(clicks);
            for(sp in result.data.products){
                if(result.data.products[sp].brand.name == nsx){
                    sanPhamLoc.push(result.data.products[sp]);
                }
            }
            $scope.isClick = clicks;
            $scope.sanPhams = sanPhamLoc;
        });
    }
    $scope.filterByPrice = function(x, isClick){
        console.log(isClick);
        if(x == 1){
            $scope.value2 = false;
            $scope.value3 = false;
        }else if(x == 2){
            $scope.value1 = false;
            $scope.value3 = false;
        }
        if(x == 3){
            $scope.value1 = false;
            $scope.value2 = false;
        }
        donGia = 5000000;
        nguong1= 5000000;
        nguong2= 12000000;
        sanPhamLoc1 = [];
        sanPhamLoc2 = [];
        sanPhamLoc3 = [];
        $http.post("/product/subcate/"+ maLoaiSanPham).then(function (result) {
            console.log('loc san pham boi ' + x);
            console.log(result);
            danhSachSanPham = [];
            for(var i=0; i<8 ; i++){
                danhSachSanPham.push(result.data.products[i]);
            }

            for(sp in danhSachSanPham){
                console.log(parseInt(danhSachSanPham[sp].price) );
                if(danhSachSanPham[sp].price < nguong1){
                    sanPhamLoc1.push(danhSachSanPham[sp]);
                }else if(nguong1<=danhSachSanPham[sp].price && danhSachSanPham[sp].price < nguong2){
                    sanPhamLoc2.push(danhSachSanPham[sp]);
                }else{
                    sanPhamLoc3.push(danhSachSanPham[sp]);
                }
            }
            if(x==1){
                $scope.sanPhams = sanPhamLoc1;
            }else if(x==2){
                $scope.sanPhams = sanPhamLoc2;
            }else{
                $scope.sanPhams = sanPhamLoc3;
            }
            console.log('sanPhamLoc1');
            console.log(sanPhamLoc1);
            console.log('sanPhamLoc2');
            console.log(sanPhamLoc2);
        });
        
    }

})
app.controller("singleProduct", function ($scope, $http,$location, $rootScope, $window) {
    // console.log($stateParams);
    $scope.show = false;
    $scope.onClickAddToCart = app.themVaoGioHang;

    $scope.addToWishlist = function() {
      console.log("Clicked add to Wishlist :)))");
    }
    console.log('$location');
    console.log($location.$$absUrl);
    maSanPham = $location.$$absUrl.split('/')[4];
    maCuaHang = $location.$$absUrl.split('/')[5];
    console.log('maSanPham');
    console.log('maCuaHang');

    console.log(maSanPham);
     console.log(maCuaHang);
    $http.post("/product/"+ maSanPham +'/'+ maCuaHang).then(function (result) {
        console.log('xem chi tiet san pham');
        console.log(result);
        $scope.sanPham = result.data.product;
        var desObj = JSON.parse($scope.sanPham.description);
        if(Object.values) {
          $scope.sanPham.description = Object.values(desObj);
        } else {
          $scope.sanPham.description = $.makeArray(desObj)[0];
        }
        console.log('$scope.sanPham.description: ', $scope.sanPham.description);
    });


    $http.post('/product/sanPhamLienQuan/'+ maSanPham).then(function(result){

        console.log('nhan goi y san pham lien quan');
        console.log(result);
        $scope.sanPhamLienQuan = result.data.products;
        console.log('lol');
        console.log($scope.sanPhamLienQuan);

    })

    $scope.danhGia = function(rate, maSanPham, maCuaHang){
        console.log($rootScope.user);
        $scope.rate = rate;
    }
    $scope.guiPhanHoiSanPham = function(userReview, maSanPham, maCuaHang){
        console.log($rootScope.user);
        if($rootScope.user == ''){
            $window.location.href = '/login';
        }else{
          if(!userReview || !maSanPham || !maCuaHang || !$scope.rate) {
            return console.log("Some thing wrong: ", {
              maSanPham: maSanPham,
              maCuaHang: maCuaHang,
              userReview: userReview,
              rate: $scope.rate
            });
          }
            console.log('data phan hoi san pham: ');
            console.log({
              maSanPham: maSanPham,
              maCuaHang: maCuaHang,
              userReview: userReview,
              rate: $scope.rate
            });
            $http({
                method: "POST",
                url: "/product/phanhoisanpham",
                data: {
                  maSanPham: maSanPham,
                  maCuaHang: maCuaHang,
                  userReview: userReview,
                  rate: $scope.rate
                }
            }).success(function (data) {
                if(!data.isAuthenticated) {
                  return $window.location.href = '/login';
                }
                console.log(data.msg);
             }).error(function (err) {
               console.log(err);
                // alert("Unable to connect to the server.");
            });
        }
    }
    $scope.showItem = function() {
        console.log($scope.show);
        $scope.show = true;
        console.log($scope.show);
    }

})

app.controller('sanPhamTrangChu', function ($scope, $http){
    $http.get("/category").then(function (result) {
        console.log('startaaa');
        console.log(result);
        $scope.loaiSanPham = result.data;
    });
    $http.post("/product/subcate/1").then(function (result) {
                console.log('lay danh sach san pham trang chu');
                console.log(result.data.products);
                $scope.danhSachSanPham = result.data.products;
            });
    $scope.layDanhSachSanPham = function(id){
        console.log('lay danh sach san pham '+ id);
        $http.post("/product/subcate/"+id).then(function (result) {
                console.log('lay danh sach san pham trang chu');
                console.log(result.data.products);
                $scope.danhSachSanPham = result.data.products;
            });
    };
    $scope.themVaoGioHang = app.themVaoGioHang;
})

app.controller('gioHang',function($scope,$window, $rootScope, $http){
    dataGioHang = $window.localStorage.getItem('gioHang');
    console.log('dataGioHang');
    console.log(dataGioHang);
    // gioHang = JSON.parse(dataGioHang);
    gioHang = dataGioHang.split(';');
    console.log('gioHang');
    console.log(gioHang);
    gioHangjson = [];
    tong = 0;
    for(sp in gioHang){
        console.log(gioHang[sp]);
        spJSON = JSON.parse(gioHang[sp]);
        console.log(spJSON);
        gioHangjson.push(spJSON);

    }
    console.log('gio hang json');
    console.log(gioHangjson);
    for(i in gioHangjson){
        tong += gioHangjson[i].price * gioHangjson[i].number;
    }
    $rootScope.gioHang = gioHangjson;
    $scope.tong = tong;

    $scope.thayDoiSoLuongSanPham = function(gioHang){
        console.log('dat hang');
        console.log(gioHang);
        gioHangjson = ''
        for(sp in gioHang){
            if(gioHangjson.length!=0){
                gioHangjson = gioHangjson + ";" + JSON.stringify(gioHang[sp]);
            }else{
                 gioHangjson = gioHangjson  + JSON.stringify(gioHang[sp]);
            }
        }
        console.log(gioHangjson);
        $window.localStorage.setItem('gioHang',gioHangjson);
        $window.location.href = '/gioHang';
    }
    $scope.loaiBoSanPhamKhoiGioHang = function(index){
        gioHang = $window.localStorage.getItem('gioHang');
        console.log('loai bo san pham khoi gio hang');

        gioHangCu = gioHang.split(';')
        console.log('gioHangCu');
        console.log(gioHangCu);
        console.log(index);
        gioHangjson = ''
        for(sp in gioHangCu){
            console.log('sp');
            console.log(gioHangCu[sp]);
            if(sp != index){
                if(gioHangjson.length!=0){
                    gioHangjson = gioHangjson + ";" + gioHangCu[sp];
                }else{
                    gioHangjson = gioHangjson  + gioHangCu[sp];
                }
             }
        }

        console.log('gioHangjson');
        console.log(gioHangjson);
        $window.localStorage.setItem('gioHang',gioHangjson);
        $window.location.href = '/gioHang';
    }
    $scope.datHang = function(tenNguoiNhan, noiNhan, sdtNguoiNhan){
        gioHang = $window.localStorage.getItem('gioHang');
        // if($rootScope.username)
        console.log('dat hang');
        console.log(gioHang)

        gioHangCuoi = gioHang.split(';')
        gioHangjson = []
        for(sp in gioHangCuoi){
            console.log(gioHangCuoi[sp]);
            spJSON = JSON.parse(gioHangCuoi[sp]);
            console.log(spJSON);
            gioHangjson.push(spJSON);
        }


        data = {'giohang': gioHangjson,
                'thongTinNguoiNhan': {
                    'tenNguoiNhan': tenNguoiNhan,
                    'noiNhan': noiNhan,
                    'sdtNguoiNhan': sdtNguoiNhan
                }

                }
        console.log(data);
        $http({
            method: "POST",
            url: "order/dathang",
            data: data
        }).success(function (data) {

            console.log("dat hang successful");
            console.log(data);
            // $window.location.href = '/logi';
        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }
})

app.controller('soSanhSanPham',function($scope, $http,$location){
    console.log('$location');
    console.log($location.$$absUrl);
    masanPham1 = $location.$$absUrl.split('/')[4];
    tenSanPham2 = $location.$$absUrl.split('/')[5];
    console.log('idsanPham1');
    console.log(idsanPham1);
    console.log('tenSanPham2');
    console.log(tenSanPham2);
     $http.post("/product/soSanh/"+ maSanPham1+ tenSanPham2).then(function (result) {
        console.log('startaaa');
        console.log(result);
        $scope.sanPham = result.data;
    });


})

app.controller('trangCaNhan',function($scope, $http){

    console.log('xem Trang Ca Nhan');
    $http.post("/users/trangcanhan").then(function (result) {
        console.log('xem Trang Ca Nhan');
        console.log(result);
        $scope.khachHang = result.data.user;
    });
    $http.post("/users/xemlichsumuahang").then(function (result) {
        console.log('xem lich su mua hang');
        console.log(result);
        $scope.lichSu = result.data;
    });
    $scope.suaThongTin = function( username, email, phone, address){
        data={
            username: username,
            email: email,
            phone: phone,
            address: address
        }
        console.log('data thay doi');
        console.log(data);
        $http({
            method: "POST",
            url: "/users/guiThongTin",
            data: data
        }).success(function (data) {

            console.log("dat hang successful");
            console.log(data);
            // $window.location.href = '/logi';
        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }


})
