console.log('start');
<<<<<<< HEAD
  var app = angular.module('storeApp', []);
        app.controller("account", function ($scope, $http) {
        	$scope.account = "My Account";
        })
         app.controller('sign-up', function ($http,$scope,$window) {
            
            $scope.register = function () {
                console.log('lol');
                console.log($scope);
                var data = {
                    username : $scope.name,
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
         app.controller('dang_nhap', function ($http,$scope,$window) {
            
            $scope.dangNhap = function () {
                console.log('lol');
                console.log($scope);
                var data = {
                    username : $scope.username,
                    password: $scope.password
                };

                console.log(data);
                console.log(data);
                $http({
                    method: "POST",
                    url: "users/login",
                    data: data
                }).success(function (data) {
                    
                    console.log("Login successful");
                    console.log(data);
                }).error(function (err) {
                    alert("Unable to connect to the server.");
                });
            }
        });
        app.controller("loaiSanPham", function ($scope, $http) {
            $http.get("/category").then(function(result) {
                console.log('startaaa');
                console.log(result);
                $scope.categories = result.data;
            });  

            $scope.cat = function(id){
                console.log(id);
                $http.get("/category/{{id}}").then(function(result) {
                    console.log('startaaa');
                    console.log(result);
                    $scope.categories = result.data;
            });  
            }
        })
=======
var app = angular.module('storeApp', []);
app.controller("account", function ($scope, $http) {
    $scope.account = "My Account";
    var i;
    $http.get("/Page").then(function(result) {
        i=0;
        console.log('startaaa');
        console.log(result);
        $scope.Posts = result.data[i];
        if(result.data.length ==1){
            $('.subnext').hide();
        }
        $('.subprev').hide();
    });


})
app.controller('sign-up', function ($http,$scope,$window) {

    $scope.register = function () {
        console.log('lol');
        console.log($scope);
        var data = {
            username : $scope.name,
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
>>>>>>> 30f2a1105ec636e7c3525f5b2b206b65eafdbfc1
