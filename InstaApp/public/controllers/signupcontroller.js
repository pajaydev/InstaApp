instaApp.controller('SignupController',function($scope,$auth,$state){
     
   $scope.registerUser = function() {
      var user = {
        email: $scope.email,
        password: $scope.password
      };

      // Satellizer
      $auth.signup(user)
        .then(function(response){
           $state.go('home');
        })
        .catch(function(response) {
          console.log(response.data);
        });
    };

    
});