/**
 * 滑动面板管理类
 * by fany
 * (c) copyright false,0,0,2014 - 2035
 * All Rights Reserved.
 * 面板的管理类
 */
var PageManage;
(function (PageManage) {
    PageManage.data = [];
    PageManage.dataRes = [];
    PageManage.page = "";
    PageManage.oldpage = "";
    PageManage.xx = 0;
    PageManage.yy = 0;
    PageManage.isUp = false;
    PageManage.isMove = false;
    PageManage.oldtime = 0;
    function initPage(arr) {
        if (arr === void 0) { arr = ["ClassName1", "ClassName2"]; }
        var len = arr.length;
        for (var i = 0; i < len; i++) {
            this.data[arr[i]] = null;
        }
        this.dataRes = arr;
    }
    PageManage.initPage = initPage;
    function openPage(page, wherea) {
        if (wherea === void 0) { wherea = "up"; }
        var nowtime = egret.getTimer();
        var dd = nowtime - this.oldtime;
        this.oldtime = nowtime;
        if (dd < 600 && this.oldpage != "") {
            return;
        }
        this.oldpage = this.page;
        this.page = page;
        if (this.oldpage == this.page) {
            return;
        }
        if (this.data[page]) {
            EventManage.removeEvent(this.data[page]);
            if (this.data[page].parent) {
                this.data[page].parent.removeChild(this.data[page]);
            }
            this.data[page].dispose();
            this.data[page] = null;
        }
        var cls = egret.getDefinitionByName(page);
        this.data[page] = new cls();
        EventManage.addEvent(this, this.data[page], egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart);
        EventManage.addEvent(this, this.data[page], egret.TouchEvent.TOUCH_MOVE, this.onTouchMove);
        EventManage.addEvent(this, this.data[page], egret.TouchEvent.TOUCH_END, this.onTouchEnd);
        PanelManage.euiLayer.addChild(this.data[page]);
        if (wherea == "up") {
            this.playUp(this.data[page]);
        }
        else if (wherea == "down") {
            this.playDown(this.data[page]);
        }
    }
    PageManage.openPage = openPage;
    function playUp(view) {
        view.visible = true;
        view.y = 1008;
        egret.Tween.get(view).to({ y: 0 }, 400).call(this.disposePage.bind(this));
    }
    PageManage.playUp = playUp;
    function playDown(view) {
        view.visible = true;
        view.y = -1008;
        egret.Tween.get(view).to({ y: 0 }, 400).call(this.disposePage.bind(this));
    }
    PageManage.playDown = playDown;
    function disposePage() {
        if (this.oldpage != "" && this.oldpage != this.page) {
            if (this.data[this.oldpage]) {
                if (this.data[this.oldpage].parent) {
                    this.data[this.oldpage].parent.removeChild(this.data[this.oldpage]);
                }
                this.data[this.oldpage].dispose();
                this.data[this.oldpage] = null;
            }
        }
    }
    PageManage.disposePage = disposePage;
    //点击事件的响应函数
    function onTouchStart(e) {
        //this.time = egret.getTimer();
        var view = e.currentTarget;
        this.xx = e.stageX - view.x;
        this.yy = e.stageY - view.y;
    }
    PageManage.onTouchStart = onTouchStart;
    function onTouchMove(e) {
        var view = e.currentTarget;
        var nn = e.stageY - this.yy;
        if (Math.abs(nn) > 10) {
            this.isMove = true;
        }
        else {
            this.isMove = false;
        }
        if (nn <= 0) {
            if (Math.abs(nn) < 280) {
            }
        }
        if (nn < 0) {
            this.isUp = false;
        }
        else {
            this.isUp = true;
        }
    }
    PageManage.onTouchMove = onTouchMove;
    function onTouchEnd(e) {
        var view = e.currentTarget;
        if (this.isMove) {
            if (!this.isUp) {
                PageManage.openPage(this.getNext(this.page), "up");
            }
            else {
                PageManage.openPage(this.getUp(this.page), "down");
            }
            this.isMove = false;
        }
    }
    PageManage.onTouchEnd = onTouchEnd;
    function getNext(current) {
        var len = this.dataRes.length;
        for (var i = 0; i < len; i++) {
            if (this.dataRes[i] == current) {
                if (i == len - 1) {
                    return this.dataRes[i];
                }
                return this.dataRes[i + 1];
            }
        }
    }
    PageManage.getNext = getNext;
    function getUp(current) {
        var len = this.dataRes.length;
        for (var i = 0; i < len; i++) {
            if (this.dataRes[i] == current) {
                if (i - 1 < 0) {
                    return this.dataRes[i];
                }
                return this.dataRes[i - 1];
            }
        }
    }
    PageManage.getUp = getUp;
})(PageManage || (PageManage = {}));
