/**
 * socket管理
 * by fany
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
module fany {
    export class SocketManage {
        private static gateServer: Pomelo;
        public static pomelo: Pomelo;
        public static isConnect: boolean = false;
        public static connectServer(): void {
            if (!this.gateServer) {
                this.gateServer = new Pomelo();
            }
            //获取服务器列表
            this.gateServer.init({
                host: GlobalData.connectIP,//'192.168.1.103'
                port: GlobalData.connectPort,//3010,                log: true
            }, fany.SocketManage.onConnectServerListHandle);
        }
        private static onConnectServerListHandle(res): void {
            fany.SocketManage.gateServer.request('gate.gateHandler.getConnector', {}, function (data) {
                if (data.code == 200) {
                    fany.SocketManage.connectGameServer(data.data.host, data.data.port);
                }
            });
        }
        public static connectGameServer(host, port): void {
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
        }

        private static setOn(): void {
            fany.SocketManage.pomelo.on(MessageData.CLOSE, fany.SocketManage.onDisconnect.bind(this));
            fany.SocketManage.pomelo.on(MessageData.IO_ERROR, fany.SocketManage.onDisconnect.bind(this));
            Net.setOn();
        }

        private static onDisconnect(r): void {
            fany.SocketManage.isConnect = false;
            PanelManage.openServerErrorPanel("服务器连接异常,请刷新重试！" + JSON.stringify(r));
        }
        private static onConnectHandle(res): void {
            fany.SocketManage.isConnect = true;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.HIDE_LOADING_TXT));
        }
        public static login(): void {
            if (fany.SocketManage.isConnect == true) {
                var spread = QuickManage.$GET("yid");
                var idd = GlobalData.openid + "@" + GlobalData.platform;
                //var idd = "oeJ4Bv_SJqEr9WiwcmEb8OnBPxBo" + "@" + GlobalData.platform;
                fany.SocketManage.pomelo.request('connector.entryHandler.login', { _id: idd, name: GlobalData.user.nickname, sex: GlobalData.user.sex, headurl: GlobalData.user.headurl, spread: spread }, function (data) {
                    if (data.code == 200) {
                        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.CREATE_ROLE, data.data.player));
                    } else {
                        alert("错误的登录,请刷新页面!");
                    }
                });
            } else {
                TipsManage.showTips("请等待服务器连接成功!");
            }
        }
    }
}    