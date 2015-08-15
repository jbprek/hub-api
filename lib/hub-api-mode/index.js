/**
 * Created by prekezes on 13/8/2015.
 */

/* Hub Info is a Singleton
HubInfo	name:string	lan_address:string	wan_address:string	bluetooth_address:string	status:HubStatus	status_change:date_time
*/
function HubInfo( lan_address, bluetooth_address ){
    this.name = '';
    this.status = 'NC'
    this.wan_address = '';
    this.status_change = Date.now();
    this.lan_address = lan_address ;
    this.bluetooth_address = bluetooth_address;
}

HubInfo.prototype.toJson = function () {
    JSON.stringify(this)
};

HubInfo.prototype.fromJson = function (json_string) {
    obj = JSON.parse(json_string);
    this.name = obj.name;
    this.status = obj.status;
    this.wan_address = obj.wan_address;
    this.status_change = obj.status_change;
    this.lan_address = obj.lan_address ;
    this.bluetooth_address = obj.bluetooth_address;};

HubInfo.prototype.putToRedis = function () {
};

HubInfo.prototype.getFromRedis = function () {
};

var HUB_INFO =  new HubInfo("lanIP", "BT_IP");

exports.ping = function(){
    return "{'ping' : 'pong'}"
}

exports.hubInfo = function() {
    var json = new HubInfo("lanIP", "BT_IP").toJson();
    return json ;
}

exports.setName = function(name){
    if ( name == null)
        throw 'Invalid hub name:' + name;
    HUB_INFO.name = name;
}

