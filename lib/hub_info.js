// TODO FUTURE proper OO
var redis = require('redis');
var db = redis.createClient();

module.exports = HubInfo;

function HubInfo() {
    if (typeof HubInfo.instance === 'object') {
        return HubInfo.instance;
    }

    this.name = '';
    this.wan_address = '192.168.0.1';
    this.lan_address = '192.168.0.2';
    this.status = 'OFF';
    //this.status_change = new Date();

    HubInfo.instance = this;

    HubInfo.store();
}


HubInfo.store = function () {
    var errHandler = function (err) {
        throw err;
    }
    // TODO get rid of redis.print
    db.hset('hub_info', 'name', HubInfo.instance.name, redis.print);
    db.hset('hub_info', 'wan_address', HubInfo.instance.wan_address, redis.print);
    db.hset('hub_info', 'lan_address', HubInfo.instance.lan_address, redis.print);
    db.hset('hub_info', 'status', HubInfo.instance.status, redis.print);
}
//
HubInfo.fetch = function () {
    //db.hgetall('hub_info', function(err, object) {
    //    HubInfo.instance = object;
    //})

    db.hkeys('hub_info', function (err, keys) {
        if (err) throw err;
        keys.forEach(function (key, i) {
            console.log('F jey ' + key);
            db.hget('hub_info', key, function (err, value) {
                if (err) throw err;
                console.log('F value ' + value);

                HubInfo.instance[key] = value;
            });
        });
    });
}

HubInfo.commission = function (name) {
    HubInfo.instance.name = name;
    HubInfo.instance.updateStatus('ON');
    store();
}

HubInfo.decommission = function () {
    HubInfo.instance.name = '';
    HubInfo.instance.updateStatus('OFF');
    store();
}

HubInfo.prototype.wanAddressUpdated = function (wan_address) {
    this.wan_address = wan_address;
    this.updateStatus('ON');
}

HubInfo.updateStatus = function (newStatus) {
    HubInfo.instance.status = newStatus;
    HubInfo.instance.status_change = new Date();
};

HubInfo.toJSON = function () {

    //var t = HubInfo.instance.status_change.toISOString();
    return {
        name: HubInfo.instance.name,
        wan_address: HubInfo.instance.wan_address,
        lan_address: HubInfo.instance.lan_address,
        //bt_address: HubInfo.instance.bt_address,
        status: HubInfo.instance.status,
        //status_change: t
    };
};

