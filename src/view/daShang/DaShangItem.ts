class DaShangItem extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/dashang/DashangItemSkin.exml";
    }


    public btnAction: eui.Image;
    public labVip: eui.Label;
    public labName: eui.Label;
    public labInfo: eui.Label;
    public labTime: eui.Label;

    private userId: string = '';

    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnAction, egret.TouchEvent.TOUCH_TAP, this.onTouchAction.bind(this));
    }

    private onTouchAction(): void {
        // Net.send(Protocol.,{},this.onTouchActionCallback.bind(this));
        // eventdispact
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.DASHANG_NOTICE_PUBLISH, this.userId));
    }

    public setInfo(data): void {
        this.labVip.text = 'V' + data.vip;
        this.labName.text = data.name;
        this.labInfo.text = '求打赏。。。。';
        var date = new Date(data.time);
        var hour = date.getHours() + '';
        var min = date.getMinutes() + '';
        if (parseInt(min) < 10) {
            min = '0' + min;
        }
        this.labTime.text = hour + ':' + min;
        this.userId = data.id;
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