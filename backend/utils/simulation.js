var express = require('express');
var webot = require('webot');
 
var app = express();
 
webot.set('hi', "Hi, I'm Webot.");
 
webot.set('subscribe', {
  pattern: function(info) {
    return info.event === 'subscribe';
  },
  handler: function(info) {
    return 'Thank you for subscribe.';
  }
});


app.get('/webot', function(req, res, next) {
    var message = req.query.message;
   
    webot.reply({
      text: message,
    }, function(err, info) {
      if (err) return res.json({ r: err });
      res.json({
        r: 0,
        reply: info.reply
      });
    });
  });