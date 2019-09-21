var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * socket管理
 * by fany
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
var fany;
(function (fany) {
    var SocketManage = (function () {
        function SocketManage() {
        }
        SocketManage.connectServer = function () {
            if (!this.gateServer) {
                this.gateServer = new Pomelo();
            }
            //获取服务器列表
            this.gateServer.init({
                host: GlobalData.connectIP,
                port: GlobalData.connectPort,
            }, fany.SocketManage.onConnectServerListHandle);
        };
        SocketManage.onConnectServerListHandle = function (res) {
            fany.SocketManage.gateServer.request('gate.gateHandler.getConnector', {}, function (data) {
                if (data.code == 200) {
                    fany.SocketManage.connectGameServer(data.data.host, data.data.port);
                }
            });
        };
        SocketManage.connectGameServer = function (host, port) {
            fany.SocketManage.gateServer.disconnect();
            fany.SocketManage.gateServer = null;
            this.isConnect = false;
            if (!this.pomelo) {
                this.pomelo = new Pomelo();
            }
            fany.SocketManage.pomelo.init({
                host: host,
                port: port
            }, fany.SocketManage.onConnectHandle);
            fany.SocketManage.setOn();
        };
        SocketManage.setOn = function () {
            fany.SocketManage.pomelo.on(MessageData.CLOSE, fany.SocketManage.onDisconnect.bind(this));
            fany.SocketManage.pomelo.on(MessageData.IO_ERROR, fany.SocketManage.onDisconnect.bind(this));
            Net.setOn();
        };
        SocketManage.onDisconnect = function (r) {
            fany.SocketManage.isConnect = false;
            PanelManage.openServerErrorPanel("服务器连接异常,请刷新重试！" + JSON.stringify(r));
        };
        SocketManage.onConnectHandle = function (res) {
            fany.SocketManage.isConnect = true;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.HIDE_LOADING_TXT));
        };
        SocketManage.login = function () {
            if (fany.SocketManage.isConnect == true) {
                var spread = QuickManage.$GET("yid");
                var idd = GlobalData.openid + "@" + GlobalData.platform;
                //var idd = "oeJ4Bv_SJqEr9WiwcmEb8OnBPxBo" + "@" + GlobalData.platform;
                fany.SocketManage.pomelo.request('connector.entryHandler.login', { _id: idd, name: GlobalData.user.nickname, sex: GlobalData.user.sex, headurl: GlobalData.user.headurl, spread: spread }, function (data) {
                    if (data.code == 200) {
                        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.CREATE_ROLE, data.data.player));
                    }
                    else {
                        alert("错误的登录,请刷新页面!");
                    }
                });
            }
            else {
                TipsManage.showTips("请等待服务器连接成功!");
            }
        };
        return SocketManage;
    }());
    SocketManage.isConnect = false;
    fany.SocketManage = SocketManage;
    __reflect(SocketManage.prototype, "fany.SocketManage");
})(fany || (fany = {}));
