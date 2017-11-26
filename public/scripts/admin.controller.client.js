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

app.controller("home", function ($scope, $http, $rootScope, $window) {
    $scope.nghia = function () {
        alert('nghia')
    }
})

app.controller("manage_categories", function ($scope, $http, $rootScope, $window) {
    
    init();

    function init() {
        $http({
            method: "GET",
            url: "/admin/getAllCategories"
        }).success(function (data) {
            $scope.listCate = data
            console.log('response: ', data);
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllCategories");
        });

        // $http({
        //     method: "GET",
        //     url: "/admin/getSub_Categories",
        // }).success(function (data) {
        //     $scope.listCate = data
        //     console.log('response: ', data);
        // }).error(function (err) {
        //     alert("Unable to connect to the serverrrrr.");
        // });
    }

    $scope.createCategory = function(){

        alert($scope.nameCategory)

        $http({
            method: "POST",
            url: "/admin/createCategory",
            data: {nameCategory: $scope.nameCategory}
        }).success(function (data) {
            $scope.listCate = data
            console.log('response: ', data);
        }).error(function (err) {
            console.log(err);
            alert("Unable to connect to the serverrrrr---/admin/createCategory");
        });
    }
})