var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MoneyTreePanel = (function (_super) {
    __extends(MoneyTreePanel, _super);
    function MoneyTreePanel() {
        var _this = _super.call(this) || this;
        _this.lMax = 0;
        _this.skinName = "resource/skins/moneytree/MoneyTreeSkin.exml";
        return _this;
    }
    MoneyTreePanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        EventManage.addButtonEvent(this, this.btnCharge, egret.TouchEvent.TOUCH_TAP, this.onTouchCharge.bind(this));
        EventManage.addButtonEvent(this, this.btnGetCoin, egret.TouchEvent.TOUCH_TAP, this.onTouchGetCoin.bind(this));
        EventManage.addButtonEvent(this, this.btnUp, egret.TouchEvent.TOUCH_TAP, this.onTouchUp.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.HALL_MONEYTREE_LIST, {}, this.treeList.bind(this));
    };
    MoneyTreePanel.prototype.treeList = function (msg) {
        if (msg.code == 200) {
            if (msg.data.level == 0) {
                this.initNo();
            }
            else {
                this.initHave(msg.data);
            }
        }
    };
    MoneyTreePanel.prototype.onTouchClose = function () {
        this.dispose();
    };
    MoneyTreePanel.prototype.onTouchCharge = function () {
        PanelManage.openShop();
    };
    MoneyTreePanel.prototype.onTouchGetCoin = function () {
        if (this.lMax == 0) {
            TipsManage.showTips(ErrorMessage.errorMsg(404));
            return;
        }
        Net.send(Protocol.HALL_MONEYTREE_GET, {}, this.getCoinCallback.bind(this));
    };
    MoneyTreePanel.prototype.getCoinCallback = function (msg) {
        if (msg.code == 200) {
            GlobalData.user.gold = msg.gold;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
            EffectUtils.coinsFly(this, 116, 557);
            this.updateLoding(0, this.lMax);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    MoneyTreePanel.prototype.onTouchUp = function () {
        PanelManage.openShop();
    };
    MoneyTreePanel.prototype.initHave = function (data) {
        this.btnCharge.visible = false;
        this.grpNoTips.visible = false;
        this.labLevel.text = data.level + '级';
        this.btnGetCoin.visible = true;
        this.grpLoding.visible = true;
        this.btnUp.visible = true;
        this.grpUpTip.visible = true;
        this.updateLoding(data.gold, data.max);
    };
    MoneyTreePanel.prototype.initNo = function () {
        this.btnCharge.visible = true;
        this.grpNoTips.visible = true;
        this.labLevel.text = '未获得';
        this.btnGetCoin.visible = false;
        this.grpLoding.visible = false;
        this.btnUp.visible = false;
        this.grpUpTip.visible = false;
    };
    MoneyTreePanel.prototype.updateLoding = function (cur, max) {
        this.lMax = max;
        this.labload.text = cur + '/' + max;
        this.imgload.width = 400 * (cur / max);
    };
    MoneyTreePanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    MoneyTreePanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return MoneyTreePanel;
}(eui.Component));
__reflect(MoneyTreePanel.prototype, "MoneyTreePanel", ["fany.IDispose"]);
