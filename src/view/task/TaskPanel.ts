class TaskPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/task/TaskPanelSkin.exml";
    }
    public btnClose: eui.Image;
    public grpContent: eui.Group;
    private clacTaskHasComplete: number = 0;
    private closeRect: eui.Rect;
    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        Net.send(Protocol.HALL_TASK_LIST, {}, this.taskList.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.TASK_AFTER_COMPLETE, this.updateGold.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    }

    private onTouchClose(): void {
        this.dispose();
    }

    private taskList(msg): void {
        this.clearItems();
        var isHaveComplete: boolean = false;
        for (var i = 0; i < msg.data.length; i++) {
            var item: TaskItem = ObjManage.getObj('TaskItem');//new TaskItem();
            item.x = 0;
            item.y = i * item.height;
            item.setInfo(msg.data[i], i);
            if (msg.data[i].status == 1) {
                isHaveComplete = true;
                this.clacTaskHasComplete++;
            }
            this.grpContent.addChild(item);
        }
        if (!isHaveComplete) {
            PanelManage.hall.redNotice({ type: 1 }, false)
        }
    }
    private clearItems(): void {
        while (this.grpContent.numChildren > 0) {
            ObjManage.addObj("TaskPanel", this.grpContent.removeChildAt(0));
        }
    }

    private interval: number = 0;
    private coinsNum: number = 0;
    private coinArr = [];
    private flyIndex: number = 0;
    private updateGold(msg): void {
        this.clacTaskHasComplete--;
        if (this.clacTaskHasComplete == 0) {
            PanelManage.hall.redNotice({ type: 1 }, false);
        }
        //console.log('index: ' + msg.param.index);
        this.flyIndex = msg.param.index;
        Net.send(Protocol.HALL_GET_GOLD, {}, this.flyCoins.bind(this));
    }
    private flyCoins(msg): void {
        if (msg.code == 200) {
            GlobalData.user.gold = msg.data.gold;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
            var xx = 300;
            var yy = 275 + this.grpContent.getChildAt(this.flyIndex).y - Math.round(this.grpContent.scrollV);
            EffectUtils.coinsFly(this, xx, yy);
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
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
}