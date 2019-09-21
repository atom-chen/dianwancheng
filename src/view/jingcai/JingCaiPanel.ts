class JingCaiPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/jingcai/JingCaiPanelSkin.exml";
    }
    private btnClose: eui.Image;
    private itemGroup: eui.Group;
    private arr: Array<any>;
    private btnJingcai: eui.Image;
    private btnWangqi: eui.Image;
    private btnJingcaitxt: eui.Image;
    private btnWangqitxt: eui.Image;
    protected childrenCreated(): void {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnJingcaitxt, egret.TouchEvent.TOUCH_TAP, this.btnJingcaiHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnWangqitxt, egret.TouchEvent.TOUCH_TAP, this.btnWangqiHandle.bind(this));
        Net.send(Protocol.GET_JINGCAI_LIST, {}, this.jingcailistcallback.bind(this));
    }
    private btnJingcaiHandle(): void {
        this.btnJingcai.visible = true;
        this.btnWangqi.visible = false;
        Net.send(Protocol.GET_JINGCAI_LIST, {}, this.jingcailistcallback.bind(this));
    }
    private btnWangqiHandle(): void {
        this.btnJingcai.visible = false;
        this.btnWangqi.visible = true;
        Net.send(Protocol.GET_JINGCAI_HISTORY_LIST, {}, this.historyCB.bind(this));
    }
    private jingcailistcallback(r): void {
        if (r.code == 200) {
            this.clearItems();
            var list = r.data.competitionlist;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("JingCaiItemPanel");
                item.y = i * 335;
                this.itemGroup.addChild(item);
                item.setData(list[i]);
                this.arr.push(item);
            }
        }
    }

    private historyCB(data): void {
        console.log(JSON.stringify(data));
        if (data.code == 200) {
            this.clearItems();
            var list = data.data;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("JingCaiItemPanel");
                item.y = i * 335;
                this.itemGroup.addChild(item);
                item.setData(list[i]);
                this.arr.push(item);
            }
        }
    }



    private clearItems(): void {
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("JingCaiItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
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