const express = require('express');
const request = require('request');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/get-user', (req, res) => {
  const options = {
    headers: {
      Authorization: 'token 90e91759abb8407475e81ed931163b71231b7cb6',
      'user-agent': 'node.js',
    },
  };

  request.get(`https://api.github.com/users/${req.query.userId}`, options, (err, response, results) => {
    const data = JSON.parse(results);

    console.log(data);
    res.json(data);
  });
});


module.exports = router;
