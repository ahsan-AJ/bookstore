/**
 * Created by HP_PC on 12/26/2016.
 */
//var myApp = angular.module('myApp',[]);

myApp.controller('BooksController', ['$scope', '$http', '$location','$stateParams', function($scope, $http, $location,$stateParams) {
    console.log('BooksController loaded...');

    $scope.getBooks = function () {
        $http.get('/api/books').then(function (response) {
            $scope.books = response;
        });
    }



    $scope.getBook = function () {
        var id = $stateParams._id;
        $http.get('/api/books/' + id).then(function (response) {
            console.log(response);
            $scope.book = response;
        });
    }


    $scope.addBook = function(){
        console.log($scope.book);
        $http.post('/api/books',$scope.book).then(function(response){
            window.location.href='/';
        });
    }

    $scope.updateBook = function () {
        var id = $stateParams._id;
        $http.put('/api/books/' + id,$scope.book).then(function(response) {
            window.location.href='/';
        });
    }
    $scope.removeBook = function(id){
        $http.delete('/api/books/'+id).then(function(response){
            window.location.href='/';
        });
    }

}]);