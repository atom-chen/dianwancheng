class YaoQingPanel extends eui.Component implements fany.IDispose {
    private btnClose: eui.Image;
    private txtHongBao: eui.Label;
    private txtYaoNum: eui.Label;
    private btnTiXian: eui.Image;
    private erweima: eui.Image;
    private closeRect: eui.Rect;
    private tuiguang: eui.Image;
    private tuiguangGroup: eui.Group;
    constructor() {
        super();
        this.skinName = "resource/skins/yaoqing/YaoQingPanelSkin.exml";
    }
    protected childrenCreated(): void {
        this.tuiguang.source = GlobalData.cdnResUrl + "resource/assets/noload/noloading.haibao.jpg";
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        // var sprite = QuickManage.getErSp();
        // sprite.y=460;
        // sprite.x=225;
        // this.addChild(sprite);
        this.erweima.source = GlobalData.configData.data.erweimaapi + GlobalData.configData.data.erweimaurl + "?yid=" + GlobalData.account;
        Net.send(Protocol.YAO_QING, {}, this.yaoqingHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnTiXian, egret.TouchEvent.TOUCH_TAP, this.btnTiXianHandle.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.tuiguangGroup, egret.TouchEvent.TOUCH_TAP, this.tuiguangHide.bind(this));
    }
    private tuiguangHide(): void {
        this.tuiguangGroup.visible = false;
    }
    private btnTiXianHandle(): void {
        this.tuiguangGroup.visible = true;
    }
    private yaoqingHandle(r): void {
        if (r.code == 200) {
            this.txtHongBao.text = "已获得点券:" + (parseInt(r.data.backRmb + "") / 100);
            this.txtYaoNum.text = "已邀请:" + r.data.count;
        }
    }
    public updateData(data): void {
        var hongbao = parseInt(this.txtHongBao.text);
        var tixian = parseInt(data.backRmb + "") / 100;
        var nowrmb = hongbao - tixian;
        if (nowrmb < 1) {
            nowrmb = 0;
        }
        this.txtHongBao.text = "已获得点券:" + nowrmb;
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