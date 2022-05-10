const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
  audience: 'https://nann.auth0.com/api/v2/',
  issuerBaseURL: `https://nann.auth0.com/`,
});

// This route doesn't need authentication
app.get('/api/public', function(req, res) {
    res.json({
      message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
    });
});
  
// This route needs authentication
app.get('/api/private', checkJwt, function(req, res) {
    res.json({
        message: 'Hello from a private endpoint! You need to be authenticated to see this.'
    });
});

  // starting the server
app.listen(3001, () => {
    console.log('listening on port 3001');
});