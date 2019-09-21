// TypeScript file
class ChooseClownPanel extends eui.Component implements fany.IDispose {
    constructor(bet) {
        super();
        this.skinName = 'resource/skins/clown/ChooseClownskin.exml';
        this.bet = bet;
    }
    public clown_star1: eui.Image;
    public clown_star2: eui.Image;
    public clown_star3: eui.Image;
    public clown_star4: eui.Image;
    public clown_star5: eui.Image;
    public clown_star6: eui.Image;
    public clown_star7: eui.Image;
    public clown_star8: eui.Image;
    public bet_num: eui.BitmapLabel;
    public btnDouble: eui.Image;
    public grpGuess: eui.Group;
    public btnLevel: eui.Image;
    public labChooseNum: eui.Label;
    public imgClown: eui.Image;
    public imgWinLost: eui.Image;
    public clown_icon9: eui.Image;
    public clown_icon8: eui.Image;
    private rollMc: egret.MovieClip;
    private zhuanGroup: eui.Group;
    private chooseTimer: egret.Timer;
    private bet: number;
    private hong: eui.Image;
    private res: string = "";
    private tt: number = 0;
    private tt3: number = 0;
    private isMove: boolean = false;
    private isAuto: eui.Image;
    private btnQuit: eui.Image;
    private tt1: number = 0;
    private tt2: number = 30;
    private txtTime: eui.Label;
    private txtWin: eui.BitmapLabel;
    private mcGroup: eui.Group;
    private mc: egret.MovieClip;
    private giftGroup: eui.Group;
    private txtDadao: eui.Label;
    private txtGift: eui.BitmapLabel;
    protected childrenCreated(): void {
        for (var i = 1; i < 9; i++) {
            this["clown_star" + i].visible = false;
        }
        this.imgWinLost.visible = false;
        this.updataBet(this.bet);
        setTimeout(() => {
            this.grpGuess.visible = false;
        }, 2000);
        this.addEventListene();
        MusicManage.playMuisc("clown_roll_music");
        this.rollMc = QuickManage.createMc('rollmc');
        this.zhuanGroup.addChild(this.rollMc);
        this.rollMc.play(-1);
        TimerManager.getInstance().setFrame("ChooseClownPanel.gogo", this.gogo.bind(this), this, 3);
    }
    private gogo(): void {
        if (this.isMove == false) {
            if (this.hong.x == 62) {
                this.hong.x = -79;
            } else {
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
    }
    private addEventListene(): void {
        EventManage.addButtonEvent(this, this.clown_icon8, egret.TouchEvent.TOUCH_TAP, this.onTouchClown.bind(this, 0), "");
        EventManage.addButtonEvent(this, this.clown_icon9, egret.TouchEvent.TOUCH_TAP, this.onTouchClown.bind(this, 1), "");
        EventManage.addButtonEvent(this, this.btnDouble, egret.TouchEvent.TOUCH_TAP, this.btnDoubleHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnQuit, egret.TouchEvent.TOUCH_TAP, this.btnQuitHandle.bind(this));
        EventManage.addEvent(this, this.giftGroup, egret.TouchEvent.TOUCH_TAP, this.giftGroupHandle.bind(this));
    }
    private giftGroupHandle(): void {
        this.giftGroup.visible = false;
    }
    private giftGroupHandle1(): void {
        this.giftGroup.visible = false;
        this.dispose();
    }
    private btnQuitHandle(): void {
        Net.send(Protocol.CLOWN_QUIT, {}, this.chooseendCallback.bind(this));
    }
    private btnDoubleHandle(): void {
        if (this.isAuto.visible == true) {
            this.isAuto.visible = false;
            this.isDouble = 0;
            this.bet_num.text = "" + this.bet;
        } else {
            this.isAuto.visible = true;
            this.isDouble = 1;
            this.bet_num.text = "" + this.bet * 2;
        }
    }
    private isDouble: number = 0;//是否加倍
    private onTouchClown(num) {
        MusicManage.playMuisc("clown_button_click");
        this.clown_icon8.touchEnabled = false;
        this.clown_icon9.touchEnabled = false;
        this.isMove = true;
        if (num == 0) {
            this.res = "clown_girl";
        } else {
            this.res = "clown_boy";
        }
        Net.send(Protocol.CLOWN_CLOWNHANDLER_CHOOSECLOWN, { plus: this.isDouble }, this.chooseClownCallback.bind(this));
    }
    private chooseendCallback(r): void {
        if (r.code == 200) {
            this.dispose();
        } else {
            if (r.msg == "701") {
                this.dispose();
            }
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private chooseClownResult: any;
    private chooseClownCallback(msg) {
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
                } else {
                    this.imgClown.source = "clown_girl";
                }
                if (this.isDouble == 1) {
                    this.isAuto.visible = true;
                    this.bet_num.text = "" + this.bet * 2;
                }
            } else {
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
        } else {
            this.isMove = true;
            if (msg.msg == "701") {
                this.dispose();
            }
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }
    private playGift(gift, star): void {
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
    }
    private playGold(): void {
        this.mcGroup.visible = true;
        if (this.mc == null) {
            this.mc = QuickManage.createMc("goldfly2");
            this.mcGroup.addChild(this.mc);
        }
        this.mc.gotoAndPlay(0, 1);
        EventManage.addEvent(this, this.mc, egret.Event.COMPLETE, this.mcComplete.bind(this));
        MusicManage.playMuisc("gold_diaoluo");
    }
    private mcComplete(): void {
        this.mc.gotoAndStop(0);
        this.mcGroup.visible = false;
    }
    private start(): void {
        MusicManage.playMuisc("clown_roll_music");
        this.clown_icon8.touchEnabled = true;
        this.clown_icon9.touchEnabled = true;
        this.isMove = false;
        this.imgWinLost.visible = false;
        this.rollMc.visible = true;
        this.rollMc.play(-1);
        this.tt2 = 31;
    }
    /**显示注码 */
    private updataBet(num) {
        this.bet_num.text = "" + num;
    }
    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
    public dispose(): void {
        MusicManage.closeClickMuisc();
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.CLOWN_CHOOSE_CLOSE));
        TimerManager.getInstance().remove("ChooseClownPanel.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }
    public dispose2(): void {
        MusicManage.closeClickMuisc();
        TimerManager.getInstance().remove("ChooseClownPanel.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }
}