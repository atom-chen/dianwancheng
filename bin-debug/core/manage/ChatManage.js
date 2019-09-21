var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
var ChatManage = (function () {
    function ChatManage() {
        this.state = "0";
        if (ChatManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    ChatManage.getInstance = function () {
        if (this.instance == null) {
            this.instance = new ChatManage();
        }
        return this.instance;
    };
    ChatManage.prototype.send = function (say, cb) {
        switch (this.state) {
            case "10001":
                Net.send(Protocol.JINSHA_SEND_CHAT, say, cb); //金鲨银鲨
                break;
            case "10002":
                Net.send(Protocol.JINHUA_SEND_CHAT, say, cb); //金花
                //name = "百人金花";
                break;
            case "10003":
                Net.send(Protocol.NIUNIU_SEND_CHAT, say, cb); //牛牛
                //name = "百人牛牛";
                break;
            case "10004":
                // name = "决战21点";
                break;
            case "10006":
                Net.send(Protocol.FRUIT_SEND_CHAT, say, cb); //牛牛
                break;
        }
    };
    ChatManage.prototype.setState = function (state) {
        this.state = state;
    };
    ChatManage.prototype.transition = function (str, flag) {
        if (flag === void 0) { flag = true; }
        var arr = str.split(":");
        var vip = '<font color="#ffd375">V' + arr[1] + '</font>';
        var name = '<font color="#ffffff">' + arr[4] + '</font>';
        var game = '<font color="#e938f2">' + this.getGameName(arr[2]) + '</font>';
        var say = "";
        switch (arr[0]) {
            case "1":
                say = "" + vip + name + "在" + game + "中赢得了" + QuickManage.moneyStr(parseInt(arr[3] + ""));
                break;
            case "2":
                say = arr[1];
                break;
            case "3":
                say = vip + name + "闪亮登场!";
                break;
            case "5":
                if (flag) {
                    say = "" + "土豪玩家" + name + "刚刚发放<font color=#f11300>" + QuickManage.moneyStr(parseInt(arr[3] + "")) + "</font>红包,赶快去抢吧！";
                }
                else {
                    say = "" + "恭喜玩家" + name + "刚刚抢到了最大的红包<font color=#f11300>" + QuickManage.moneyStr(parseInt(arr[3] + "")) + "</font>,运气爆表！";
                }
                break;
            case "6":
                say = arr[1];
                break;
            case "7":
                say = "恭喜玩家" + arr[1] + "升级到<font color=#f11300>VIP" + arr[2] + "!</font>";
                break;
        }
        say = say.replace(/[\n]/ig, '');
        say = say.replace(/[\r]/ig, '');
        return say;
    };
    ChatManage.prototype.getGameName = function (type) {
        var name = "";
        switch (type) {
            case "10001":
                name = "金鲨银鲨";
                break;
            case "10002":
                name = "百人金花";
                break;
            case "10003":
                name = "百人牛牛";
                break;
            case "10004":
                name = "决战21点";
                break;
            case "10006":
                name = "经典水果机";
                break;
        }
        return name;
    };
    return ChatManage;
}());
ChatManage.instance = null;
__reflect(ChatManage.prototype, "ChatManage");
