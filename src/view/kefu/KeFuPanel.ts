class KeFuPanel extends eui.Component implements fany.IDispose {
    public constructor() {
        super();
        this.skinName = "resource/skins/kefu/KeFuSkin.exml";
    }

    public btnClose: eui.Image;
    public btnSure: eui.Image;
    private closeRect: eui.Rect;
    private txtWeixin: eui.Label;
    protected childrenCreated() {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        this.txtWeixin.text = "关注微信公众号:" + GlobalData.configData.huodong["weixin"];
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