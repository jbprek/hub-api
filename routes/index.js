var express = require('express');
var router = express.Router();
var HubInfo = require('../lib/hub_info')

router.get('/', function (req, res, next) {
    console.log('GET /');
    var h = new HubInfo();
    res.send(h.toJSON() );
});


router.post('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//router.put('/', function(req, res, next) {
//  res.render('index', { title: 'Express' });
//});


router.delete('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;
