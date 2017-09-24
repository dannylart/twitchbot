"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var net = require("net");
var simple_ts_event_dispatcher_1 = require("simple-ts-event-dispatcher");
var SocketClient = /** @class */ (function (_super) {
    __extends(SocketClient, _super);
    function SocketClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SocketClient.prototype.connect = function (config) {
        this.socket = new net.Socket();
        this.socket.setTimeout(0);
        this.socket.setEncoding('ascii');
        this.socket.connect(parseInt(config.port), config.server);
        this.trigger('connected');
    };
    return SocketClient;
}(simple_ts_event_dispatcher_1.EventDispatcher));
exports.SocketClient = SocketClient;
//# sourceMappingURL=SocketClient.js.map