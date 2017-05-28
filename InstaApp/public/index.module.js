var instaApp = angular.module('instagramApp', ['ui.router', 'ui.bootstrap', 'satellizer']);

instaApp.config(function($stateProvider, $urlRouterProvider, $authProvider) {

  $stateProvider
    .state("login", {
      url: "/login",
      templateUrl: "templates/login.html",
      controller: "LoginController"

    })
    .state("signup", {
      url: "/signup",
      templateUrl: "templates/signup.html",
      controller: "SignupController"
    })
    .state("home", {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: "HomeController"
    })
    .state("index", {
      url: "/index",
      templateUrl: "templates/main.html"
    })

  $urlRouterProvider.otherwise('index');


  $authProvider.loginUrl = 'http://localhost:3000/auth/login';
  $authProvider.signupUrl = 'http://localhost:3000/auth/signup';
  $authProvider.oauth2({
    name: 'instagram',
    url: 'http://localhost:3000/auth/instagram',
    redirectUri: 'http://localhost:3000',
    clientId: 'fbc9af1f2a054c92b9ba486880090587',
    requiredUrlParams: ['scope'],
    scope: ['likes'],
    scopeDelimiter: '+',
    authorizationEndpoint: 'https://api.instagram.com/oauth/authorize'
  })
  // authenticate user on browser refresh
  instaApp.run(function($rootScope, $window, $auth) {
  if ($auth.isAuthenticated()) {
    $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
  }
});

});