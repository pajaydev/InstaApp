//insta controller to fetch media and handle likes

instaApp.controller('InstaController', function($scope, $rootScope, $location, InstaFeed) {

  var mediaId = $location.path().split('/').pop();
 
  InstaFeed.getMediaById(mediaId).success(function(media) {
    $scope.hasLiked = media.user_has_liked;
    $scope.photo = media;
  });

  $scope.like = function() {
    $scope.hasLiked = true;
    InstaFeed.likeMedia(mediaId).error(function(data) {
      sweetAlert('Error', data.message, 'error');
    });
  };
});