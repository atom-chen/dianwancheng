class VipPanel extends eui.Component implements fany.IDispose {
    public constructor() {
        super();
        this.skinName = "resource/skins/vip/VipSkin.exml";
    }

    public btnClose: eui.Image;
    public labVip: eui.Label;
    public grpContent: eui.Group;
    public imgBar: eui.Image;
    public btnVip: eui.Image;
    public labLoading: eui.Label;
    private closeRect: eui.Rect;
    protected childrenCreated() {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnVip, egret.TouchEvent.TOUCH_TAP, this.onTouchVipUp.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        Net.send(Protocol.GET_VIPS, {}, this.vipInfo.bind(this));
    }

    private vipInfo(msg): void {
        if (msg.code == 200) {
            var data = msg.data;
            var vip = data.vip;
            this.labVip.text = 'VIP ' + vip;
            this.clearItems();
            for (var i = 0; i < 15; i++) {
                var item: VipItem = ObjManage.getObj('VipItem');
                item.x = -5;
                item.y = i * item.height;
                item.setVipMoney(data.vips[i]);
                this.grpContent.addChild(item);
            }
            if (vip == 15) {
                this.labLoading.text = (data.totalMoney / 100) + '/' + (data.vips[14].money / 100);
                this.imgBar.width = 400;
            }
            else {
                this.labLoading.text = (data.totalMoney / 100) + '/' + (data.vips[vip].money / 100);
                this.imgBar.width = 400 * (data.totalMoney / data.vips[vip].money);
            }
        }
    }

    private clearItems(): void {
        var len = this.grpContent.numChildren;
        for (var i = 0; i < len; i++) {
            ObjManage.addObj("VipItem", this.grpContent.removeChildAt(i));
        }
    }
    private onTouchVipUp(): void {
        //console.log('vip');
        this.dispose();
        PanelManage.openShop();
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