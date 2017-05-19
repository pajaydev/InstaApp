instaApp.controller("HomeController", function($scope, $window, $rootScope, $auth) {

	//to check user is logged in or not
	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	//connect email account with instagram
	$scope.linkInstagram = function() {
		$auth.link('instagram')
			.then(function(response) {
				$window.localStorage.currentUser = JSON.stringify(response.data.user);
				$rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
			});
	};


});