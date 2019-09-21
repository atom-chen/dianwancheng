var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ClownPanel = (function (_super) {
    __extends(ClownPanel, _super);
    function ClownPanel(r) {
        var _this = _super.call(this) || this;
        _this.r = null;
        _this.jiantou = false;
        _this.isClickStart = false;
        _this.tt = 0;
        /**转盘结果 */
        _this.randResult = null;
        _this.isantoo = false;
        _this.bet = 50;
        _this.betArr = [50, 100, 1000, 5000, 10000, 100000];
        _this.num = 0;
        /**
         * 自动滚动
         */
        _this.touchAutoNum = 0;
        _this.skinName = 'resource/skins/clown/ClownPanelSkin.exml';
        _this.r = r;
        return _this;
    }
    ClownPanel.prototype.childrenCreated = function () {
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
        for (var i_1 = 0; i_1 < 3; i_1++) {
            this['rollMc' + i_1] = QuickManage.createMc('rollmc');
            this['rollMc' + i_1].visible = false;
            this['rollItem' + i_1].addChild(this['rollMc' + i_1]);
            this['rollItem' + i_1].setChildIndex(this['resultItem' + i_1], 2);
        }
        this.addEventListene();
        // this.bgRoation.play();
        this.playAnimation(this.bgRoation, true);
        this.updatePoolGold(this.gift);
        this.updataBet(this.bet);
        // this.setMaxuserInfo();
        this.setSelfInfo();
        MusicManage.playGameBgMuisc("clown_bg", 1, -1);
    };
    ClownPanel.prototype.setMaxuserInfo = function () {
        var stt = this.max_user.headurl.split("_")[0];
        if (stt == "nan" || stt == "nv") {
            stt = GlobalData.configData.data.headurl + this.max_user.headurl + ".png";
        }
        this.imgKingHead.source = stt;
        this.labKingName.text = this.max_user.name;
    };
    ClownPanel.prototype.setSelfInfo = function () {
        this.labUserGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.labUserName.text = GlobalData.user.nickname;
        this.imgUserHead.source = GlobalData.user.headurl;
        this.labTitleVip.text = "VIP" + GlobalData.user.vip;
    };
    ClownPanel.prototype.netcallback = function () {
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
    };
    ClownPanel.prototype.addEventListene = function () {
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
    };
    ClownPanel.prototype.updatePayData = function (r) {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        this.labUserGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.labUserGold, parseInt(GlobalData.user.gold));
        this.labTitleVip.text = "VIP" + GlobalData.user.vip;
    };
    ClownPanel.prototype.btnRankHandle = function () {
        PanelManage.openClownrank();
    };
    ClownPanel.prototype.closeChoosePanel = function () {
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
        for (var i = 0; i < 3; i++) {
            this['rollMc' + i].stop();
            this['rollMc' + i].visible = false;
            this['resultItem' + i].y = -120;
            this["resultItem" + i].source = "clown_icon" + (i + 1);
            this['resultItem' + i].visible = true;
            this["rollItem" + i].visible = true;
            egret.Tween.get(this['resultItem' + i]).to({ y: 70 }, 400, egret.Ease.backOut);
        }
    };
    ClownPanel.prototype.gogo = function () {
        Net.send(Protocol.CLOWN_GET_GIFT, {}, this.tongbugift.bind(this));
        Net.send(Protocol.CLOWN_GET_MESSAGES, {}, this.getMessages.bind(this));
    };
    ClownPanel.prototype.getMessages = function (r) {
        if (r.code == 200) {
            var list = r.list;
            var len = list.length;
            if (len > 4) {
                len = 4;
            }
            for (var i = 0; i < len; i++) {
                this["txt" + i].text = "" + list[i].name + "    " + QuickManage.moneyStr(parseInt(list[i].win + ""));
            }
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    };
    ClownPanel.prototype.btnAddGoldHandle = function () {
        PanelManage.openShop(2);
    };
    ClownPanel.prototype.onTouchHelp = function () {
        if (this.clownhelpPanel) {
            this.clownhelpPanel.dispose();
        }
        this.clownhelpPanel = null;
        this.clownhelpPanel = new ClownHelpPanel();
        this.addChild(this.clownhelpPanel);
        this.clownhelpPanel.x = 30;
        this.clownhelpPanel.y = 100;
    };
    ClownPanel.prototype.onTouchChat = function () {
        this.chatpanel = new ChatPanel();
        this.addChild(this.chatpanel);
        this.chatpanel.touchEnabled = true;
        this.chatpanel.x = 150;
        this.chatpanel.y = 730;
    };
    ClownPanel.prototype.onTouchRedpack = function () {
        PanelManage.openRedBox(3, 1);
    };
    /**加大注码 */
    ClownPanel.prototype.onTouchPlusBet = function () {
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
    };
    /**减小注码 */
    ClownPanel.prototype.onTouchMinuBet = function () {
        if (this.isClickStart) {
            return;
        }
        this.num--;
        if (this.num <= 0) {
            this.num = 0;
        }
        this.bet = this.betArr[this.num];
        this.updataBet(this.bet);
    };
    /**更新注码 */
    ClownPanel.prototype.updataBet = function (num) {
        this.betNum.text = "" + num;
    };
    ClownPanel.prototype.onTouchDispos = function () {
        if (this.chatpanel) {
            this.removeChild(this.chatpanel);
            this.chatpanel = null;
        }
    };
    ClownPanel.prototype.onTouchAuto = function () {
        this.helptpis.visible = false;
        if (this.btnAuto.source == "clown_autobutton_gray") {
            return;
        }
        if (this.isantoo == false) {
            this.isantoo = true;
            this.isAuto.visible = true;
            this.onTouchStart();
        }
    };
    /**
     *  开始滚动
     */
    ClownPanel.prototype.onTouchStart = function () {
        clearTimeout(this.tt);
        this.helptpis.visible = false;
        if (this.isClickStart == false) {
            this.randResult = null;
            this.btnStart.source = "clown_stopbutton"; //btnStart_gray
            this.btnAuto.source = "clown_autobutton_gray";
            this.btnAuto.touchEnabled = false;
            this.isClickStart = true;
            this.rollEffect();
            this.jiantou = true;
            this.gundongjiantou();
            this.tt = setTimeout(this.onTouchStop.bind(this), 2000);
        }
        else {
            if (this.btnStart.source == "clown_stopbutton") {
                this.isantoo = false;
                this.isAuto.visible = false;
                this.onTouchStop();
            }
        }
    };
    /**
     *  停止滚动
     */
    ClownPanel.prototype.onTouchStop = function () {
        clearTimeout(this.tt);
        Net.send(Protocol.CLOWN_CLOWNHANDLER_RANDRESULT, { cell: this.bet }, this.randCallback.bind(this));
    };
    ClownPanel.prototype.gundongjiantou = function () {
        if (this.jiantou == true) {
            this.leftArrow.source = "clown_arrow_1";
            this.rightArrow.source = "clown_arrow_1";
            egret.Tween.get(this.leftArrow).to({ rotation: 5 }, 100);
            egret.Tween.get(this.rightArrow).to({ rotation: 5 }, 100).call(this.gundongjiantou1.bind(this), this);
        }
    };
    ClownPanel.prototype.gundongjiantou1 = function () {
        if (this.jiantou == true) {
            egret.Tween.get(this.leftArrow).to({ rotation: 0 }, 100);
            egret.Tween.get(this.rightArrow).to({ rotation: 0 }, 100).call(this.gundongjiantou.bind(this), this);
        }
    };
    /**
     * 显示星星
     */
    ClownPanel.prototype.showStar = function () {
        clearTimeout(this.tt);
        this.txtFen.text = "+" + this.getBetNum(this.randResult.res) * this.bet;
        this.grpStar.visible = true;
        this.starMc.play(-1);
        for (var i = 1; i < 4; i++) {
            egret.Tween.get(this["star" + i]).wait(100 * (i - 1)).to({ visible: true }, 100);
            egret.Tween.get(this["star_g" + i]).wait(100 * (i - 1)).to({ visible: true }, 100);
        }
    };
    /**关闭星星 */
    ClownPanel.prototype.closeStar = function () {
        this.starMc.stop();
        this.grpStar.visible = false;
        for (var i = 1; i < 4; i++) {
            this["star" + i].visible = false;
            this["star_g" + i].visible = false;
        }
    };
    /**
     *  滚动效果
     */
    ClownPanel.prototype.rollEffect = function () {
        MusicManage.playMuisc("clown_bibei_roll_sound");
        for (var i = 0; i < 3; i++) {
            this['rollMc' + i].play(-1);
            this['rollMc' + i].visible = true;
            this['resultItem' + i].visible = false;
        }
    };
    ClownPanel.prototype.randCallback = function (msg) {
        MusicManage.closeClickMuisc();
        if (msg.code == 200) {
            GlobalData.user.gold = (parseInt(GlobalData.user.gold) - this.bet) + "";
            if (parseInt(GlobalData.user.gold) < 0) {
                GlobalData.user.gold = "0";
            }
            this.labUserGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
            this.randResult = msg.data;
            this.btnStart.touchEnabled = false;
            this.jiantou = false;
            this.rightArrow.source = "clown_arrow_2";
            this.leftArrow.source = "clown_arrow_2";
            this.endRollEffect();
        }
        else {
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
            for (var i = 0; i < 3; i++) {
                this['rollMc' + i].stop();
                this['rollMc' + i].visible = false;
                this['resultItem' + i].y = -120;
                this["resultItem" + i].source = "clown_icon" + (i + 1);
                this['resultItem' + i].visible = true;
                egret.Tween.get(this['resultItem' + i]).to({ y: 70 }, 400, egret.Ease.backOut);
            }
        }
    };
    /**
     *  停止滚动
     */
    ClownPanel.prototype.endRollEffect = function () {
        var _this = this;
        for (var i = 0; i < 3; i++) {
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
            setTimeout(function () {
                _this.closeStar();
                _this.showChooseClown();
            }, 3000);
        }
        else {
            MusicManage.playMuisc("clown_roll_failSound");
            this.tt = setTimeout(this.panduanshuying.bind(this), 1000);
        }
    };
    ClownPanel.prototype.panduanshuying = function () {
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
    };
    /**显示选择小丑界面 */
    ClownPanel.prototype.showChooseClown = function () {
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
    };
    /**
     *  设置滚动结果值
     */
    ClownPanel.prototype.endRollEffectResult = function (index) {
        if (this.randResult) {
            this['rollMc' + index].stop();
            this['rollMc' + index].visible = false;
            this['resultItem' + index].y = -120;
            this["resultItem" + index].source = "clown_icon" + this.randResult.res[index];
            this['resultItem' + index].visible = true;
            egret.Tween.get(this['resultItem' + index]).to({ y: 70 }, 400, egret.Ease.backOut);
        }
    };
    /**
     *  更新奖池
     */
    ClownPanel.prototype.updatePoolGold = function (num) {
        this.goldNum.text = QuickManage.moneyStr(parseInt("" + num));
    };
    ClownPanel.prototype.playAnimation = function (target, isLoop) {
        if (isLoop) {
            for (var key in target.items) {
                target.items[key].props = { loop: true };
            }
        }
        target.play();
    };
    ClownPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    ClownPanel.prototype.changeClownKing = function (r) {
        this.labKingName.text = r.msg.data.name;
        this.imgKingHead.source = r.msg.data.headurl;
    };
    ClownPanel.prototype.tongbugift = function (r) {
        if (r.code == 200) {
            EffectUtils.numEffect(this.goldNum, parseInt(r.gift + ""));
        }
    };
    ClownPanel.prototype.btnReturnHandle = function () {
        Net.send(Protocol.CLOWN_CLOWNHANDLER_LEAVEGAME, {}, (function (msg) {
            if (msg.code == 200) {
                this.dispose();
            }
            else {
                TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
            }
        }).bind(this));
    };
    ClownPanel.prototype.dispose = function () {
        MusicManage.closeMuisc();
        TimerManager.getInstance().remove("ClownPanel.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ClownPanel.prototype.getBetNum = function (arr) {
        var bet = 1;
        console.log(arr[0] + "==" + arr[1] + "==" + arr[2]);
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
    };
    return ClownPanel;
}(eui.Component));
__reflect(ClownPanel.prototype, "ClownPanel", ["fany.IDispose"]);
