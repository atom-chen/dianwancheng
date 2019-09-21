class ActivityPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/activity/ActivitySkin.exml";
    }
    public btnTurn: eui.Image;
    public closeBtn: eui.Image;
    private itemGroup: eui.Group;
    private arr: Array<any>;
    private data: Array<any>;
    private txtContent: eui.Label;
    private closeRect: eui.Rect;
    private txtScroller: eui.Scroller;
    protected childrenCreated(): void {
        this.setTouchEnabled();
        GlobalData.isHasShowActive = true;
        EventManage.addButtonEvent(this, this.closeBtn, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnTurn, egret.TouchEvent.TOUCH_TAP, this.onpenLottery.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        this.arr = [];
        this.data = [];
        this.createItems();
    }
    private createItems(): void {
        var arr = [{ stt: "游戏更新公告", state: "", content: "gengxin" }, { stt: "开服活动", state: "hd.hot", content: "kaifu" }, { stt: "首充活动公告", state: "hd.hot", content: "shouchong" }, { stt: "月卡终身卡", state: "hd.new", content: "yueka" }, { stt: "免费金币活动", state: "", content: "free" }
            , { stt: "法律声明", state: "", content: "shengming" }];
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            var item = ObjManage.getObj("ActivityItemPanel");
            item.x = 0;
            item.y = 56 * i;
            this.itemGroup.addChild(item);
            item.setData(arr[i]);
            EventManage.addButtonEvent(this, item, egret.TouchEvent.TOUCH_TAP, this.clickItem.bind(this, item, arr[i].content));
            this.data.push(item);
            this.arr.push(item);
        }
        this.clickItem(this.arr[0], "gengxin");
    }
    private clearItems(): void {
        ObjManage.clearItems("ActivityItemPanel");
    }
    private clickItem(item, content): void {
        this.txtScroller.viewport.validateNow();
        egret.Tween.get(this.txtScroller.viewport).to({ scrollV: 0 }, 200);
        var len = this.data.length;
        for (var i = 0; i < len; i++) {
            var obj = this.data[i];
            obj.click(false);
        }
        item.click(true);
        this.txtContent.text = GlobalData.configData.huodong["" + content];
        if (content == "kaifu") {
            this.btnTurn.visible = true;
        } else {
            this.btnTurn.visible = false;
        }
    }
    private onpenLottery(): void {
        PanelManage.openLottery();
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