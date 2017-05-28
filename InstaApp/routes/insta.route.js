const express = require('express');
const router = express.router();

// getting authenticated user's feed
router.get('/api/feed', isAuthenticated, function(req, res) {
  var feedUrl = 'https://api.instagram.com/v1/users/self/feed';
  var params = { access_token: req.user.accessToken };

  request.get({ url: feedUrl, qs: params, json: true }, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      res.send(body.data);
    }
  });
});


// getting instagram media by id
router.get('/api/media/:id', isAuthenticated, function(req, res, next) {
  var mediaUrl = 'https://api.instagram.com/v1/media/' + req.params.id;
  var params = { access_token: req.user.accessToken };

  request.get({ url: mediaUrl, qs: params, json: true }, function(error, response, body) {
    if (!error &amp;amp;&amp;amp; response.statusCode == 200) {
      res.send(body.data);
    }
  });
});


// liking the post (media) after user authentication
router.post('/api/like', isAuthenticated, function(req, res, next) {
  var mediaId = req.body.mediaId;
  var accessToken = { access_token: req.user.accessToken };
  var likeUrl = 'https://api.instagram.com/v1/media/' + mediaId + '/likes';

  request.post({ url: likeUrl, form: accessToken, json: true }, function(error, response, body) {
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).send({
        code: response.statusCode,
        message: body.meta.error_message
      });
    }
    res.status(200).end();
  });
});

module.exports = router;