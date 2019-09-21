/**
  * 面板管理类
  * by fany
  * (c) copyright false,0,0,2015 - 2035
  * All Rights Reserved.
  * 面板的管理类
  */
var PanelManage;
(function (PanelManage) {
    function createButtonMusic() {
        new ButtonMusic();
    }
    PanelManage.createButtonMusic = createButtonMusic;
    function openNotice(gudingGroup) {
        if (this.notice) {
            this.notice.dispose();
            this.notice = null;
        }
        this.notice = new NoticePanel(gudingGroup);
        this.tipsLayer.addChild(this.notice);
    }
    PanelManage.openNotice = openNotice;
    function openLogin(flag) {
        if (flag === void 0) { flag = false; }
        if (this.login) {
            this.login.dispose();
            this.login = null;
        }
        this.login = new LoginPanel(flag);
        PopUpManager.addPopUp(this.login, 1);
    }
    PanelManage.openLogin = openLogin;
    function openClownrank() {
        if (this.clownrank) {
            this.clownrank.dispose();
            this.clownrank = null;
        }
        this.clownrank = new ClownRankPanel();
        PopUpManager.addPopUp(this.clownrank, 2);
    }
    PanelManage.openClownrank = openClownrank;
    function openKefu() {
        if (this.kefu) {
            this.kefu.dispose();
            this.kefu = null;
        }
        this.kefu = new KeFuPanel();
        PopUpManager.addPopUp(this.kefu, 1);
    }
    PanelManage.openKefu = openKefu;
    function openUser() {
        if (this.user) {
            this.user.dispose();
            this.user = null;
        }
        this.user = new UserPanel();
        PopUpManager.addPopUp(this.user, 1);
    }
    PanelManage.openUser = openUser;
    function openJingCai() {
        if (this.jingcai) {
            this.jingcai.dispose();
            this.jingcai = null;
        }
        this.jingcai = new JingCaiPanel();
        PopUpManager.addPopUp(this.jingcai, 1);
    }
    PanelManage.openJingCai = openJingCai;
    function openDdz(r) {
        if (this.ddz) {
            this.ddz.dispose();
            this.ddz = null;
        }
        this.ddz = new DdzPanel(r);
        PopUpManager.addPopUp(this.ddz, 1);
    }
    PanelManage.openDdz = openDdz;
    function openChat(parentView, xx, yy, state) {
        if (this.chat) {
            if (this.chat.parent) {
                this.chat.parent.removeChild(this.chat);
            }
        }
        else {
            this.chat = new ChatPanel();
        }
        this.chat.clearItems();
        ChatManage.getInstance().setState(state);
        this.chat.x = xx;
        this.chat.y = yy;
        parentView.addChildAt(this.chat, 2);
    }
    PanelManage.openChat = openChat;
    function openEmail() {
        if (this.email) {
            this.email.dispose();
            this.email = null;
        }
        this.email = new EmailPanel();
        PopUpManager.addPopUp(this.email, 1);
    }
    PanelManage.openEmail = openEmail;
    function openTeHui() {
        if (this.tehui) {
            this.tehui.dispose();
            this.tehui = null;
        }
        this.tehui = new TeHuiPanel();
        PopUpManager.addPopUp(this.tehui, 1);
    }
    PanelManage.openTeHui = openTeHui;
    function openYue() {
        if (this.yue) {
            this.yue.dispose();
            this.yue = null;
        }
        this.yue = new YuePanel();
        PopUpManager.addPopUp(this.yue, 1);
    }
    PanelManage.openYue = openYue;
    function openResLoading(res) {
        if (this.resloading) {
            this.resloading.dispose();
            this.resloading = null;
        }
        this.resloading = new ResLoading();
        PopUpManager.addPopUp(this.resloading, 1);
        this.resloading.init(res);
    }
    PanelManage.openResLoading = openResLoading;
    function openResLoading2(obj) {
        if (this.resloading2) {
            this.resloading2.visible = true;
        }
        else {
            this.resloading2 = new ResLoading2(obj);
            PopUpManager.addPopUp(this.resloading2, 1);
        }
    }
    PanelManage.openResLoading2 = openResLoading2;
    function openMainPage() {
        if (this.bank) {
            this.bank.dispose();
            this.bank = null;
        }
        PopUpManager.removePopUp(GameConfig.curPanel, 1, false);
    }
    PanelManage.openMainPage = openMainPage;
    function openGameResult(data, cb) {
        if (cb === void 0) { cb = null; }
        if (this.gameresult) {
            this.gameresult.dispose();
            this.gameresult = null;
        }
        this.gameresult = new GameResultPanel(data, cb);
        PopUpManager.addPopUp(this.gameresult, 3, 1, PanelManage.tipsLayer);
    }
    PanelManage.openGameResult = openGameResult;
    function openRank() {
        if (this.rank) {
            this.rank.dispose();
            this.rank = null;
        }
        this.rank = new RankPanel();
        PopUpManager.addPopUp(this.rank, 1);
    }
    PanelManage.openRank = openRank;
    function openShop(isAlway) {
        if (isAlway === void 0) { isAlway = 1; }
        if (this.shop) {
            this.shop.dispose();
            this.shop = null;
        }
        this.shop = new ShopPanel();
        PopUpManager.addPopUp(this.shop, isAlway);
    }
    PanelManage.openShop = openShop;
    function openYaoQing() {
        if (this.yao) {
            this.yao.dispose();
            this.yao = null;
        }
        this.yao = new YaoQingPanel();
        PopUpManager.addPopUp(this.yao, 1);
    }
    PanelManage.openYaoQing = openYaoQing;
    function openJinSha(r) {
        if (this.jinsha) {
            this.jinsha.dispose();
            this.jinsha = null;
        }
        this.jinsha = new JinShaPanel(r);
        PopUpManager.addPopUp(this.jinsha, 1);
    }
    PanelManage.openJinSha = openJinSha;
    function openFruit(r) {
        if (this.fruit) {
            this.fruit.dispose();
            this.fruit = null;
        }
        this.fruit = new FruitPanel(r);
        PopUpManager.addPopUp(this.fruit, 1);
    }
    PanelManage.openFruit = openFruit;
    function openMoney() {
        if (this.money) {
            this.money.dispose();
            this.money = null;
        }
        this.money = new MoneyTreePanel();
        PopUpManager.addPopUp(this.money, 1);
    }
    PanelManage.openMoney = openMoney;
    function openDa() {
        if (this.da) {
            this.da.dispose();
            this.da = null;
        }
        this.da = new DaShangPanel();
        PopUpManager.addPopUp(this.da, 1);
    }
    PanelManage.openDa = openDa;
    function openDaTips(data) {
        if (this.daTips) {
            this.daTips.dispose();
            this.daTips = null;
        }
        this.daTips = new DaShangTips(data);
        PopUpManager.addPopUp(this.daTips, 2, 0, PanelManage.tipsLayer);
    }
    PanelManage.openDaTips = openDaTips;
    function openTask() {
        if (this.task) {
            this.task.dispose();
            this.task = null;
        }
        this.task = new TaskPanel();
        PopUpManager.addPopUp(this.task, 1);
    }
    PanelManage.openTask = openTask;
    function openSign() {
        if (this.sign) {
            this.sign.dispose();
            this.sign = null;
        }
        this.sign = new SignPanel();
        PopUpManager.addPopUp(this.sign, 1);
    }
    PanelManage.openSign = openSign;
    function openActive() {
        if (this.active) {
            this.active.dispose();
            this.active = null;
        }
        this.active = new ActivityPanel();
        PopUpManager.addPopUp(this.active, 1);
    }
    PanelManage.openActive = openActive;
    function openSet() {
        if (this.set) {
            this.set.dispose();
            this.set = null;
        }
        this.set = new SetPanel();
        PopUpManager.addPopUp(this.set, 1);
    }
    PanelManage.openSet = openSet;
    function openLottery() {
        if (this.lottery) {
            this.lottery.dispose();
            this.lottery = null;
        }
        this.lottery = new LotteryPanel();
        PopUpManager.addPopUp(this.lottery, 1);
    }
    PanelManage.openLottery = openLottery;
    function openAward() {
        if (this.award) {
            this.award.dispose();
            this.award = null;
        }
        this.award = new AwardPanel();
        PopUpManager.addPopUp(this.award, 1);
    }
    PanelManage.openAward = openAward;
    function openResult(arr) {
        //        if(this.result) {
        //            this.result.dispose();
        //            this.result = null;
        //        }
        //        this.result = new BalancePanel();
        //        this.result.setData(arr);
        //        PopUpManager.addPopUp(this.result);
    }
    PanelManage.openResult = openResult;
    function openHall() {
        if (this.hall) {
            this.hall.dispose();
            this.hall = null;
        }
        this.hall = new HallPanel();
        PopUpManager.addPopUp(this.hall, 0);
        if (!GlobalData.isSign) {
            PanelManage.openSign();
        }
        else {
            PanelManage.openActive();
        }
    }
    PanelManage.openHall = openHall;
    function openZhaJinHua(r) {
        if (this.zhajinhua) {
            this.zhajinhua.dispose();
            this.zhajinhua = null;
        }
        this.zhajinhua = new ZhaJinHuaPanel(r);
        PopUpManager.addPopUp(this.zhajinhua, 1);
    }
    PanelManage.openZhaJinHua = openZhaJinHua;
    function openNiuNiu(r) {
        if (this.niuniu) {
            this.niuniu.dispose();
            this.niuniu = null;
        }
        this.niuniu = new NiuNiuPanel(r);
        PopUpManager.addPopUp(this.niuniu, 1);
    }
    PanelManage.openNiuNiu = openNiuNiu;
    function openBlackJack(r) {
        if (this.blackJack) {
            this.blackJack.dispose();
            this.blackJack = null;
        }
        this.blackJack = new BlackJackPanel(r);
        PopUpManager.addPopUp(this.blackJack, 1);
    }
    PanelManage.openBlackJack = openBlackJack;
    function openPk(r) {
        if (this.pk) {
            this.pk.dispose();
            this.pk = null;
        }
        this.pk = new PkPanel(r);
        PopUpManager.addPopUp(this.pk, 1);
    }
    PanelManage.openPk = openPk;
    function openServerErrorPanel(str) {
        if (this.serverError) {
            this.serverError.dispose();
            this.serverError = null;
        }
        this.serverError = new ServerErrorPanel(str);
        PopUpManager.addPopUp(this.serverError, 1, 1, PanelManage.tipsLayer);
    }
    PanelManage.openServerErrorPanel = openServerErrorPanel;
    function openRedBox(game, type, data) {
        if (data === void 0) { data = null; }
        if (this.redBox) {
            this.redBox.dispose();
            this.redBox = null;
        }
        this.redBox = new RedBoxPanel(game, type, data);
        // PanelManage.redBox.setRid(data);
        PopUpManager.addPopUp(this.redBox, 2, 0, PanelManage.tipsLayer);
    }
    PanelManage.openRedBox = openRedBox;
    function openFreeCoin() {
        if (this.freeCoin) {
            this.freeCoin.dispose();
            this.freeCoin = null;
        }
        this.freeCoin = new FreeCoinPanel();
        PopUpManager.addPopUp(this.freeCoin, 2, 0);
    }
    PanelManage.openFreeCoin = openFreeCoin;
    function openVip() {
        if (this.vip) {
            this.vip.dispose();
            this.vip = null;
        }
        this.vip = new VipPanel();
        PopUpManager.addPopUp(this.vip, 2, 0);
    }
    PanelManage.openVip = openVip;
    function openClown(r) {
        if (this.clown) {
            this.clown.dispose();
            this.clown = null;
        }
        this.clown = new ClownPanel(r);
        PopUpManager.addPopUp(this.clown, 2, 0);
    }
    PanelManage.openClown = openClown;
})(PanelManage || (PanelManage = {}));
