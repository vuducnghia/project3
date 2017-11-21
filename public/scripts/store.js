console.log('start');
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
        app.controller("loaiSanPham", function ($scope, $http) {
            $http.get("/category").then(function(result) {
                console.log('startaaa');
                console.log(result);
                
            }); 
           
         
        })