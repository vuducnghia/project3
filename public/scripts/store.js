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