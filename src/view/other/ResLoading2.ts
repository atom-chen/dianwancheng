
/**
 * 进入前加载
 */
class ResLoading2 extends eui.Component implements fany.IDispose {
    private txtStr: eui.Label;
    private param: any;
    private txtTips: eui.BitmapLabel;
    private btnClose: eui.Label;
    public constructor(obj) {
        super();
        this.skinName = "resource/skins/other/ResLoadingPanelSkin.exml";
        this.param = obj;
    }
    private zhuan: eui.Image;
    public childrenCreated(): void {
        this.setTouchEnabled();
        this.txtStr.text = "正在加载界面资源...";
        this.zhuan.anchorOffsetX = 25;
        this.zhuan.anchorOffsetY = 25;
        //EnterFrameManage.add(this.gogo.bind(this), "ResLoading.gogo");
        TimerManager.getInstance().setFrame("ResLoading.gogo", this.gogo.bind(this), this);
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UI_LOADING_COM, this.dispose.bind(this));
        EventManage.addEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose2.bind(this));
    }
    public setProgress(current, total): void {
        this.txtTips.text = Math.floor((current / total) * 100) + "%";
    }
    public gogo(): void {
        this.zhuan.rotation += 8;
    }
    public dispose2(): void {
        this.visible = false;
    }
    public dispose(): void {
        TimerManager.getInstance().remove("ResLoading.gogo");
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
        this.removeChildren();
        PanelManage.resloading2 = null;
    }
    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }
}
