class ChatItemPanel extends eui.Component implements fany.IDispose {
    private icon: eui.Image;
    private txtVip: eui.Label;
    private txtSay: eui.Label;
    private chatGroup: eui.Group;
    private txtSys: eui.Label;
    constructor() {
        super();
        this.skinName = "resource/skins/chat/ChatItemSkin.exml";
    }
    protected childrenCreated(): void {
        this.setTouchEnabled();
    }
    public setData(r): void {
        if (r.msg.name == "") {
            this.chatGroup.visible = false;
            this.txtSys.visible = true;
            this.txtSys.textFlow = (new egret.HtmlTextParser).parser(ChatManage.getInstance().transition(r.msg.msg));
        } else {
            this.chatGroup.visible = true;
            this.txtSys.visible = false;
            this.icon.source = r.msg.headurl;
            this.txtSay.textFlow = (new egret.HtmlTextParser).parser('<font color="#FFFF00" >V' + r.msg.vip + '</font>' + '<font color="#e938f2" >[' + r.msg.name + ']</font>' + '<font color="#e938f2" >:' + r.msg.msg + '</font>');
        }
    }
    public btnSendHandle(): void {

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