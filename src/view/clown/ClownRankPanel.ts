class ClownRankPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/clown/ClownRankSkin.exml";
    }
    private btnClose: eui.Image;
    private itemGroup: eui.Group;
    private arr: Array<any>;
    private closeRect: eui.Rect;
    private btnToday: eui.Image;
    private btnWeek: eui.Image;
    protected childrenCreated(): void {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.CLOWN_RANK_DAY, {}, this.ranklistcallback.bind(this));
        EventManage.addEvent(this, this.btnToday, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 1));
        EventManage.addEvent(this, this.btnWeek, egret.TouchEvent.TOUCH_TAP, this.clickBtn.bind(this, 2));
    }
    private clickBtn(num): void {
        if (this.btnToday.source == "clown_king_daily" && num == 1) {
            return;
        }
        if (this.btnWeek.source == "clown_king_week" && num == 2) {
            return;
        }
        switch (num) {
            case 1:
                this.btnToday.source = "clown_king_daily";
                this.btnWeek.source = "clown_king_week_s";
                Net.send(Protocol.CLOWN_RANK_DAY, {}, this.ranklistcallback.bind(this));
                break;
            case 2:
                this.btnToday.source = "clown_king_daily_s";
                this.btnWeek.source = "clown_king_week";
                Net.send(Protocol.CLOWN_RANK_WEEK, {}, this.ranklistcallback.bind(this));
                break;
        }
    }
    private ranklistcallback(r): void {
        if (r.code == 200) {
            this.clearItems();
            var list = r.list;
            var len = list.length;
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("ClownRankItemPanel");
                item.y = i * 100;
                this.itemGroup.addChild(item);
                item.setData({ name: list[i].name, vip: list[i].vip, gold: list[i].win, rank: i + 1, headurl: list[i].headurl });
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
                ObjManage.addObj("ClownRankItemPanel", this.arr[i]);
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