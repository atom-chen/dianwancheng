var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EmailPanel = (function (_super) {
    __extends(EmailPanel, _super);
    function EmailPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/email/EmailPanelSkin.exml";
        return _this;
    }
    EmailPanel.prototype.childrenCreated = function () {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        //EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onTouchVip.bind(this));
        Net.send(Protocol.GET_MAIL_LIST, {}, this.maillistcallback.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        // this.maillistcallback(null);
    };
    EmailPanel.prototype.maillistcallback = function (r) {
        if (r.code == 200) {
            this.clearItems();
            var mail = r.mails;
            var len = mail.length;
            if (len > 0) {
                this.labTips.visible = false;
            }
            else {
                this.labTips.visible = true;
            }
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("EmailItemPanel");
                item.y = i * 111;
                this.itemGroup.addChild(item);
                item.setData(mail[i]);
                this.arr.push(item);
            }
        }
    };
    EmailPanel.prototype.clearItems = function () {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("EmailItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    };
    EmailPanel.prototype.onTouchVip = function () {
        PanelManage.openVip();
    };
    EmailPanel.prototype.dispose = function () {
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    EmailPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return EmailPanel;
}(eui.Component));
__reflect(EmailPanel.prototype, "EmailPanel", ["fany.IDispose"]);
