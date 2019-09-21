class TipsShowPanel extends eui.Component implements fany.IDispose {
    private txtNotice: eui.Label;
    public constructor() {
        super();
        //  指定当前类的皮肤名称
        this.skinName = "resource/skins/other/TipsShowPanelSkin.exml";
    }

    public childrenCreated() {
        this.setTouchEnabled();
        this.touchChildren = false;
        this.touchEnabled = false;

    }
    public setStr(str) {
        this.txtNotice.text = str;
    }
    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    }
    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}