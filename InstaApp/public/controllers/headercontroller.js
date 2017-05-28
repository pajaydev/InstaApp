//Header controller to handle nav bar scenario's

instaApp.controller('HeaderController', function($scope, $rootScope, $window, $auth) {
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
    
//deleting the user from local storage on logout
    $scope.logout = function() {
        $auth.logout();
        delete $window.localStorage.currentUser;
    };
});
