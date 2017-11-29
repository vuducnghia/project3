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
})
