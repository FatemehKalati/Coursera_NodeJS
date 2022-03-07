var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    var fileUrl = '/index.html';

    var filePath = path.resolve('./public' + fileUrl);
    const fileExt = path.extname(filePath);
    if (fileExt == '.html') {
        fs.exists(filePath, (exists) => {
            if (!exists) {
                err = new Error('Not found!');
                err.status = 404;
                return next(err);
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            fs.createReadStream(filePath).pipe(res);
        });
    } else {
        err = new Error('Not found!');
        err.status = 404;
        return next(err);
    }
});

module.exports = router;