class PokerPanel extends eui.Component {
    private hui: eui.Rect;
    private flag: boolean = false;
    private poker: eui.Image;
    constructor() {
        super();
        this.skinName = "resource/skins/ddz/PokerPanelSkin.exml";
    }

    protected childrenCreated(): void {
        super.childrenCreated();
    }
    public setData(data): void {
        //console.log("牌的资源是=="+data.res)
        this.poker.source = data.res;
    }
    public getData(): any {
        return this.poker.source;
    }
    public setSelect(): void {
        //this.hui.visible = !this.hui.visible;
        MusicManage.playMuisc("s004");
        if (this.hui.visible) {
            this.hui.visible = false;
            this.y = 800;
            this.removePoker();
        } else {
            this.hui.visible = true;
            this.y = 780;
            GlobalData.curData.push(this.poker.source);
        }
    }
    private removePoker(): void {
        var len = GlobalData.curData.length;
        for (var i = 0; i < len; i++) {
            if (GlobalData.curData[i] == this.poker.source) {
                GlobalData.curData.splice(i, 1);
            }
        }
    }
    public setSelect2(): void {
        if (!this.hui.visible) {
            MusicManage.playMuisc("s004");
            this.hui.visible = true;
            this.y = 780;
            GlobalData.curData.push(this.poker.source);
        }
    }
    public setSelect3(): void {
        if (this.hui.visible) {
            MusicManage.playMuisc("s004");
            this.hui.visible = false;
            this.y = 800;
            this.removePoker();
        }
    }
    public setHui(): void {
        this.hui.visible = false;
    }
}