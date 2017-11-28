console.log('start');
var app = angular.module('storeApp', []);
app.controller("account", function ($scope, $http, $window, $rootScope) {
    // $window.localStorage.setItem('user','') ;
    $rootScope.user = $window.localStorage.getItem('user');
    $scope.dang_xuat = function () {
      console.log('CLickkk');
        $http({
            method: "POST",
            url: "users/logout"
        }).success(function () {
            $window.localStorage.setItem('user', '');
            $rootScope.user = $window.localStorage.getItem('user');
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
            url: "product/timKiemSanPham",
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
app.controller("sanPham", function ($scope, $http,$location) {
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


})
app.controller("singleProduct", function ($scope, $http,$location) {
    // console.log($stateParams);
    $scope.onClickAddToCart = function() {
      console.log("Clicked add to cart :))");
    }
    $scope.addToWishlist = function() {
      console.log("Clicked add to Wishlist :)))");
    }
    console.log('$location');
    console.log($location.$$absUrl);
    maSanPham = $location.$$absUrl.split('/')[4];
    console.log(maSanPham);
    $http.post("/product/"+ maSanPham).then(function (result) {
        console.log('startaaa');
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


})
