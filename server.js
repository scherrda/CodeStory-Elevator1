var http = require("http");
var url = require("url");
var elevator = require("./elevator");

function start() {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");
        var regExp = /\/(.*)/g;
        response.writeHead(200, {"Content-Type": "application/json"});
        var command = regExp.exec(pathname)[1];
        if(command == "call"){
            var query = require('url').parse(request.url,true).query;
            response.write(elevator.call(query.atFloor, query.to));
        }else if(command == "go"){
            var query = require('url').parse(request.url,true).query;
            response.write(elevator.go(query.floorToGo));

        }else{
            response.write(elevator[command]());

        }
        response.end();
    }

    http.createServer(onRequest).listen(9000);
    console.log("Server has started.");
}

exports.start = start;