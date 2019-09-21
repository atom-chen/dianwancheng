class ServerErrorPanel extends eui.Component implements fany.IDispose
{
    public txtNotice: eui.Label;
    private btnSure: eui.Button;
    public notice: string;
    public constructor(str)
    {
        super();
        //  指定当前类的皮肤名称
        this.skinName = "resource/skins/other/ServerErrorPanelSkin.exml";
        this.notice = str;
    }

    public childrenCreated(){ 
        egret.Tween.removeAllTweens();
        this.setTouchEnabled();
        this.txtNotice.text = this.notice;
        EventManage.addEvent(this,this,egret.TouchEvent.TOUCH_TAP,this.btnSureHandle.bind(this));
    }
    public btnSureHandle(): void
    {
        this.dispose();
        window.location.reload();
    }
    public dispose(): void
    {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    }
    public setTouchEnabled(): void
    {
        QuickManage.setTouchEnabled(this);
    }
}