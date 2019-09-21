/**
 * 滚动面板
 * @author  fany
 *
 */
class ScrollPanel extends eui.Component implements fany.IDispose {

    public constructor(ww, hh) {
        super();
        this.ww = ww;
        this.hh = hh;
    }
    private ww: number = 0;
    private hh: number = 0;
    private xx: number = 0;
    private yy: number = 0;
    private time: number = 0;
    private bgGroup: eui.Group;
    private view: eui.Component;
    protected childrenCreated(): void {
        this.setTouchEnabled();

        this.bgGroup = new eui.Group();
        this.bgGroup.width = this.ww;
        this.bgGroup.height = this.hh;
        this.addChild(this.bgGroup);
        //this.bgGroup.addChild(new YuePanel());
        EventManage.addEvent(this, this.bgGroup, egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin.bind(this));
        EventManage.addEvent(this, this.bgGroup, egret.TouchEvent.TOUCH_END, this.onTouchEend.bind(this));
        EventManage.addEvent(this, this.bgGroup, egret.TouchEvent.TOUCH_MOVE, this.onTouchMove.bind(this));
        var txt = new eui.Label("ssssssssssssssssss");
        this.bgGroup.addChild(txt)
        this.view = new YuePanel();
        this.view.touchEnabled = false;
        this.view.touchChildren = false;
        this.bgGroup.addChild(this.view);
        var mask2: egret.Shape = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawRect(0, 0, this.ww, this.hh);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.mask = mask2;
    }
    private onTouchEend(e: egret.TouchEvent) {
        var nowTime = egret.getTimer() - this.time;
        if (nowTime < 200) {
        }
        var ss = (this.hh - this.view.height);
        if (this.bgGroup.y > 0) {
            this.bgGroup.y = 0;
        }
        if (this.bgGroup.y < ss) {
            this.bgGroup.y = ss;
        }
    }

    private onTouchBegin(e: egret.TouchEvent) {
        this.yy = e.stageY + this.bgGroup.y;
        this.time = egret.getTimer();
    }

    private onTouchMove(e: egret.TouchEvent) {
        var ss = (this.hh - this.view.height);
        if (this.bgGroup.y <= 0 && (this.bgGroup.y >= ss)) {
            this.bgGroup.y = -(e.stageY - this.yy);
        }
        // else {
        //     if (this.bgGroup.y > 0) {
        //         this.bgGroup.y = 0;
        //     }
        //     if (this.bgGroup.y > ss) {
        //         this.bgGroup.y = ss;
        //     }
        // }
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
