var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var VipItem = (function (_super) {
    __extends(VipItem, _super);
    function VipItem() {
        var _this = _super.call(this) || this;
        // private index: number = -1;
        _this.baseRate = 100;
        _this.baseMoney = 15;
        _this.skinName = 'resource/skins/vip/VipItemSkin.exml';
        return _this;
    }
    // private mArr = [20, 50, 100, 200, 500];
    VipItem.prototype.childrenCreated = function () {
    };
    VipItem.prototype.setVipMoney = function (vip) {
        if ((parseInt(GlobalData.user.vip) + 1) >= parseInt(vip.id + "")) {
            this.labTitle.text = '累计充值' + vip.money / 100 + '元';
        }
        else {
            this.labTitle.text = '累计充值???元';
        }
        this.imgVip.source = 'vip.v' + vip.id;
        this.labInfo0.text = '签到奖励多送' + vip.id + '倍金币';
        this.labInfo1.text = '救济金每日每次领取' + QuickManage.moneyStr(vip.jjg) + '金币';
        if (parseInt(vip.id + "") == 1) {
            this.labInfo2.text = '金鲨银鲨游戏可以上庄';
        }
        else if (parseInt(vip.id + "") == 5) {
            this.labInfo2.text = '百人牛牛和百人金花尊享VIP专属座位';
        }
        else if (parseInt(vip.id + "") == 6) {
            this.labInfo2.text = '百人牛牛游戏可以上庄';
        }
        else if (parseInt(vip.id + "") == 8) {
            this.labInfo2.text = '百人金花游戏可以上庄';
        }
        else if (parseInt(vip.id + "") == 10) {
            this.labInfo2.text = '大厅可以发布全服公告';
        }
    };
    VipItem.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    VipItem.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return VipItem;
}(eui.Component));
__reflect(VipItem.prototype, "VipItem", ["fany.IDispose"]);
