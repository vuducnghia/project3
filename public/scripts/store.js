console.log('start');
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