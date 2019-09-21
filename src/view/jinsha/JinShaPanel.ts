class JinShaPanel extends eui.Component implements fany.IDispose {
    constructor(r) {
        super();
        this.skinName = "resource/skins/jinsha/JinShaPanelSkin.exml";
        JinShaUtils.getInstance().getJinSha().r = r;
        GlobalData.user.rate = parseFloat(r.data.rate + "");
        console.log("rate==" + GlobalData.user.rate);
    }
    private jinsha: JinShaInfo;
    private btnClose: eui.Image;
    private txtCaijin: eui.BitmapLabel;
    private btnChong: eui.Image;
    private head: eui.Image;
    private txtVip: eui.BitmapLabel;
    private txtName: eui.Label;
    private txtGold: eui.Label;
    private headzhuang: eui.Image;
    private txtNameZhuang: eui.Label;
    private txtGoldZhuang: eui.BitmapLabel;
    private headmask: eui.Image;
    private maskheadzhuang: eui.Image;
    private txtTime: eui.BitmapLabel;
    private txtDanzhu: eui.Label;
    private txtFenPanNum: eui.Image;
    private imgend: eui.Image;
    private txtWinGold: eui.BitmapLabel;
    private txtTotalGold: eui.BitmapLabel;
    private btnQiehuan: eui.Image;
    private btnShang: eui.Image;
    private txtPaizhuangNum: eui.Label;
    private txtPaizhuang: eui.Label;
    private zhuangbg: eui.Image;
    private zhuangScroll: eui.Scroller;
    private zhuangGroup: eui.Group;
    private baozhuang: eui.Image;
    private baocaijin: eui.Group;
    private txtShengYuNum: eui.Label;
    private xiala: eui.Image;
    private bgg: eui.Rect;
    private txtZhuangVip: eui.BitmapLabel;
    private btnChongfu: eui.Image;
    private tt: number = 0;
    private btnBao: eui.Image;
    private imgfa: eui.Image;
    private chat: ChatPanel;
    private txtCaiJin2: eui.Label;
    private guang: eui.Image;
    private isLeave: boolean = false;
    private helptips:eui.Image;
    protected childrenCreated(): void {
        this.setTouchEnabled();
        EventManage.addEvent(this, this.btnClose, egret.TouchEvent.TOUCH_TAP, this.leaveGame.bind(this));
        //EventManage.addEvent(this,this,egret.TouchEvent.TOUCH_TAP,this.startEffect.bind(this, 5));
        EventManage.addEvent(this, this.btnQiehuan, egret.TouchEvent.TOUCH_TAP, this.qiehuanhandle.bind(this));
        EventManage.addButtonEvent(this, this.btnShang, egret.TouchEvent.TOUCH_TAP, this.btnShanghandle.bind(this));
        EventManage.addEvent(this, this.zhuangbg, egret.TouchEvent.TOUCH_TAP, this.getZhuangListhandle.bind(this));
        EventManage.addEvent(this, this.xiala, egret.TouchEvent.TOUCH_TAP, this.getZhuangListhandle.bind(this));
        EventManage.addEvent(this, this.txtShengYuNum, egret.TouchEvent.TOUCH_TAP, this.getZhuangListhandle.bind(this));
        EventManage.addButtonEvent(this, this.btnChongfu, egret.TouchEvent.TOUCH_TAP, this.btnChongfuHandle.bind(this));
        EventManage.addButtonEvent(this, this.btnBao, egret.TouchEvent.TOUCH_TAP, this.btnBaoHandle.bind(this));
        EventManage.addButtonEvent(this, this.imgfa, egret.TouchEvent.TOUCH_TAP, this.imgfaHandle.bind(this));
        this.init();
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.OPERTE_REDBOX_COMPLETE, this.operateBoxComplete.bind(this));
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_MAIN, this.operateBoxComplete.bind(this));
        PanelManage.openChat(this, 112, 378, "10001");
        this.setChildIndex(this.zhuangScroll, this.numChildren - 1);
        this.setChildIndex(this.txtFenPanNum, this.numChildren - 1);
        this.zhuangScroll.touchEnabled = false;
        this.txtFenPanNum.touchEnabled = false;
        EventManage.addEvent(this, lcp.LListener.getInstance(), EventData.UPDATE_PAY, this.updatePayData.bind(this));
        EventManage.addButtonEvent(this, this.btnChong, egret.TouchEvent.TOUCH_TAP, this.btnChongHandle.bind(this));
        this.guang.anchorOffsetX = 250;
        this.guang.anchorOffsetY = 250;
        this.guang.x += 250;
        this.guang.y += 250;
    }
    private btnChongHandle(): void {
        PanelManage.openShop(3);
    }
    private updatePayData(r): void {
        var data = r.param;
        GlobalData.user.gold = data.msg.gold + "";
        GlobalData.user.vip = data.msg.vip + "";
        this.txtTotalGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
        this.txtVip.text = "VIP" + GlobalData.user.vip;
    }
    private operateBoxComplete(): void {
        this.txtTotalGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
    }
    private imgfaHandle(): void {
        PanelManage.openRedBox(0, 1);
    }
    private btnBaoHandle(): void {
        //PanelManage.openBank();
    }
    private btnChongfuHandle(): void {
        if (this.jinsha.xiazhuArr2.length > 0) {
            this.btnChongfu.touchEnabled = false;
            Net.send(Protocol.XIA_ZHU_JINSHA, { bets: this.jinsha.xiazhuArr2 }, this.xiazhucallback1.bind(this));
        }
        // for (var i = 0; i < this.jinsha.xiazhuArr2.length; i++) {
        //     console.log("====位置" + this.jinsha.xiazhuArr2[i].betId + "下注:" + this.jinsha.xiazhuArr2[i].gold);
        // }
    }
    private xiazhucallback1(r): void {
        if (r.code == 200) {
            var len = this.jinsha.xiazhuArr2.length;
            for (var i = 0; i < len; i++) {
                this.jinsha.zhuArr[(parseInt(this.jinsha.xiazhuArr2[i].betId + "") - 1)] = this.jinsha.zhuArr[(parseInt(this.jinsha.xiazhuArr2[i].betId + "") - 1)] + parseInt(this.jinsha.xiazhuArr2[i].gold + "");
                this["txtCurrent" + this.jinsha.xiazhuArr2[i].betId].text = QuickManage.moneyStr(this.jinsha.zhuArr[(parseInt(this.jinsha.xiazhuArr2[i].betId + "") - 1)]);
                this.jinsha.xiazhuArr.push(this.jinsha.xiazhuArr2[i]);
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
    private getZhuangListhandle(): void {
        if (this.zhuangScroll.visible == true) {
            this.zhuangScroll.visible = false;
            return;
        }
        Net.send(Protocol.JIN_SHA_ZHUANGLIST, {}, this.zhuanglistcallback.bind(this));
    }
    private zhuanglistcallback(r): void {
        this.bgg.visible = true;
        JinShaUtils.getInstance().initZhuangList();
        if (r.code == 200) {
            var arr = r.list;//name vip headurl gold
            var len = arr.length;
            if (len > 0) {
                this.bgg.visible = false;
            }
            this.zhuangScroll.visible = true;
            for (var i = 0; i < len; i++) {
                var element = arr[i];
                var item = ObjManage.getObj("ZhuangListItemPanel");
                item.setData({ num: (i + 1), name: arr[i].name, vip: arr[i].vip, gold: arr[i].gold });
                item.x = 5;
                item.y = 42 * i;
                this.zhuangGroup.addChild(item);
                JinShaUtils.getInstance().setZhuangItem(item);
            }
        }
    }
    private btnShanghandle(): void {
        if (this.btnShang.source == "jinsha.btnShang") {
            if (parseInt(GlobalData.user.gold) < 200000000) {
                TipsManage.showTips("金币不足2亿不能上庄！");
                return;
            }
            if (parseInt(GlobalData.user.vip) < 1) {
                TipsManage.showTips("VIP等级大于1能上庄！");
                return;
            }
            Net.send(Protocol.JIN_SHA_SHANGZHUANG, {}, this.shangzhuangcallback.bind(this));
        } else {
            Net.send(Protocol.JIN_SHA_XIAZHUANG, {}, this.xiazhuangcallback.bind(this));
        }
    }
    private xiazhuangcallback(r): void {
        if (r.code == 200) {
            this.txtPaizhuang.visible = false;
            this.txtPaizhuangNum.visible = false;
            this.jinsha.zhuangnum = 0;
            if (!this.jinsha.isZhuang) {
                this.btnShang.source = "jinsha.btnShang";
            } else {
                this.btnShang.source = "jinsha.btnShang";
                TipsManage.showTips("下庄成功，等待本局结束！");
            }
        }
    }
    private shangzhuangcallback(r): void {
        if (r.code == 200) {
            this.txtPaizhuang.visible = true;
            this.btnShang.source = "jinsha.btnXia";
        } else {
            TipsManage.showTips(ErrorMessage.errorMsg(r.msg));
        }
    }
    private qiehuanhandle(): void {
        this.jinsha.danzhu = "" + JinShaUtils.getInstance().getDanZhu(this.jinsha.danzhu);
        this.txtDanzhu.text = "单注:" + QuickManage.moneyStr(parseInt(this.jinsha.danzhu));
    }
    private xiazhuHandle(num): void {
        this.helptips.visible=false;
        this.setBtnXy();
        if ((this["zhu" + num].source + "").charAt(7) == "a") {
            return;
        }
        var gold = parseInt(GlobalData.user.gold) - parseInt(this.jinsha.danzhu);
        if (gold < 0) {
            TipsManage.showTips("金币不足!");
            return;
        }
        if (this.jinsha.isZhuang) {
            TipsManage.showTips("庄不能下注!");
            return;
        }
        Net.send(Protocol.XIA_ZHU_JINSHA, { bets: [{ betId: "" + num, gold: this.jinsha.danzhu }] }, this.xiazhucallback.bind(this, num));
    }
    private xiazhucallback(num, r): void {
        if (r.code == 200) {
            this.jinsha.xiazhuArr.push({ gold: this.jinsha.danzhu, betId: num });
            this.jinsha.zhuArr[(num - 1)] = this.jinsha.zhuArr[(num - 1)] + parseInt(this.jinsha.danzhu);
            //console.log("===" + this.jinsha.zhuArr[(num - 1)] + "==" + this.jinsha.danzhu);
            this["txtCurrent" + num].text = QuickManage.moneyStr(this.jinsha.zhuArr[(num - 1)]);
            var gold = parseInt(GlobalData.user.gold) - parseInt(this.jinsha.danzhu);
            if (gold < 0) {
                gold = 0;
            }
            GlobalData.user.gold = gold + "";
            this.txtTotalGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
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
        var len = this.jinsha.posArr.length;
        for (var i = 1; i < len; i++) {
            var obj = this.jinsha.posArr[i];
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
    private init(): void {
        this.jinsha = JinShaUtils.getInstance().getJinSha();
        for (var i = 0; i < 28; i++) {
            this.jinsha.currentArr.push(this["z" + i]);
        }
        this.jinsha.zhuArr = [];
        for (var i = 1; i < 13; i++) {
            this.jinsha.zhuArr.push(0);
            this.jinsha.posArr.push({ view: this["zhu" + i], acx: this["zhu" + i].anchorOffsetX, acy: this["zhu" + i].anchorOffsetY, xx: this["zhu" + i].x, yy: this["zhu" + i].y });
            EventManage.addButtonEvent(this, this["zhu" + i], egret.TouchEvent.TOUCH_TAP, this.xiazhuHandle.bind(this, i));
        }
        this.txtVip.text = "VIP" + GlobalData.user.vip;
        this.txtGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.txtTotalGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        this.txtName.text = GlobalData.user.nickname;
        this.txtCaijin.text = QuickManage.moneyStr(this.jinsha.r.data.caijin);

        var mask2: egret.Shape = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(60, 50, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.head.mask = mask2;
        this.head.source = GlobalData.user.headurl;
        console.log("服务端获取到的时间为:" + this.jinsha.r.data.time);
        this.jinsha.timett = Math.abs(parseInt(this.jinsha.r.data.time));
        if ((this.jinsha.timett + "").indexOf(".") != -1 || this.jinsha.timett > 28) {
            Net.send(Protocol.HALL_SET_PROPOSAL, { proposal: "请截图给管理员:" + this.jinsha.r.data.state + ":" + this.jinsha.r.data.time }, this.feiqi.bind(this));
        }
        if (this.jinsha.timett < 10) {
            this.txtTime.text = "0" + this.jinsha.timett;
        } else {
            this.txtTime.text = "" + this.jinsha.timett;
        }
        if (this.jinsha.timett > 28) {
            this.txtTime.text = "28";
            this.jinsha.timett = 28;
        }
        if (this.jinsha.r.data.zhuang.sys == "1") {
            var url = "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46";
            this.setZhuangInfo({ nick: "皇家特派员", gold: "88880000", headurl: url, num: 9999, vip: 15 }, true);
        } else {
            this.setZhuangInfo(this.jinsha.r.data.zhuang, false);
        }
        console.warn("当前游戏状态是===" + this.jinsha.r.data.state);
        if (this.jinsha.r.data.state == "3") {
            this.setBtnTouched();
            this.txtTime.text = "00";
        } else {
            this.jinsha.tt = setInterval(this.updateTime.bind(this), 1000);
        }
        //this.head.mask = this.headmask;
        //this.headzhuang.mask = this.maskheadzhuang;
        this.jinsha.danzhu = this.jinsha.r.data.danzhu;
        this.txtDanzhu.text = "单注:" + QuickManage.moneyStr(parseInt(this.jinsha.danzhu));
        this.jinsha.zhiqianArr = this.jinsha.r.data.recent;
        this.setZuiJin();
    }
    private setZhuangInfo(zhuang, flag): void {
        this.txtNameZhuang.text = zhuang.nick;
        this.txtGoldZhuang.text = QuickManage.moneyStr(parseInt(zhuang.gold + ""));
        var mask2: egret.Shape = new egret.Shape;
        mask2.graphics.beginFill(0xff0000);
        mask2.graphics.drawCircle(155, 324, 40);
        mask2.graphics.endFill();
        this.addChild(mask2);
        this.headzhuang.mask = mask2;
        this.headzhuang.source = zhuang.headurl;

        this.jinsha.numShengyu = zhuang.num;
        this.txtZhuangVip.text = "VIP" + zhuang.vip;
        this.txtShengYuNum.text = "剩余局数:" + this.jinsha.numShengyu;
        if (!flag) {
            this.jinsha.zhuangGold = parseInt(zhuang.gold + "");
        }
        this.jinsha.isSys = flag;
    }
    private setZuiJin(): void {
        var len = this.jinsha.zhiqianArr.length;
        for (var i = 0; i < len; i++) {
            this["zhiqian" + i].source = "jinsha." + this.jinsha.zhiqianArr[i] + "d";
        }
    }
    private tongbuxiazhucallback(r): void {
        var arr = r.list;
        var len = arr.length;
        for (var index = 0; index < len; index++) {
            var element = arr[index];
            this["txtTotal" + element.id].text = QuickManage.moneyStr(element.bet);
        }
    }
    private updateTime(): void {
        if (this.jinsha.timett % 6 == 0) {
            Net.send(Protocol.JIN_SHA_TONGBU, {}, this.tongbuxiazhucallback.bind(this));
        }
        --this.jinsha.timett;
        if (this.jinsha.timett > 0) {
            if (this.jinsha.timett < 10) {
                this.txtTime.text = "0" + this.jinsha.timett;
            } else {
                this.txtTime.text = "" + this.jinsha.timett;
            }
        } else {
            this.txtTime.text = "00";
        }
    }
    public resultcome(r): void {
        //console.warn("结果来了");
        this.jinsha.result = r;
        this.jinsha.resultc = true;
        if (this.jinsha.daojishicom) {
            JinShaUtils.getInstance().startEffect();
            //EnterFrameManage.add(this.gogo.bind(this), "JinShaPanel.gogo");
            TimerManager.getInstance().setFrame("JinShaPanel.gogo", this.gogo.bind(this), this);
        }
    }
    public collect(r): void {
        this.jinsha.collectobj = r;
        //r.msg.caijin  max.name  max.value
    }
    public someonshangzhuang(r): void {
        this.jinsha.changebanker = r;
        var pos = r.msg.pos || 1;
        if (r) {
            var id = r.msg.account;
            if (id == "0") {
                this.jinsha.zhuangnum = 0;
            } else if (GlobalData.account != id) {
                if (this.jinsha.zhuangnum > pos) {
                    this.jinsha.zhuangnum -= 1;
                }
            } else {
                this.jinsha.zhuangnum = 0;
            }
        }
    }
    public someonupzhuang(r): void {
        console.warn("有人上庄了" + r.msg.account + "==" + r.msg.pos + "==" + this.jinsha.zhuangnum);
        var id = r.msg.account;
        if (GlobalData.account != id) {
            if (parseInt(r.msg.pos) <= this.jinsha.zhuangnum) {
                this.jinsha.zhuangnum += 1;
            }
        } else {
            //this.isZhuang = true;
            this.jinsha.zhuangnum = parseInt(r.msg.pos);
        }
        this.txtPaizhuangNum.visible = true;
        this.txtPaizhuangNum.text = this.jinsha.zhuangnum + "";
    }
    public someondownzhuang(r): void {
        //console.warn("有人下庄了" + r.msg.account);
        var id = r.msg.account;
        if (GlobalData.account != id) {
            if (parseInt(r.msg.pos) < this.jinsha.zhuangnum) {
                this.jinsha.zhuangnum -= 1;
            }
        } else {
            this.jinsha.isZhuang = false;
        }
        this.txtPaizhuangNum.text = this.jinsha.zhuangnum + "";
    }
    public betcome(r): void {
        //console.warn("可以下注了");
        //console.log("服务端获取到的时间为:" + r.msg.time)
        if (this.jinsha.r) {
            if (this.jinsha.r.data.state == "3") {
                this.jinsha.timett = Math.abs(parseInt(r.msg.time));
                if (this.jinsha.timett < 10) {
                    this.txtTime.text = "0" + this.jinsha.timett;
                } else {
                    this.txtTime.text = "" + this.jinsha.timett;
                }
                this.setBtnTouched(true);
                clearInterval(this.jinsha.tt);
                this.jinsha.tt = setInterval(this.updateTime.bind(this), 1000);
                this.jinsha.r = null;
                return;
            }
        }
        this.jinsha.timett1 = Math.abs(parseInt(r.msg.time));
        clearInterval(this.jinsha.tt1);
        this.jinsha.tt1 = setInterval(this.updateTime1.bind(this), 1000);
    }
    public betstop(r): void {
        console.warn("停止下注了");
        clearInterval(this.jinsha.tt);
        this.txtTime.text = "00";
        this.setBtnTouched();
        this.txtFenPanNum.source = "jinsha.num3";
        this.txtFenPanNum.visible = true;
        //EffectUtils.playEffect3(this.txtFenPanNum, 1000, this.play321.bind(this));
        this.tt = setInterval(this.play321.bind(this), 1000);
        //EnterFrameManage.add(this.play321.bind(this),"JinShaPanel.gogo2");
        MusicManage.playMuisc("music.countdown");
    }
    private play321(): void {
        if (this.txtFenPanNum.source == "jinsha.num3") {
            this.txtFenPanNum.source = "jinsha.num2";
            EffectUtils.playEffect3(this.txtFenPanNum, 1000);
            MusicManage.playMuisc("music.countdown");
        } else if (this.txtFenPanNum.source == "jinsha.num2") {
            this.txtFenPanNum.source = "jinsha.num1";
            EffectUtils.playEffect3(this.txtFenPanNum, 1000);
            MusicManage.playMuisc("music.countdown");
        } else {
            clearInterval(this.tt);
            this.txtFenPanNum.visible = false;
            console.warn("开始动画" + this.jinsha.timett);
            this.startMC();
            MusicManage.playMuisc("music.start");
            this.tt = 0;
        }
    }
    private updateTime1(): void {
        --this.jinsha.timett1;
    }
    private startMC(): void {
        this.jinsha.daojishicom = true;
        if (this.jinsha.resultc) {
            JinShaUtils.getInstance().startEffect();
            //EnterFrameManage.add(this.gogo.bind(this), "JinShaPanel.gogo");
            TimerManager.getInstance().setFrame("JinShaPanel.gogo", this.gogo.bind(this), this);
        }
    }
    private setBtnTouched(flag = false): void {
        var res = "jinsha.a";
        if (flag) {
            res = "jinsha.l";
        }
        for (var i = 1; i < 13; i++) {
            this["zhu" + i].source = res + i;
            this["zhu" + i].touchEnabled = flag;
        }
        this.btnChongfu.touchEnabled = flag;
    }
    private gogo() {
        JinShaUtils.getInstance().manageMc(this.jiesuan.bind(this), this.pushArr.bind(this));
    }
    private jiesuan(): void {
        //EnterFrameManage.remove("JinShaPanel.gogo");
        TimerManager.getInstance().remove("JinShaPanel.gogo");
        this.imgend.visible = true;
        this.imgend.x = 279;
        this.imgend.y = 453;
        var result = this.jinsha.result.msg.result;
        this.imgend.source = "jinsha." + result + "a";
        MusicManage.playMuisc("music.result" + result);
        //        this["zhu" + result].source == "jinsha." + result + "a";
        EffectUtils.playEffect4(this.imgend);
        if (this.jinsha.isZhuang) {
            this.txtWinGold.text = this.jinsha.result.msg.bankWin + "";
        } else {
            //重复下注导致结算问题
            this.txtWinGold.text = "" + JinShaUtils.getInstance().jiesuan(this.jinsha.xiazhuArr, parseInt(result));
        }
        if (!this.jinsha.isSys) {
            this.jinsha.zhuangGold += parseInt(this.jinsha.result.msg.bankWin);
            this.txtGoldZhuang.text = QuickManage.moneyStr(this.jinsha.zhuangGold);
        }
        if (!this.jinsha.isSys) {
            if (parseInt(this.jinsha.result.msg.bankWin + "") > 0) {
                PanelManage.chat.sendGameChat("庄家" + this.txtNameZhuang.text + "赢得了" + QuickManage.moneyStr(parseInt(this.jinsha.result.msg.bankWin)));
            }
        }
        this.txtWinGold.visible = false;
        this.guang.visible = true;
        TimerManager.getInstance().setFrame("JinShaPanel.gogo1", this.gogo1.bind(this), this);
        //EnterFrameManage.add(this.gogo1.bind(this), "JinShaPanel.gogo1");
        this.jinsha.tt2 = setTimeout(this.endmc.bind(this), 5000);
    }
    private updateGold(): void {
        Net.send(Protocol.JINSHA_GET_GOLD, {}, this.updateGoldSucc.bind(this));
    }
    private updateGoldSucc(r): void {
        GlobalData.user.gold = r.data.gold + "";
        console.log("同步金币返回" + GlobalData.user.gold);
        this.txtTotalGold.text = QuickManage.moneyStr(parseInt(GlobalData.user.gold));
        EffectUtils.numEffect(this.txtGold, parseInt(GlobalData.user.gold));
    }
    private endmc(): void {
        clearTimeout(this.jinsha.tt2);
        TimerManager.getInstance().remove("JinShaPanel.gogo1");
        this.guang.visible = false;
        egret.Tween.get(this.imgend).to({ x: 73, y: 514 }, 800).call(this.hideImgend.bind(this));
        console.log("是否爆庄:" + this.jinsha.result.msg.bomb);
        if (this.jinsha.result.msg.bomb == "1") {
            PanelManage.chat.sendGameChat(this.txtNameZhuang.text + "爆庄了");
            this.baozhuang.visible = true;
            MusicManage.playMuisc("music.bomb");
            EffectUtils.playEffect3(this.baozhuang, 1200, this.isBaocaijin.bind(this));
        } else {
            this.isBaocaijin();
        }
        this.updateGold();
    }
    private isBaocaijin(): void {
        console.log("彩金值:" + this.jinsha.result.msg.gift);
        this.baozhuang.visible = false;
        if (parseInt(this.jinsha.result.msg.gift) > 0) {
            MusicManage.playMuisc("music.jackpot");
            this.baocaijin.visible = true;
            if (parseInt(this.txtWinGold.text) > 0) {
                this.txtCaiJin2.text = "恭喜你获得彩金" + QuickManage.moneyStr(parseInt(this.jinsha.result.msg.gift));
                PanelManage.chat.sendGameChat(this.txtCaiJin2.text);
            } else {
                this.txtCaiJin2.text = "系统爆彩金啦，很遗憾你没有获得!";
            }
            EffectUtils.playEffect3(this.baocaijin, 6000, this.next.bind(this));
        } else {
            this.next();
        }
    }
    private next(): void {
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.CHAT_GAME_RESULT));
        this.baocaijin.visible = false;
        EffectUtils.numEffect(this.txtCaijin, parseInt(this.jinsha.collectobj.msg.caijin));
        this.zhuangScroll.visible = false;
        var r = this.jinsha.changebanker;
        if (r) {
            var id = r.msg.account;
            //var pos = r.msg.pos;
            if (id == "0") {
                this.jinsha.isZhuang = false;
                this.txtPaizhuang.visible = false;
                this.txtPaizhuangNum.visible = false;
                this.btnShang.source = "jinsha.btnShang";
                var url = "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46";
                this.setZhuangInfo({ nick: "皇家特派员", gold: "88880000", headurl: url, num: 9999, vip: 15 }, true);
            } else if (GlobalData.account != id) {
                if (this.jinsha.isZhuang) {
                    this.btnShang.source = "jinsha.btnShang";
                }
                this.txtPaizhuangNum.text = this.jinsha.zhuangnum + "";

                this.jinsha.isZhuang = false;
                if (this.txtNameZhuang.text != "皇家特派员") {
                    PanelManage.chat.sendGameChat(this.txtNameZhuang.text + "下庄了");
                }
                this.setZhuangInfo({ nick: r.msg.name, gold: r.msg.gold, headurl: r.msg.headurl, num: parseInt(r.msg.count), vip: r.msg.vip }, false);
                if (this.txtNameZhuang.text != "皇家特派员") {
                    PanelManage.chat.sendGameChat("恭迎" + this.txtNameZhuang.text + "上庄了");
                }
            } else {
                this.jinsha.isZhuang = true;
                this.txtPaizhuang.visible = false;
                this.txtPaizhuangNum.visible = false;
                this.btnShang.source = "jinsha.btnXia";
                if (this.txtNameZhuang.text != "皇家特派员") {
                    PanelManage.chat.sendGameChat(this.txtNameZhuang.text + "下庄了");
                }
                this.setZhuangInfo({ nick: r.msg.name, gold: r.msg.gold, headurl: r.msg.headurl, num: parseInt(r.msg.count), vip: r.msg.vip }, false);
                if (this.txtNameZhuang.text != "皇家特派员") {
                    PanelManage.chat.sendGameChat("恭迎" + this.txtNameZhuang.text + "上庄了");
                }
            }
        } else {
            this.txtShengYuNum.text = "剩余局数:" + (--this.jinsha.numShengyu);
        }
        this.initData();
        this.jinsha.tt = setInterval(this.updateTime.bind(this), 1000);
    }
    private initData(): void {
        clearInterval(this.jinsha.tt1);
        this.setBtnTouched(true);
        this.txtWinGold.visible = false;
        this.txtWinGold.text = "0";
        this.jinsha.timett = this.jinsha.timett1;
        //this.jinsha.zhuangnum = 0;
        this.jinsha.changebanker = null;
        this.jinsha.ctt = 0;
        this.txtWinGold.text = "";
        this.jinsha.daojishicom = false;
        if (this.jinsha.xiazhuArr.length > 0) {
            this.jinsha.xiazhuArr2 = [];
            this.jinsha.xiazhuArr2 = this.jinsha.xiazhuArr;
        }
        this.jinsha.xiazhuArr = [];
        this.jinsha.zhuArr = [];
        for (var i = 1; i < 13; i++) {
            this["txtCurrent" + i].text = "0";
            this["txtTotal" + i].text = "0";
            this.jinsha.zhuArr.push(0);
        }
    }
    private hideImgend(): void {
        this.imgend.visible = false;
        this.guang.visible = false;
        var result = this.jinsha.result.msg.result;
        if (this.jinsha.zhiqianArr.length > 9) {
            this.jinsha.zhiqianArr.shift();
        }
        this.jinsha.zhiqianArr.push(result);
        this.setZuiJin();
    }
    private gogo1(): void {
        this.guang.rotation += 5;
        if (++this.jinsha.ctt == 15) {
            var result = parseInt(this.jinsha.result.msg.result);
            if (result > 4 && result < 9) {
                if (this["zhu1"].source == "jinsha.l1") {
                    this["zhu1"].source = "jinsha.a1";
                } else {
                    this["zhu1"].source = "jinsha.l1";
                }
            }
            if (result > 8 && result < 13) {
                if (this["zhu4"].source == "jinsha.l4") {
                    this["zhu4"].source = "jinsha.a4";
                } else {
                    this["zhu4"].source = "jinsha.l4";
                }
            }
            if (this["zhu" + result].source == "jinsha.l" + result) {
                this["zhu" + result].source = "jinsha.a" + result;
            } else {
                this["zhu" + result].source = "jinsha.l" + result;
            }
            this.txtWinGold.visible = !this.txtWinGold.visible;
            this.jinsha.ctt = 0;
        }
    }
    private pushArr(i): void {
        var view = this["z" + i];
        var namea = view.source;
        view.source = namea.replace("b", "c");
    }
    private leaveGame(): void {
        if (JinShaUtils.getInstance().isCanQuit()) {
            TipsManage.showTips("已经下注,不能离开!");
            return;
        }
        if (this.jinsha.isZhuang) {
            TipsManage.showTips("你是庄家,不能离开!");
            return;
        }
        if (this.isLeave == false) {
            Net.send(Protocol.JIN_SHA_LEAVE, { cell: this.jinsha.danzhu }, this.leavegamecallback.bind(this));
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
        clearInterval(this.jinsha.tt);
        clearInterval(this.jinsha.tt1);
        MusicManage.closeMuisc();
        TimerManager.getInstance().remove("JinShaPanel.gogo");
        TimerManager.getInstance().remove("JinShaPanel.gogo1");
        JinShaUtils.getInstance().clear();
        if (this.parent) {
            this.parent.removeChild(this);
        }
        EventManage.removeEvent(this);
    }

    public setTouchEnabled(): void {
        QuickManage.setTouchEnabled(this);
    }

}