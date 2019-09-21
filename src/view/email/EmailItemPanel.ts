
class EmailItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/email/EmailItemPanelSkin.exml";
    }
    public labName: eui.Label;
    public labDesc: eui.Label;
    public labTime: eui.Label;

    protected childrenCreated(): void {

    }

    public setData(data): void {
        this.labName.text = data.sname;
        this.labDesc.text = data.title;
        this.labTime.text = (new Date(data._id)).toLocaleString();
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