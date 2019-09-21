/**
  * 简单对象管理类
  * by fany
  * (c) copyright false,0,0,2015 - 2035
  * All Rights Reserved.
  * 面板的管理类
  */
var ObjManage;
(function (ObjManage) {
    function getPoker(ii) {
        if (ii === void 0) { ii = 10; }
        this.pokers = this.pokers || [];
        var poker;
        if (this.pokers.length > 0) {
            poker = this.pokers.shift();
        }
        else {
            poker = new PokerPanel();
        }
        poker.setHui();
        EventManage.removeEvent(poker);
        poker.touchEnabled = false;
        poker.visible = true;
        poker.rotation = 0;
        return poker;
    }
    ObjManage.getPoker = getPoker;
    function addPoker(poker) {
        poker.x = 0;
        poker.y = 0;
        poker.anchorOffsetX = 0;
        poker.anchorOffsetX = 0;
        poker.rotation = 0;
        this.pokers = this.pokers || [];
        EventManage.removeEvent(poker);
        this.pokers.push(poker);
    }
    ObjManage.addPoker = addPoker;
    function getImage(res) {
        this.imgs = this.imgs || [];
        var img;
        if (this.imgs.length > 0) {
            img = this.imgs.shift();
        }
        else {
            img = new eui.Image();
        }
        img.source = res;
        img.scaleX = 1;
        img.scaleY = 1;
        EventManage.removeEvent(img);
        return img;
    }
    ObjManage.getImage = getImage;
    function addImage(img) {
        img.x = 0;
        img.y = 0;
        this.imgs = this.imgs || [];
        EventManage.removeEvent(img);
        this.imgs.push(img);
    }
    ObjManage.addImage = addImage;
    function getObj(key) {
        this.objs = this.objs || [];
        var cls = null;
        cls = this.getObjByKey(key);
        if (!cls) {
            var obj = egret.getDefinitionByName(key);
            cls = new obj();
        }
        this.objLingshis = this.objLingshis || [];
        if (this.objLingshis[key] == undefined) {
            var arr = [cls];
            this.objLingshis[key] = arr;
        }
        else {
            this.objLingshis[key].push(cls);
        }
        return cls;
    }
    ObjManage.getObj = getObj;
    function getObjByKey(key) {
        var obj = null;
        var len = this.objs.length;
        for (var i = 0; i < len; i++) {
            if (this.objs[i].key == key) {
                obj = this.objs[i].value;
                this.objs.splice(i, 1);
                break;
            }
        }
        return obj;
    }
    ObjManage.getObjByKey = getObjByKey;
    function clearItems(key) {
        if (this.objLingshis[key] == undefined) {
            return;
        }
        var data = this.objLingshis[key];
        var lenn = data.length;
        for (var i = 0; i < lenn; i++) {
            if (data[i].parent) {
                data[i].parent.removeChild(data[i]);
                ObjManage.addObj(key, data[i]);
            }
        }
        this.objLingshis[key] = [];
    }
    ObjManage.clearItems = clearItems;
    function addObj(key, value) {
        this.objLingshis = this.objLingshis || [];
        if (this.objLingshis[key] == undefined) {
            var arr = [value];
            this.objLingshis[key] = arr;
        }
        else {
            this.objLingshis[key].push(value);
        }
    }
    ObjManage.addObj = addObj;
})(ObjManage || (ObjManage = {}));
