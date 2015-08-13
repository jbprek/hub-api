/**
 * Created by prekezes on 13/8/2015.
 */

/* Hub Info 
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

HubInfo.toJson = function () {
    JSON.stringify(this)
};

HubInfo.fromJson = function (json_string) {
    obj = JSON.parse(json_string);
    this.name = obj.name;
    this.status = obj.status;
    this.wan_address = obj.wan_address;
    this.status_change = obj.status_change;
    this.lan_address = obj.lan_address ;
    this.bluetooth_address = obj.bluetooth_address;};

HubInfo.putToRedis = function () {
};

HubInfo.getFromRedis = function () {
};

var hub = new HubInfo("L", "B");


