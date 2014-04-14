var restify = require('restify');
var exec = require('child_process').exec;

function say(req, res, next) {
  
    exec('/opt/svox-pico/say "' + req.params.sentence + '" fr-FR', function callback(error, stdout, stderr){

        if(error)
            console.log("Error");
    });

    res.send('Saying : ' + req.params.sentence);
    next();
}

function sayin(req, res, next) {
  
    exec('/opt/svox-pico/say "' + req.params.sentence + '" ' + req.params.lg, function callback(error, stdout, stderr){

        if(error)
            console.log("Error");
    });

    res.send('Saying in ' + req.params.lg + ' : ' + req.params.sentence);
    next();
}

var server = restify.createServer();
server.get('/say/:sentence', say);
server.get('/sayin/:lg/:sentence', sayin);

server.listen(3333, function() {
  console.log('%s listening at %s', server.name, server.url);
});
