var app = angular.module('admin', []);
app.controller("account", function ($scope, $http, $rootScope, $window) {
    $scope.SignUp = function () {
        var data = {
            username: $scope.username,
            password: $scope.password,
            phone: $scope.phone
        }
        console.log(data)
        $http({
            method: "POST",
            url: "/admin/sign_up",
            data: data
        }).success(function (data) {

            console.log("signup successful");
            console.log(data);
            $window.location.href = '/login';
        }).error(function (err) {
            alert("Unable to connect to the server.");
        });
    }
    $scope.Login = function () {
        var data = {
            username: $scope.username,
            password: $scope.password,
        }
        console.log('asad: ', data);
        console.log(data);
        $http({
            method: "POST",
            url: "/admin/login",
            data: data
        }).success(function (data) {

            console.log('response: ', data);
            // $window.location.href = '/';
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr.");
        });
    }

})