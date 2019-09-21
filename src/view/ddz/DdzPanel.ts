class DdzPanel extends eui.Component implements fany.IDispose {
    private txtName: eui.Label;
    private txtGold: eui.Label;
    private head: eui.Image;
    private count: number = 0;
    private ii: number = 0;
    private count1: number = 0;
    private ii1: number = 0;
    private btnReturn: eui.Image;
    private labRoomNum: eui.Label;
    private group2: DdzHeadItemPanel;
    private group1: DdzHeadItemPanel;
    private curRoles: Array<any>;
    private dizhuGroup: eui.Group;
    private dizhu: eui.Image;
    private txtStratTips: eui.Label;
    private time: number = 0;
    private isMove: boolean = false;
    private pokerArr: Array<any>;
    private pokerData: Array<any>;
    private len: number = 0;
    private btnBuJiao: eui.Group;
    private btn1: eui.Group;
    private btn2: eui.Group;
    private btn3: eui.Group;
    private grpTimer: eui.Group;
    //    private timer: egret.Timer;
    private tt: number = 0;
    private txtTime: eui.Label;
    private imgBuchu: eui.Image;
    private curData: Array<any>;
    private grpEnd: eui.Group;
    private isMeChupai: boolean = false;
    private btnChu: eui.Image;
    private btnGuo: eui.Image;
    private chupaiGroup: eui.Group;
    private isFirst: boolean = false;
    private curObj: any = null;
    private imgResult: eui.Image;
    private txtDi: eui.Label;
    private txtBeishu: eui.Label;
    private txtStt: eui.Label;
    private txtFen: eui.Label;
    private txtResult: eui.Label;
    private txtGoldFen: eui.Label;
    private btnPlayAgain: eui.Image;
    private againBool: boolean = false;
    private jieBool: boolean = false;
    private cnn: number = 0;
    private txtDifentxt: eui.Label;
    private r: any;
    private btnMusic: eui.Image;
    private tt2: number = 0;
    private tt3: number = 0;
    private images: Array<any>;
    private sexleft: eui.Image;
    private sexright: eui.Image;
    private rObj: any = null;
    private createGroup: eui.Group;
    private txtDiFen: eui.Label;
    private start: eui.Image;
    private createBg: eui.Rect;
    private txtTips: eui.Label;
    private topGroup: eui.Group;
    private item1: eui.Group;
    private item2: eui.Group;
    private item3: eui.Group;
    private num: number = 0;
    private txtTipsss: eui.Label;
    private pokerPos: Array<any>;
    private buchuPos: Array<any>;
    private timerPos: Array<any>;
    constructor(r) {
        super();
        this.skinName = "resource/skins/ddz/DdzSkin.exml";
        GlobalData.user.seat = "-1";
        this.rObj = r;
        this.setXY();
    }
    private setXY(): void {
        this.pokerPos = [320, 800];
        this.buchuPos = [[286, 333], [544, 303], [30, 303]];
        this.timerPos = [[267, 371], [532, 305], [8, 305]];
    }
    private setBuchuPos(seat): void {
        this.imgBuchu.x = this.buchuPos[seat][0];
        this.imgBuchu.y = this.buchuPos[seat][1];
    }
    private setTimerPos(seat): void {
        this.grpTimer.x = this.timerPos[seat][0];
        this.grpTimer.y = this.timerPos[seat][1];
    }
    private chairToView(chairId): number {
        var id = chairId - parseInt(GlobalData.user.seat);
        id = (id += 3) % 3;
        return id;
    }
    protected childrenCreated(): void {
        this.txtTips.touchEnabled = false;
        this.txtName.text = GlobalData.user.nickname;
        this.txtGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.head.source = GlobalData.user.headurl;
        this.labRoomNum.text = GlobalData.user.idd;
        //GlobalData.jssdk.setTitle();
        EventManage.addButtonEvent(this, this.btnReturn, egret.TouchEvent.TOUCH_TAP, this.btnReturnHandle.bind(this));

        EventManage.addButtonEvent(this, this.btnBuJiao, egret.TouchEvent.TOUCH_TAP, this.clickDizhu.bind(this, 0));
        EventManage.addButtonEvent(this, this.btn1, egret.TouchEvent.TOUCH_TAP, this.clickDizhu.bind(this, 1));
        EventManage.addButtonEvent(this, this.btn2, egret.TouchEvent.TOUCH_TAP, this.clickDizhu.bind(this, 2));
        EventManage.addButtonEvent(this, this.btn3, egret.TouchEvent.TOUCH_TAP, this.clickDizhu.bind(this, 3));

        EventManage.addButtonEvent(this, this.item1, egret.TouchEvent.TOUCH_TAP, this.createTable.bind(this, 100));
        EventManage.addButtonEvent(this, this.item2, egret.TouchEvent.TOUCH_TAP, this.createTable.bind(this, 50000));
        EventManage.addButtonEvent(this, this.item3, egret.TouchEvent.TOUCH_TAP, this.createTable.bind(this, 1000000));
        // EventManage.addButtonEvent(this, this.btnChu, egret.TouchEvent.TOUCH_TAP, this.chupaiHandle.bind(this, 2));
        // EventManage.addButtonEvent(this, this.btnGuo, egret.TouchEvent.TOUCH_TAP, this.chupaiHandle.bind(this, 1));
        // this.btnChu.touchEnabled = true;
        // this.btnGuo.touchEnabled = true;
        this.btnChu.name = "btnChu";
        this.btnGuo.name = "btnGuo";

        EventManage.addButtonEvent(this, this.btnPlayAgain, egret.TouchEvent.TOUCH_TAP, this.btnPlayAgainHandle.bind(this));
        this.txtDifentxt.text = "0";
        EventManage.addButtonEvent(this, this.btnMusic, egret.TouchEvent.TOUCH_TAP, this.btnMusicHandler.bind(this));
        //EventManage.addEvent(this, this.start, egret.TouchEvent.TOUCH_TAP, this.createTable.bind(this));
        if (GlobalData.isMusic == false) {
            this.btnMusic.source = "btnMusicCloise";
        } else {
            this.btnMusic.source = "btnMusic";
        }
        this.createGroup.visible = true;
    }
    private netcallback(r): void {
        if (r.code == 200) {
            this.txtTipsss.text = "正在加入房间...";
            if (r.tid == "0") {
                Net.send(Protocol.DDZ_CREATE_TABLE, { difen: this.num + "" }, this.createTableBack.bind(this));
            } else {
                Net.send(Protocol.DDZ_JOIN_TABLE, { tableId: r.tid }, this.joinBack.bind(this));
            }
        } else {
            this.txtTipsss.text = "请选择对应房间加入";
            this.createGroup.visible = true;
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private joinBack(r): void {
        if (r.code == 200) {
            this.createGroup.visible = false;
            GlobalData.user.idd = r.table.id;
            GlobalData.user.seat = r.chairId;
            GlobalData.isJoin = "no";
            GlobalData.tableState = r.table.playing;
            GlobalData.user.difen = r.table.difen;
            var len = r.table.users.length;
            for (var i = 0; i < len; i++) {
                var seat = this.chairToView(r.table.users[i].chairId);
                if (seat != 0) {
                    this["group" + seat].visible = true;
                    this["group" + seat].setData({ pokernum: "X0", name: r.table.users[i].name, gold: QuickManage.moneyStr(parseInt(r.table.users[i].gold + "")), head: r.table.users[i].headurl });
                }
            }
            this.txtTips.visible = true;
            if (len == 2) {
                this.txtTips.text = "请等待剩余1名玩家加入...";
            } else if (len == 1) {
                this.txtTips.text = "请等待剩余2名玩家加入...";
            } else {
                this.txtTips.visible = false;
            }
            this.txtDifentxt.text = "" + QuickManage.moneyStr(parseInt(GlobalData.user.difen));
            this.initGame();
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
            this.txtTipsss.text = "请选择对应房间加入";
            this.createGroup.visible = true;
        }
    }
    private createTable(num): void {
        if (this.txtTipsss.text != "请选择对应房间加入") {
            return;
        }
        this.num = num;
        this.txtTipsss.text = "正在查找房间...";
        Net.send(Protocol.JOIN_DDZ_GAME, { difen: num }, this.netcallback.bind(this));
    }
    public createTableBack(r): void {
        if (r.code == 200) {
            this.createGroup.visible = false;
            this.txtTips.visible = true;
            GlobalData.user.idd = r.table.id;
            GlobalData.isJoin = "yes";
            GlobalData.user.seat = "0";
            GlobalData.user.difen = r.table.difen;
            this.txtDifentxt.text = "" + QuickManage.moneyStr(parseInt(GlobalData.user.difen));
            this.txtTips.text = "请等待剩余2名玩家加入...";
            this.initGame();
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
            this.txtTipsss.text = "请选择对应房间加入";
            this.createGroup.visible = true;
        }
    }
    protected initGame(): void {
        this.chupaiGroup.touchChildren = false;
        this.chupaiGroup.touchEnabled = false;
        this.count = 0;
        this.tt2 = 0;
        this.tt3 = 0;
        this.ii = 0;
        this.count1 = 0;
        this.againBool = false;
        this.jieBool = false;
        this.ii1 = 0;
        this.tt = 20;
        this.curData = [];
        super.childrenCreated();
        this.setTouchEnabled();
        this.images = this.images || [];
        this.pokerData = [];
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin.bind(this));
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_END, this.onTouchEend.bind(this));
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_MOVE, this.onTouchMove.bind(this));
        EventManage.addEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.clickHandle.bind(this));
    }
    private btnMusicHandler(): void {
        if (this.btnMusic.source == "btnMusic") {
            this.btnMusic.source = "btnMusicCloise";
            GlobalData.isMusic = false;
            MusicManage.closeMuisc();
            MusicManage.closeBgMuisc();
        } else {
            this.btnMusic.source = "btnMusic";
            GlobalData.isMusic = true;
            MusicManage.playGameBgMuisc("hallBgm", 0.5, -1);
        }
    }
    private btnReturnHandle(): void {
        if (this.createGroup.visible == true) {
            this.quit();
        } else {
            Net.send(Protocol.DDZ_QUIT_GAME, {}, this.quit.bind(this));
        }
    }
    private btnPlayAgainHandle(): void {
        ++this.cnn;
        this.dizhuGroup.visible = false;
        this.btnChu.visible = false;
        this.btnGuo.visible = false;
        this.grpEnd.visible = false;
        this.dizhu.visible = false;
        this.grpTimer.visible = false;
        this.removeChupaiGroup();
        this.count = 0;
        this.ii = 0;
        this.count1 = 0;
        this.ii1 = 0;
        this.tt = 20;
        this.curData = [];
        this.pokerArr = [];
        this.curObj = null;
        var len = this.pokerData.length;
        for (var i = 0; i < len; i++) {
            if (this.pokerData[i]) {
                if (this.pokerData[i].parent) {
                    this.pokerData[i].parent.removeChild(this.pokerData[i]);
                }
                ObjManage.addPoker(this.pokerData[i]);
            }
        }
        this["group1"].setPokerNum("X0");
        this["group2"].setPokerNum("X0");
        this.group1.setDizhu(false);
        this.group2.setDizhu(false);
        this.pokerData = [];
        this["txtBei"].text = "X0";
        this["card0"].source = "ddz_0";
        this["card1"].source = "ddz_0";
        this["card2"].source = "ddz_0";
        GlobalData.curData = [];
        this.enabled = true;
        this.touchChildren = true;
        this.touchEnabled = true;
        TimerManager.getInstance().remove("GamePanel.gogo");
        this.len = 0;
        Net.send(Protocol.DDZ_AGAIN_GAME, {}, this.againGame.bind(this));
    }
    private againGame(r): void {
        console.log(JSON.stringify(r));
        if (r.code == 200) {
            this.againBool = true;
            if (this.jieBool) {
                console.log("来源于againGame" + this.jieBool);
                this.play();
                this.jieBool = false;
            }
        }
    }
    private clickHandle(e: egret.TouchEvent): void {
        var view = e.target.parent;
        //console.log(e.stageX + "==" + e.stageY + "点击的name=" + view.name)
        if (((e.stageX > this.btnGuo.x && e.stageX < this.btnGuo.x + this.btnGuo.width) && (e.stageY > this.btnGuo.y && e.stageY < this.btnGuo.y + this.btnGuo.height)) && this.btnGuo.visible) {
            this.chupaiHandle(1);
            EffectUtils.playButtonEffect(this.btnGuo);
            return;
        }
        if (((e.stageX > this.btnChu.x && e.stageX < this.btnChu.x + this.btnChu.width) && (e.stageY > this.btnChu.y && e.stageY < this.btnChu.y + this.btnChu.height)) && this.btnChu.visible) {
            this.chupaiHandle(2);
            EffectUtils.playButtonEffect(this.btnChu);
            return;
        }

        if (view.name != null) {
            if (view.name.split("_")[0] != "poker") {
                this.setfuwei();
            } else {
                view.setSelect();
            }
        }
    }
    private setfuwei(): void {
        var len = this.pokerData.length;
        for (var i = 0; i < len; i++) {
            if (this.pokerData[i]) {
                this.pokerData[i].setSelect3();
            }
        }
    }
    private chupaiHandle(num): void {
        if (num == 2) {
            if (this.isMeChupai) {
                if (this.curObj == null || this.curObj.isMe == "0") {
                    if (GlobalData.curData.length < 1) {
                        TipsManage.showTips("必须出至少1张牌!");
                        return;
                    }
                }
                this.btnChu.touchEnabled = false;
                this.btnGuo.touchEnabled = false;
                Net.send(Protocol.DDZ_CHU_PAI, { pokers: GlobalData.curData }, this.chupaiBack.bind(this));
            } else {
                TipsManage.showTips("还未轮到你出牌!");
            }
        } else {
            if (this.curObj == null || this.curObj.isMe == "0") {
                TipsManage.showTips("轮到你出牌了!");
                return;
            }
            GlobalData.curData = [];
            this.btnChu.touchEnabled = false;
            this.btnGuo.touchEnabled = false;
            Net.send(Protocol.DDZ_CHU_PAI, { pokers: [] }, this.chupaiBack.bind(this));
        }
    }
    private clickDizhu(num): void {
        this.dizhuGroup.visible = false;
        clearInterval(this.tt2);
        Net.send(Protocol.DDZ_JIAO_FEN, { score: num }, this.jiaofenBack.bind(this));
    }
    private jiaofenBack(r): void {
    }
    private onTouchEend(e: egret.TouchEvent) {
        this.isMove = false;
    }
    private onTouchBegin(e: egret.TouchEvent) {
        this.isMove = true;
        this.time = egret.getTimer();
    }
    private onTouchMove(e: egret.TouchEvent) {
        var view = e.target.parent;
        if (this.isMove) {
            if (view.name != null) {
                if (view.name.split("_")[0] == "poker") {
                    view.setSelect2();
                }
            }
        }
    }
    private quitBack(r): void {
        if (r.code = 200) {
            GlobalData.user.idd = "";
            this.dispose();
        }
    }
    private init(): void {
    }
    private goNext(): void {
        this.init();
    }
    private play(): void {
        //EnterFrameManage.add(this.gogo.bind(this), "GamePanel.gogo");
        TimerManager.getInstance().remove("GamePanel.gogo");
        TimerManager.getInstance().setFrame("GamePanel.gogo", this.gogo.bind(this), this);
    }
    public someonecurbet(r): void {
        //this["txtBei"].text = "X" + r.msg.bet;
    }
    public someonechangechupai(r): void {
    }
    public someonechupai(r): void {
        this["txtBei"].text = "X" + r.msg.bet;
        var seat = this.chairToView(r.msg.chairId);
        var pokers = r.msg.cards;
        var next = this.chairToView(r.msg.next);
        if (pokers.length == 0) {
            this.imgBuchu.visible = true;
            this.imgBuchu.alpha = 1;
            egret.Tween.get(this.imgBuchu).to({ alpha: 0 }, 1200);
        } else {
            this.imgBuchu.visible = false;
            this.curObj = { isMe: seat + "" };
            this.createPoker(pokers);
            var hLayout: eui.HorizontalLayout = new eui.HorizontalLayout();
            hLayout.gap = -40;
            if (seat == 0) {
                hLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
            } else if (seat == 1) {
                hLayout.horizontalAlign = egret.HorizontalAlign.RIGHT;
            } else if (seat == 2) {
                hLayout.horizontalAlign = egret.HorizontalAlign.LEFT;
            }
            this.chupaiGroup.layout = hLayout;
        }
        this.setBuchuPos(seat);
        if (seat != 0) {
            this["group" + seat].setPokerNum("X" + r.msg.count);
        }
        this.isMeChupai = false;
        this.setTimerPos(next);
        if (next == 0) {
            this.btnChu.touchEnabled = true;
            this.btnGuo.touchEnabled = true;
            this.btnChu.visible = true;
            this.btnGuo.visible = true;
            this.isMeChupai = true;
        }
        if (this.curObj.isMe == (next + "")) {
            this.removeChupaiGroup();
        }
        if (seat + "" == (next + "")) {
            this.removeChupaiGroup();
        }
        this.setChildIndex(this.grpTimer, this.numChildren - 1);
        clearInterval(this.tt2);
        this.tt2 = setInterval(this.updateTime.bind(this), 1000);
        this.tt = 20;
        this.txtTime.text = (this.tt--) + "";
    }
    private createPoker(arr): void {
        this.removeChupaiGroup();
        this.images = [];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var img = ObjManage.getImage(arr[i] + "");
            this.chupaiGroup.addChild(img);
            img.scaleX = 0.5;
            img.scaleY = 0.5;
            this.images.push(img);
        }
    }
    private removeChupaiGroup(): void {
        var lenn = this.images.length;
        for (var i = 0; i < lenn; i++) {
            if (this.images[i]) {
                if (this.images[i].parent) {
                    this.images[i].parent.removeChild(this.images[i]);
                    ObjManage.addImage(this.images[i]);
                }
            }
        }
    }
    public setDipaiFun(dipai): void {
        var len = dipai.length;
        for (var i = 0; i < len; i++) {
            this["card" + i].source = dipai[i] + "";
        }
    }
    public someonecalldizhu(r): void {
        this.r = r;
        this.group1.setPokerNum("X17");
        this.group2.setPokerNum("X17");
        this.pokerArr = PokerManage.paixu(r.msg.handCard, []);
        this.len = this.pokerArr.length;
        this.dizhuGroup.visible = true;
        this.jieBool = true;
        if (this.cnn == 0) {
            this.play();
            this.jieBool = false;
        } else {
            if (this.againBool) {
                console.log("来源于someonecalldizhu");
                this.play();
                this.jieBool = false;
            }
        }
        this.tt3 = 0;
        clearInterval(this.tt2);
        this.tt2 = setInterval(this.jiaodizhudaojishi.bind(this), 1000);
    }
    private jiaodizhudaojishi(): void {
        if (++this.tt3 == 5) {
            if (this.dizhuGroup.visible) {
                this.clickDizhu(0);
            }
            clearInterval(this.tt2);
        }
    }
    public someonemakedizhu(r): void {
        console.log("有人当地主了");
        this["txtBei"].text = "X" + r.msg.bet;
        this.setDipaiFun(r.msg.dipai);
        this.grpTimer.visible = true;
        this.isMeChupai = false;
        this.dizhu.visible = false;
        this.group1.setDizhu(false);
        this.group2.setDizhu(false);
        var seat = this.chairToView(r.msg.chairId);
        this.setTimerPos(seat);
        if (seat == 0) {
            this.btnChu.visible = true;
            this.btnGuo.visible = true;
            this.isMeChupai = true;
            this.dizhu.visible = true;
            this.addPoker(r.msg.dipai);
        } else {
            this["group" + seat].setPokerNum("X20");
            this["group" + seat].setDizhu();
        }
        clearInterval(this.tt2);
        this.tt2 = setInterval(this.updateTime.bind(this), 1000);
    }
    private addPoker(arr): void {
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var poker = ObjManage.getPoker();
            poker.setData({ res: arr[i] + "" });
            poker.rotation = 5 + (-(this.len * 10) / 2) + (10 * this.ii);
            poker.anchorOffsetX = 66;
            poker.anchorOffsetY = 360;
            poker.x = this.pokerPos[0];
            poker.y = this.pokerPos[1];
            poker.name = "poker_" + this.ii;
            this.addChild(poker);
            this.pokerData.push(poker);
            ++this.ii;
        }
        PokerManage.paixu(arr, this.pokerArr);
        this.updatePoker();
    }
    private updateTime(): void {
        this.txtTime.text = (this.tt--) + "";
        if (this.tt < 0) {
            clearInterval(this.tt2);
            this.btnChu.visible = false;
            this.btnGuo.visible = false;
            if (this.curObj == null || this.curObj.isMe == "0") {
                if (this.isMeChupai) {
                    var poker = this.pokerArr[this.pokerArr.length - 1];
                    if (poker) {
                        GlobalData.curData = [];
                        GlobalData.curData.push(poker.y);
                    }
                    //console.log("时间到了出的牌是:"+poker.y)
                    Net.send(Protocol.DDZ_CHU_PAI, { pokers: GlobalData.curData }, this.chupaiBack.bind(this));
                    this.isMeChupai = false;
                }
            } else {
                //console.log("时间到了=3=isMe值:" + this.curObj.isMe);
                this.setfuwei();
                GlobalData.curData = [];
                if (this.isMeChupai) {
                    Net.send(Protocol.DDZ_CHU_PAI, { pokers: [] }, this.chupaiBack.bind(this));
                    this.isMeChupai = false;
                }
            }
        }
    }
    private chupaiBack(r): void {
        this.btnChu.touchEnabled = true;
        this.btnGuo.touchEnabled = true;
        if (r.code == 200) {
            this.btnChu.visible = false;
            this.btnGuo.visible = false;
            this.pokerArr = [];
            this.pokerArr = PokerManage.paixu(r.handCard, []);
            this.updatePoker();
            GlobalData.curData = [];
            this.setfuwei();
        } else {
            if (r.msg == "208" || r.msg == "508") {
                TipsManage.showTips("等待结算中,不能出牌！");
                return;
            }
            TipsManage.showTips("牌出错啦！");
            this.isMeChupai = true;
            this.btnChu.visible = true;
            this.btnGuo.visible = true;
        }
    }
    private updatePoker(): void {
        var len = this.pokerData.length;
        for (var i = 0; i < len; i++) {
            if (this.pokerData[i]) {
                if (this.pokerData[i].parent) {
                    this.pokerData[i].parent.removeChild(this.pokerData[i]);
                }
                ObjManage.addPoker(this.pokerData[i]);
            }
        }
        this.pokerData = [];
        var lenn = this.pokerArr.length;
        for (i = 0; i < lenn; i++) {
            var poker = ObjManage.getPoker();
            poker.rotation = 5 + (-(lenn * 10) / 2) + (10 * i);
            poker.setData({ res: this.pokerArr[i].y + "" });
            poker.anchorOffsetX = 55;
            poker.anchorOffsetY = 320;
            poker.x = this.pokerPos[0];
            poker.y = this.pokerPos[1];
            this.addChild(poker);
            poker.name = "poker_" + i;
            this.pokerData.push(poker);
        }
    }
    public someonechangeowner(r): void {
        var seat = this.chairToView(r.msg.chairId);
        if (seat == 0) {
        }
    }
    public someoneconclude(r): void {
        console.log("开始结算了");
        clearInterval(this.tt2);
        this.setChildIndex(this.grpEnd, this.numChildren - 1);
        this.grpEnd.visible = true;
        this.setChildIndex(this.topGroup, this.numChildren - 1);
        var data = r.msg;
        this.imgResult.source = "";
        this.txtDi.text = data.bet.difen;
        this.txtBeishu.text = data.bet.bet;
        this.txtStt.text = "炸弹" + data.bom + "个,春天" + data.chuntian + "个";
        for (var i = 0; i < 3; i++) {
            var seat = this.chairToView(i);
            if (seat == 0) {
                var d = data.data[i];
                this.txtGoldFen.text = "" + QuickManage.moneyStr(parseInt(GlobalData.user.gold));
                this.txtFen.text = (d > 0 ? "" : "-") + QuickManage.moneyStr(Math.abs(d)) + "";
                this.imgResult.source = (d > 0 ? "youwin" : "youlose");
                this.txtResult.text = (d > 0 ? "赢得:" : "输掉:");
            } else {
                this["group" + seat].setGold(data.data[i])
            }
        }
    }
    private setOver(arr): void {
        //egret.clearTimeout(this.tt);
        PanelManage.openResult(arr);
    }
    public someoneopencard(r): void {
        var seat = this.chairToView(r.msg.chairId);
    }
    public someonesendcard(r): void {
        //this.play();
    }
    public someonestart(r): void {
        //this.play();
    }
    public someonejoin(r): void {
        if (GlobalData.user.seat == "-1")
            return;
        var seat = this.chairToView(r.msg.chairId);
        if (seat != 0) {
            this["group" + seat].visible = true;
            this["group" + seat].setData({ head: r.msg.headurl, pokernum: "X0", name: r.msg.name, gold: QuickManage.moneyStr(parseInt(r.msg.gold + "")) });
            if (this.group1.visible == true && this.group2.visible == true) {
                this.txtTips.visible = false;
            } else {
                this.txtTips.text = "请等待剩余1名玩家加入...";
            }
        }
    }
    public someoneready(r): void {
        var seat = this.chairToView(r.msg.chairId);
    }
    public someoneleave(r): void {
        var seat = this.chairToView(r.msg.chairId);
        this["group" + seat].visible = false;
    }
    private gogo(): void {
        if (++this.count == 2) {
            var poker = ObjManage.getPoker();
            poker.setData({ res: this.pokerArr[this.ii].y + "" });
            //poker.setData({ res: "101" }); this.len = 17;
            poker.rotation = 5 + (-(this.len * 10) / 2) + (10 * this.ii);
            poker.anchorOffsetX = 55;
            poker.anchorOffsetY = 320;
            poker.x = this.pokerPos[0];
            poker.y = this.pokerPos[1];
            poker.name = "poker_" + this.ii;
            //this.addChildAt(poker,this.numChildren-1);
            this.addChild(poker);
            this.pokerData.push(poker);
            //EventManage.addEvent(this,poker,egret.TouchEvent.TOUCH_TAP,this.pokerClickHandle.bind(this,poker));
            this.count = 0;
            ++this.ii;
            if (this.ii == this.len) {
                //EnterFrameManage.remove("GamePanel.gogo");
                TimerManager.getInstance().remove("GamePanel.gogo");
            }
        }
    }
    public someonequit(r): void {
        //console.log(JSON.stringify(r));
        if (r.msg == "512") {
            TipsManage.showTips("金币不足,不能在此房间继续游戏.");
        }
        Net.send(Protocol.DDZ_QUIT_GAME, {}, this.quit.bind(this));
        //PanelManage.hall.setData();
    }
    private quit(r = null): void {
        this.dispose();
    }
    public pokerClickHandle(poker: PokerPanel): void {
        poker.setSelect();
    }
    public dispose(): void {
        MusicManage.closeMuisc();
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }
    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}