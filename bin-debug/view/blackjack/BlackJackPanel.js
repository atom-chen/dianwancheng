var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BlackJackPanel = (function (_super) {
    __extends(BlackJackPanel, _super);
    function BlackJackPanel(r) {
        var _this = _super.call(this) || this;
        _this.r = null;
        // private baseCardArr = [];   //一副扑克所有的牌 (单机使用,联网由后台传入)
        _this.cardArr = [[], [], [], []]; //游戏指定位置的牌
        _this.cardXArr = [70, 216, 362, 507]; //扑克放置的X轴位置
        _this.cardBaseY = 600; //扑克放置Y轴基础位置
        _this.cardIncrementalY = 40; //扑克Y轴增量
        _this.cardBackArr = []; //倒计数的扑克
        _this.cardBackNum = 9;
        _this.isCanTouchBox = false; //防止频繁点击出错
        //private lastCardNumber: number = 0;
        _this.curSelectIndex = 0;
        _this.isGaming = false;
        _this.tt = 0;
        _this.current = 0;
        _this.ii = 0;
        _this.skinName = 'resource/skins/blackjack/BlackJackSkin.exml';
        _this.r = r;
        return _this;
    }
    BlackJackPanel.prototype.childrenCreated = function () {
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
    };
    BlackJackPanel.prototype.updatePayData = function (r) {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.titleLabMoney, parseInt(GlobalData.user.gold));
        this.labTitleVip.text = "VIP" + GlobalData.user.vip;
    };
    //充值
    BlackJackPanel.prototype.onTouchCharge = function () {
        PanelManage.openShop(3);
    };
    BlackJackPanel.prototype.gogo = function () {
        Net.send(Protocol.BLACK_JACK_RANK, {}, this.rankCallback.bind(this));
    };
    BlackJackPanel.prototype.closeMcGroup = function () {
        clearTimeout(this.tt);
        this.mcGroup.visible = false;
    };
    BlackJackPanel.prototype.btnLingHandle = function () {
        Net.send(Protocol.BLACK_JACK_REWARD, {}, this.lingCallback.bind(this));
    };
    BlackJackPanel.prototype.lingCallback = function (r) {
        if (r.code == 200) {
            if (parseInt("" + r.win.gold) == -1) {
                TipsManage.showTips("今天已经领过!");
            }
            else if (parseInt("" + r.win.gold) == -2) {
                TipsManage.showTips("昨日未参与游戏!");
            }
            else {
                this.mcGroup.visible = true;
                EffectUtils.numEffect(this.txtJiangquan, parseInt("" + r.win.note));
                EffectUtils.numEffect(this.txtJianggold, parseInt("" + r.win.gold));
                this.tt = setTimeout(this.closeMcGroup.bind(this), 5000);
            }
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    BlackJackPanel.prototype.rankCallback = function (r) {
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
            }
            '';
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    BlackJackPanel.prototype.clearItems = function () {
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
    };
    BlackJackPanel.prototype.startGame = function (num) {
        this.current = num;
        this.chooseGroup.visible = false;
        Net.send(Protocol.BLACK_JACK_CHOOSE, { gold: num }, this.chooseCallback.bind(this));
    };
    BlackJackPanel.prototype.chooseCallback = function (r) {
        if (r.code == 200) {
            Net.send(Protocol.BLACK_JACK_START, {}, this.startCallback.bind(this));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    BlackJackPanel.prototype.initData = function (msg) {
        if (msg.code == 200) {
            this.labScore.text = '' + msg.data.toScore;
            this.labGameNumer.text = '剩余次数：' + msg.data.cur + '/' + msg.data.max;
        }
        this.titleHead.source = GlobalData.user.headurl;
        var mask2 = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(66, 45, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.titleHead.mask = mask2;
        this.titleName.text = GlobalData.user.nickname;
        this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.labTitleVip.text = 'v' + GlobalData.user.vip;
    };
    BlackJackPanel.prototype.onTouchStart = function () {
        if (!this.isGaming) {
            this.chooseGroup.visible = true;
        }
    };
    BlackJackPanel.prototype.startCallback = function (msg) {
        if (msg.code == 200) {
            this.isCanTouchBox = true;
            //this.lastCardNumber = msg.data.count;
            this.createCard(msg.data.poke);
            this.isGaming = true;
            this.labGameNumer.text = '剩余次数：' + msg.data.cur + '/' + msg.data.max;
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    BlackJackPanel.prototype.onTouchRestart = function () {
        this.restart();
    };
    BlackJackPanel.prototype.onTouchSelectBox = function (index) {
        if (!this.isCanTouchBox)
            return;
        this.isCanTouchBox = false;
        Net.send(Protocol.BLACK_JACK_SETCARD, { channel: index }, this.setCardCallback.bind(this));
        this.curSelectIndex = index;
    };
    BlackJackPanel.prototype.setCardCallback = function (msg) {
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
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
            this.isCanTouchBox = true;
        }
    };
    BlackJackPanel.prototype.flyCoins = function (msg) {
        if (msg.code == 200) {
            GlobalData.user.gold = msg.data.gold;
            this.titleLabMoney.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    BlackJackPanel.prototype.afterFlyCard = function (data) {
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
    };
    BlackJackPanel.prototype.createCard = function (value) {
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
    };
    BlackJackPanel.prototype.gameOver = function () {
        console.log('over');
        // this.restart();
        this.labFinalScore.text = this.labScore.text;
    };
    BlackJackPanel.prototype.cleanBoxCard = function (index) {
        var cardBox = this.cardArr[index];
        for (var i = 0; i < cardBox.length; i++) {
            egret.Tween.get(cardBox[i]).to({ scaleX: 1.2, scaleY: 1.2, alpha: 0 }, 100).call(function () {
                this.parent.removeChild(this);
            }, cardBox[i]);
        }
        this.cardArr[index] = [];
    };
    BlackJackPanel.prototype.restart = function () {
        for (var i = 0; i < this.cardArr.length; i++) {
            for (var j = 0; j < this.cardArr[i].length; j++) {
                var cardBox = this.cardArr[i];
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
    };
    BlackJackPanel.prototype.randomSort = function (a, b) {
        return Math.random() - 0.5;
    };
    BlackJackPanel.prototype.exitGame = function () {
        Net.send(Protocol.BLACK_JACK_LEAVE, {}, this.exitGameCB.bind(this));
    };
    BlackJackPanel.prototype.exitGameCB = function (msg) {
        if (msg.code == 200) {
            this.dispose();
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    };
    BlackJackPanel.prototype.dispose = function () {
        MusicManage.closeGameBgMuisc();
        TimerManager.getInstance().remove("GameMainPanel.noticeMoveHandler");
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    BlackJackPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return BlackJackPanel;
}(eui.Component));
__reflect(BlackJackPanel.prototype, "BlackJackPanel", ["fany.IDispose"]);
