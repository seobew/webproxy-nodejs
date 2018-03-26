var express = require('express');
var app = express();
var server = app.listen(3000);
var request = require('request');
var url = require('url');

app.get('/proxy', function(req, res) {
	var queryData = url.parse(req.url, true).query;
	var parsed_url = queryData.url;
	var index = parsed_url.search('http://');
	var index2 = parsed_url.search('https://');
	if(index!=0 && index2!=0){
		parsed_url = 'http://' + parsed_url;
	}

	console.log('Proxy request received:', parsed_url);

	var options = {
		url: parsed_url
	};

	request(options, function(error, response, body) {
		if (error) {
			console.log(error)
			res.send(error);
		} else {
			res.send(body);
		}
	});
});

