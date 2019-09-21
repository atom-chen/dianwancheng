/**
  * 弹出管理类
  * by fany
  * (c) copyright false,0,0,2015 - 2035
  * All Rights Reserved.
  * 面板的管理类
  */
var TipsManage;
(function (TipsManage) {
    TipsManage.isJianTing = false;
    function showHurtNum(value, xx, yy) {
        this.hurts = this.hurts || [];
        var numItem;
        if (this.hurts.length > 0) {
            numItem = this.hurts.shift();
        }
        else {
            numItem = new eui.BitmapLabel();
            numItem.font = "attackFont_fnt";
        }
        numItem.x = xx;
        numItem.y = yy;
        numItem.text = value;
        PanelManage.tipsLayer.addChild(numItem);
        egret.Tween.get(numItem).to({ y: yy - 50 }, 200).call(function () {
            egret.Tween.get(numItem).to({ alpha: 0 }, 1000).call(function () {
                if (numItem.parent)
                    numItem.parent.removeChild(numItem);
                numItem.alpha = 1;
                TipsManage.hurts.push(numItem);
            }, this);
        }, this);
    }
    TipsManage.showHurtNum = showHurtNum;
    function showAddBloodNum(value, xx, yy) {
        this.bloods = this.bloods || [];
        var numItem;
        if (this.bloods.length > 0) {
            numItem = this.bloods.shift();
        }
        else {
            numItem = new eui.BitmapLabel();
            numItem.font = "recoverFont_fnt";
        }
        numItem.x = xx;
        numItem.y = yy;
        numItem.text = value;
        PanelManage.tipsLayer.addChild(numItem);
        egret.Tween.get(numItem).to({ y: yy - 50 }, 200).call(function () {
            egret.Tween.get(numItem).to({ alpha: 0 }, 1000).call(function () {
                if (numItem.parent)
                    numItem.parent.removeChild(numItem);
                numItem.alpha = 1;
                TipsManage.bloods.push(numItem);
            }, this);
        }, this);
    }
    TipsManage.showAddBloodNum = showAddBloodNum;
    function showImg(res, xx, yy) {
        this.imgs = this.imgs || [];
        var numItem;
        if (this.imgs.length > 0) {
            numItem = this.imgs.shift();
        }
        else {
            numItem = new eui.Image();
        }
        numItem.source = res;
        numItem.x = xx;
        numItem.y = yy;
        PanelManage.tipsLayer.addChild(numItem);
        egret.Tween.get(numItem).to({ y: yy - 50 }, 200).call(function () {
            egret.Tween.get(numItem).to({ alpha: 0 }, 1000).call(function () {
                if (numItem.parent)
                    numItem.parent.removeChild(numItem);
                numItem.alpha = 1;
                TipsManage.imgs.push(numItem);
            }, this);
        }, this);
    }
    TipsManage.showImg = showImg;
    function showTips(str) {
        if (TipsManage.isJianTing == false) {
            TimerManager.getInstance().setFrame("TipsManage.gogo", TipsManage.gogo.bind(this), this);
            TipsManage.isJianTing = true;
        }
        TipsManage.arr = TipsManage.arr || [];
        var show;
        if (TipsManage.arr.length > 0) {
            show = TipsManage.arr.shift();
        }
        else {
            show = new TipsShowPanel();
        }
        show.setStr(str);
        show.alpha = 0;
        show.anchorOffsetX = 320;
        show.anchorOffsetY = 40;
        show.x = 320;
        show.y = 490;
        PanelManage.tipsLayer.addChild(show);
        EffectUtils.playEffect5(show, 800);
        TipsManage.tipsDel = TipsManage.tipsDel || [];
        TipsManage.tipsDel.push({ time: 1, obj: show });
    }
    TipsManage.showTips = showTips;
    function gogo() {
        var len = TipsManage.tipsDel.length;
        for (var i = 0; i < len; i++) {
            var show = TipsManage.tipsDel[i];
            if (show) {
                if (show.time > 40) {
                    TipsManage.tipsDel.splice(i, 1);
                    TipsManage.showTipsCom(show.obj);
                }
                else {
                    show.time += 1;
                }
            }
        }
    }
    TipsManage.gogo = gogo;
    function showTipsCom(show) {
        if (show.parent) {
            show.parent.removeChild(show);
        }
        if (TipsManage.arr.length > 5) {
            show.dispose();
            show = null;
        }
        else {
            TipsManage.arr.push(show);
        }
    }
    TipsManage.showTipsCom = showTipsCom;
    function showEffect(arr) {
        for (var i = 0; i < arr.length; i++) {
            var item = new TipsShowPanel();
            item.setStr(arr[i]);
            item.anchorOffsetX = 320;
            item.anchorOffsetY = 40;
            item.x = 320;
            item.y = 490 + i * item.height;
            PanelManage.tipsLayer.addChild(item);
            EffectUtils.playEffect5(item, 200 + 200 * i, this.showTipsTween.bind(this, item));
        }
    }
    TipsManage.showEffect = showEffect;
    function showTipsTween(show) {
        egret.Tween.get(show).to({ y: show.y - 600 }, 700).call(this.removeItem.bind(this, show));
    }
    TipsManage.showTipsTween = showTipsTween;
    function removeItem(item) {
        if (item.parent) {
            item.parent.removeChild(item);
            item.dispose();
        }
    }
    TipsManage.removeItem = removeItem;
})(TipsManage || (TipsManage = {}));
