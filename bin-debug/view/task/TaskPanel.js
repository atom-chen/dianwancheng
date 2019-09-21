var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        var _this = _super.call(this) || this;
        _this.clacTaskHasComplete = 0;
        _this.interval = 0;
        _this.coinsNum = 0;
        _this.coinArr = [];
        _this.flyIndex = 0;
        _this.skinName = "resource/skins/task/TaskPanelSkin.exml";
        return _this;
    }
    TaskPanel.prototype.childrenCreated = function () {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.onTouchClose.bind(this));
        Net.send(Protocol.HALL_TASK_LIST, {}, this.taskList.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.TASK_AFTER_COMPLETE, this.updateGold.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    };
    TaskPanel.prototype.onTouchClose = function () {
        this.dispose();
    };
    TaskPanel.prototype.taskList = function (msg) {
        this.clearItems();
        var isHaveComplete = false;
        for (var i = 0; i < msg.data.length; i++) {
            var item = ObjManage.getObj('TaskItem'); //new TaskItem();
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
            PanelManage.hall.redNotice({ type: 1 }, false);
        }
    };
    TaskPanel.prototype.clearItems = function () {
        while (this.grpContent.numChildren > 0) {
            ObjManage.addObj("TaskPanel", this.grpContent.removeChildAt(0));
        }
    };
    TaskPanel.prototype.updateGold = function (msg) {
        this.clacTaskHasComplete--;
        if (this.clacTaskHasComplete == 0) {
            PanelManage.hall.redNotice({ type: 1 }, false);
        }
        //console.log('index: ' + msg.param.index);
        this.flyIndex = msg.param.index;
        Net.send(Protocol.HALL_GET_GOLD, {}, this.flyCoins.bind(this));
    };
    TaskPanel.prototype.flyCoins = function (msg) {
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
    };
    TaskPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    TaskPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return TaskPanel;
}(eui.Component));
__reflect(TaskPanel.prototype, "TaskPanel", ["fany.IDispose"]);
