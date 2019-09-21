class RankItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/rank/RankItemPanelSkin.exml";
    }
    private txtGold: eui.Label;
    private txtName: eui.Label;
    private txtVip: eui.Label;
    private num: eui.Image;
    private head: eui.Image;
    private txtRank: eui.BitmapLabel;
    protected childrenCreated(): void {

    }
    public setData(data): void {
        this.head.source = data.headurl;
        if (data.rank > 3) {
            this.txtRank.visible = true;
            this.txtRank.text = data.rank;
            this.num.visible = false;
        } else {
            this.txtRank.visible = false;
            this.num.source = "rank.num" + data.rank;
            this.num.visible = true;
        }
        this.txtGold.text = QuickManage.moneyStr(data.gold);
        this.txtName.text = data.name;
        this.txtVip.text = "v" + data.vip;
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