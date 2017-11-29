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
    $scope.createAccountStore = function () {
        console.log(11)
        console.log($scope.account)
        
        $http({
            method: "POST",
            url: "/admin/createAdminStore",
            data: $scope.account
        }).success(function (data) {
            console.log(data)
            $scope.store.idstore = data
            $http({
                method: "POST",
                url: "/admin/createStore",
                data: $scope.store
            }).success(function (data) {
                console.log('success2')
            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/createStore");
            });
        }).error(function (err) {
            alert(err);
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
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllCategories");
        });

    }

    $scope.createCategory = function () {
        if ($scope.nameCategory !== '') {
            var data = {
                name: $scope.nameCategory
            }
            $http({
                method: "POST",
                url: "/admin/createCategory",
                data: data
            }).success(function (data) {
                $scope.listCate = data
            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/createCategory");
            });

            init();
        }
    }

    $scope.delete = function (id) {
        alert(id + "dangerous, you don 't access")
        // $http({
        //     method: "DELETE",
        //     url: "/admin/deleteCategory/" + id
        // }).success(function (data) {
        //     $scope.listCate = data
        //     console.log('response: ', data);
        // }).error(function (err) {
        //     alert("Unable to connect to the serverrrrr---deleteCategories");
        // });
    }

    $scope.edit = function (id, nameCategory) {

        // $window.location.href = '/admin/categories/' + nameCategory+'/' + id;
    }
})

app.controller("manage_SubCategories", function ($scope, $http, $rootScope, $window) {

    init();

    function init() {
        $http({
            method: "GET",
            url: "/admin/getAllSubCategories"
        }).success(function (data) {
            $scope.listCate = data
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllSubCategories");
        });

    }

    $scope.createSubCategory = function () {
        alert($scope.nameSubCategory)
        if ($scope.nameSubCategory !== '') {
            var data = {
                category_idCategory: $scope.idCate,
                name: $scope.nameSubCategory
            }
            $http({
                method: "POST",
                url: "/admin/createSubCategory",
                data: data
            }).success(function (data) {
                $scope.listCate = data
            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/createSubCategory");
            });

            init();
        }
    }

    $scope.delete = function (id) {
        alert(id + "dangerous, you don 't access")
        $http({
            method: "DELETE",
            url: "/admin/deleteSubCategory/" + id
        }).success(function (data) {
            $scope.listCate = data
            console.log('response: ', data);
            init();
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---deleteSubCategory");
        });
    }

    $scope.edit = function (id) {

        // $window.location.href = '/admin/categories/' + id;
    }
})

app.controller("manage_Product", function ($scope, $http, $rootScope, $window) {

    init();
    function init() {
        $http({
            method: "GET",
            url: "/admin/getAllProduct"
        }).success(function (data) {
            $scope.listProduct = data
        }).error(function (err) {
            alert("Unable to connect to the serverrrrr---/admin/getAllSubCategories");
        });

    }
    $scope.initProductID = function () {
        var y = $window.location.href.split('/')
        id = y[y.length - 1];
        if (y.length == 6)
            $http({
                method: "GET",
                url: "/admin/getProductByIdProduct/" + id
            }).success(function (data) {
                $scope.data = data[0]

            }).error(function (err) {
                alert("Unable to connect to the serverrrrr---/admin/updateProduct");
            });
    }
    $scope.createOrUpdateProduct = function () {
        console.log($window.location.href)
        var y = $window.location.href.split('/')
        console.log(y.length)
        if ($scope.name !== '') {
            var data = {
                name: $scope.name,
                code: $scope.code,
                description: $scope.description,
                accessories: $scope.accessories,
                sub_Category_idSub_Category: $scope.sub_Category_idSub_Category,
                product_assuarance_policy: $scope.product_assuarance_policy,
                month_assuarance: $scope.month_assuarance,
                brand_idbrand: $scope.brand_idbrand
            }
            if (y.length == 5) {  // create
                $http({
                    method: "POST",
                    url: "/admin/createProduct",
                    data: data
                }).success(function (data) {
                    $scope.listCate = data
                }).error(function (err) {
                    alert("Unable to connect to the serverrrrr---/admin/createSubCategory");
                });

                init();
            }
            else if (y.length == 6) {        // update
                id = y[y.length - 1];
                data.idProduct = id
                // console.log(data)

                $http({
                    method: "POST",
                    url: "/admin/updateProduct/" + id,
                    data: $scope.data
                }).success(function (data) {
                    console.log('success')
                }).error(function (err) {
                    alert("Unable to connect to the serverrrrr---/admin/createSubCategory");
                });
            }
        }
    }

    $scope.delete = function (id) {
        // alert(id + "dangerous, you don 't access")
        // $http({
        //     method: "DELETE",
        //     url: "/admin/deleteProduct/" + id
        // }).success(function (data) {
        //     $scope.listCate = data
        //     console.log('response: ', data);
        //     init();
        // }).error(function (err) {
        //     alert("Unable to connect to the serverrrrr---deleteSubCategory");
        // });
    }
        ``
    $scope.Direction = function (id) {
        $window.location.href = '/admin/product_create';
    }
    $scope.edit = function (id) {
        $window.location.href = '/admin/product/' + id;
    }

})
