var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var RankItemPanel = (function (_super) {
    __extends(RankItemPanel, _super);
    function RankItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/rank/RankItemPanelSkin.exml";
        return _this;
    }
    RankItemPanel.prototype.childrenCreated = function () {
    };
    RankItemPanel.prototype.setData = function (data) {
        this.head.source = data.headurl;
        if (data.rank > 3) {
            this.txtRank.visible = true;
            this.txtRank.text = data.rank;
            this.num.visible = false;
        }
        else {
            this.txtRank.visible = false;
            this.num.source = "rank.num" + data.rank;
            this.num.visible = true;
        }
        this.txtGold.text = QuickManage.moneyStr(data.gold);
        this.txtName.text = data.name;
        this.txtVip.text = "v" + data.vip;
    };
    RankItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    RankItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return RankItemPanel;
}(eui.Component));
__reflect(RankItemPanel.prototype, "RankItemPanel", ["fany.IDispose"]);
