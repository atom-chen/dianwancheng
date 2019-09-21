var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskItem = (function (_super) {
    __extends(TaskItem, _super);
    function TaskItem() {
        var _this = _super.call(this) || this;
        _this.taskId = 0;
        _this.curType = 0; //已完成，未完成，领奖，不可领奖
        _this.index = 0;
        _this.isTouchBtn = false;
        _this.skinName = "resource/skins/task/taskItemSkin.exml";
        return _this;
    }
    TaskItem.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnTouch, egret.TouchEvent.TOUCH_TAP, this.onTouchBtn.bind(this));
    };
    TaskItem.prototype.onTouchBtn = function () {
        if (!this.isTouchBtn) {
            this.isTouchBtn = true;
            Net.send(Protocol.HALL_TASK_GET, { taskId: this.taskId }, this.onTouchBtnCallback.bind(this));
        }
    };
    TaskItem.prototype.onTouchBtnCallback = function (msg) {
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
    };
    TaskItem.prototype.setInfo = function (data, index) {
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
    };
    TaskItem.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    TaskItem.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return TaskItem;
}(eui.Component));
__reflect(TaskItem.prototype, "TaskItem", ["fany.IDispose"]);
