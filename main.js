/*jshint esversion: 6*/

var http = require('http');
var url = require('url');
var qs = require('querystring');
var express = require('express');
var request = require('request');

var app = http.createServer(function(req,res) {
    var _url = req.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var score = '';
    if (pathname === '/') {
      res.end('Welcome to AD for All v1.0 Server.');
    } else if(pathname === '/start'){
      var sw = 0;
      var widS = queryData.wid;
      var headersS = {
        'User-Agent': 'Super Agent/0.0.1',
        'Content-Type': 'application/x-www-form-unlencoded'
      };
      var optionsS = {
        'url': 'http://ec2-13-125-236-184.ap-northeast-2.compute.amazonaws.com:9000/api/v3',
        'method': 'POST',
        'headers': headersS,
        'form': {
          'jsonrpc': '2.0',
          'method': 'icx_call',
          'id': '1',
          'params': {
            'version': '0x3',
            'from': widS,
            'to': score,
            'dataType': 'call',
            'data': {
              'method': 'transaction_start',
              'params': {
                'wid': widS
              }
            }
          }
        }
      };
      //request(optionsS, function (error, response, body) {
      //  if (!error && response.statusCode == 200) {
      //    console.log(body);
      //  }
      //});
      res.writeHead(200);
      res.end(widS);
    } else if(pathname === '/receive') {
      var widR = queryData.wid;
      if (widR !== undefined) {
        var headersR = {
          'User-Agent': 'Super Agent/0.0.1',
          'Content-Type': 'application/x-www-form-unlencoded'
        };
        var optionsR = {
          'url': 'http://ec2-13-125-236-184.ap-northeast-2.compute.amazonaws.com:9000/api/v3',
          'method': 'POST',
          'headers': headersR,
          'form': {
            'jsonrpc': '2.0',
            'method': 'icx_call',
            'id': '1',
            'params': {
              'version': '0x3',
              'from': widR,
              'to': score,
              'dataType': 'call',
              'data': {
                'method': 'transaction_end',
                'params': {
                  'wid': widR
                }
              }
            }
          }
        };
        //request(optionsR, function (error, response, body) {
        //  if (!error && response.statusCode == 200) {
        //    console.log(body);
        //  }
        //});
        res.writeHead(200);
        res.end(widR);
      } else {
        res.writeHead(403);
        res.end('403 Forbidden. No Worker ID Detected.');
      }
    } else {
      res.writeHead(404);
      res.end('404 Not Found!');
    }

});
app.listen(1337);
