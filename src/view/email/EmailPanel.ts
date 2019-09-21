class EmailPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/email/EmailPanelSkin.exml";
    }
    public btnClose: eui.Image;
    public itemGroup: eui.Group;
    public labTips: eui.Label;

    private arr: Array<any>;
    private closeRect: eui.Rect;
    protected childrenCreated(): void {
        this.arr = [];
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        //EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onTouchVip.bind(this));
        Net.send(Protocol.GET_MAIL_LIST, {}, this.maillistcallback.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        // this.maillistcallback(null);
    }
    private maillistcallback(r): void {
        if (r.code == 200) {
            this.clearItems();
            var mail = r.mails;
            var len = mail.length;
            if (len > 0) {
                this.labTips.visible = false;
            }
            else {
                this.labTips.visible = true;
            }
            for (var i = 0; i < len; i++) {
                var item = ObjManage.getObj("EmailItemPanel");
                item.y = i * 111;
                this.itemGroup.addChild(item);
                item.setData(mail[i]);
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
                ObjManage.addObj("EmailItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    }

    private onTouchVip(): void {
        PanelManage.openVip();
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