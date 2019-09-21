var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FreeCoinPanel = (function (_super) {
    __extends(FreeCoinPanel, _super);
    function FreeCoinPanel() {
        var _this = _super.call(this) || this;
        _this.tipsGoldData = null;
        _this.skinName = 'resource/skins/freeCoin/FreeCoinSkin.exml';
        return _this;
    }
    FreeCoinPanel.prototype.childrenCreated = function () {
        this.initData();
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.GET_FOLLOW_GOLD, this.getGoldTips.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    };
    FreeCoinPanel.prototype.initData = function () {
        this.arr = [];
        var item1 = {};
        var arr = [];
        if (GlobalData.userfrom == "self") {
            item1 = { title: "绑定账号领金币", info: "用账号登录可领取50万金币", res: "task.btnget", func: this.openQRcode.bind(this) };
            arr.push(item1);
        }
        else {
            if (GlobalData.configData.data.gongzhonghaourl != "") {
                item1 = { title: "关注领金币", info: "关注公众号后可领取50万金币", res: "task.btnget", func: this.openQRcode.bind(this) };
                arr.push(item1);
            }
        }
        var item2 = { title: "救济金", info: "少于金币10000即可领取", res: "task.btnget", func: this.getFreeCoins.bind(this) };
        var item3 = { title: "签到奖励", info: "每日登陆即可领取", res: "c.btnchakan", func: this.jumpSign.bind(this) };
        var item4 = { title: "任务领取", info: "完成登陆即可领取", res: "c.btnchakan", func: this.jumpTask.bind(this) };
        var item5 = { title: "提建议得金币", info: "提交建议或者BUG采纳就会有50万金币奖励", res: "c.btnchakan", func: this.jumpSet.bind(this) };
        var item6 = { title: "转盘大抽奖", info: "每日转盘大抽奖", res: "c.btnchakan", func: this.jumpJiang.bind(this) };
        arr.push(item2);
        arr.push(item3);
        arr.push(item4);
        arr.push(item5);
        arr.push(item6);
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var item = ObjManage.getObj("FreeCoinItemPanel");
            item.y = i * 125;
            this.itemGroup.addChild(item);
            item.setData(arr[i]);
            this.arr.push(item);
        }
    };
    FreeCoinPanel.prototype.getFreeCoins = function () {
        Net.send(Protocol.GET_ALMS, {}, this.getFreeCallback.bind(this));
    };
    FreeCoinPanel.prototype.getFreeCallback = function (msg) {
        if (msg.code == 200) {
            GlobalData.user.gold = msg.gold;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
            EffectUtils.coinsFly(this, 416, 340);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    FreeCoinPanel.prototype.jumpSet = function () {
        PanelManage.openSet();
    };
    FreeCoinPanel.prototype.jumpJiang = function () {
        PanelManage.openLottery();
    };
    FreeCoinPanel.prototype.jumpTask = function () {
        PanelManage.openTask();
    };
    FreeCoinPanel.prototype.jumpSign = function () {
        PanelManage.openSign();
    };
    FreeCoinPanel.prototype.openQRcode = function () {
        Net.send(Protocol.HALL_GET_FOLLOW_GOLD, {}, this.getGoldCB.bind(this));
        if (GlobalData.userfrom == "weixin") {
            QuickManage.openEr(GlobalData.configData.data.gongzhonghaourl);
        }
        else {
            if (GlobalData.isLogin == false) {
                window.location.href = GlobalData.configData.data.linkhall + "?fwid=fixed";
                ;
            }
        }
    };
    FreeCoinPanel.prototype.getGoldCB = function (msg) {
        // if (msg.code == 200) {
        // 	GlobalData.user.gold = msg.gold;
        // 	PanelManage.hall.updateData();
        // }
        // else {
        // 	TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        // }
        this.tipsGoldData = msg;
    };
    FreeCoinPanel.prototype.getGoldTips = function () {
        if (!this.tipsGoldData) {
            return;
        }
        if (this.tipsGoldData['code'] == 200) {
            GlobalData.user.gold = this.tipsGoldData['gold'];
            PanelManage.hall.updateData();
            TipsManage.showTips('恭喜你领取了50万金币！');
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(this.tipsGoldData['msg']));
        }
    };
    FreeCoinPanel.prototype.dispose = function () {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("FreeCoinItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    FreeCoinPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return FreeCoinPanel;
}(eui.Component));
__reflect(FreeCoinPanel.prototype, "FreeCoinPanel", ["fany.IDispose"]);
