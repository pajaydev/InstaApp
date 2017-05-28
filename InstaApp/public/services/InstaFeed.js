/* Angular Factory service to abstract the HTTP Services to the server */

 instaApp.factory('InstaFeed', function($http) {

    return {
      //get feed
      getFeed: function() {
        return $http.get('http://localhost:3000/insta/feed');
      },
      //get media by id
      getMediaById: function(id) {
        return $http.get('http://localhost:3000/insta/media/' + id);
      },
      //like the media
      likeMedia: function(id) {
        return $http.post('http://localhost:3000/insta/like', { mediaId: id });
      }
    }

  });