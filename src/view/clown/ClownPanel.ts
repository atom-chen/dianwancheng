class ClownPanel extends eui.Component implements fany.IDispose {

    constructor(r) {
        super();
        this.skinName = 'resource/skins/clown/ClownPanelSkin.exml';
        this.r = r;
    }
    private r: any = null;
    //res name
    // public mcGear0: eui.Image;
    // public mcGear1: eui.Image;
    // public mcGear2: eui.Image;
    public imgKingHead: eui.Image;
    public labKingName: eui.Label;
    public btnRank: eui.Rect;

    public goldNum: eui.BitmapLabel;

    public rollItem0: eui.Group;
    public resultItem0: eui.Image;
    public rollItem1: eui.Group;
    public resultItem1: eui.Image;
    public rollItem2: eui.Group;
    public resultItem2: eui.Image;

    public leftArrow: eui.Image;
    public rightArrow: eui.Image;
    public btnPlusBet: eui.Image;
    public btnMinuBet: eui.Image;
    public betNum: eui.BitmapLabel;

    public btnAuto: eui.Image;
    public btnStart: eui.Image;
    public isAuto: eui.Image;
    public grpChat: eui.Group;
    public btnChat: eui.Image;
    public btnRedpack: eui.Image;
    public grpBottomInfo: eui.Group;
    public btnAddGold: eui.Image;
    public labUserGold: eui.Label;
    public labUserName: eui.Label;
    public imgUserHead: eui.Image;


    public grpWinInfo: eui.Group;
    public btnReturn: eui.Image;
    public btnHelp: eui.Image;
    public bgRoation: egret.tween.TweenGroup;

    //code param
    private rollMc0: egret.MovieClip;
    private rollMc1: egret.MovieClip;
    private rollMc2: egret.MovieClip;
    //获胜后显示动画
    public grpStar: eui.Group;
    public star1: eui.Image;
    public star2: eui.Image;
    public star3: eui.Image;
    public star_g1: eui.Image;
    public star_g2: eui.Image;
    public star_g3: eui.Image;
    private starMc: egret.MovieClip;
    private jiantou: boolean = false;
    private isClickStart: boolean = false;
    private helptpis: eui.Image;
    private tt: number = 0;
    private txtFen: eui.BitmapLabel;
    private labTitleVip: eui.Label;
    /**转盘结果 */
    private randResult: any = null;
    private isantoo: boolean = false;
    protected childrenCreated(): void {
        this.netcallback();
        this.isAuto.visible = false;
        this.starMc = QuickManage.createMc("clowShan");
        this.grpStar.addChild(this.starMc);
        this.starMc.x = 10;
        this.starMc.y = 200;
        //this.starMc.visible = true;
        this.grpStar.visible = false;
        for (var i = 1; i < 4; i++) {
            this["star" + i].visible = false;
            this["star_g" + i].visible = false;
        }

        for (let i = 0; i < 3; i++) {
            this['rollMc' + i] = QuickManage.createMc('rollmc');
            this['rollMc' + i].visible = false;
            this['rollItem' + i].addChild(this['rollMc' + i]);
            this['rollItem' + i].setChildIndex(this['resultItem' + i], 2);
        }
        this.addEventListene();
        // this.bgRoation.play();
        this.playAnimation(this.bgRoation, true);
        this.updatePoolGold(this.gift);
        this.updataBet(this.bet);
        // this.setMaxuserInfo();
        this.setSelfInfo();
        MusicManage.playGameBgMuisc("clown_bg", 1, -1);
    }
    private setMaxuserInfo() {
        var stt = this.max_user.headurl.split("_")[0];
        if (stt == "nan" || stt == "nv") {
            stt = GlobalData.configData.data.headurl + this.max_user.headurl + ".png";
        }
        this.imgKingHead.source = stt;
        this.labKingName.text = this.max_user.name;
    }
    private setSelfInfo(): void {
        this.labUserGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.labUserName.text = GlobalData.user.nickname;
        this.imgUserHead.source = GlobalData.user.headurl;
        this.labTitleVip.text = "VIP" + GlobalData.user.vip;
    }

    private max_user: any;
    private gift: any;
    private netcallback() {
        var msg = this.r;
        this.max_user = msg.data.max_user;
        this.gift = msg.data.gift;
        this.labKingName.text = this.max_user.name;
        var stt = this.max_user.headurl.split("_")[0];
        if (stt == "nan" || stt == "nv") {
            stt = GlobalData.configData.data.headurl + this.max_user.headurl + ".png";
        }
        this.imgKingHead.source = stt;
        this.goldNum.text = this.gift + "";
    }

    private addEventListene(): void {
        EventManage.addButtonEvent(this, this.btnAuto, egret.TouchEvent.TOUCH_TAP, this.onTouchAuto.bind(this));
        EventManage.addButtonEvent(this, this.btnStart, egret.TouchEvent.TOUCH_TAP, this.onTouchStart.bind(this));
        EventManage.addButtonEvent(this, this.btnChat, egret.TouchEvent.TOUCH_TAP, this.onTouchChat.bind(this));
        EventManage.addButtonEvent(this, this.btnRedpack, egret.TouchEvent.TOUCH_TAP, this.onTouchRedpack.bind(this));
        EventManage.addButtonEvent(this, this.btnHelp, egret.TouchEvent.TOUCH_TAP, this.onTouchHelp.bind(this));

        EventManage.addButtonEvent(this, this.btnPlusBet, egret.TouchEvent.TOUCH_TAP, this.onTouchPlusBet.bind(this));
        EventManage.addButtonEvent(this, this.btnMinuBet, egret.TouchEvent.TOUCH_TAP, this.onTouchMinuBet.bind(this));
        EventManage.addButtonEvent(this, this.btnReturn, egret.TouchEvent.TOUCH_TAP, this.btnReturnHandle.bind(this));
        //this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchDispos, this);
        EventManage.addEvent(this, this.btnAddGold, egret.TouchEvent.TOUCH_TAP, this.btnAddGoldHandle.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_MAIN, this.setSelfInfo.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.CLOWN_CHOOSE_CLOSE, this.closeChoosePanel.bind(this));
        TimerManager.getInstance().setFrame("ClownPanel.gogo", this.gogo.bind(this), this, 180);
        EventManage.addEvent(this, this.btnRank, egret.TouchEvent.TOUCH_TAP, this.btnRankHandle.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
    }
    private updatePayData(r): void {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        this.labUserGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.labUserGold, parseInt(GlobalData.user.gold));
        this.labTitleVip.text = "VIP" + GlobalData.user.vip;
    }
    private btnRankHandle(): void {
        PanelManage.openClownrank();
    }
    private closeChoosePanel(): void {
        MusicManage.playMuisc("clown_bg");
        this.isClickStart = false;
        this.jiantou = false;
        this.btnStart.source = "clown_startbutton";
        this.btnAuto.source = "clown_autobutton";
        this.btnStart.touchEnabled = true;
        this.btnAuto.touchEnabled = true;
        this.rightArrow.source = "clown_arrow_2";
        this.leftArrow.source = "clown_arrow_2";
        this.isantoo = false;
        this.btnAuto.visible = true;
        this.isAuto.visible = false;
        this.rightArrow.visible = true;
        this.leftArrow.visible = true;
        for (let i = 0; i < 3; i++) {
            this['rollMc' + i].stop();
            this['rollMc' + i].visible = false;
            this['resultItem' + i].y = -120
            this["resultItem" + i].source = "clown_icon" + (i + 1);
            this['resultItem' + i].visible = true;
            this["rollItem" + i].visible = true;
            egret.Tween.get(this['resultItem' + i]).to({ y: 70 }, 400, egret.Ease.backOut);
        }

    }
    private gogo(): void {
        Net.send(Protocol.CLOWN_GET_GIFT, {}, this.tongbugift.bind(this));
        Net.send(Protocol.CLOWN_GET_MESSAGES, {}, this.getMessages.bind(this));
    }
    private getMessages(r): void {
        if (r.code == 200) {
            var list = r.list;
            var len = list.length;
            if (len > 4) {
                len = 4;
            }
            for (var i = 0; i < len; i++) {
                this["txt" + i].text = "" + list[i].name + "    " + QuickManage.moneyStr(parseInt(list[i].win + ""));
            }
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private btnAddGoldHandle(): void {
        PanelManage.openShop(2);
    }
    /**弹出帮助界面 */
    private clownhelpPanel: ClownHelpPanel;
    private onTouchHelp() {
        if (this.clownhelpPanel) {
            this.clownhelpPanel.dispose();
        }
        this.clownhelpPanel = null;
        this.clownhelpPanel = new ClownHelpPanel();
        this.addChild(this.clownhelpPanel);
        this.clownhelpPanel.x = 30;
        this.clownhelpPanel.y = 100;
    }
    /**
     * 弹出聊天界面
     */
    private chatpanel: ChatPanel;
    private onTouchChat() {
        this.chatpanel = new ChatPanel();
        this.addChild(this.chatpanel);
        this.chatpanel.touchEnabled = true;

        this.chatpanel.x = 150;
        this.chatpanel.y = 730
    }
    private onTouchRedpack() {
        PanelManage.openRedBox(3, 1);
    }
    private bet: number = 50;
    private betArr = [50, 100, 1000, 5000, 10000, 100000];
    private num: number = 0;
    /**加大注码 */
    private onTouchPlusBet() {
        if (this.isClickStart) {
            return;
        }
        this.helptpis.visible = false;
        this.num++;
        if (this.num >= this.betArr.length) {
            this.num = 3;
        }
        if (this.betArr[this.num] > 5000) {
            if (parseInt(GlobalData.user.vip) < 1) {
                TipsManage.showTips("VIP等级不足!");
                this.num = 3;
            }
        }
        this.bet = this.betArr[this.num];
        this.updataBet(this.bet);
    }
    /**减小注码 */
    private onTouchMinuBet() {
        if (this.isClickStart) {
            return;
        }
        this.num--;
        if (this.num <= 0) {
            this.num = 0;
        }
        this.bet = this.betArr[this.num];
        this.updataBet(this.bet);
    }
    /**更新注码 */
    private updataBet(num) {
        this.betNum.text = "" + num;
    }
    private onTouchDispos(): void {
        if (this.chatpanel) {
            this.removeChild(this.chatpanel);
            this.chatpanel = null;
        }
    }

    /**
     * 自动滚动
     */
    private touchAutoNum: number = 0;
    private onTouchAuto(): void {
        this.helptpis.visible = false;
        if (this.btnAuto.source == "clown_autobutton_gray") {
            return;
        }
        if (this.isantoo == false) {
            this.isantoo = true;
            this.isAuto.visible = true;
            this.onTouchStart();
        }
    }

    /**
     *  开始滚动
     */
    private onTouchStart(): void {
        clearTimeout(this.tt);
        this.helptpis.visible = false;
        if (this.isClickStart == false) {
            this.randResult = null;
            this.btnStart.source = "clown_stopbutton";//btnStart_gray
            this.btnAuto.source = "clown_autobutton_gray";
            this.btnAuto.touchEnabled = false;
            this.isClickStart = true;
            this.rollEffect();
            this.jiantou = true;
            this.gundongjiantou();
            this.tt = setTimeout(this.onTouchStop.bind(this), 2000);
        } else {
            if (this.btnStart.source == "clown_stopbutton") {
                this.isantoo = false;
                this.isAuto.visible = false;
                this.onTouchStop();
            }
        }
    }
    /**
     *  停止滚动
     */
    private onTouchStop(): void {
        clearTimeout(this.tt);
        Net.send(Protocol.CLOWN_CLOWNHANDLER_RANDRESULT, { cell: this.bet }, this.randCallback.bind(this));
    }
    private gundongjiantou(): void {
        if (this.jiantou == true) {
            this.leftArrow.source = "clown_arrow_1";
            this.rightArrow.source = "clown_arrow_1";
            egret.Tween.get(this.leftArrow).to({ rotation: 5 }, 100);
            egret.Tween.get(this.rightArrow).to({ rotation: 5 }, 100).call(this.gundongjiantou1.bind(this), this);
        }
    }
    private gundongjiantou1(): void {
        if (this.jiantou == true) {
            egret.Tween.get(this.leftArrow).to({ rotation: 0 }, 100);
            egret.Tween.get(this.rightArrow).to({ rotation: 0 }, 100).call(this.gundongjiantou.bind(this), this);
        }
    }
    /**
     * 显示星星
     */
    private showStar() {
        clearTimeout(this.tt);
        this.txtFen.text = "+" + this.getBetNum(this.randResult.res) * this.bet;
        this.grpStar.visible = true;
        this.starMc.play(-1);
        for (var i = 1; i < 4; i++) {
            egret.Tween.get(this["star" + i]).wait(100 * (i - 1)).to({ visible: true }, 100);
            egret.Tween.get(this["star_g" + i]).wait(100 * (i - 1)).to({ visible: true }, 100);
        }
    }
    /**关闭星星 */
    private closeStar() {
        this.starMc.stop();
        this.grpStar.visible = false;
        for (var i = 1; i < 4; i++) {
            this["star" + i].visible = false;
            this["star_g" + i].visible = false;
        }
    }
    /**
     *  滚动效果
     */
    private rollEffect(): void {
        MusicManage.playMuisc("clown_bibei_roll_sound");
        for (let i = 0; i < 3; i++) {
            this['rollMc' + i].play(-1);
            this['rollMc' + i].visible = true;
            this['resultItem' + i].visible = false;
        }
    }
    private randCallback(msg) {
        MusicManage.closeClickMuisc();
        if (msg.code == 200) {
            GlobalData.user.gold = (parseInt(GlobalData.user.gold) - this.bet) + "";
            if (parseInt(GlobalData.user.gold) < 0) {
                GlobalData.user.gold = "0";
            }
            this.labUserGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold))
            this.randResult = msg.data;
            this.btnStart.touchEnabled = false;
            this.jiantou = false;
            this.rightArrow.source = "clown_arrow_2";
            this.leftArrow.source = "clown_arrow_2";
            this.endRollEffect();
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
            this.isClickStart = false;
            this.jiantou = false;
            this.btnStart.source = "clown_startbutton";
            this.btnAuto.source = "clown_autobutton";
            this.btnStart.touchEnabled = true;
            this.btnAuto.touchEnabled = true;
            this.rightArrow.source = "clown_arrow_2";
            this.leftArrow.source = "clown_arrow_2";
            this.isantoo = false;
            this.isAuto.visible = false;
            for (let i = 0; i < 3; i++) {
                this['rollMc' + i].stop();
                this['rollMc' + i].visible = false;
                this['resultItem' + i].y = -120
                this["resultItem" + i].source = "clown_icon" + (i + 1);
                this['resultItem' + i].visible = true;

                egret.Tween.get(this['resultItem' + i]).to({ y: 70 }, 400, egret.Ease.backOut);
            }
        }
    }
    private chooseclownpanel: ChooseClownPanel;
    /** 
     *  停止滚动
     */
    private endRollEffect(): void {
        for (let i = 0; i < 3; i++) {
            setTimeout(this.endRollEffectResult.bind(this, i), 50 * i);
        }
        if (this.randResult == null) {
            this.btnStart.source = "clown_startbutton";
            this.btnAuto.source = "clown_autobutton";
            this.btnAuto.touchEnabled = true;
            this.btnStart.touchEnabled = true;
            if (this.isantoo == true) {
                this.tt = setTimeout(this.onTouchStart.bind(this), 1000);
            }
            return;
        }
        if (this.randResult.win > 0) {
            MusicManage.playMuisc("clown_roll_winSound");
            this.isantoo = false;
            this.isAuto.visible = false;
            this.showStar();
            setTimeout(() => {
                this.closeStar();
                this.showChooseClown();
            }, 3000);
        } else {
            MusicManage.playMuisc("clown_roll_failSound");
            this.tt = setTimeout(this.panduanshuying.bind(this), 1000);
        }
    }
    private panduanshuying(): void {
        clearTimeout(this.tt);
        if (this.randResult.win < 1) {
            this.isClickStart = false;
            this.btnStart.source = "clown_startbutton";
            this.btnAuto.source = "clown_autobutton";
            this.btnStart.touchEnabled = true;
            this.btnAuto.touchEnabled = true;
            if (this.isantoo == true) {
                this.onTouchStart();
            }
        }
    }
    /**显示选择小丑界面 */
    private showChooseClown() {
        for (var i = 0; i < 3; i++) {
            this["rollItem" + i].visible = false;
        }
        this.btnAuto.visible = false;
        this.rightArrow.visible = false;
        this.leftArrow.visible = false;
        //console.log(this.bet+"========"+this.getBetNum(this.randResult.res))
        var bet = this.getBetNum(this.randResult.res) * this.bet;
        if (this.chooseclownpanel) {
            this.chooseclownpanel.dispose2();
        }
        this.chooseclownpanel = new ChooseClownPanel(bet);
        this.addChild(this.chooseclownpanel);
        this.chooseclownpanel.y = 70;
    }
    /**
     *  设置滚动结果值
     */
    private endRollEffectResult(index): void {
        if (this.randResult) {
            this['rollMc' + index].stop();
            this['rollMc' + index].visible = false;
            this['resultItem' + index].y = -120
            this["resultItem" + index].source = "clown_icon" + this.randResult.res[index];
            this['resultItem' + index].visible = true;

            egret.Tween.get(this['resultItem' + index]).to({ y: 70 }, 400, egret.Ease.backOut);
        }
    }


    /**
     *  更新奖池
     */
    private updatePoolGold(num): void {
        this.goldNum.text = QuickManage.moneyStr(parseInt("" + num));
    }

    private playAnimation(target: egret.tween.TweenGroup, isLoop: boolean): void {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
    public changeClownKing(r): void {
        this.labKingName.text = r.msg.data.name;
        this.imgKingHead.source = r.msg.data.headurl;
    }
    public tongbugift(r): void {
        if (r.code == 200) {
            EffectUtils.numEffect(this.goldNum, parseInt(r.gift + ""));
        }
    }
    private btnReturnHandle() {
        Net.send(Protocol.CLOWN_CLOWNHANDLER_LEAVEGAME, {}, (function (msg) {
            if (msg.code == 200) {
                this.dispose();
            }
            else {
                TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
            }
        }).bind(this));
    }
    public dispose(): void {
        MusicManage.closeMuisc();
        TimerManager.getInstance().remove("ClownPanel.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }
    private getBetNum(arr): number {
        var bet = 1;
        console.log(arr[0] + "==" + arr[1] + "==" + arr[2])
        if (arr[0] == arr[1] && arr[1] == arr[2]) {
            switch (arr[0]) {
                case 1:
                    bet = 1000;
                    break;
                case 2:
                    bet = 500;
                    break;
                case 3:
                    bet = 50;
                    break;
                case 4:
                    bet = 20;
                    break;
                case 5:
                    bet = 10;
                    break;
                case 6:
                    bet = 4;
                    break;
                case 7:
                    bet = 3;
                    break;
                case 8:
                    bet = 2;
                    break;
                case 9:
                    bet = 1;
                    break;
            }
        }
        return bet;
    }
}