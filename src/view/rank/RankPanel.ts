class RankPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/rank/RankPanelSkin.exml";
    }
    private btnClose: eui.Image;
    private itemGroup: eui.Group;
    private arr: Array<any>;
    private closeRect: eui.Rect;
    private btnShu: eui.Image;
    private btnYing: eui.Image;
    private btnCaifu: eui.Image;
    protected childrenCreated(): void {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.GET_RANK_LIST, {}, this.ranklistcallback.bind(this));
        EventManage.addButtonEvent(this, this.btnCaifu, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 1));
        EventManage.addButtonEvent(this, this.btnShu, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 2));
        EventManage.addButtonEvent(this, this.btnYing, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 3));
    }
    private clickBtn(num): void {
        this.btnShu.source = "rank.btnShuan";
        this.btnYing.source = "rank.btnYingan";
        this.btnCaifu.source = "rank.btnCaifuan";
        switch (num) {
            case 1:
                this.btnCaifu.source = "rank.btnCaifu";
                Net.send(Protocol.GET_RANK_LIST, {}, this.ranklistcallback.bind(this));
                break;
            case 2:
                this.btnShu.source = "rank.btnShu";
                Net.send(Protocol.GET_RANK_LIST2, {win:"0"}, this.ranklistcallback.bind(this));
                break;
            case 3:
                this.btnYing.source = "rank.btnYing";
                Net.send(Protocol.GET_RANK_LIST2, {win:"1"}, this.ranklistcallback.bind(this));
                break;
        }
    }
    private ranklistcallback(r): void {
        if (r.code == 200) {
            this.clearItems();
            var list = r.list;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("RankItemPanel");
                item.y = i * 100;
                this.itemGroup.addChild(item);
                item.setData({ name: list[i].name, vip: list[i].vip, gold: list[i].gold, rank: i + 1, headurl: list[i].headurl });
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
                ObjManage.addObj("RankItemPanel", this.arr[i]);
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