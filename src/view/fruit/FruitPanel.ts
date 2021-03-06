class FruitPanel extends eui.Component implements fany.IDispose {
    constructor(r) {
        super();
        this.skinName = "resource/skins/fruit/FruitPanelSkin.exml";
        FruitUtils.getInstance().getFruit().r = r;
        GlobalData.user.rate = parseFloat(r.data.rate + "");
        console.log("rate==" + GlobalData.user.rate);
    }
    private fruit: FruitInfo;
    private btnClose: eui.Image;
    private txtCaijin: eui.BitmapLabel;
    private btnChong: eui.Image;
    private head: eui.Image;
    private txtVip: eui.BitmapLabel;
    private txtName: eui.Label;
    private txtGold: eui.Label;
    private headmask: eui.Image;
    private txtTime: eui.BitmapLabel;
    private txtDanzhu: eui.Label;
    private btnQiehuan: eui.Image;
    private bgg: eui.Rect;
    //private btnChongfu: eui.Image;
    private tt: number = 0;
    private btnBao: eui.Image;
    private imgfa: eui.Image;
    private chat: ChatPanel;
    private isLeave: boolean = false;
    private helptips: eui.Image;
    private btnFeng: eui.Image;
    private btnJilu: eui.Image;
    protected childrenCreated(): void {
        this.setTouchEnabled();
        EventManage.addEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.leaveGame.bind(this));
        //EventManage.addEvent(this,this,egret.TouchEvent.TOUCH_TAP,this.startEffect.bind(this, 5));
        EventManage.addEvent(this, this.btnQiehuan, egret.TouchEvent.TOUCH_TAP, this.qiehuanhandle.bind(this));
        //EventManage.addButtonEvent(this, this.btnChongfu, egret.TouchEvent.TOUCH_TAP, this.btnChongfuHandle.bind(this));
        //EventManage.addButtonEvent(this, this.btnBao, egret.TouchEvent.TOUCH_TAP, this.btnBaoHandle.bind(this));
        EventManage.addButtonEvent(this, this.imgfa, egret.TouchEvent.TOUCH_TAP, this.imgfaHandle.bind(this));
        this.init();
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.OPERTE_REDBOX_COMPLETE, this.operateBoxComplete.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_MAIN, this.operateBoxComplete.bind(this));
        PanelManage.openChat(this, 112, 378, "10006");
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
        EventManage.addButtonEvent(this, this.btnChong, egret.TouchEvent.TOUCH_TAP, this.btnChongHandle.bind(this));
        MusicManage.playGameBgMuisc("fruit_bg", 0.5, -1);
        EventManage.addEvent(this, this.btnFeng, egret.TouchEvent.TOUCH_TAP, this.btnJiluHandle.bind(this));
        EventManage.addEvent(this, this.btnJilu, egret.TouchEvent.TOUCH_TAP, this.btnJiluHandle.bind(this));
    }
    private btnJiluHandle(): void {
        TipsManage.showTips("暂未开放!");
    }
    private btnChongHandle(): void {
        PanelManage.openShop(3);
    }
    private updatePayData(r): void {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
        this.txtVip.text = "VIP" + GlobalData.user.vip;
    }
    private operateBoxComplete(): void {
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
    }
    private imgfaHandle(): void {
        PanelManage.openRedBox(0, 1);
    }
    private btnBaoHandle(): void {
        //PanelManage.openBank();
    }
    private btnChongfuHandle(): void {
        if (this.fruit.xiazhuArr2.length > 0) {
            //this.btnChongfu.touchEnabled = false;
            Net.send(Protocol.FRUIT_XIA_ZHU, { bets: this.fruit.xiazhuArr2 }, this.xiazhucallback1.bind(this));
        }
    }
    private xiazhucallback1(r): void {
        if (r.code == 200) {
            var len = this.fruit.xiazhuArr2.length;
            for (var i = 0; i < len; i++) {
                this.fruit.zhuArr[(parseInt(this.fruit.xiazhuArr2[i].betId + "") - 1)] = this.fruit.zhuArr[(parseInt(this.fruit.xiazhuArr2[i].betId + "") - 1)] + parseInt(this.fruit.xiazhuArr2[i].gold + "");
                this["txtCurrent" + this.fruit.xiazhuArr2[i].betId].text = QuickManage.moneyStr(this.fruit.zhuArr[(parseInt(this.fruit.xiazhuArr2[i].betId + "") - 1)]);
                this.fruit.xiazhuArr.push(this.fruit.xiazhuArr2[i]);
            }
            this.updateGold();
        } else {
            if (r.msg == "319") {
                TipsManage.showTips("非VIP玩家下注不能超过1万!");
            } else {
                TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
            }
        }
    }
    private qiehuanhandle(): void {
        this.fruit.danzhu = "" + FruitUtils.getInstance().getDanZhu(this.fruit.danzhu);
        this.txtDanzhu.text = "单注:" + QuickManage.moneyStr(parseInt(this.fruit.danzhu));
    }
    private xiazhuHandle(num): void {
        this.helptips.visible = false;
        this.setBtnXy();
        if ((this["zhu" + num].source + "").charAt(7) == "a") {
            return;
        }
        var gold = parseInt(GlobalData.user.gold) - parseInt(this.fruit.danzhu);
        if (gold < 0) {
            TipsManage.showTips("金币不足!");
            return;
        }
        Net.send(Protocol.FRUIT_XIA_ZHU, { bets: [{ betId: "" + num, gold: this.fruit.danzhu }] }, this.xiazhucallback.bind(this, num));
    }
    private xiazhucallback(num, r): void {
        if (r.code == 200) {
            this.fruit.xiazhuArr.push({ gold: this.fruit.danzhu, betId: num });
            this.fruit.zhuArr[(num - 1)] = this.fruit.zhuArr[(num - 1)] + parseInt(this.fruit.danzhu);
            //console.log("===" + this.fruit.zhuArr[(num - 1)] + "==" + this.fruit.danzhu);
            this["txtCurrent" + num].text = QuickManage.moneyStr(this.fruit.zhuArr[(num - 1)]);
            var gold = parseInt(GlobalData.user.gold) - parseInt(this.fruit.danzhu);
            if (gold < 0) {
                gold = 0;
            }
            GlobalData.user.gold = gold + "";
            this.txtGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        } else {
            if (r.msg == "319") {
                TipsManage.showTips("非VIP玩家下注不能超过1万!");
            } else {
                TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
            }
        }
    }
    private setBtnXy(): void {
        var len = this.fruit.posArr.length;
        for (var i = 1; i < len; i++) {
            var obj = this.fruit.posArr[i];
            var view = obj.view;
            var acx = obj.acx;
            var acy = obj.acy;
            var xx = obj.xx;
            var yy = obj.yy;
            view.acx = acx;
            view.acy = acy;
            view.x = xx;
            view.y = yy;
        }
    }
    private feiqi(r): void {

    }
    private setMaxInfo(r): void {
        if (r.code == 200) {
            this["txtMaxName"].text = r.data.name;
            this["txtMaxVip"].text = "VIP" + r.data.vip;
            var stt = r.data.headurl.split("_")[0];
            if (stt == "nan" || stt == "nv") {
                stt = GlobalData.configData.data.headurl + r.data.headurl + ".png";
            }
            this["maxhead"].source = stt;
        }
    }
    private init(): void {
        Net.send(Protocol.FRUIT_GET_MAX, {}, this.setMaxInfo.bind(this));
        this.fruit = FruitUtils.getInstance().getFruit();
        for (var i = 0; i < 22; i++) {
            this.fruit.currentArr.push(this["z" + i]);
        }
        this.fruit.zhuArr = [];
        for (var i = 1; i < 9; i++) {
            this.fruit.zhuArr.push(0);
            this.fruit.posArr.push({ view: this["zhu" + i], acx: this["zhu" + i].anchorOffsetX, acy: this["zhu" + i].anchorOffsetY, xx: this["zhu" + i].x, yy: this["zhu" + i].y });
            EventManage.addButtonEvent(this, this["zhu" + i], egret.TouchEvent.TOUCH_TAP, this.xiazhuHandle.bind(this, i), "fruit_bet" + i);
        }
        this.txtVip.text = "VIP" + GlobalData.user.vip;
        this.txtGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.txtName.text = GlobalData.user.nickname;
        this.txtCaijin.text = this.fruit.r.data.caijin;

        this.head.source = GlobalData.user.headurl;
        console.log("服务端获取到的时间为:" + this.fruit.r.data.time);
        this.fruit.timett = Math.abs(parseInt(this.fruit.r.data.time)) + 3;
        if ((this.fruit.timett + "").indexOf(".") != -1 || this.fruit.timett > 20) {
            Net.send(Protocol.HALL_SET_PROPOSAL, { proposal: "请截图给管理员fruit:" + this.fruit.r.data.state + ":" + this.fruit.r.data.time }, this.feiqi.bind(this));
        }
        if (this.fruit.timett < 10) {
            this.txtTime.text = "0" + this.fruit.timett;
        } else {
            this.txtTime.text = "" + this.fruit.timett;
        }
        if (this.fruit.timett > 20) {
            this.txtTime.text = "20";
            this.fruit.timett = 20;
        }
        console.warn("当前游戏状态是===" + this.fruit.r.data.state);
        if (this.fruit.r.data.state == "3") {
            this.setBtnTouched();
            this.txtTime.text = "00";
        } else {
            clearInterval(this.fruit.tt);
            this.fruit.tt = setInterval(this.updateTime.bind(this), 1000);
        }
        this.fruit.danzhu = this.fruit.r.data.danzhu;
        this.txtDanzhu.text = "单注:" + QuickManage.moneyStr(parseInt(this.fruit.danzhu));
        this.fruit.zhiqianArr = this.fruit.r.data.recent;
        this.setZuiJin();
    }
    private setZuiJin(): void {
        var len = this.fruit.zhiqianArr.length;
        for (var i = 0; i < len; i++) {
            this["zhiqian" + i].source = "fruit." + this.fruit.zhiqianArr[i] + "d";
        }
    }
    private updateTime(): void {
        --this.fruit.timett;
        if (this.fruit.timett > 0) {
            if (this.fruit.timett < 10) {
                this.txtTime.text = "0" + this.fruit.timett;
            } else {
                this.txtTime.text = "" + this.fruit.timett;
            }
        } else {
            clearInterval(this.fruit.tt);
            this.txtTime.text = "00";
        }
    }
    public resultcome(r): void {
        clearInterval(this.fruit.tt);
        this.txtTime.text = "00";
        this.fruit.result = r;
        this.fruit.resultc = true;
        FruitUtils.getInstance().startEffect();
        TimerManager.getInstance().setFrame("FruitPanel.gogo", this.gogo.bind(this), this);
    }
    public collect(r): void {
        this.fruit.collectobj = r;
        //r.msg.caijin  max.name  max.value
    }
    public betcome(r): void {
        if (this.fruit.r) {
            if (this.fruit.r.data.state == "3") {
                this.fruit.timett = Math.abs(parseInt(r.msg.time)) + 3;
                if (this.fruit.timett < 10) {
                    this.txtTime.text = "0" + this.fruit.timett;
                } else {
                    this.txtTime.text = "" + this.fruit.timett;
                }
                this.setBtnTouched(true);
                clearInterval(this.fruit.tt);
                this.fruit.tt = setInterval(this.updateTime.bind(this), 1000);
                this.fruit.r = null;
                return;
            }
        }
        this.fruit.timett1 = Math.abs(parseInt(r.msg.time)) + 3;
        clearInterval(this.fruit.tt1);
        this.fruit.tt1 = setInterval(this.updateTime1.bind(this), 1000);
    }
    public betstop(r): void {
        console.warn("停止下注了");
        this.setBtnTouched();
        this.tt = 0;
        //MusicManage.playMuisc("music.countdown");
    }
    private updateTime1(): void {
        --this.fruit.timett1;
    }
    private setBtnTouched(flag = false): void {
        var res = "fruit.a";
        if (flag) {
            res = "fruit.l";
        }
        for (var i = 1; i < 9; i++) {
            this["zhu" + i].source = res + i;
            this["zhu" + i].touchEnabled = flag;
        }
        this.btnQiehuan.touchEnabled = flag;
    }
    private gogo() {
        FruitUtils.getInstance().manageMc(this.jiesuan.bind(this), this.pushArr.bind(this));
    }
    private jiesuan(): void {
        TimerManager.getInstance().remove("FruitPanel.gogo");
        this.fruit.tt2 = setTimeout(this.endmc.bind(this), 1000);
    }
    private updateGold(): void {
        Net.send(Protocol.FRUIT_GET_GOLD, {}, this.updateGoldSucc.bind(this));
    }
    private updateGoldSucc(r): void {
        GlobalData.user.gold = r.data.gold + "";
        console.log("同步金币返回" + GlobalData.user.gold);
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
    }
    private endmc(): void {
        clearTimeout(this.fruit.tt2);
        this.isBaocaijin();
        this.updateGold();
    }
    private isBaocaijin(): void {
        var result = this.fruit.result.msg.result + "";
        var res = "fruit." + result + "a";
        var win = "" + FruitUtils.getInstance().jiesuan(this.fruit.xiazhuArr, parseInt(result));
        var caijing = "" + QuickManage.moneyStr(parseInt(this.fruit.result.msg.gift));
        var named = this.fruit.collectobj.msg.max.name;
        var headurl = "";
        var maxGold = this.fruit.collectobj.msg.max.value;
        PanelManage.openGameResult({ res: res, win: win, caijing: caijing, max: { name: named, vip: 1, headurl: headurl, maxGold: maxGold } });
        this.next();
        if (this.fruit.zhiqianArr.length > 9) {
            this.fruit.zhiqianArr.shift();
        }
        this.fruit.zhiqianArr.push(result);
        this.setZuiJin();
    }
    private next(): void {
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.CHAT_GAME_RESULT));
        //EffectUtils.numEffect(this.txtCaijin, parseInt(this.fruit.collectobj.msg.caijin));
        this.initData();
        clearInterval(this.fruit.tt);
        this.fruit.tt = setInterval(this.updateTime.bind(this), 1000);
    }
    private initData(): void {
        Net.send(Protocol.FRUIT_GET_MAX, {}, this.setMaxInfo.bind(this));
        clearInterval(this.fruit.tt1);
        this.setBtnTouched(true);
        this.fruit.timett = this.fruit.timett1;
        // this.fruit.daojishicom = false;
        this.fruit.resultc = false;
        if (this.fruit.xiazhuArr.length > 0) {
            this.fruit.xiazhuArr2 = [];
            this.fruit.xiazhuArr2 = this.fruit.xiazhuArr;
        }
        this.fruit.xiazhuArr = [];
        this.fruit.zhuArr = [];
        for (var i = 1; i < 9; i++) {
            this["txtCurrent" + i].text = "0";
            this.fruit.zhuArr.push(0);
        }
    }
    private pushArr(i): void {
        var view = this["z" + i];
        var namea = view.source;
        view.source = namea.replace("b", "c");
    }
    private leaveGame(): void {
        if (FruitUtils.getInstance().isCanQuit()) {
            TipsManage.showTips("已经下注,不能离开!");
            return;
        }
        if (this.isLeave == false) {
            Net.send(Protocol.FRUIT_LEAVE, { cell: this.fruit.danzhu }, this.leavegamecallback.bind(this));
            this.isLeave = true;
        }
    }
    private leavegamecallback(r): void {
        if (r.code == 200) {
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UPDATE_MAIN));
            this.dispose();
        } else {
            TipsManage.showTips(JSON.stringify(r));
        }
    }
    public dispose(): void {
        clearInterval(this.fruit.tt);
        clearInterval(this.fruit.tt1);
        MusicManage.closeMuisc();
        TimerManager.getInstance().remove("FruitPanel.gogo");
        FruitUtils.getInstance().clear();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }

}