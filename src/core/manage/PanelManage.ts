/**
  * 面板管理类
  * by fany
  * (c) copyright false,0,0,2015 - 2035
  * All Rights Reserved. 
  * 面板的管理类
  */
module PanelManage {

    export var loadingMc: egret.MovieClip;
    export var gameLayer: egret.DisplayObjectContainer;
    export var tipsLayer: egret.DisplayObjectContainer;
    export var euiLayer: eui.UILayer;
    export var hall: HallPanel;
    export var serverError: ServerErrorPanel;
    export var jinsha: JinShaPanel;
    export var fruit: FruitPanel;
    export var shop: ShopPanel;
    export var rank: RankPanel;
    export var gameresult: GameResultPanel;
    export var resloading: ResLoading;
    export var resloading2: ResLoading2;
    export var zhajinhua: ZhaJinHuaPanel;
    export var money: MoneyTreePanel;
    export var da: DaShangPanel;
    export var daTips: DaShangTips;
    export var task: TaskPanel;
    export var sign: SignPanel;
    export var active: ActivityPanel;
    export var award: AwardPanel;
    export var yao: YaoQingPanel;
    export var yue: YuePanel;
    export var redBox: RedBoxPanel;
    export var freeCoin: FreeCoinPanel;
    export var vip: VipPanel;
    export var tehui: TeHuiPanel;
    export var niuniu: NiuNiuPanel;
    export var chat: ChatPanel;
    export var email: EmailPanel;
    export var blackJack: BlackJackPanel;
    export var pk: PkPanel;
    export var ddz: DdzPanel;
    export var set: SetPanel;
    export var lottery: LotteryPanel;
    export var jingcai: JingCaiPanel;
    export var login: LoginPanel;
    export var user: UserPanel;
    export var clown: ClownPanel;
    export var kefu: KeFuPanel;
    export var clownrank: ClownRankPanel;
    export var notice: NoticePanel;
    export function createButtonMusic(): void {
        new ButtonMusic();
    }
    export function openNotice(gudingGroup): void {
        if (this.notice) {
            this.notice.dispose();
            this.notice = null;
        }
        this.notice = new NoticePanel(gudingGroup);
        this.tipsLayer.addChild(this.notice);
    }
    export function openLogin(flag = false): void {
        if (this.login) {
            this.login.dispose();
            this.login = null;
        }
        this.login = new LoginPanel(flag);
        PopUpManager.addPopUp(this.login, 1);
    }
    export function openClownrank(): void {
        if (this.clownrank) {
            this.clownrank.dispose();
            this.clownrank = null;
        }
        this.clownrank = new ClownRankPanel();
        PopUpManager.addPopUp(this.clownrank, 2);
    }
    export function openKefu(): void {
        if (this.kefu) {
            this.kefu.dispose();
            this.kefu = null;
        }
        this.kefu = new KeFuPanel();
        PopUpManager.addPopUp(this.kefu, 1);
    }
    export function openUser(): void {
        if (this.user) {
            this.user.dispose();
            this.user = null;
        }
        this.user = new UserPanel();
        PopUpManager.addPopUp(this.user, 1);
    }
    export function openJingCai(): void {
        if (this.jingcai) {
            this.jingcai.dispose();
            this.jingcai = null;
        }
        this.jingcai = new JingCaiPanel();
        PopUpManager.addPopUp(this.jingcai, 1);
    }
    export function openDdz(r): void {
        if (this.ddz) {
            this.ddz.dispose();
            this.ddz = null;
        }
        this.ddz = new DdzPanel(r);
        PopUpManager.addPopUp(this.ddz, 1);
    }
    export function openChat(parentView, xx, yy, state): void {
        if (this.chat) {
            if (this.chat.parent) {
                this.chat.parent.removeChild(this.chat);
            }
        } else {
            this.chat = new ChatPanel();
        }
        this.chat.clearItems();
        ChatManage.getInstance().setState(state);
        this.chat.x = xx;
        this.chat.y = yy;
        parentView.addChildAt(this.chat, 2);
    }
    export function openEmail(): void {
        if (this.email) {
            this.email.dispose();
            this.email = null;
        }
        this.email = new EmailPanel();
        PopUpManager.addPopUp(this.email, 1);
    }
    export function openTeHui(): void {
        if (this.tehui) {
            this.tehui.dispose();
            this.tehui = null;
        }
        this.tehui = new TeHuiPanel();
        PopUpManager.addPopUp(this.tehui, 1);
    }
    export function openYue(): void {
        if (this.yue) {
            this.yue.dispose();
            this.yue = null;
        }
        this.yue = new YuePanel();
        PopUpManager.addPopUp(this.yue, 1);
    }
    export function openResLoading(res): void {
        if (this.resloading) {
            this.resloading.dispose();
            this.resloading = null;
        }
        this.resloading = new ResLoading();
        PopUpManager.addPopUp(this.resloading, 1);
        this.resloading.init(res);
    }
    export function openResLoading2(obj): void {
        if (this.resloading2) {
            this.resloading2.visible = true;
        } else {
            this.resloading2 = new ResLoading2(obj);
            PopUpManager.addPopUp(this.resloading2, 1);
        }
    }
    export function openMainPage(): void {
        if (this.bank) {
            this.bank.dispose();
            this.bank = null;
        }
        PopUpManager.removePopUp(GameConfig.curPanel, 1, false);
    }
    export function openGameResult(data, cb = null): void {
        if (this.gameresult) {
            this.gameresult.dispose();
            this.gameresult = null;
        }
        this.gameresult = new GameResultPanel(data, cb);
        PopUpManager.addPopUp(this.gameresult, 3, 1, PanelManage.tipsLayer);
    }
    export function openRank(): void {
        if (this.rank) {
            this.rank.dispose();
            this.rank = null;
        }
        this.rank = new RankPanel();
        PopUpManager.addPopUp(this.rank, 1);
    }
    export function openShop(isAlway = 1): void {
        if (this.shop) {
            this.shop.dispose();
            this.shop = null;
        }
        this.shop = new ShopPanel();
        PopUpManager.addPopUp(this.shop, isAlway);
    }
    export function openYaoQing(): void {
        if (this.yao) {
            this.yao.dispose();
            this.yao = null;
        }
        this.yao = new YaoQingPanel();
        PopUpManager.addPopUp(this.yao, 1);
    }
    export function openJinSha(r): void {
        if (this.jinsha) {
            this.jinsha.dispose();
            this.jinsha = null;
        }
        this.jinsha = new JinShaPanel(r);
        PopUpManager.addPopUp(this.jinsha, 1);
    }
    export function openFruit(r): void {
        if (this.fruit) {
            this.fruit.dispose();
            this.fruit = null;
        }
        this.fruit = new FruitPanel(r);
        PopUpManager.addPopUp(this.fruit, 1);
    }
    export function openMoney(): void {
        if (this.money) {
            this.money.dispose();
            this.money = null;
        }
        this.money = new MoneyTreePanel();
        PopUpManager.addPopUp(this.money, 1);
    }
    export function openDa(): void {
        if (this.da) {
            this.da.dispose();
            this.da = null;
        }
        this.da = new DaShangPanel();
        PopUpManager.addPopUp(this.da, 1);
    }
    export function openDaTips(data): void {
        if (this.daTips) {
            this.daTips.dispose();
            this.daTips = null;
        }
        this.daTips = new DaShangTips(data);
        PopUpManager.addPopUp(this.daTips, 2, 0, PanelManage.tipsLayer);
    }
    export function openTask(): void {
        if (this.task) {
            this.task.dispose();
            this.task = null;
        }
        this.task = new TaskPanel();
        PopUpManager.addPopUp(this.task, 1);
    }
    export function openSign(): void {
        if (this.sign) {
            this.sign.dispose();
            this.sign = null;
        }
        this.sign = new SignPanel();
        PopUpManager.addPopUp(this.sign, 1);
    }
    export function openActive(): void {
        if (this.active) {
            this.active.dispose();
            this.active = null;
        }
        this.active = new ActivityPanel();
        PopUpManager.addPopUp(this.active, 1);
    }
    export function openSet(): void {
        if (this.set) {
            this.set.dispose();
            this.set = null;
        }
        this.set = new SetPanel();
        PopUpManager.addPopUp(this.set, 1);
    }

    export function openLottery(): void {
        if (this.lottery) {
            this.lottery.dispose();
            this.lottery = null;
        }
        this.lottery = new LotteryPanel();
        PopUpManager.addPopUp(this.lottery, 1);
    }

    export function openAward(): void {
        if (this.award) {
            this.award.dispose();
            this.award = null;
        }
        this.award = new AwardPanel();
        PopUpManager.addPopUp(this.award, 1);
    }
    export function openResult(arr): void {
        //        if(this.result) {
        //            this.result.dispose();
        //            this.result = null;
        //        }
        //        this.result = new BalancePanel();
        //        this.result.setData(arr);
        //        PopUpManager.addPopUp(this.result);
    }
    export function openHall(): void {
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

    export function openZhaJinHua(r): void {
        if (this.zhajinhua) {
            this.zhajinhua.dispose();
            this.zhajinhua = null;
        }
        this.zhajinhua = new ZhaJinHuaPanel(r);
        PopUpManager.addPopUp(this.zhajinhua, 1);
    }

    export function openNiuNiu(r): void {
        if (this.niuniu) {
            this.niuniu.dispose();
            this.niuniu = null;
        }
        this.niuniu = new NiuNiuPanel(r);
        PopUpManager.addPopUp(this.niuniu, 1);
    }

    export function openBlackJack(r): void {
        if (this.blackJack) {
            this.blackJack.dispose();
            this.blackJack = null;
        }
        this.blackJack = new BlackJackPanel(r);
        PopUpManager.addPopUp(this.blackJack, 1);
    }
    export function openPk(r): void {
        if (this.pk) {
            this.pk.dispose();
            this.pk = null;
        }
        this.pk = new PkPanel(r);
        PopUpManager.addPopUp(this.pk, 1);
    }

    export function openServerErrorPanel(str): void {
        if (this.serverError) {
            this.serverError.dispose();
            this.serverError = null;
        }
        this.serverError = new ServerErrorPanel(str);
        PopUpManager.addPopUp(this.serverError, 1, 1, PanelManage.tipsLayer);
    }

    export function openRedBox(game, type, data = null): void {
        if (this.redBox) {
            this.redBox.dispose();
            this.redBox = null;
        }
        this.redBox = new RedBoxPanel(game, type, data);
        // PanelManage.redBox.setRid(data);
        PopUpManager.addPopUp(this.redBox, 2, 0, PanelManage.tipsLayer);
    }

    export function openFreeCoin(): void {
        if (this.freeCoin) {
            this.freeCoin.dispose();
            this.freeCoin = null;
        }
        this.freeCoin = new FreeCoinPanel();
        PopUpManager.addPopUp(this.freeCoin, 2, 0);
    }

    export function openVip(): void {
        if (this.vip) {
            this.vip.dispose();
            this.vip = null;
        }
        this.vip = new VipPanel();
        PopUpManager.addPopUp(this.vip, 2, 0);
    }

    export function openClown(r): void {
        if (this.clown) {
            this.clown.dispose();
            this.clown = null;
        }
        this.clown = new ClownPanel(r);
        PopUpManager.addPopUp(this.clown, 2, 0);
    }
}


