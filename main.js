/*jshint esversion: 6*/

var http = require('http');
var url = require('url');
var qs = require('querystring');
var express = require('express');
var mysql = require('mysql');
var request = require('request');

var app = http.createServer(function(req,res) {
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if (pathname === '/') {
      res.end('Welcome to AD for EVERYONE v1.0 Server.');
    } else if(pathname === '/start'){
      var headersS = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-unlencoded'
      };
      var optionsS = {
        'url': 'www.aws.com',
        'method': 'POST',
        'headers': headers,
        'form': {
          'jsonrpc': '2.0',
          'method': 'icx_call',
          'id': '1',
          'params': {
            'version': '0x3',
            'from': '',
            'to': '',
            'dataType': '',
            'data': {
              'method': 'transaction_start',
              'params': {
              }
            }
          }
        }
      };
      request(optionsS, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
        }
      });
    } else if(pathname === '/receive') {
      var wid = queryData.wid;
      if (wid !== undefined) {
        var headersR = {
          'User-Agent': 'Super Agent/0.0.1',
          'Content-Type': 'application/x-www-form-unlencoded'
        };
        var optionsR = {
          'url': 'www.aws.com',
          'method': 'POST',
          'headers': headersR,
          'form': {
            'jsonrpc': '2.0',
            'method': 'icx_call',
            'id': '1',
            'params': {
              'version': '0x3',
              'from': '',
              'to': '',
              'dataType': '',
              'data': {
                'method': 'transaction_end',
                'params': {
                  'wid': wid
                }
              }
            }
          }
        };
        request(optionsR, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(body);
          }
        });
      } else {
        response.writeHead(403);
        response.end('403 Forbidden.<br>No Worker ID Detected.');
      }
    } else {
      response.writeHead(404);
      response.end('404 Not Found!');
    }

});
app.listen(1337);
