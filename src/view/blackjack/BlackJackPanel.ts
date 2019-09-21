class BlackJackPanel extends eui.Component implements fany.IDispose {
    constructor(r) {
        super();
        this.skinName = 'resource/skins/blackjack/BlackJackSkin.exml';
        this.r = r;
    }

    private r: any = null;

    public btnStart: eui.Image;
    public labScore: eui.Label;     //分数
    public labGameNumer: eui.Label; //游戏次数

    //public grpOver: eui.Group;
    public btnSure: eui.Image;
    public labFinalScore: eui.Label;
    public btnClose: eui.Image;

    // private baseCardArr = [];   //一副扑克所有的牌 (单机使用,联网由后台传入)
    private cardArr: Array<Array<eui.Image>> = [[], [], [], []];    //游戏指定位置的牌
    private cardXArr: Array<number> = [70, 216, 362, 507];  //扑克放置的X轴位置
    private cardBaseY: number = 600;    //扑克放置Y轴基础位置
    private cardIncrementalY: number = 40;  //扑克Y轴增量

    private cardBackArr: Array<eui.Image> = []; //倒计数的扑克
    private cardBackNum: number = 9;

    private curCard: eui.Image;

    private isCanTouchBox: boolean = false;  //防止频繁点击出错

    //private lastCardNumber: number = 0;
    private curSelectIndex: number = 0;

    private isGaming: boolean = false;
    private chooseGroup: eui.Group;
    private btnStart1: eui.Image;
    private btnStart2: eui.Image;
    private btnStart3: eui.Image;
    private titleName: eui.Label;
    private titleHead: eui.Image;
    private btnVip: eui.Image;
    private labTitleVip: eui.Label;
    private titleLabMoney: eui.BitmapLabel;
    private itemGroup: eui.Group;
    private arr: Array<any>;
    private btnLing: eui.Image;
    private mcGroup: eui.Group;
    private txtJiangquan: eui.BitmapLabel;
    private txtJianggold: eui.BitmapLabel;
    private tt: number = 0;
    private current: number = 0;
    private ii: number = 0;
    private btnCharge: eui.Image;
    protected childrenCreated(): void {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnStart, egret.TouchEvent.TOUCH_TAP, this.onTouchStart.bind(this));
        EventManage.addButtonEvent(this, this.btnCharge, egret.TouchEvent.TOUCH_TAP, this.onTouchCharge.bind(this));
        EventManage.addButtonEvent(this, this.btnLing, egret.TouchEvent.TOUCH_TAP, this.btnLingHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.exitGame.bind(this));
        EventManage.addButtonEvent(this, this.btnStart1, egret.TouchEvent.TOUCH_TAP, this.startGame.bind(this, 1000));
        EventManage.addButtonEvent(this, this.btnStart2, egret.TouchEvent.TOUCH_TAP, this.startGame.bind(this, 10000));
        EventManage.addButtonEvent(this, this.btnStart3, egret.TouchEvent.TOUCH_TAP, this.startGame.bind(this, 100000));
        EventManage.addEvent(this, this["selectBox0"], egret.TouchEvent.TOUCH_TAP, this.onTouchSelectBox.bind(this, 0));
        EventManage.addEvent(this, this["selectBox1"], egret.TouchEvent.TOUCH_TAP, this.onTouchSelectBox.bind(this, 1));
        EventManage.addEvent(this, this["selectBox2"], egret.TouchEvent.TOUCH_TAP, this.onTouchSelectBox.bind(this, 2));
        EventManage.addEvent(this, this["selectBox3"], egret.TouchEvent.TOUCH_TAP, this.onTouchSelectBox.bind(this, 3));
        EventManage.addEvent(this, this.mcGroup, egret.TouchEvent.TOUCH_TAP, this.closeMcGroup.bind(this, 3));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
        this.initData(this.r);
        Net.send(Protocol.BLACK_JACK_RANK, {}, this.rankCallback.bind(this));
        this.mcGroup.visible = false;
        TimerManager.getInstance().setFrame("GameMainPanel.noticeMoveHandler", this.gogo.bind(this), this, 300);
        MusicManage.playGameBgMuisc("bj.bg", 0.5, -1);
    }
    private updatePayData(r): void {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.titleLabMoney, parseInt(GlobalData.user.gold));
        this.labTitleVip.text = "VIP" + GlobalData.user.vip;
    }
    //充值
    private onTouchCharge(): void {
        PanelManage.openShop(3);
    }
    private gogo(): void {
        Net.send(Protocol.BLACK_JACK_RANK, {}, this.rankCallback.bind(this));
    }
    private closeMcGroup(): void {
        clearTimeout(this.tt);
        this.mcGroup.visible = false;
    }
    private btnLingHandle(): void {
        Net.send(Protocol.BLACK_JACK_REWARD, {}, this.lingCallback.bind(this));
    }
    private lingCallback(r): void {
        if (r.code == 200) {
            if (parseInt("" + r.win.gold) == -1) {
                TipsManage.showTips("今天已经领过!");
            } else if (parseInt("" + r.win.gold) == -2) {
                TipsManage.showTips("昨日未参与游戏!");
            } else {
                this.mcGroup.visible = true;
                EffectUtils.numEffect(this.txtJiangquan, parseInt("" + r.win.note));
                EffectUtils.numEffect(this.txtJianggold, parseInt("" + r.win.gold));
                this.tt = setTimeout(this.closeMcGroup.bind(this), 5000);
            }
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private rankCallback(r): void {
        if (r.code == 200) {
            this.clearItems();
            var list = r.data.players;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("BlackJackItemPanel");
                item.y = i * 22;
                this.itemGroup.addChild(item);
                item.setData({ name: list[i].name, toScore: list[i].score, rank: i + 1 });
                this.arr.push(item);
            } ''
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private clearItems(): void {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("BlackJackItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    }
    private startGame(num): void {
        this.current = num;
        this.chooseGroup.visible = false;
        Net.send(Protocol.BLACK_JACK_CHOOSE, { gold: num }, this.chooseCallback.bind(this));
    }
    private chooseCallback(r): void {
        if (r.code == 200) {
            Net.send(Protocol.BLACK_JACK_START, {}, this.startCallback.bind(this));
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private initData(msg): void {
        if (msg.code == 200) {
            this.labScore.text = '' + msg.data.toScore;
            this.labGameNumer.text = '剩余次数：' + msg.data.cur + '/' + msg.data.max;
        }
        this.titleHead.source = GlobalData.user.headurl;
        var mask2: egret.Shape = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(66, 45, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.titleHead.mask = mask2;
        this.titleName.text = GlobalData.user.nickname;
        this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.labTitleVip.text = 'v' + GlobalData.user.vip;
    }

    private onTouchStart(): void {
        if (!this.isGaming) {
            this.chooseGroup.visible = true;
        }
    }

    private startCallback(msg): void {
        if (msg.code == 200) {
            this.isCanTouchBox = true;
            //this.lastCardNumber = msg.data.count;
            this.createCard(msg.data.poke);
            this.isGaming = true;
            this.labGameNumer.text = '剩余次数：' + msg.data.cur + '/' + msg.data.max;
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }
    private onTouchRestart(): void {
        this.restart();
    }

    private onTouchSelectBox(index): void {
        if (!this.isCanTouchBox)
            return;
        this.isCanTouchBox = false;
        Net.send(Protocol.BLACK_JACK_SETCARD, { channel: index }, this.setCardCallback.bind(this));
        this.curSelectIndex = index;
    }

    private setCardCallback(msg): void {
        if (msg.code == 200) {
            var x = this.cardXArr[this.curSelectIndex];
            var y = this.cardBaseY + (this.cardArr[this.curSelectIndex]).length * this.cardIncrementalY;
            this.cardArr[this.curSelectIndex].push(this.curCard);
            egret.Tween.get(this.curCard).to({ x: x, y: y }, 200).wait(100).call(this.afterFlyCard.bind(this, msg.data));
            GlobalData.user.gold = (parseInt(GlobalData.user.gold) - this.current) + "";
            this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
            if (++this.ii == 5) {
                Net.send(Protocol.HALL_GET_GOLD, {}, this.flyCoins.bind(this));
                this.ii = 0;
            }
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
            this.isCanTouchBox = true;
        }
    }
    private flyCoins(msg): void {
        if (msg.code == 200) {
            GlobalData.user.gold = msg.data.gold;
            this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }
    private afterFlyCard(data): void {
        //this.lastCardNumber = data.count;
        // this.curCardValue = data.poke;
        for (var i = 0; i < 4; i++) {
            this['labChannel' + i].text = data.cScore[i];
        }
        this.labScore.text = '' + data.toScore;

        if (data.boom == 1) {
            this.cleanBoxCard(this.curSelectIndex);
            console.log('BOOM !!!');
        }
        else if (data.boom == 2) {
            this.cleanBoxCard(this.curSelectIndex);
            console.log('NO BOOM !!!');
        }
        // if (data.poke == '0') {
        //     this.gameOver();
        //     return;
        // }
        // if (this.lastCardNumber < 10) {
        //     if (this.cardBackNum < 0) {
        //         return;
        //     }
        //     else {
        //         this.cardBackArr[this.cardBackNum].visible = false;;
        //         this.cardBackNum--;
        //     }
        // }
        this.createCard(data.poke);
    }

    private createCard(value): void {
        var card = new eui.Image('bj.card_' + value);
        card.x = 89;
        card.y = 409;
        card.touchEnabled = false;
        this.addChild(card);
        this.curCard = card;
        this.curCard.alpha = 0;
        egret.Tween.get(this.curCard).to({ x: 192, y: 409, alpha: 1 }, 80).call(function () {
            this.isCanTouchBox = true;
        }, this);
    }

    private gameOver(): void {
        console.log('over');
        // this.restart();
        this.labFinalScore.text = this.labScore.text;
    }


    private cleanBoxCard(index): void {
        var cardBox: Array<eui.Image> = this.cardArr[index];
        for (var i = 0; i < cardBox.length; i++) {
            egret.Tween.get(cardBox[i]).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 100).call(function () {
                this.parent.removeChild(this);
            }, cardBox[i])
            // this.removeChild(cardBox[i]);
        }
        this.cardArr[index] = [];
    }

    private restart(): void {
        for (var i = 0; i < this.cardArr.length; i++) {
            for (var j = 0; j < this.cardArr[i].length; j++) {
                var cardBox: Array<eui.Image> = this.cardArr[i];
                this.removeChild(cardBox[j]);
            }
            this.cardArr[i] = [];
        }
        for (var j = 0; j < this.cardBackArr.length; j++) {
            this.cardBackArr[j].visible = true;
        }
        for (var k = 0; k < 4; k++) {
            this['labChannel' + k].text = '0';
        }
        this.cardBackNum = 9;
        // this.lastCardNumber = 0;
        this.curSelectIndex = 0;
        this.isCanTouchBox = false;
        this.isGaming = false;
    }

    private randomSort(a, b): number {
        return Math.random() - 0.5;
    }

    private exitGame(): void {
        Net.send(Protocol.BLACK_JACK_LEAVE, {}, this.exitGameCB.bind(this));
    }
    private exitGameCB(msg): void {
        if (msg.code == 200) {
            this.dispose();
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }

    public dispose(): void {
        MusicManage.closeGameBgMuisc();
        TimerManager.getInstance().remove("GameMainPanel.noticeMoveHandler");
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}