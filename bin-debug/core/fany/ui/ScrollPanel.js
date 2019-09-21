var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 滚动面板
 * @author  fany
 *
 */
var ScrollPanel = (function (_super) {
    __extends(ScrollPanel, _super);
    function ScrollPanel(ww, hh) {
        var _this = _super.call(this) || this;
        _this.ww = 0;
        _this.hh = 0;
        _this.xx = 0;
        _this.yy = 0;
        _this.time = 0;
        _this.ww = ww;
        _this.hh = hh;
        return _this;
    }
    ScrollPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        this.bgGroup = new eui.Group();
        this.bgGroup.width = this.ww;
        this.bgGroup.height = this.hh;
        this.addChild(this.bgGroup);
        //this.bgGroup.addChild(new YuePanel());
        EventManage.addEvent(this, this.bgGroup, egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin.bind(this));
        EventManage.addEvent(this, this.bgGroup, egret.TouchEvent.TOUCH_END, this.onTouchEend.bind(this));
        EventManage.addEvent(this, this.bgGroup, egret.TouchEvent.TOUCH_MOVE, this.onTouchMove.bind(this));
        var txt = new eui.Label("ssssssssssssssssss");
        this.bgGroup.addChild(txt);
        this.view = new YuePanel();
        this.view.touchEnabled = false;
        this.view.touchChildren = false;
        this.bgGroup.addChild(this.view);
        var mask2 = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawRect(0, 0, this.ww, this.hh);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.mask = mask2;
    };
    ScrollPanel.prototype.onTouchEend = function (e) {
        var nowTime = egret.getTimer() - this.time;
        if (nowTime < 200) {
        }
        var ss = (this.hh - this.view.height);
        if (this.bgGroup.y > 0) {
            this.bgGroup.y = 0;
        }
        if (this.bgGroup.y < ss) {
            this.bgGroup.y = ss;
        }
    };
    ScrollPanel.prototype.onTouchBegin = function (e) {
        this.yy = e.stageY + this.bgGroup.y;
        this.time = egret.getTimer();
    };
    ScrollPanel.prototype.onTouchMove = function (e) {
        var ss = (this.hh - this.view.height);
        if (this.bgGroup.y <= 0 && (this.bgGroup.y >= ss)) {
            this.bgGroup.y = -(e.stageY - this.yy);
        }
        // else {
        //     if (this.bgGroup.y > 0) {
        //         this.bgGroup.y = 0;
        //     }
        //     if (this.bgGroup.y > ss) {
        //         this.bgGroup.y = ss;
        //     }
        // }
    };
    ScrollPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ScrollPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ScrollPanel;
}(eui.Component));
__reflect(ScrollPanel.prototype, "ScrollPanel", ["fany.IDispose"]);
