// TypeScript file
class ClownHelpPanel extends eui.Component {
    constructor() {
        super();
        this.skinName = 'resource/skins/clown/ClownHelpSkin.exml';
    }
    public btnClose: eui.Image;
    protected childrenCreated(): void {
        EventManage.addEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
    }
    public dispose(): void {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }
}