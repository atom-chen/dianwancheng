/**
  * 网络相关管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 快捷创建
  */
var Net;
(function (Net) {
    Net.oldtime = 0;
    Net.oldpro = "";
    /**
     * 连接服务器
     */
    function connectServer() {
        fany.SocketManage.connectServer();
    }
    Net.connectServer = connectServer;
    /**
     * 登录
     */
    function login() {
        fany.SocketManage.login();
    }
    Net.login = login;
    function setOn() {
        fany.SocketManage.pomelo.on(MessageData.GLOBALCHAT, Net.manageOn.bind(this, 9)); //全服公告
        fany.SocketManage.pomelo.on(MessageData.NOTICE_MESSAGE, Net.manageOn.bind(this, 10)); //红点消息处理(任务，邮件，摇钱树)
        fany.SocketManage.pomelo.on(MessageData.REDPACK, Net.manageOn.bind(this, 11)); //监听红包
        fany.SocketManage.pomelo.on(MessageData.DWC_PAY, Net.manageOn.bind(this, 12)); //充值
        fany.SocketManage.pomelo.on(MessageData.GAME_CHAT, Net.manageOn.bind(this, 14)); //聊天
        fany.SocketManage.pomelo.on(MessageData.DWC_MONEY, Net.manageOn.bind(this, 15));
        GameListen.getInstance().setOn();
    }
    Net.setOn = setOn;
    /**
     * 发送消息
     * @param notice
     * @param data
     * @param cb
     */
    function send(notice, data, cb, isDelay) {
        if (isDelay === void 0) { isDelay = true; }
        if (fany.SocketManage.isConnect) {
            if (isDelay) {
                if (Net.oldpro == notice) {
                    var tt = egret.getTimer();
                    // console.log(tt-Net.oldtime)
                    if (tt - Net.oldtime < 200) {
                        TipsManage.showTips("您的操作太频繁！");
                        Net.oldtime = tt;
                        return;
                    }
                    Net.oldtime = tt;
                }
            }
            fany.SocketManage.pomelo.request(notice, data, function (r) {
                cb(r);
            });
            Net.oldpro = notice;
        }
        else {
            TipsManage.showTips("服务器未连接！");
        }
    }
    Net.send = send;
    /**
     * 发送消息需要缓存
     * @param notice 消息名
     * @param data  发送数据
     * @param cb    回调方法
     * @param key   缓存关键Key
     */
    function sendNeedSave(notice, data, cb, key) {
        if (fany.SocketManage.isConnect) {
            var obj = DataManage.getPool(key);
            if (obj) {
                cb(obj);
            }
            else {
                fany.SocketManage.pomelo.request(notice, data, function (r) {
                    DataManage.addPool(key, r);
                    cb(r);
                });
            }
        }
        else {
            TipsManage.showTips("服务端已经关闭！");
        }
    }
    Net.sendNeedSave = sendNeedSave;
    /**
     * 发送消息无返回
     * @param notice
     * @param data
     * @param cb
     */
    function sendVoid(notice, data) {
        if (fany.SocketManage.isConnect) {
            fany.SocketManage.pomelo.notify(notice, data);
        }
        else {
            TipsManage.showTips("服务端已经关闭！");
        }
    }
    Net.sendVoid = sendVoid;
    /**
     * 管理服务端主动推送的消息
     * @param index
     */
    function manageOn(index, data) {
        switch (index) {
            case 9:
                if (PanelManage.hall) {
                    PanelManage.notice.gonggao(data);
                }
                break;
            case 10:
                if (PanelManage.hall) {
                    PanelManage.hall.redNotice(data.msg, true);
                }
                else {
                    GlobalData.hallNotice = data.msg;
                }
                break;
            case 11:
                if (data.msg.name == GlobalData.user.nickname)
                    return;
                PanelManage.openRedBox(-1, 0, data.msg);
                break;
            case 12:
                lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_PAY, data));
                break;
            case 14:
                if (PanelManage.chat) {
                    PanelManage.chat.setChat(data);
                }
                break;
            case 15:
                if (PanelManage.yao) {
                    PanelManage.yao.updateData(data);
                }
                break;
        }
    }
    Net.manageOn = manageOn;
})(Net || (Net = {}));
