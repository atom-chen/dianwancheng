class SetPanel extends eui.Component implements fany.IDispose {
    constructor() {
        super();
        this.skinName = "resource/skins/set/SetPanelSkin.exml";
    }
    public btnClose: eui.Image;
    public btnOpenVoice: eui.Image;
    public btnCloseVoice: eui.Image;
    public labelAdvice: eui.EditableText;
    public btnSubmit: eui.Image;
    private txtVerson: eui.Label;
    private closeRect: eui.Rect;
    protected childrenCreated(): void {
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.btnCloseFn.bind(this));
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnOpenVoice, egret.TouchEvent.TOUCH_TAP, this.onTouchVoiceOpen.bind(this));
        EventManage.addButtonEvent(this, this.btnCloseVoice, egret.TouchEvent.TOUCH_TAP, this.onTouchVoiceClose.bind(this));
        EventManage.addButtonEvent(this, this.btnSubmit, egret.TouchEvent.TOUCH_TAP, this.onTouchSubmitAdvice.bind(this));
        EventManage.addEvent(this, this.txtVerson, egret.TouchEvent.TOUCH_TAP, this.onTouchtxtVerson.bind(this));
        this.txtVerson.text = "V:" + GlobalData.version;
        if (GlobalData.isMusic) {
            this.btnOpenVoice.visible = false;
            this.btnCloseVoice.visible = true;
        }
        else {
            this.btnOpenVoice.visible = true;
            this.btnCloseVoice.visible = false;
        }
    }
    private onTouchtxtVerson(): void {
        localStorage.clear();
    }
    private onTouchVoiceOpen(): void {
        this.btnOpenVoice.visible = false;
        this.btnCloseVoice.visible = true;
        GlobalData.isMusic = true;
        MusicManage.playBgMuisc();
    }

    private onTouchVoiceClose(): void {
        this.btnOpenVoice.visible = true;
        this.btnCloseVoice.visible = false;
        GlobalData.isMusic = false;
        MusicManage.closeBgMuisc();
        MusicManage.closeMuisc();
    }

    private onTouchSubmitAdvice(): void {
        if (this.labelAdvice.text == '') {
            TipsManage.showTips('提交的文字不能为空！')
        }
        else {
            Net.send(Protocol.HALL_SET_PROPOSAL, { proposal: this.labelAdvice.text }, this.adviceCB.bind(this));
        }
    }

    private adviceCB(msg): void {
        if (msg.code == 200) {
            TipsManage.showTips('感谢您的建议！');
        }
        else {
            TipsManage.showTips(ErrorMessage.errorMsg(msg.msg));
        }
        this.labelAdvice.text = '';
    }

    private btnCloseFn(): void {
        this.dispose();
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