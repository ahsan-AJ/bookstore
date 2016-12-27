/**
 * Created by HP_PC on 12/27/2016.
 */

var myApp = angular.module('myApp', ['ui.router']);

myApp.run(function($rootScope, $state) {
 $rootScope.$state = $state;
 });

myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================

        .state('/', {
            url: '/',
            templateUrl: 'views/books.html',
            controller : 'BooksController'
        })
        .state('getBook',{
            url:'/books/details/:_id',
            templateUrl:'views/book_details.html',
            controller:'BooksController'
        })
        .state('addBook',{
            url:'/books/add',
            templateUrl:'views/add_book.html',
            controller:'BooksController'
        })
        .state('editBook',{
            url:'/books/edit/:_id',
            templateUrl:'views/edit_book.html',
            controller:'BooksController'
        })
        .state('deleteBook',{
            url:'/books/delete/:_id',
            controller:'BooksController'
        })



});

