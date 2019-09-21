class PkPanel extends eui.Component implements fany.IDispose {
    constructor(r) {
        super();
        this.skinName = 'resource/skins/pk/PkSkin.exml';
    }

    private r: any = null;

    public grpEnter: eui.Group;
    public btnCreate: eui.Image;
    public btnJoin: eui.Image;
    public editMoney: eui.EditableText;
    public editPwd: eui.EditableText;
    public editRoom: eui.EditableText;
    public editPwdJoin: eui.EditableText;


    public grpGame: eui.Group;
    public btnType0: eui.Image;
    public btnType1: eui.Image;
    public btnType2: eui.Image;
    public labMoney: eui.Label;
    public labRoom: eui.Label;

    public grpOver: eui.Group;
    public labOverTitle: eui.Label;
    public btnSure: eui.Image;
    public btnClose: eui.Image;

    public labOtherName: eui.Label;
    public otherHead: eui.Image;
    public labPwd: eui.Label;

    private isCanTouch: boolean = true;
    private curMoney;
    private intVal: number = -1;
    private isJoin: boolean = false;

    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnType0, egret.TouchEvent.TOUCH_TAP, this.onTouchType.bind(this, 0));
        EventManage.addButtonEvent(this, this.btnType1, egret.TouchEvent.TOUCH_TAP, this.onTouchType.bind(this, 1));
        EventManage.addButtonEvent(this, this.btnType2, egret.TouchEvent.TOUCH_TAP, this.onTouchType.bind(this, 2));

        EventManage.addButtonEvent(this, this.btnJoin, egret.TouchEvent.TOUCH_TAP, this.onTouchJoin.bind(this));
        EventManage.addButtonEvent(this, this.btnCreate, egret.TouchEvent.TOUCH_TAP, this.onTouchCreate.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.overToEnter.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.exit.bind(this));
        this.initEnter();
    }

    private onTouchType(index): void {
        if (this.isCanTouch) {
            Net.send(Protocol.PK_SETHAND, { type: index }, this.typeCallback.bind(this));
            this.isCanTouch = false;
        }
    }

    private typeCallback(msg): void {
        if (msg.code == 200) {
            this.btnType0.visible = false;
            this.btnType1.visible = false;
            this.btnType2.visible = false;
            TipsManage.showTips('请等待对方出拳！');
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
        this.isCanTouch = true;
    }

    private onTouchJoin(): void {
        var room = this.editRoom.text;
        if (room == '') {
            TipsManage.showTips('抱歉，房间号不能为空！');
            return;
        }
        var pwd = this.editPwdJoin.text;
        if (pwd == '') {
            TipsManage.showTips('抱歉，密码不能为空！');
            return;
        }
        Net.send(Protocol.PK_JOIN, { room: room, password: pwd }, this.joinCallback.bind(this));
    }

    private joinCallback(msg): void {
        if (msg.code == 200) {
            this.isJoin = true;
            this.initGameOther(msg.data);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }

    }
    private onTouchCreate(): void {
        var money = this.editMoney.text;
        if (money == '') {
            TipsManage.showTips('抱歉，金额不能为空！');
            return;
        }
        var pwd = this.editPwd.text;
        if (pwd == '') {
            TipsManage.showTips('抱歉，密码不能为空！');
            return;
        }
        Net.send(Protocol.PK_CREATE, { money: parseInt(money) * 10000, password: pwd }, this.createCallback.bind(this));
    }

    private createCallback(msg): void {
        if (msg.code == 200) {
            this.isJoin = false;
            this.initGame(msg.data);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }

    private initEnter(): void {
        this.grpEnter.visible = true;
        this.grpGame.visible = false;
        this.grpOver.visible = false;

        this.editMoney.text = '';
        this.editPwd.text = '';

        this.editRoom.text = '';
        this.editPwdJoin.text = '';

        this.labPwd.text = '';
    }

    private initGame(data): void {
        this.btnType0.visible = true;
        this.btnType1.visible = true;
        this.btnType2.visible = true;
        this.grpEnter.visible = false;
        this.grpGame.visible = true;
        this.grpOver.visible = false;
        this.otherHead.source = '';

        this.labOtherName.text = '';
        this.labMoney.text = '金额： ' + QuickManage.moneyStr(data.money);
        this.curMoney = data.money;
        this.labRoom.text = '房间号：' + data.room;
        this.labPwd.text = '密码：' + data.password;
        this.setOtherReslut(-1);
        this.setSelfReslut(-1);
    }

    private initGameOther(data): void {
        this.btnType0.visible = true;
        this.btnType1.visible = true;
        this.btnType2.visible = true;
        this.grpEnter.visible = false;
        this.grpGame.visible = true;
        this.grpOver.visible = false;
        this.otherHead.source = '';

        this.labOtherName.text = '';
        this.labMoney.text = '金额： ' + QuickManage.moneyStr(data.money);
        this.curMoney = data.money;
        this.labRoom.text = '';
        this.labPwd.text = '';
        this.setOtherReslut(-1);
        this.setSelfReslut(-1);
    }

    public messageOn(msg): void {
        switch (msg.msg.type) {
            case 1:	//join
                this.setOtherPeople(msg.msg.data);
                break;
            case 2:	//result
                this.setResult(msg.msg);
                break;
            case 3:	//leave
                this.setOtherLeave(msg.msg);
                break;
        }
    }

    private setOtherLeave(data): void {
        // data.account;
        // data.name;
        this.labOtherName.text = '';
        this.otherHead.source = '';
    }

    private setResult(data): void {
        if (this.isJoin) {
            this.setJoinResult(data);
        }
        else {
            this.setCreateResult(data);
        }
        this.intVal = setInterval(this.setOver.bind(this), 4000);
    }

    private setJoinResult(data): void {
        this.setSelfReslut(data.hands[1]);
        this.setOtherReslut(data.hands[0]);
        if (data.result == 1) {			//slef win;
            this.labOverTitle.text = '恭喜 您' + '赢了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) + parseInt(this.curMoney) + '';

        }
        else if (data.result == 0) {			//other win;
            this.labOverTitle.text = '非常遗憾 您' + '输了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) - parseInt(this.curMoney) + '';
        }
        else {		//pingju 
            this.labOverTitle.text = '平局';
        }
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
    }

    private setCreateResult(data): void {
        this.setSelfReslut(data.hands[0]);
        this.setOtherReslut(data.hands[1]);
        if (data.result == 0) {			//slef win;
            this.labOverTitle.text = '恭喜 您' + '赢了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) + parseInt(this.curMoney) + '';
        }
        else if (data.result == 1) {			//other win;
            this.labOverTitle.text = '非常遗憾 您' + '输了' + QuickManage.moneyStr(this.curMoney);
            GlobalData.user.gold = parseInt(GlobalData.user.gold) - parseInt(this.curMoney) + '';
        }
        else {		//pingju 
            this.labOverTitle.text = '平局';
        }
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
    }



    private setOver(): void {
        clearInterval(this.intVal);
        this.grpEnter.visible = false;
        this.grpGame.visible = false;
        this.grpOver.visible = true;
        // this.labOverTitle.text = '恭喜/非常遗憾 您' + '赢/输' + '了' + 'xxxxxxx 万';
    }

    private setSelfReslut(type): void {
        for (var i = 0; i < 3; i++) {
            if (type == i) {
                this['resultSelf' + i].visible = true;;
            }
            else {
                this['resultSelf' + i].visible = false;
            }
        }
    }

    private setOtherReslut(type): void {
        for (var i = 0; i < 3; i++) {
            if (type == i) {
                this['resultOther' + i].visible = true;;
            }
            else {
                this['resultOther' + i].visible = false;
            }
        }
    }

    private setOtherPeople(data): void {
        // var data = msg.msg.data;
        if (data.lenght == 1) {
            this.labOtherName.text = '';
            this.otherHead.source = '';
            return;
        }
        for (var i = 0; i < data.length; i++) {
            var user = data[i];
            if (GlobalData.user.nickname == user.name) {

            }
            else {
                this.labOtherName.text = user.name;
                this.otherHead.source = user.headurl;
                this.otherHead.width = this.otherHead.height = 74;
            }
        }
    }

    private overToEnter(): void {
        this.initEnter();
    }

    private exit(): void {
        Net.send(Protocol.PK_LEAVE, {}, this.exitCallback.bind(this));
    }

    private exitCallback(msg): void {
        if (msg.code == 200) {
            this.dispose();
        }
    }

    public dispose(): void {
        this.removeChildren();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}