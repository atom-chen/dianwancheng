class TaskItem extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/task/taskItemSkin.exml";
    }
    public btnTouch: eui.Image;
    public imgLoad: eui.Image;
    public labName: eui.Label;
    public labInfo: eui.Label;
    public labLoad: eui.Label;
    public labGold: eui.Label;
    public imgSign: eui.Image;

    private labGoldDouble: eui.Label;

    private taskId: number = 0;
    private curType: number = 0; //已完成，未完成，领奖，不可领奖
    private index: number = 0;

    private isTouchBtn: boolean = false;
    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnTouch, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn.bind(this));
    }

    private onTouchBtn(): void {
        if (!this.isTouchBtn) {
            this.isTouchBtn = true;
            Net.send(Protocol.HALL_TASK_GET, { taskId: this.taskId }, this.onTouchBtnCallback.bind(this));
        }
    }

    private onTouchBtnCallback(msg): void {
        this.isTouchBtn = false;
        if (msg.code == 200) {
            this.btnTouch.visible = false;
            this.imgSign.visible = true;
            this.imgSign.source = 'task.complete';
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.TASK_AFTER_COMPLETE, { index: this.index }));
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
    }

    public setInfo(data, index): void {
        this.index = index;
        this.taskId = data._id;
        this.imgLoad.width = 220 * (data.cur / data.max);
        this.labLoad.text = data.cur + '/' + data.max;
        this.labName.text = data.title;
        this.labInfo.text = data.desc;
        this.labGold.text = QuickManage.moneyStr(data.num);
        //0 未完成 1 完成   2已领取
        if (data.status == 0) {
            this.btnTouch.visible = false;
            this.imgSign.visible = true;
            this.imgSign.source = 'task.nocomplete';
        }
        else if (data.status == 1) {
            this.btnTouch.visible = true;
            this.imgSign.visible = false;
        }
        else if (data.status == 2) {
            this.btnTouch.visible = false;
            this.imgSign.visible = true;
            this.imgSign.source = 'task.complete';
        }
        if (data.withVip == 0) {
            this.labGoldDouble.visible = false;
        }
        else if (data.withVip == 1) {
            this.labGoldDouble.visible = true;
            this.labGoldDouble.text = 'x' + (parseInt(GlobalData.user.vip) + 1);
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