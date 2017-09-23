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
      Authorization: 'token 93af791fc8e68529f6410cb96fb15d08fd9d1049',
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
