class TeHuiPanel extends eui.Component implements fany.IDispose {
    private bg: eui.Image;
    constructor() {
        super();
        this.skinName = "resource/skins/tehui/TeHuiPanelSkin.exml";
    }
    protected childrenCreated(): void {
        this.bg.source = GlobalData.cdnResUrl + "resource/assets/noload/noload.tehui.jpg";
        EventManage.addButtonEvent(this, this, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    }
    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        PanelManage.openShop();
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}