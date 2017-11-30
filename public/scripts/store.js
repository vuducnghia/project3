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

    $scope.dangNhap = function (user) {

        console.log('lol');
        console.log($scope);

        $http.post('/users/login', user)
            .success(function (data) {
                console.log("Login successful");
                console.log(data);

                // $rootScope.currentUser = data.user;
                // $scope.account = data.user.username
                // $rootScope.currentUser.username = data.user.username
                $window.localStorage.setItem('user', data.user.username);
                // $window.localStorage.setItem
                $rootScope.user = $window.localStorage.getItem('user');
                $window.location.href = '/';
                // $location.url("/");
            }).error(function (err) {
                console.log(err);
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
        $scope.sanPhams = result.data;
    });

    $scope.themVaoGioHang = app.themVaoGioHang;


})
app.controller("singleProduct", function ($scope, $http,$location, $rootScope, $window) {
    // console.log($stateParams);
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
        if($rootScope.user == ''){
            $window.location.href = '/login';
        }else{
            
            data = {
                'maSanPham': maSanPham,
                'maCuaHang': maCuaHang,
                'rate': rate
            }
            console.log(data);
            $http({
                method: "POST",
                url: "product/danhGia",
                data: data
            }).success(function (data) {

                console.log("danh gia san pham thanh cong");
                console.log(data);
                // $window.location.href = '/logi';
             }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        }
    }
    $scope.guiPhanHoiSanPham = function(userReview, maSanPham, maCuaHang){
        console.log($rootScope.user);
        if($rootScope.user == ''){
            $window.location.href = '/login';
        }else{
            
            data = {
                'maSanPham': maSanPham,
                'maCuaHang': maCuaHang,
                'userReview': userReview
            }
            console.log('data phan hoi san pham');
            console.log(data);
            $http({
                method: "POST",
                url: "product/phanHoiSanPham",
                data: data
            }).success(function (data) {

                console.log("gui phan hoi san pham thanh cong");
                console.log(data);
                // $window.location.href = '/logi';
             }).error(function (err) {
                alert("Unable to connect to the server.");
            });
        }
    }

})

app.controller('sanPhamTrangChu', function ($scope, $http){
    $http.get("/category").then(function (result) {
        console.log('startaaa');
        console.log(result);
        $scope.loaiSanPham = result.data;
    });
    $scope.layDanhSachSanPham = function(id){
        console.log('lay danh sach san pham '+ id);
        $http.post("/product/subcate/"+id).then(function (result) {
                console.log('startaaa');
                console.log(result);
                $scope.danhSachSanPham = result.data.products;
            });
    };
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
            url: "product/dathang",
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
