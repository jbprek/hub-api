var Hapi = require('hapi');
var Good = require('good');
var Model = require('./lib/hub-api-mode/index')

var server = new Hapi.Server();
server.connection({port: 3000});

/* Get Hub Info */
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        server.log('info', 'GET /: ');
        var body = Model.ping()// Model.ping()


        //reply.setHeader('Content-Length', Buffer.byteLength(body));
        reply.setHeader('Content-Type', 'text/plain; charset="utf-8"');
        reply.end(body);

    }
});

/* Commission hub */
server.route({
    method: 'POST',
    path: '/',
    handler: function (request, reply) {
        reply("POST /")
    }
});

/* Temporary decommission hub */
server.route({
    method: 'PUT',
    path: '/',
    handler: function (request, reply) {
        reply("PUT /")
    }
});

/* Temporary decommission hub */
server.route({
    method: 'DELETE',
    path: '/',
    handler: function (request, reply) {
        reply("DELETE /")
    }
});

/* Get cached sensor values for all or a specific cell */
server.route({
    method: 'GET',
    path: '/sensors/{lan_address?}',
    handler: function (request, reply) {
        lan_address = request.params.lan_address ? '/' +  request.params.lan_address : ''
        reply('GET /sensors' + lan_address);
    }
});


/* Get actual sensor values for all or a specific cell */
server.route({
    method: 'PUT',
    path: '/sensors/{lan_address?}',
    handler: function (request, reply) {
        lan_address_param = request.params.lan_address;
        if ( lan_address_param)
            lan_address = lan_address_param
        else
            lan_address = ''
            reply('PUT /sensors' + lan_address);
    }
});


/* Decommission a cell with lan_address */
server.route({
    method: 'DELETE',
    path: '/sensors/{lan_address}',
    handler: function (request, reply) {
        reply('PUT /sensors/' + lan_address);
    }
});

server.route({
    method: 'GET',
    path: '/alarms',
    handler: function (request, reply) {
        reply('GET /alarms');
    }
});


server.route({
    method: 'GET',
    path: '/warnings',
    handler: function (request, reply) {
        reply('GET /warnings');
    }
});


/*HubInfo */

/* Register good plugins */
server.register({
    register: Good,
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: {
                response: '*',
                log: '*'
            }
        }]
    }
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});