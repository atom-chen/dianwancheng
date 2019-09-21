class GameResultPanel extends eui.Component implements fany.IDispose {
    constructor(data, cb) {
        super();
        this.skinName = "resource/skins/other/GameResultPanelSkin.exml";
        this.data = data;
        this.cb = cb;
    }
    private data: any = null;
    private cb: Function = null;
    private txtYing: eui.Label;
    private txtCaiJing: eui.Label;
    private bg: eui.Image;
    private imgGold: eui.Image;
    private txtVip: eui.Label;
    private txtName: eui.Label;
    private head: eui.Image;
    private txtMaxGold: eui.Label;
    private imgTishi: eui.Image;
    private tt: number = 0;
    private imgResult: eui.Image;
    private guang: eui.Image;
    private txtTips: eui.Label;
    private maxWin: eui.Group;
    protected childrenCreated(): void {
        this.setTouchEnabled();
        this.bg.source = GlobalData.cdnResUrl + "resource/assets/noload/noloding.gameresult.png";
        this.imgGold.source = GlobalData.cdnResUrl + "resource/assets/noload/noloding.gamegold.png";
        this.guang.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.guang.png";
        this.tt = setTimeout(this.dispose.bind(this), 3000);
        this.guang.anchorOffsetX = 250;
        this.guang.anchorOffsetY = 250;
        this.guang.x += 250;
        this.guang.y += 250;
        TimerManager.getInstance().setFrame("GameResultPanel.gogo", this.gogo.bind(this), this);
        this.setData();
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    }
    private gogo(): void {
        this.guang.rotation += 5;
    }
    private setData(): void {
        var data = this.data;
        this.imgResult.source = data.res;
        this.txtYing.text = "+" + data.win;
        this.txtCaiJing.text = "本局获得彩金为: " + data.caijing;
        if (data.max.name != "") {
            this.txtTips.visible = false;
            this.maxWin.visible = true;
            this.txtVip.text = "VIP" + data.max.vip;
            this.txtName.text = data.max.name;
            this.txtMaxGold.text = data.max.maxGold;
            this.head.source = data.max.headurl;
        } else {
            this.txtTips.visible = true;
            this.maxWin.visible = false;
        }
        if (parseInt(data.win + "") > 0) {
            MusicManage.playMuisc("fruit_win");
            this.imgTishi.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.txt2.png";
        } else {
            MusicManage.playMuisc("fruit_fail");
            this.imgTishi.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.txt3.png";
        }
    }
    public dispose(): void {
        if (this.cb) {
            this.cb();
        }
        TimerManager.getInstance().remove("GameResultPanel.gogo");
        clearTimeout(this.tt);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}