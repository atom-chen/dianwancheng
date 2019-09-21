var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ChatItemPanel = (function (_super) {
    __extends(ChatItemPanel, _super);
    function ChatItemPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/skins/chat/ChatItemSkin.exml";
        return _this;
    }
    ChatItemPanel.prototype.childrenCreated = function () {
        this.setTouchEnabled();
    };
    ChatItemPanel.prototype.setData = function (r) {
        if (r.msg.name == "") {
            this.chatGroup.visible = false;
            this.txtSys.visible = true;
            this.txtSys.textFlow = (new egret.HtmlTextParser).parser(ChatManage.getInstance().transition(r.msg.msg));
        }
        else {
            this.chatGroup.visible = true;
            this.txtSys.visible = false;
            this.icon.source = r.msg.headurl;
            this.txtSay.textFlow = (new egret.HtmlTextParser).parser('<font color="#FFFF00" >V' + r.msg.vip + '</font>' + '<font color="#e938f2" >[' + r.msg.name + ']</font>' + '<font color="#e938f2" >:' + r.msg.msg + '</font>');
        }
    };
    ChatItemPanel.prototype.btnSendHandle = function () {
    };
    ChatItemPanel.prototype.dispose = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    };
    ChatItemPanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return ChatItemPanel;
}(eui.Component));
__reflect(ChatItemPanel.prototype, "ChatItemPanel", ["fany.IDispose"]);
