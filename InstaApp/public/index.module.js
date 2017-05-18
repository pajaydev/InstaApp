var instaApp = angular.module('instagramApp',['ui.router','ui.bootstrap','satellizer']);

instaApp.config(function($stateProvider, $urlRouterProvider,$authProvider){
       


    $authProvider.loginUrl = '/auth/login';
    $authProvider.signupUrl = '/auth/signup';

    $stateProvider
         .state("login",{
               url:"/login",
               templateUrl: "templates/login.html",
               controller: "LoginController"

         })
         .state("signup",{
                url:"/signup",
                templateUrl: "templates/signup.html",
                controller:"SignupController"
          })
         .state("index",{
                url:"/index",
                templateUrl: "templates/main.html"
          })

        $urlRouterProvider.otherwise('index');

});