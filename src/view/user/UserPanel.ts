class UserPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/user/UserSkin.exml";
    }
    public btnClose: eui.Image;
    public btnSure: eui.Image;
    public txtUserName: eui.EditableText;
    private selectImg: string = "";
    private nan_1: eui.Image;
    private nan_2: eui.Image;
    private nan_3: eui.Image;
    private nan_4: eui.Image;
    private nv_1: eui.Image;
    private nv_2: eui.Image;
    private nv_3: eui.Image;
    private nv_4: eui.Image;
    private sex: string = "";
    private closeRect: eui.Rect;
    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnSure, egret.TouchEvent.TOUCH_TAP, this.btnSureHandle.bind(this));
        for (var i = 1; i < 5; i++) {
            EventManage.addButtonEvent(this, this["nan_" + i], egret.TouchEvent.TOUCH_TAP, this.imgClick.bind(this, "nan_" + i));
            EventManage.addButtonEvent(this, this["nv_" + i], egret.TouchEvent.TOUCH_TAP, this.imgClick.bind(this, "nv_" + i));
            this["nan_" + i].source = GlobalData.configData.data.headurl + "nan_" + i + ".png";
            this["nv_" + i].source = GlobalData.configData.data.headurl + "nv_" + i + ".png";
        }
    }
    private imgClick(stt): void {
        for (var i = 1; i < 5; i++) {
            this["nan_" + i].scaleX = 1;
            this["nan_" + i].scaleY = 1;
            this["nv_" + i].scaleX = 1;
            this["nv_" + i].scaleY = 1;
        }
        this[stt].scaleX = 1.1;
        this[stt].scaleY = 1.1;
        this.selectImg = stt;
        if (stt.split("_")[0] == "nan") {
            this.sex = "1";
        } else {
            this.sex = "2";
        }
    }
    private btnSureHandle(): void {
        if (this.txtUserName.text == "") {
            TipsManage.showTips("昵称不能为空!");
            return;
        }
        if (this.txtUserName.text.length > 6) {
            TipsManage.showTips("昵称太长!");
            return;
        }
        if (this.selectImg == "") {
            TipsManage.showTips("请选择一个头像!");
            return;
        }
        Net.send(Protocol.UPDATE_NAME, { sex: this.sex, name: this.txtUserName.text, headurl: this.selectImg }, this.updateCallBack.bind(this));
    }
    private updateCallBack(r): void {
        if (r.code == 200) {
            TipsManage.showTips("修改成功!");
            GlobalData.user.nickname = this.txtUserName.text;
            GlobalData.user.sex = this.sex;
            GlobalData.user.headurl = GlobalData.configData.data.headurl + this.selectImg + ".png";
            PanelManage.hall.updateHeadurl();
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
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