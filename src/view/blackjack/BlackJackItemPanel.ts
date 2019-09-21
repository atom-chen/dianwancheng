class BlackJackItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = 'resource/skins/blackjack/BlackJackItemSkin.exml';
    }
    private txtScore: eui.Label;
    private txtRank: eui.Label;
    private txtName: eui.Label;
    protected childrenCreated(): void {
        //EventManage.addButtonEvent(this, this.btnStart, egret.TouchEvent.TOUCH_TAP, this.onTouchStart.bind(this));
    }
    public setData(data): void {
        this.txtName.text = data.name;
        this.txtRank.text = data.rank;
        this.txtScore.text = data.toScore;
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