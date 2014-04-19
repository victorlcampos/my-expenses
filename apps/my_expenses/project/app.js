var static = require('node-static');

var urlConfig = {'development': './build', 'production': './www'}
var url       = urlConfig[process.env.NODE_ENV || 'development'];

console.log('Env = ' + (process.env.NODE_ENV || 'development'))
console.log('listen url = '+ url);

var fileServer = new static.Server(url, { gzip: true, cache: 7200 });

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, result) {
            if (err) { // There was an error serving the file
                console.error("Error serving " + request.url + " - " + err.message);

                // Respond to the client
                response.writeHead(err.status, err.headers);
                response.end();
            }
        });
    }).resume();
}).listen(process.env.PORT || 8080);