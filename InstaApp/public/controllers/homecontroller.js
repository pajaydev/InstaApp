instaApp.controller("HomeController", function($scope, $window, $rootScope, $auth) {

    //to check user is logged in or not
    $scope.isAuthenticated = function() {
        return $auth.isAuthenticated();
    };
    
    //to check user is authentication on page reload
    if ($auth.isAuthenticated() && ($rootScope.currentUser && $rootScope.currentUser.username)) {
        API.getFeed().success(function(data) {
            $scope.photos = data;
        });
    }

    //connect email account with instagram
    $scope.linkInstagram = function() {
        $auth.link('instagram')
            .then(function(response) {
                $window.localStorage.currentUser = JSON.stringify(response.data.user);
                $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
            });
    };


});
