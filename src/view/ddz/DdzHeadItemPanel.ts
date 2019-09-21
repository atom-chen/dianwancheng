class DdzHeadItemPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/ddz/DdzHeadItemSkin.exml";
    }
    private txtName: eui.Label;
    private txtGold: eui.Label;
    private head: eui.Image;
    private dizhu: eui.Image;
    private txtPokerNum: eui.Label;
    private timerGroup: eui.Group;
    private imgBuchu: eui.Image;
    protected childrenCreated(): void {
        this.setTouchEnabled();
        var mask2: egret.Shape = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(52, 86, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.head.mask = mask2;
    }
    public setData(data): void {
        this.txtName.text = data.name;
        this.txtGold.text = data.gold;
        this.head.source = data.head;
        //this.dizhu.visible = data.dizhu;
        this.txtPokerNum.text = data.pokernum;
        //this.timerGroup.visible=false;
        //this.imgBuchu.visible = false;
    }
    public setPokerNum(num): void {
        this.txtPokerNum.text = num + "";
    }
    public setDizhu(flag = true): void {
        this.dizhu.visible = flag;
    }
    public setGold(gold): void {
        var num = QuickManage.moneyStr2number(this.txtGold.text) + gold;
        this.txtGold.text = QuickManage.moneyStr(num);
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