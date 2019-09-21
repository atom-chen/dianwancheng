/**
 * 旋转音乐按钮
 * @author  fany
 *
 */
class ButtonMusic extends egret.Sprite {
    private btnMusic:egret.Bitmap;
    public constructor(res = "btnMusic_png") {
        super();
        this.createMusic(res);
    }
    private createMusic(res): void {
        this.btnMusic = new egret.Bitmap();
        this.btnMusic.texture = RES.getRes(res);
        PanelManage.tipsLayer.addChild(this.btnMusic);
        EnterFrameManage.add(this.gogo.bind(this),"ButtonMusic.gogo");
        EventManage.addEvent(this,this.btnMusic,egret.TouchEvent.TOUCH_TAP,this.click);
        MusicManage.playBgMuisc(1);
        this.btnMusic.anchorOffsetX = this.btnMusic.width / 2;
        this.btnMusic.anchorOffsetY = this.btnMusic.height / 2;
        this.btnMusic.y += this.btnMusic.width / 2;
        this.btnMusic.x = this.btnMusic.height / 2;
    }
    private click(): void {
        if(EnterFrameManage.checkExist("ButtonMusic.gogo")) {
            EnterFrameManage.remove("ButtonMusic.gogo");
            MusicManage.closeBgMuisc();
        }
        else {
            EnterFrameManage.add(this.gogo.bind(this),"ButtonMusic.gogo");
            MusicManage.playBgMuisc(1);
        }
    }
    private gogo(): void {
        this.btnMusic.rotation += 2;
    }
}
