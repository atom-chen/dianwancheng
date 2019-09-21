var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChatPanel = (function (_super) {
    __extends(ChatPanel, _super);
    function ChatPanel() {
        var _this = _super.call(this) || this;
        _this.yy = 0;
        _this.tt = 0;
        _this.skinName = "resource/skins/chat/ChatPanelSkin.exml";
        return _this;
    }
    ChatPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
        this.arr = [];
        this.chats = [];
        this.chats2 = [];
        this.tt = 0;
        EventManage.addButtonEvent(this, this.btnSend, egret.TouchEvent.TOUCH_TAP, this.btnSendHandle.bind(this));
        this.txtSay.touchEnabled = true;
        TimerManager.getInstance().setFrame("ChatPanel.gogo", this.gogo.bind(this), this, 6);
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.CHAT_GAME_RESULT, this.gameresult.bind(this));
    };
    ChatPanel.prototype.gameresult = function () {
        var len = this.chats2.length;
        for (var i = 0; i < len; i++) {
            this.setChatItem(this.chats2[i]);
        }
        this.chats2 = [];
    };
    ChatPanel.prototype.gogo = function () {
        if (this.chats.length > 0) {
            var r = this.chats.shift();
            this.setChatItem(r);
        }
    };
    ChatPanel.prototype.btnSendHandle = function () {
        if (this.txtSay.text == "") {
            TipsManage.showTips("不能发送空消息!");
            return;
        }
        if (this.txtSay.text.length > 0 && this.txtSay.text.length < 20) {
            ChatManage.getInstance().send(this.txtSay.text, this.sendChatBack.bind(this));
        }
        else {
            TipsManage.showTips("长度超出限制,最大20个字符!");
        }
    };
    ChatPanel.prototype.sendChatBack = function (r) {
        if (r.code != 200) {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
        this.txtSay.text = "";
    };
    ChatPanel.prototype.setChat = function (r) {
        if (r.msg.name == "") {
            if (r.msg.msg.split(":")[0] == "1") {
                this.chats2.push(r);
                return;
            }
        }
        this.chats.push(r);
    };
    ChatPanel.prototype.callcb = function (r) {
        clearTimeout(this.tt);
        this.setChatItem(r);
    };
    ChatPanel.prototype.sendGameChat = function (str) {
        this.setChatItem({ msg: { msg: "2:" + str, name: "" } });
    };
    ChatPanel.prototype.setChatItem = function (r) {
        if (this.arr.length > 10) {
            var itemm = this.arr.shift();
            if (itemm.parent) {
                itemm.parent.removeChild(itemm);
                ObjManage.addObj("ChatItemPanel", itemm);
            }
        }
        var item = ObjManage.getObj("ChatItemPanel");
        item.setData(r);
        item.y = 2 + 40 * this.yy;
        this.chatGroup.addChild(item);
        this.arr.push(item);
        if (this.yy > 2) {
            this.chatScroll.viewport.validateNow();
            egret.Tween.get(this.chatScroll.viewport).to({ scrollV: this.chatScroll.viewport.contentHeight - this.chatScroll.viewport.height }, 200);
        }
        ++this.yy;
    };
    ChatPanel.prototype.clearItems = function () {
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
    };
    ChatPanel.prototype.dispose = function () {
        TimerManager.getInstance().remove("ChatPanel.gogo");
        this.clearItems();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ChatPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ChatPanel;
}(eui.Component));
__reflect(ChatPanel.prototype, "ChatPanel", ["fany.IDispose"]);
