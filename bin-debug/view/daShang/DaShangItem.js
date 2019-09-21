var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DaShangItem = (function (_super) {
    __extends(DaShangItem, _super);
    function DaShangItem() {
        var _this = _super.call(this) || this;
        _this.userId = '';
        _this.skinName = "resource/skins/dashang/DashangItemSkin.exml";
        return _this;
    }
    DaShangItem.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnAction, egret.TouchEvent.TOUCH_TAP, this.onTouchAction.bind(this));
    };
    DaShangItem.prototype.onTouchAction = function () {
        // Net.send(Protocol.,{},this.onTouchActionCallback.bind(this));
        // eventdispact
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.DASHANG_NOTICE_PUBLISH, this.userId));
    };
    DaShangItem.prototype.setInfo = function (data) {
        this.labVip.text = 'V' + data.vip;
        this.labName.text = data.name;
        this.labInfo.text = '求打赏。。。。';
        var date = new Date(data.time);
        var hour = date.getHours() + '';
        var min = date.getMinutes() + '';
        if (parseInt(min) < 10) {
            min = '0' + min;
        }
        this.labTime.text = hour + ':' + min;
        this.userId = data.id;
    };
    DaShangItem.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    DaShangItem.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return DaShangItem;
}(eui.Component));
__reflect(DaShangItem.prototype, "DaShangItem", ["fany.IDispose"]);
