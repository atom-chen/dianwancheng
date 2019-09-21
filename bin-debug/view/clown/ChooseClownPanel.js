var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// TypeScript file
var ChooseClownPanel = (function (_super) {
    __extends(ChooseClownPanel, _super);
    function ChooseClownPanel(bet) {
        var _this = _super.call(this) || this;
        _this.res = "";
        _this.tt = 0;
        _this.tt3 = 0;
        _this.isMove = false;
        _this.tt1 = 0;
        _this.tt2 = 30;
        _this.isDouble = 0; //是否加倍
        _this.skinName = 'resource/skins/clown/ChooseClownskin.exml';
        _this.bet = bet;
        return _this;
    }
    ChooseClownPanel.prototype.childrenCreated = function () {
        var _this = this;
        for (var i = 1; i < 9; i++) {
            this["clown_star" + i].visible = false;
        }
        this.imgWinLost.visible = false;
        this.updataBet(this.bet);
        setTimeout(function () {
            _this.grpGuess.visible = false;
        }, 2000);
        this.addEventListene();
        MusicManage.playMuisc("clown_roll_music");
        this.rollMc = QuickManage.createMc('rollmc');
        this.zhuanGroup.addChild(this.rollMc);
        this.rollMc.play(-1);
        TimerManager.getInstance().setFrame("ChooseClownPanel.gogo", this.gogo.bind(this), this, 3);
    };
    ChooseClownPanel.prototype.gogo = function () {
        if (this.isMove == false) {
            if (this.hong.x == 62) {
                this.hong.x = -79;
            }
            else {
                this.hong.x = 62;
            }
        }
        if (++this.tt1 == 10) {
            this.tt1 = 0;
            this.tt2--;
            this.txtTime.text = "(" + this.tt2 + ")";
            if (this.tt2 == 0) {
                this.btnQuitHandle();
            }
        }
    };
    ChooseClownPanel.prototype.addEventListene = function () {
        EventManage.addButtonEvent(this, this.clown_icon8, egret.TouchEvent.TOUCH_TAP, this.onTouchClown.bind(this, 0), "");
        EventManage.addButtonEvent(this, this.clown_icon9, egret.TouchEvent.TOUCH_TAP, this.onTouchClown.bind(this, 1), "");
        EventManage.addButtonEvent(this, this.btnDouble, egret.TouchEvent.TOUCH_TAP, this.btnDoubleHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnQuit, egret.TouchEvent.TOUCH_TAP, this.btnQuitHandle.bind(this));
        EventManage.addEvent(this, this.giftGroup, egret.TouchEvent.TOUCH_TAP, this.giftGroupHandle.bind(this));
    };
    ChooseClownPanel.prototype.giftGroupHandle = function () {
        this.giftGroup.visible = false;
    };
    ChooseClownPanel.prototype.giftGroupHandle1 = function () {
        this.giftGroup.visible = false;
        this.dispose();
    };
    ChooseClownPanel.prototype.btnQuitHandle = function () {
        Net.send(Protocol.CLOWN_QUIT, {}, this.chooseendCallback.bind(this));
    };
    ChooseClownPanel.prototype.btnDoubleHandle = function () {
        if (this.isAuto.visible == true) {
            this.isAuto.visible = false;
            this.isDouble = 0;
            this.bet_num.text = "" + this.bet;
        }
        else {
            this.isAuto.visible = true;
            this.isDouble = 1;
            this.bet_num.text = "" + this.bet * 2;
        }
    };
    ChooseClownPanel.prototype.onTouchClown = function (num) {
        MusicManage.playMuisc("clown_button_click");
        this.clown_icon8.touchEnabled = false;
        this.clown_icon9.touchEnabled = false;
        this.isMove = true;
        if (num == 0) {
            this.res = "clown_girl";
        }
        else {
            this.res = "clown_boy";
        }
        Net.send(Protocol.CLOWN_CLOWNHANDLER_CHOOSECLOWN, { plus: this.isDouble }, this.chooseClownCallback.bind(this));
    };
    ChooseClownPanel.prototype.chooseendCallback = function (r) {
        if (r.code == 200) {
            this.dispose();
        }
        else {
            if (r.msg == "701") {
                this.dispose();
            }
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    ChooseClownPanel.prototype.chooseClownCallback = function (msg) {
        MusicManage.closeClickMuisc();
        if (msg.code == 200) {
            this.chooseClownResult = msg.data;
            this.imgClown.y = 0;
            egret.Tween.get(this.imgClown).to({ y: 67 }, 400, egret.Ease.backOut);
            this.rollMc.stop();
            this.rollMc.visible = false;
            this.imgWinLost.visible = true;
            this.bet = parseInt(msg.data.cell + "");
            this.bet_num.text = msg.data.cell;
            this.isAuto.visible = false;
            this.playGift(msg.data.gift, msg.data.star);
            if (msg.data.res == "0") {
                MusicManage.playMuisc("clown_bibei_fail0");
                this.imgWinLost.source = "clown_main_lost_btn";
                if (this.res == "clown_girl") {
                    this.imgClown.source = "clown_boy";
                }
                else {
                    this.imgClown.source = "clown_girl";
                }
                if (this.isDouble == 1) {
                    this.isAuto.visible = true;
                    this.bet_num.text = "" + this.bet * 2;
                }
            }
            else {
                //MusicManage.playMuisc("clown_bibei_win8");
                this.playGold();
                this.imgWinLost.source = "clown_main_win_btn";
                this.imgClown.source = this.res;
                this.txtWin.text = "+" + msg.data.win;
            }
            for (var i = 1; i < 9; i++) {
                this["clown_star" + i].visible = false;
            }
            for (var i = 1; i <= msg.data.star; i++) {
                this["clown_star" + i].visible = true;
            }
            GlobalData.user.gold = (parseInt(GlobalData.user.gold) + msg.data.win) + "";
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
            if (msg.data.end != 1) {
                this.tt = setTimeout(this.start.bind(this), 1000);
            }
        }
        else {
            this.isMove = true;
            if (msg.msg == "701") {
                this.dispose();
            }
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    ChooseClownPanel.prototype.playGift = function (gift, star) {
        if (gift > 0) {
            this.giftGroup.visible = true;
            this.txtDadao.text = "恭喜达到" + star + "星";
            this.txtGift.text = gift + "";
            this.tt3 = setTimeout(this.giftGroupHandle.bind(this), 2000);
        }
        if (star == 8) {
            this.giftGroup.visible = true;
            this.txtDadao.text = "恭喜达到" + star + "星";
            this.txtGift.text = gift + "";
            this.tt3 = setTimeout(this.giftGroupHandle1.bind(this), 2000);
        }
    };
    ChooseClownPanel.prototype.playGold = function () {
        this.mcGroup.visible = true;
        if (this.mc == null) {
            this.mc = QuickManage.createMc("goldfly2");
            this.mcGroup.addChild(this.mc);
        }
        this.mc.gotoAndPlay(0, 1);
        EventManage.addEvent(this, this.mc, egret.Event.COMPLETE, this.mcComplete.bind(this));
        MusicManage.playMuisc("gold_diaoluo");
    };
    ChooseClownPanel.prototype.mcComplete = function () {
        this.mc.gotoAndStop(0);
        this.mcGroup.visible = false;
    };
    ChooseClownPanel.prototype.start = function () {
        MusicManage.playMuisc("clown_roll_music");
        this.clown_icon8.touchEnabled = true;
        this.clown_icon9.touchEnabled = true;
        this.isMove = false;
        this.imgWinLost.visible = false;
        this.rollMc.visible = true;
        this.rollMc.play(-1);
        this.tt2 = 31;
    };
    /**显示注码 */
    ChooseClownPanel.prototype.updataBet = function (num) {
        this.bet_num.text = "" + num;
    };
    ChooseClownPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    ChooseClownPanel.prototype.dispose = function () {
        MusicManage.closeClickMuisc();
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.CLOWN_CHOOSE_CLOSE));
        TimerManager.getInstance().remove("ChooseClownPanel.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ChooseClownPanel.prototype.dispose2 = function () {
        MusicManage.closeClickMuisc();
        TimerManager.getInstance().remove("ChooseClownPanel.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    return ChooseClownPanel;
}(eui.Component));
__reflect(ChooseClownPanel.prototype, "ChooseClownPanel", ["fany.IDispose"]);
