var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AwardItem = (function (_super) {
    __extends(AwardItem, _super);
    function AwardItem() {
        var _this = _super.call(this) || this;
        _this._id = '';
        _this.skinName = "resource/skins/award/AwardItemSkin.exml";
        return _this;
    }
    AwardItem.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnTouch, egret.TouchEvent.TOUCH_TAP, this.onTouchExchange.bind(this));
    };
    AwardItem.prototype.setData = function (data, type) {
        if (type == 1) {
            this.setExchange(data);
        }
        else if (type == 2) {
            this.setSelfRecord(data);
        }
        else if (type == 3) {
            this.setAllRecord(data);
        }
    };
    AwardItem.prototype.setExchange = function (data) {
        this.grpExchange.visible = true;
        this.grpRecord.visible = false;
        this.labTitle.text = data.name; //礼物名称
        this.labInfo.text = data.desc; //礼物描述
        this.labGold.text = QuickManage.moneyStr(data.need_count); //所需奖券
        // data.rule  vip
        this.imgGift.source = GlobalData.cdnResUrl + "resource/assets/noload/icon/" + data.icon + ".png"; //图片
        this._id = data._id;
    };
    AwardItem.prototype.setAllRecord = function (data) {
        this.grpExchange.visible = false;
        this.grpRecord.visible = true;
        this.labRecordInfo.text = 'vip' + data.vip + '玩家' + data.name + '兑换了' + data.award;
        this.labRecordTime.text = (new Date(data.time)).toLocaleString();
    };
    AwardItem.prototype.setSelfRecord = function (data) {
        this.grpExchange.visible = false;
        this.grpRecord.visible = true;
        this.labRecordInfo.text = '兑换了' + data.award;
        this.labRecordTime.text = (new Date(data.time)).toLocaleString();
    };
    AwardItem.prototype.onTouchExchange = function () {
        Net.send(Protocol.HALL_GIFT_EXCHANGE, { giftId: this._id }, this.exchangeCB.bind(this));
    };
    AwardItem.prototype.exchangeCB = function (msg) {
        if (msg.code == 200) {
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.GIFT_ON_EXCHANGE, msg.data));
            TipsManage.showTips('兑换奖品成功！');
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    AwardItem.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    AwardItem.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return AwardItem;
}(eui.Component));
__reflect(AwardItem.prototype, "AwardItem", ["fany.IDispose"]);
