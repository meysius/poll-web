var express = require('express');
var app = express();

app.use(express.static('./public'));
app.get('*', function(req, res) {
	res.sendfile('public/app.html');
});
app.listen(5000);