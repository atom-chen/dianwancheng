var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlackJackItemPanel = (function (_super) {
    __extends(BlackJackItemPanel, _super);
    function BlackJackItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = 'resource/skins/blackjack/BlackJackItemSkin.exml';
        return _this;
    }
    BlackJackItemPanel.prototype.childrenCreated = function () {
        //EventManage.addButtonEvent(this, this.btnStart, egret.TouchEvent.TOUCH_TAP, this.onTouchStart.bind(this));
    };
    BlackJackItemPanel.prototype.setData = function (data) {
        this.txtName.text = data.name;
        this.txtRank.text = data.rank;
        this.txtScore.text = data.toScore;
    };
    BlackJackItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    BlackJackItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return BlackJackItemPanel;
}(eui.Component));
__reflect(BlackJackItemPanel.prototype, "BlackJackItemPanel", ["fany.IDispose"]);
