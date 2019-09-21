var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DdzHeadItemPanel = (function (_super) {
    __extends(DdzHeadItemPanel, _super);
    function DdzHeadItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/ddz/DdzHeadItemSkin.exml";
        return _this;
    }
    DdzHeadItemPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        var mask2 = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(52, 86, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.head.mask = mask2;
    };
    DdzHeadItemPanel.prototype.setData = function (data) {
        this.txtName.text = data.name;
        this.txtGold.text = data.gold;
        this.head.source = data.head;
        //this.dizhu.visible = data.dizhu;
        this.txtPokerNum.text = data.pokernum;
        //this.timerGroup.visible=false;
        //this.imgBuchu.visible = false;
    };
    DdzHeadItemPanel.prototype.setPokerNum = function (num) {
        this.txtPokerNum.text = num + "";
    };
    DdzHeadItemPanel.prototype.setDizhu = function (flag) {
        if (flag === void 0) { flag = true; }
        this.dizhu.visible = flag;
    };
    DdzHeadItemPanel.prototype.setGold = function (gold) {
        var num = QuickManage.moneyStr2number(this.txtGold.text) + gold;
        this.txtGold.text = QuickManage.moneyStr(num);
    };
    DdzHeadItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    DdzHeadItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return DdzHeadItemPanel;
}(eui.Component));
__reflect(DdzHeadItemPanel.prototype, "DdzHeadItemPanel", ["fany.IDispose"]);
