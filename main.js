/*jshint esversion: 6*/

var http = require('http');
var url = require('url');
var qs = require('querystring');
var express = require('express');
var mysql = require('mysql');
var request = require('request');

var app = http.createServer(function(request,response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
      response.end('Welcome to AD for EVERYONE v1.0 Server.');
    } else if(pathname === '/start'){

    } else if(pathname === '/receive') {
      var headers = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-unlencoded'
      };
      var options = {
        'url': 'www.aws.com',
        'method': 'POST',
        'headers' headers,
        'form': 
      };
    } else {
      response.writeHead(404);
      response.end('404 Not Found!');
    }

});
app.listen(1337);
