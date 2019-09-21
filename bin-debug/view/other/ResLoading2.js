var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 进入前加载
 */
var ResLoading2 = (function (_super) {
    __extends(ResLoading2, _super);
    function ResLoading2(obj) {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/other/ResLoadingPanelSkin.exml";
        _this.param = obj;
        return _this;
    }
    ResLoading2.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        this.txtStr.text = "正在加载界面资源...";
        this.zhuan.anchorOffsetX = 25;
        this.zhuan.anchorOffsetY = 25;
        //EnterFrameManage.add(this.gogo.bind(this), "ResLoading.gogo");
        TimerManager.getInstance().setFrame("ResLoading.gogo", this.gogo.bind(this), this);
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UI_LOADING_COM, this.dispose.bind(this));
        EventManage.addEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose2.bind(this));
    };
    ResLoading2.prototype.setProgress = function (current, total) {
        this.txtTips.text = Math.floor((current / total) * 100) + "%";
    };
    ResLoading2.prototype.gogo = function () {
        this.zhuan.rotation += 8;
    };
    ResLoading2.prototype.dispose2 = function () {
        this.visible = false;
    };
    ResLoading2.prototype.dispose = function () {
        TimerManager.getInstance().remove("ResLoading.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
        PanelManage.resloading2 = null;
    };
    ResLoading2.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ResLoading2;
}(eui.Component));
__reflect(ResLoading2.prototype, "ResLoading2", ["fany.IDispose"]);
