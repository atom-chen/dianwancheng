class SignPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/sign/SignPanelSkin.exml";
    }

    public btnClose: eui.Image;
    public btnget: eui.Image;
    public btnup: eui.Image;

    // public labVipMoney0: eui.Label; //moeny
    public labVipMoney0: eui.BitmapLabel; //moeny
    public labVipMoney1: eui.Label; //倍率
    public labVipInfo: eui.Label;

    private curNum: number = 0;
    private rate: number = 0;
    private closeRect: eui.Rect;
    private coinArr: Array<number> = [10000, 20000, 30000, 40000, 50000, 60000, 70000];
    private isPlayMusic: boolean = false;
    protected childrenCreated(): void {
        this.isPlayMusic = false;
        for (var i = 1; i < 8; i++) {
            this['labMoney' + i].text = this.coinArr[i - 1];
            this['sign' + i].visible = false;
        }
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        EventManage.addButtonEvent(this, this.btnget, egret.TouchEvent.TOUCH_TAP, this.onTouchGet.bind(this));
        EventManage.addButtonEvent(this, this.btnup, egret.TouchEvent.TOUCH_TAP, this.onTouchUp.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        this.labVipInfo.text = '';
        this.labVipMoney0.text = '';
        this.labVipMoney1.text = '';

        Net.send(Protocol.HALL_SIGN_GET, {}, this.signCallback.bind(this));
    }
    private signCallback(msg): void {
        if (msg.code == 200) {
            this.curNum = msg.count;
            for (var i = 1; i < 8; i++) {
                if (i < (this.curNum + 1)) {
                    this['sign' + i].visible = true;
                }
                else {
                    this['sign' + i].visible = false;
                }
            }
            this.rate = 100 + parseInt(msg.percent);
            if (parseInt(GlobalData.user.vip) == 0) {
                this.labVipInfo.text = '请您领取您今日的签到奖励';    //显示
            }
            else {
                this.labVipInfo.text = '尊贵的vip' + GlobalData.user.vip + '玩家，请您领取您今日的签到奖励';    //显示
            }
            this.labVipMoney0.text = this.coinArr[this.curNum] + '';
            this.labVipMoney1.text = 'x' + this.rate + '%';//根据不同的vip 显示不同的阶段
            this.setBtnGet(!msg.hasSign);
        }
    }

    private setBtnGet(bl): void {
        if (bl) {
            this.btnget.touchEnabled = true;
            this.btnget.source = 'sign.btnget';
        }
        else {
            this.btnget.touchEnabled = false;
            this.btnget.source = 'sign.btnget2';
        }
    }


    private onTouchGet(): void {
        if (this.isPlayMusic == false) {
            if (!GlobalData.isDebug) {
                MusicManage.playBgMuisc();
            }
            this.isPlayMusic = true;
        }
        Net.send(Protocol.HALL_SIGN_SIGN, {}, this.daySignCallback.bind(this));
    }
    private onTouchUp(): void {
        if (this.isPlayMusic == false) {
            if (!GlobalData.isDebug) {
                MusicManage.playBgMuisc();
            }
            this.isPlayMusic = true;
        }
        PanelManage.openShop();
    }

    private daySignCallback(msg): void {
        if (msg.code == 200) {
            // this.btnget.visible = false;
            this.setBtnGet(false);
            GlobalData.user.gold = msg.gold;
            this['sign' + (this.curNum + 1)].visible = true;
            let xx = 120 + 190 * (this.curNum % 3);
            let yy = 260 + 140 * (this.curNum / 3);


            EffectUtils.coinsFly(this, xx, yy)
            // EffectUtils.coinsFly(this, this['sign' + (this.curNum + 1)].x + 78, this['sign' + (this.curNum + 1)].y + 30, 108, 58)
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
    }

    private onTouchClose(): void {
        if (this.isPlayMusic == false) {
            if (!GlobalData.isDebug) {
                MusicManage.playBgMuisc();
            }
            this.isPlayMusic = true;
        }
        this.dispose();
    }

    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        if (GlobalData.isFirstShowSign) {
            PanelManage.openActive();
            GlobalData.isFirstShowSign = false;
        }
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }

}