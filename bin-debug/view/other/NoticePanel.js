var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NoticePanel = (function (_super) {
    __extends(NoticePanel, _super);
    function NoticePanel(gudingGroup) {
        var _this = _super.call(this) || this;
        _this.gudingGroup = gudingGroup;
        //this.setGuding();
        _this.createNotice();
        TimerManager.getInstance().setFrame("NoticePanel.noticeMoveHandler", _this.noticeMoveHandler.bind(_this), _this);
        return _this;
    }
    NoticePanel.prototype.gonggao = function (r) {
        if (r.msg.name != "") {
            this.noticeData.push('<font color=#00e500>[' + r.msg.name + ']:</font>' + '<font color="#ffffff" >' + r.msg.msg + '</font>');
        }
        else {
            this.noticeData.push(ChatManage.getInstance().transition(r.msg.msg, false));
        }
    };
    NoticePanel.prototype.setGuding = function () {
        this.gudingGroup = new eui.Group();
        this.gudingGroup.x = 0;
        this.gudingGroup.y = 118;
        this.addChild(this.gudingGroup);
        var bg = new eui.Image("gonggao.bgg");
        bg.touchEnabled = false;
        this.gudingGroup.addChild(bg);
        var lbl = new eui.Label();
        lbl.height = 26;
        lbl.width = 700;
        lbl.size = 22;
        lbl.textColor = GameConfig.TextColors.milkWhite;
        lbl.text = "欢迎进入游戏，全新上线欢乐小丑和老虎机，欢迎体验！";
        this.gudingGroup.addChild(lbl);
    };
    NoticePanel.prototype.noticeMoveHandler = function () {
        if (this.label_notice.x < -600) {
            this.setNotice();
            this.label_notice.x = 600;
        }
        else {
            this.label_notice.x -= 4;
        }
    };
    NoticePanel.prototype.setNotice = function () {
        var stt = "";
        if (this.noticeData.length == 0) {
            egret.Tween.get(this.bgg).to({ alpha: 0 }, 800);
            this.gudingGroup.visible = true;
            stt = "";
        }
        else {
            egret.Tween.get(this.bgg).to({ alpha: 1 }, 800);
            this.gudingGroup.visible = false;
            stt = this.noticeData.shift();
        }
        this.label_notice.textFlow = (new egret.HtmlTextParser).parser(stt);
    };
    NoticePanel.prototype.createNotice = function () {
        this.noticeData = [];
        this.bgg = new eui.Image("gonggao.bgg");
        this.bgg.touchEnabled = false;
        this.bgg.x = 0;
        this.bgg.y = 118;
        this.bgg.alpha = 0;
        this.addChild(this.bgg);
        this.label_notice = new eui.Label();
        this.label_notice.height = 26;
        this.label_notice.width = 700;
        this.label_notice.size = 22;
        this.label_notice.x = 75;
        this.label_notice.y = 124;
        this.label_notice.textColor = GameConfig.TextColors.milkWhite;
        this.label_notice.text = "";
        this.addChild(this.label_notice);
        this.label_notice.touchEnabled = false;
        this.maskNotice = new eui.Rect();
        this.maskNotice.width = 619;
        this.maskNotice.height = 28;
        this.maskNotice.x = 75;
        this.maskNotice.y = 124;
        this.addChild(this.maskNotice);
        this.label_notice.mask = this.maskNotice;
        this.maskNotice.touchEnabled = false;
    };
    NoticePanel.prototype.dispose = function () {
        TimerManager.getInstance().remove("NoticePanel.noticeMoveHandler");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
    };
    NoticePanel.prototype.setTouchEnabled = function () {
        QuickManage.setTouchEnabled(this);
    };
    return NoticePanel;
}(egret.Sprite));
__reflect(NoticePanel.prototype, "NoticePanel");
