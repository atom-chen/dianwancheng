class HallPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/HallPanelSkin.exml";
    }
    private itemGroup: eui.Group;
    private maskk: eui.Rect;
    private btnHuoDong: eui.Image;
    private btnRank: eui.Image;
    private btnShop: eui.Image;
    private time: number = 0;
    private xx: number = 0;
    private yy: number = 0;
    private btnJinSha: eui.Image;
    private btnJinHua: eui.Image;
    private btnNiuNiu: eui.Image;
    private btnBlackjack: eui.Image;
    private btnPk: eui.Image;
    private btnDdz: eui.Image;
    private currentIndex: number = 0;
    private moveNumber: number = 0;
    private isMove: boolean = false;
    private txtName: eui.Label;
    private txtGold: eui.Label;
    private btnDa: eui.Image;
    private btnEmail: eui.Image;
    private btnTask: eui.Image;
    private btnJiang: eui.Image;
    private btnMoney: eui.Image;
    private btnBao: eui.Image;
    private btnYao: eui.Image;
    private btnLaBa: eui.Image;
    private txtVip: eui.BitmapLabel;
    private head: eui.Image;
    private maskhead: eui.Group;
    private btnChong: eui.Image;

    public notify_mail: eui.Image;   //邮件通知	红点
    public notify_task: eui.Image;   //任务通知	红点
    public notify_tree: eui.Image;   //摇钱树通知	红点
    private btnSet: eui.Image;
    private bgg: eui.Image;
    private btnFreeGold: eui.Image;
    private btnYue: eui.Image;
    private btnTeHui: eui.Image;
    private count: number = 0;
    private chats: Array<any>;
    private snow1: eui.Image;
    private snow2: eui.Image;
    private btnVip: eui.Image;
    private btnJingCai: eui.Image;
    private gudingGroup: eui.Group;
    private btnKefu: eui.Image;
    protected childrenCreated(): void {
        this.notify_mail.visible = false;
        this.notify_task.visible = false;
        this.notify_tree.visible = false;
        this.chats = [];
        this.currentIndex = 0;
        this.moveNumber = 0;
        this.createGameBtn();

        EventManage.addButtonEvent(this, this.btnJiang, egret.TouchEvent.TOUCH_TAP, this.onClick.bind(this, 1));
        EventManage.addButtonEvent(this, this.btnHuoDong, egret.TouchEvent.TOUCH_TAP, this.onClick.bind(this, 4));
        EventManage.addButtonEvent(this, this.btnRank, egret.TouchEvent.TOUCH_TAP, this.onClick.bind(this, 3));
        EventManage.addButtonEvent(this, this.btnShop, egret.TouchEvent.TOUCH_TAP, this.onClick.bind(this, 2));
        EventManage.addButtonEvent(this, this.btnSet, egret.TouchEvent.TOUCH_TAP, this.onClick.bind(this, 5));
        this.setData();

        EventManage.addButtonEvent(this, this.btnDa, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 1));
        EventManage.addButtonEvent(this, this.btnEmail, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 2));
        EventManage.addButtonEvent(this, this.btnTask, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 3));
        //EventManage.addButtonEvent(this, this.btnJiang, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 4));
        EventManage.addButtonEvent(this, this.btnMoney, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 5));
        //EventManage.addButtonEvent(this, this.btnBao, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 6));
        EventManage.addButtonEvent(this, this.btnYao, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 7));
        //EventManage.addButtonEvent(this, this.btnLaBa, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 8));
        EventManage.addButtonEvent(this, this.btnChong, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 9));
        EventManage.addButtonEvent(this, this.btnFreeGold, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 10));
        EventManage.addEvent(this, this.btnTeHui, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 11));
        EventManage.addButtonEvent(this, this.btnYue, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 12));
        EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 13));
        //EventManage.addButtonEvent(this, this.btnJingCai, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 14));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_MAIN, this.updateData.bind(this));
        EventManage.addButtonEvent(this, this.btnKefu, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 16));
        //EventManage.addButtonEvent(this, this.btnRight, egret.TouchEvent.TOUCH_TAP, this.btnLeftRight.bind(this, -1));
        //EventManage.addButtonEvent(this, this.btnLeft, egret.TouchEvent.TOUCH_TAP, this.btnLeftRight.bind(this, 1));
        EventManage.addOnceEvent(this, lcp.LListener.getInstance(), EventData.UI_COM_OPEN, this.goonOpenUI.bind(this));
        PanelManage.openNotice(this.gudingGroup);
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playMusicOnce, this);
        TimerManager.getInstance().setFrame("GameMainPanel.noticeMoveHandler", this.noticeMoveHandler.bind(this), this);
        //特殊处理红点消息发来的时没有初始化大厅
        if (GlobalData.hallNotice != -1) {
            this.redNotice(GlobalData.hallNotice, true);
        }
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
        if (GlobalData.user.hasRecharge) {
            this.btnTeHui.visible = false;
            this.btnTeHui.touchEnabled = false;
        }
        this.createSnow();
        this.setVersion();
        // var s = new ScrollPanel(200, 200);
        // s.width = 200;
        // s.height = 200;
        // s.x = 100;
        // s.y = 200;
        // this.addChild(s);
    }
    private noticeMoveHandler(): void {
        if (this.btnTeHui.visible) {
            if (++this.count == 45) {
                EffectUtils.playEffect2(this.btnTeHui, this.fuweiTeHui.bind(this));
                this.count = 0;
            }
        }
        if (this.snow1.y > 1024) this.snow1.y = -500;
        if (this.snow2.y > 1024) this.snow2.y = -500;
        this.snow1.y++;
        this.snow2.y++;
    }
    private createGameBtn(): void {
        var arr = ["btnJinSha", "btnDdz", "btnXiaoChou", "btnJinHua", "btnNiuNiu", "blackjack", "btnShuiGuo", "pk"];//"btnJingCaiHuanle",  "btnShiSanshui", "btnBenchi",
        var yy = 0;
        for (var i = 0; i < arr.length; i++) {
            //var btn = new eui.Image(GlobalData.cdnResUrl + "resource/assets/noload/" + arr[i] + ".png");
            var btn = new eui.Image(arr[i]);
            this.itemGroup.addChild(btn);
            if (i % 2 == 0) {
                yy = 190 * (i / 2);
                btn.x = 0;
                btn.y = yy;
            } else {
                btn.x = 305;
                btn.y = yy;
            }
            EventManage.addEvent(this, btn, egret.TouchEvent.TOUCH_TAP, this.onTouchEend.bind(this, arr[i]));
        }
    }
    private createSnow(): void {
        this.snow1 = new eui.Image(GlobalData.cdnResUrl + "resource/assets/noload/noload.snow.png");
        this.snow1.touchEnabled = false;
        PanelManage.tipsLayer.addChild(this.snow1);

        this.snow2 = new eui.Image(GlobalData.cdnResUrl + "resource/assets/noload/noload.snow.png");
        this.snow2.touchEnabled = false;
        this.snow2.y = -800;
        PanelManage.tipsLayer.addChild(this.snow2);
    }
    private updatePayData(r): void {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        this.updateData();
        this.btnTeHui.visible = false;
        this.btnTeHui.touchEnabled = false;
    }
    private goonOpenUI(param): void {
        var obj = param.param;
        if (obj.from == 2) {
            this.onClick2(obj.num);
        } else {
            this.onClick(obj.num);
        }
    }
    public updateData(): void {
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
        this.txtVip.text = "VIP" + GlobalData.user.vip;
    }
    private onClick2(num): void {
        if (!GlobalData.isLodingComUI) {
            PanelManage.openResLoading2({ num: num, from: 2 });
            return;
        }
        //0不能作为面板识别参数，已做他用.
        switch (num) {
            case 1:
                PanelManage.openDa();
                //PanelManage.notice.gonggao({ msg: { name: "", msg: "7:玩家A:5" } });
                break;
            case 2:
                this.notify_mail.visible = false;
                PanelManage.openEmail();
                break;
            case 3:
                PanelManage.openTask();
                break;
            case 4:
                PanelManage.openAward();
                break;
            case 5:
                PanelManage.openMoney();
                break;
            case 6:
                // PanelManage.openBank();
                break;
            case 7:
                PanelManage.openYaoQing();
                break;
            case 8:
                //PanelManage.openSay();
                break;
            case 9:
                PanelManage.openShop();
                break;
            case 10:
                // TipsManage.showTips("功能未开放!");
                PanelManage.openFreeCoin();
                // PanelManage.openVip();
                break;
            case 11:
                PanelManage.openTeHui();
                break;
            case 12:
                PanelManage.openYue();
                break;
            case 13:
                PanelManage.openVip();
                break;
            // case 14:
            //     PanelManage.openClown();
            //     //PanelManage.openJingCai();
            //     //TipsManage.showTips("功能未开放!");
            //     break;
            case 15:
                PanelManage.openUser();
                break;
            case 16:
                PanelManage.openKefu();
                break;
        }
    }
    private setData() {
        var mask2: egret.Shape = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(77, 50, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.head.mask = mask2;
        this.head.source = GlobalData.user.headurl;
        this.txtGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.txtName.text = GlobalData.user.nickname;
        this.txtVip.text = "VIP" + GlobalData.user.vip;
    }
    public updateHeadurl() {
        //this.head.mask = this.maskhead;
        var stt = GlobalData.user.headurl.split("_")[0];
        if (stt == "nan" || stt == "nv") {
            this.head.source = GlobalData.configData.data.headurl + GlobalData.user.headurl + ".png";
        } else {
            this.head.source = GlobalData.user.headurl;
        }
        this.txtName.text = GlobalData.user.nickname;
    }
    private onClick(num) {
        this.btnJiang.source = "btnJiang";
        this.btnShop.source = "btnShop";
        this.btnHuoDong.source = "btnHuoDong";
        this.btnSet.source = "btnSet";
        if (!GlobalData.isLodingComUI) {
            PanelManage.openResLoading2({ num: num, from: 1 });
            return;
        }
        switch (num) {
            case 1:
                this.btnJiang.source = "btnJiangLiang";
                PanelManage.openAward();
                break;
            case 2:
                this.btnShop.source = "btnShopLiang";
                PanelManage.openShop();
                break;
            case 3:
                PanelManage.openRank();
                break;
            case 4:
                this.btnHuoDong.source = "btnHuoDongLiang";
                PanelManage.openActive();
                break;
            case 5:
                this.btnSet.source = "btnSetLiang";
                PanelManage.openSet();
                break;
        }
    }
    private onTouchEend(typee) {
        switch (typee) {
            case "btnJinSha":
                PanelManage.openResLoading("jinsha");
                break;
            case "btnJinHua":
                PanelManage.openResLoading("jinhua");
                break;
            case "btnNiuNiu":
                // TipsManage.showTips("功能未开放!");
                PanelManage.openResLoading('niuniu');
                break;
            case 'blackjack':
                //TipsManage.showTips("功能未开放!");
                //PanelManage.openBlackJack(null);
                PanelManage.openResLoading('blackjack');
                break;
            case 'pk':
                //TipsManage.showTips("功能未开放!");
                // PanelManage.openPk(null);
                PanelManage.openResLoading('pk');
                break;
            case 'btnDdz':
                PanelManage.openResLoading('ddz');
                break;
            case 'btnXiaoChou':
                PanelManage.openResLoading('clown');
                break;
            case 'btnShuiGuo':
                PanelManage.openResLoading('fruit');
                break;
        }
    }
    private fuweiItem(item, xx): void {
        item.x = xx;
    }

    private fuweiTeHui(): void {
        this.btnTeHui.x = 531;
        this.btnTeHui.y = 164;
    }

    //红点通知
    public redNotice(data, bl): void {
        switch (data.type) {
            case 1://task
                this.notify_task.visible = bl;
                break;
            case 2://mail
                this.notify_mail.visible = bl;
                this.updateGold();
                break;
            case 3://tree
                this.notify_tree.visible = bl;
                break;
            case 4://dashang
                PanelManage.openDaTips(data);
                break;
        }
    }

    public updateGold(): void {
        Net.send(Protocol.HALL_GET_GOLD, {}, this.updateGoldCB.bind(this));
    }

    private updateGoldCB(msg): void {
        GlobalData.user.gold = msg.data.gold;
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
    }
    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }
    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
    public setVersion(): void {
        if (GlobalData.platform == PlatformData.PLATFORM_MENGDOU) {
            EventManage.addEvent(this, this.maskhead, egret.TouchEvent.TOUCH_TAP, this.onClick2.bind(this, 15));
        }
    }
}