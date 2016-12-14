var http = require('http');

var WebSocketServer = require('websocket').server;

var server = http.createServer(function (request, response) {
});

var clients = [];

var obstacles = [];

for (var i = 0; i < 100; i++) {
    obstacles.push(Math.floor(Math.random() * 300));
}

function Message(type) {
    this.type = type;
    this.id = 0;
    this.y = null;
    this.obstacles = obstacles;
}


server.listen(11111, function () {
    console.log((new Date()) + " Server is listening on port " + 11111);
});

var wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function (request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');

    var connection = request.accept(null, request.origin);

    var index = clients.push(connection) - 1;

    console.log((new Date()) + ' Connection accepted.');

    // user sent some message
    connection.on('message', function (message) {
        if (message.type === 'utf8') {
            var data = JSON.parse(message.utf8Data);
            if (data.type == "getObstacles") {
                console.log(JSON.stringify(new Message("obstacles")));
                connection.sendUTF(JSON.stringify(new Message("obstacles")));
            } else {
                // broadcast message to all connected clients
                for (var i = 0; i < clients.length; i++) {
                    if (clients[i] != connection && clients[i] != null) {
                        clients[i].sendUTF(message.utf8Data);
                    }
                }
            }
        }
    });
});
