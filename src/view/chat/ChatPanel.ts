class ChatPanel extends eui.Component implements fany.IDispose {
    private btnSend: eui.Image;
    private chatScroll: eui.Scroller;
    private chatGroup: eui.Group;
    private txtSay: eui.EditableText;
    private yy: number = 0;
    private arr: Array<any>;
    private chats: Array<any>;
    private chats2: Array<any>;
    private tt: number = 0;
    constructor() {
        super();
        this.skinName = "resource/skins/chat/ChatPanelSkin.exml";
    }
    protected childrenCreated(): void {
        this.setTouchEnabled();
        this.arr = [];
        this.chats = [];
        this.chats2 = [];
        this.tt = 0;
        EventManage.addButtonEvent(this, this.btnSend, egret.TouchEvent.TOUCH_TAP, this.btnSendHandle.bind(this));
        this.txtSay.touchEnabled = true;
        TimerManager.getInstance().setFrame("ChatPanel.gogo",this.gogo.bind(this),this,6);
        EventManage.addEvent(this,lcp.LListener.getInstance(),EventData.CHAT_GAME_RESULT,this.gameresult.bind(this));
    }
    private gameresult(): void
    { 
        var len = this.chats2.length;
        for(var i = 0;i < len; i++) {
            this.setChatItem(this.chats2[i]);
        }
        this.chats2 = [];
    }
    private gogo(): void
    {
        if(this.chats.length > 0) {
            var r = this.chats.shift();
            this.setChatItem(r);
        }
    }
    public btnSendHandle(): void {
        if (this.txtSay.text == "")
        { 
             TipsManage.showTips("不能发送空消息!");
            return;
        }    
        if (this.txtSay.text.length > 0 && this.txtSay.text.length < 20) {
            ChatManage.getInstance().send(this.txtSay.text,this.sendChatBack.bind(this));
        } else {
            TipsManage.showTips("长度超出限制,最大20个字符!");
        }
    }
    private sendChatBack(r): void {
        if (r.code != 200) {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
        this.txtSay.text = "";
    }
    public setChat(r): void {
        if(r.msg.name == "") {
            if(r.msg.msg.split(":")[0] == "1") {
                this.chats2.push(r);
                return;
            }
        }
        this.chats.push(r);
    }
    private callcb(r): void
    { 
        clearTimeout(this.tt);
        this.setChatItem(r);
    }
    public sendGameChat(str): void
    {
        this.setChatItem({ msg: { msg: "2:" + str,name: ""}});
    }
    private setChatItem(r): void {
        if(this.arr.length > 10) {
            var itemm = this.arr.shift();
            if(itemm.parent) {
                itemm.parent.removeChild(itemm);
                ObjManage.addObj("ChatItemPanel",itemm);
            }
        }
        var item = ObjManage.getObj("ChatItemPanel");
        item.setData(r);
        item.y = 2 + 40 * this.yy;
        this.chatGroup.addChild(item);
        this.arr.push(item);
        if(this.yy > 2) {
            this.chatScroll.viewport.validateNow();
            egret.Tween.get(this.chatScroll.viewport).to({ scrollV: this.chatScroll.viewport.contentHeight - this.chatScroll.viewport.height },200);
        }
        ++this.yy;
    }
    public clearItems(): void {
        this.arr = this.arr || [];
        var lenn = this.arr.length;
        for (var i = 0; i < lenn; i++) {
            if (this.arr[i]) {
                if (this.arr[i].parent) {
                    this.arr[i].parent.removeChild(this.arr[i]);
                }
                ObjManage.addObj("ChatItemPanel", this.arr[i]);
            }
        }
        this.arr = [];
    }
    public dispose(): void {
        TimerManager.getInstance().remove("ChatPanel.gogo");
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}