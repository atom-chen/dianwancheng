class DaShangPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/dashang/DashangSkin.exml";
    }
    public btnClose: eui.Image;
    public btnSend: eui.Image;
    public grpItem: eui.Group;
    public grpSecond: eui.Group;
    public btnSure: eui.Image;
    public btnCloseSecond: eui.Image;

    public grpPublish: eui.Group;
    public btnPublishSure: eui.Image;
    public btnClosePublish: eui.Image;
    public grpPublishSelect: eui.Group;
    public grpPublishInput: eui.Group;
    public labInputGold: eui.EditableText;

    private moneyArr = [100000, 200000, 1000000, 2000000, 5000000, 10000000]
    private lastSelectMoney: number = -1;
    private closeRect: eui.Rect;
    protected childrenCreated(): void {
        this.grpSecond.visible = false;
        this.grpPublish.visible = false;
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        EventManage.addButtonEvent(this, this.btnSend, egret.TouchEvent.TOUCH_TAP, this.onTouchSend.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.onTouchSure.bind(this));
        EventManage.addButtonEvent(this, this.btnCloseSecond, egret.TouchEvent.TOUCH_TAP, this.onTouchSecondClose.bind(this));

        EventManage.addButtonEvent(this, this.btnPublishSure, egret.TouchEvent.TOUCH_TAP, this.onTouchPublishSure.bind(this));
        EventManage.addButtonEvent(this, this.btnClosePublish, egret.TouchEvent.TOUCH_TAP, this.onTouchPublishClose.bind(this));

        for (var i = 0; i < 6; i++) {
            EventManage.addEvent(this, this['grpMoney' + i], egret.TouchEvent.TOUCH_TAP, this.onTouchPublishNum.bind(this, i));
        }

        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.DASHANG_NOTICE_PUBLISH, this.showPublishPanel.bind(this));
        Net.send(Protocol.HALL_REWARD_LIST, {}, this.rewardListCallBack.bind(this));
    }

    private onTouchClose(): void {
        this.dispose();
    }

    private onTouchSend(): void {
        this.grpSecond.visible = true;
    }

    private onTouchSure(): void {
        Net.send(Protocol.HALL_RELEASE_REWARD, {}, this.touchSureCallback.bind(this));
        this.grpSecond.visible = false;
    }
    private touchSureCallback(msg): void {
        if (msg.code == 200) {
            Net.send(Protocol.HALL_REWARD_LIST, {}, this.rewardListCallBack.bind(this));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }

    private sendCallback(msg): void {
        if (msg.code == 200) {
            this.grpSecond.visible = false;
        }
    }

    private onTouchSecondClose(): void {
        this.grpSecond.visible = false;
    }

    private onTouchPublishClose(): void {
        this.grpPublish.visible = false;
    }

    private publishID: string = '';
    private showPublishPanel(data): void {
        if (data.param == (GlobalData.openid + '@' + GlobalData.platform)) {
            TipsManage.showTips('不可以打赏自己！');
            return;
        }
        this.publishID = data.param;
        this.lastSelectMoney = 0;
        this['imgMoney' + this.lastSelectMoney].source = 'c.labbg1';//select
        this.grpPublish.visible = true;
        this.grpPublishInput.visible = false;
        this.grpPublishSelect.visible = true;
    }

    private showPublishInput(): void {
        this.grpPublishInput.visible = true;
        this.grpPublishSelect.visible = false;
    }

    private onTouchPublishNum(index): void {
        if (index == this.lastSelectMoney)
            return;
        this['imgMoney' + this.lastSelectMoney].source = 'c.labbg0';//--select
        // if (index == 5) {
        //     this.showPublishInput();
        //     return;
        // }
        this['imgMoney' + index].source = 'c.labbg1';//--select
        this.lastSelectMoney = index;
    }

    private onTouchPublishSure(): void {
        var gold: number = 0;
        // if (this.grpPublishInput) {
        //     gold = parseInt(this.labInputGold.text) * 10000;
        // }
        // else {
        gold = this.moneyArr[this.lastSelectMoney];
        // }
        Net.send(Protocol.HALL_GIVE_REWARD, { dsId: this.publishID, gold: gold }, this.giveRewardCallback.bind(this));
    }

    private giveRewardCallback(msg): void {
        if (msg.code == 200) {
            this.grpPublish.visible = false;
            Net.send(Protocol.HALL_REWARD_LIST, {}, this.rewardListCallBack.bind(this));
            GlobalData.user.gold = msg.gold;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }


    private rewardListCallBack(msg): void {
        this.clearItems();
        for (var i = 0; i < msg.data.length; i++) {
            if (i > 20)
                return;
            var item: DaShangItem = ObjManage.getObj('DaShangItem');
            item.x = 0;
            item.y = item.height * i;
            item.setInfo(msg.data[i]);
            this.grpItem.addChild(item);
        }
    }

    private clearItems(): void {
        while (this.grpItem.numChildren > 0) {
            ObjManage.addObj("DaShangPanel", this.grpItem.removeChildAt(0));
        }
    }

    public dispose(): void {
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