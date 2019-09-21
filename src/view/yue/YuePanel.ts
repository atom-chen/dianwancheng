class YuePanel extends eui.Component implements fany.IDispose {
    private btnClose: eui.Image;
    private yueka: eui.Image;
    private zhongshenka: eui.Image;
    private btnJiHuo: eui.Image;
    private quan1: eui.Image;
    private quan2: eui.Image;
    private txtYueStr1: eui.Label;
    private txtYueStr2: eui.Label;
    private txtZhongStr1: eui.Label;
    private txtZhongStr2: eui.Label;
    private yueisbuy: eui.Image;
    private zhongisbuy: eui.Image;
    private btnget: eui.Image;
    private txtZhongTime: eui.Label;
    private txtYueTime: eui.Label;
    private count: number = 0;
    // private yid: number = 0;
    // private zid: number = 0;
    private yueeveryday: string = "";
    private zhongeveryday: string = "";
    private yue: any;
    private zhong: any;
    private txtZhongRate: eui.Label;
    private txtYueRate: eui.Label;
    private closeRect: eui.Rect;
    constructor() {
        super();
        this.skinName = "resource/skins/yue/YueKaPanelSkin.exml";
    }
    protected childrenCreated(): void {
        this.setTouchEnabled();
        this.quan1.touchEnabled = false;
        this.quan2.touchEnabled = false;
        EventManage.addEvent(this, this.closeRect, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.dispose.bind(this));
        EventManage.addButtonEvent(this, this.zhongshenka, egret.TouchEvent.TOUCH_TAP, this.btnZhongshenHandle.bind(this));
        EventManage.addButtonEvent(this, this.yueka, egret.TouchEvent.TOUCH_TAP, this.btnYueKaHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnJiHuo, egret.TouchEvent.TOUCH_TAP, this.btnJiHuoHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnget, egret.TouchEvent.TOUCH_TAP, this.btngetHandle.bind(this));
        Net.send(Protocol.YUE_KA, {}, this.yueHandle.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
    }
    private updatePayData(r): void {
        var data = r.param;
        if (data.msg.type == 2) {
            if (data.msg.id == this.yue.id) {
                this.yueisbuy.source = "yue.yesbuy";
                this.txtYueTime.visible = true;
                this.txtYueTime.text = "剩余" + data.msg.lastDay + "天";
            } else {
                this.zhongisbuy.source = "yue.yesbuy";
                this.txtZhongTime.text = "终身";
                this.txtZhongTime.visible = true;
            }
        }
        // GlobalData.user.gold = data.msg.gold + "";
        // GlobalData.user.vip = data.msg.vip + "";
    }
    private btngetHandle(): void {
        if (this.count == 0) {
            Net.send(Protocol.GET_YUE, { shopId: this.yue.id }, this.getyueHandle.bind(this));
        } else {
            Net.send(Protocol.GET_YUE, { shopId: this.zhong.id }, this.getyueHandle.bind(this));
        }
    }
    private getyueHandle(r): void {
        if (r.code == 200) {
            if (this.count == 0) {
                GlobalData.user.gold = r.gold + "";
                TipsManage.showTips("领取成功! +" + this.yueeveryday);
            } else {
                GlobalData.user.gold = r.gold + "";
                TipsManage.showTips("领取成功! +" + this.zhongeveryday);
            }
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private yueHandle(r): void {
        if (r.code == 200) {
            this.txtYueTime.visible = true;
            this.txtZhongTime.visible = true;
            if (r.list[0].name == "月卡") {
                this.yue = r.list[0];
                this.zhong = r.list[1];
            } else {
                this.yue = r.list[1];
                this.zhong = r.list[0];
            }
            this.yueeveryday = QuickManage.moneyStr(parseInt(this.yue.everyDay + ""));
            this.zhongeveryday = QuickManage.moneyStr(parseInt(this.zhong.everyDay + ""));
            this.txtYueStr1.text = "每日领取" + this.yueeveryday;
            this.txtYueStr2.text = "充值立送" + QuickManage.moneyStr(parseInt(this.yue.gold + ""));
            this.txtZhongStr1.text = "每日领取" + this.zhongeveryday;
            this.txtZhongStr2.text = "充值立送" + QuickManage.moneyStr(parseInt(this.zhong.gold + ""));
            this.txtYueRate.text = "系统手续费减少到" + (parseFloat(this.yue.rate) * 100) + "%";
            this.txtZhongRate.text = "系统手续费减少到" + (parseFloat(this.zhong.rate) * 100) + "%";
            if (this.yue.state == "0") {
                this.yueisbuy.source = "yue.nobuy";
                this.txtYueTime.visible = false;
            } else if (this.yue.state == "1") {
                this.yueisbuy.source = "yue.yesbuy";
                this.txtYueTime.text = "剩余" + this.yue.lastDay + "天";
            } else {
                this.yueisbuy.source = "yue.yilingqu";
                this.txtYueTime.text = "剩余" + this.yue.lastDay + "天";
            }
            if (this.zhong.state == "0") {
                this.zhongisbuy.source = "yue.nobuy";
                this.txtZhongTime.visible = false;
            } else if (this.yue.state == "1") {
                this.zhongisbuy.source = "yue.yesbuy";
                this.txtZhongTime.text = "终身";
            } else {
                this.zhongisbuy.source = "yue.yilingqu";
                this.txtZhongTime.text = "终身";
            }
        }
    }
    public btnJiHuoHandle(): void {
        if (this.count == 1) {
            PayManage.getInstance().pay(this.zhong.id, "终身卡", this.zhong.rmb);
        } else {
            PayManage.getInstance().pay(this.yue.id, "月卡", this.yue.rmb);
        }
    }
    public btnZhongshenHandle(): void {
        this.count = 1;
        this.quan1.visible = false;
        this.quan2.visible = true;
    }
    public btnYueKaHandle(): void {
        this.count = 0;
        this.quan2.visible = false;
        this.quan1.visible = true;
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