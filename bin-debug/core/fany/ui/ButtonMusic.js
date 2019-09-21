var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 旋转音乐按钮
 * @author  fany
 *
 */
var ButtonMusic = (function (_super) {
    __extends(ButtonMusic, _super);
    function ButtonMusic(res) {
        if (res === void 0) { res = "btnMusic_png"; }
        var _this = _super.call(this) || this;
        _this.createMusic(res);
        return _this;
    }
    ButtonMusic.prototype.createMusic = function (res) {
        this.btnMusic = new egret.Bitmap();
        this.btnMusic.texture = RES.getRes(res);
        PanelManage.tipsLayer.addChild(this.btnMusic);
        EnterFrameManage.add(this.gogo.bind(this), "ButtonMusic.gogo");
        EventManage.addEvent(this, this.btnMusic, egret.TouchEvent.TOUCH_TAP, this.click);
        MusicManage.playBgMuisc(1);
        this.btnMusic.anchorOffsetX = this.btnMusic.width / 2;
        this.btnMusic.anchorOffsetY = this.btnMusic.height / 2;
        this.btnMusic.y += this.btnMusic.width / 2;
        this.btnMusic.x = this.btnMusic.height / 2;
    };
    ButtonMusic.prototype.click = function () {
        if (EnterFrameManage.checkExist("ButtonMusic.gogo")) {
            EnterFrameManage.remove("ButtonMusic.gogo");
            MusicManage.closeBgMuisc();
        }
        else {
            EnterFrameManage.add(this.gogo.bind(this), "ButtonMusic.gogo");
            MusicManage.playBgMuisc(1);
        }
    };
    ButtonMusic.prototype.gogo = function () {
        this.btnMusic.rotation += 2;
    };
    return ButtonMusic;
}(egret.Sprite));
__reflect(ButtonMusic.prototype, "ButtonMusic");
