/**
  * 简单对象管理类
  * by fany
  * (c) copyright false,0,0,2015 - 2035
  * All Rights Reserved. 
  * 面板的管理类
  */
module ObjManage {

    export var objs: Array<any>;
    export var objLingshis: Array<any>;
    export var imgs: Array<eui.Image>;
    export var pokers: Array<PokerPanel>;
    export function getPoker(ii: number = 10): PokerPanel {
        this.pokers = this.pokers || [];
        var poker: PokerPanel;
        if (this.pokers.length > 0) {
            poker = this.pokers.shift();
        } else {
            poker = new PokerPanel();
        }
        poker.setHui();
        EventManage.removeEvent(poker);
        poker.touchEnabled = false;
        poker.visible = true;
        poker.rotation = 0;
        return poker;
    }
    export function addPoker(poker: PokerPanel): void {
        poker.x = 0;
        poker.y = 0;
        poker.anchorOffsetX = 0;
        poker.anchorOffsetX = 0;
        poker.rotation = 0;
        this.pokers = this.pokers || [];
        EventManage.removeEvent(poker);
        this.pokers.push(poker);
    }
    export function getImage(res): eui.Image {
        this.imgs = this.imgs || [];
        var img: eui.Image;
        if (this.imgs.length > 0) {
            img = this.imgs.shift();
        } else {
            img = new eui.Image();
        }
        img.source = res;
        img.scaleX = 1;
        img.scaleY = 1;
        EventManage.removeEvent(img);
        return img;
    }
    export function addImage(img: eui.Image): void {
        img.x = 0;
        img.y = 0;
        this.imgs = this.imgs || [];
        EventManage.removeEvent(img);
        this.imgs.push(img);
    }
    export function getObj(key: string): any {
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
        } else {
            this.objLingshis[key].push(cls);
        }
        return cls;
    }
    export function getObjByKey(key): any {
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
    export function clearItems(key): void {
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
    export function addObj(key, value): void {
        this.objLingshis = this.objLingshis || [];
        if (this.objLingshis[key] == undefined) {
            var arr = [value];
            this.objLingshis[key] = arr;
        } else {
            this.objLingshis[key].push(value);
        }
    }
}