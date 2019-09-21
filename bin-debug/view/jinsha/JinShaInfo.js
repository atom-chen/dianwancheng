var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author  fany
 *
 */
var JinShaInfo = (function () {
    function JinShaInfo() {
        this._count = 0;
        this._count1 = 0;
        this._count2 = 0;
        this._count3 = 0;
        this._ii = 0;
        this._ii1 = 0;
        this._ii2 = 0;
        this._ii3 = 0;
        this._jiange = 0;
        this._isGo = false;
        this._isGo1 = false;
        this._isGo2 = false;
        this._isGo3 = false;
        this._jiedian = 0;
        this._endtime = 0;
        this._r = null;
        this._danzhu = "";
        this._timett = 0;
        this._timett1 = 0;
        this._tt = 0;
        this._tt1 = 0;
        this._tt2 = 0;
        this._result = null;
        this._resultc = false;
        this._daojishicom = false;
        this._end = 0;
        this._endzhuanhuan = 0;
        this._ctt = 0;
        this._fltt = false;
        this._zhuangnum = 0;
        this._changebanker = null;
        this._isZhuang = false;
        this._numShengyu = 0;
        this._isSys = false;
        this._collectobj = null;
        this._zhuangGold = 0;
        this._isChongfuXiazhu = false;
        this._isYing = false;
        this.isChongfuXiazhu = false;
        this.ii = 0;
        this.ii1 = 0;
        this.ii2 = 0;
        this.ii3 = 0;
        this.jiange = 0;
        this.jiedian = 0;
        this.isGo = false;
        this.isGo1 = false;
        this.isGo2 = false;
        this.isGo3 = false;
        this.currentArr = [];
        this.endtime = 0;
        this.r = null;
        this.danzhu = "";
        this.timett = 0;
        this.timett1 = 0;
        this.tt = 0;
        this.tt1 = 0;
        this.tt2 = 0;
        this.result = null;
        this.resultc = false;
        this.daojishicom = false;
        this.end = 0;
        this.endzhuanhuan = 0;
        this.ctt = 0;
        this.fltt = false;
        this.xiazhuArr = [];
        this.xiazhuArr2 = [];
        this.zhiqianArr = [];
        this.zhuArr = [];
        this.zhuangnum = 0;
        this.zhuangGold = 0;
        this.changebanker = null;
        this.zhuangLists = [];
        this.isZhuang = false;
        this.numShengyu = 0;
        1;
        this.isSys = false;
        this.collectobj = null;
        this.posArr = [];
    }
    JinShaInfo.prototype.init = function () {
    };
    Object.defineProperty(JinShaInfo.prototype, "posArr", {
        get: function () {
            return this._posArr;
        },
        set: function (value) {
            this._posArr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isYing", {
        get: function () {
            return this._isYing;
        },
        set: function (value) {
            this._isYing = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isChongfuXiazhu", {
        get: function () {
            return this._isChongfuXiazhu;
        },
        set: function (value) {
            this._isChongfuXiazhu = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "zhuangGold", {
        get: function () {
            return this._zhuangGold;
        },
        set: function (value) {
            this._zhuangGold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "count", {
        get: function () {
            return this._count;
        },
        set: function (value) {
            this._count = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "ii1", {
        get: function () {
            return this._ii1;
        },
        set: function (value) {
            this._ii1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "ii2", {
        get: function () {
            return this._ii2;
        },
        set: function (value) {
            this._ii2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "ii3", {
        get: function () {
            return this._ii3;
        },
        set: function (value) {
            this._ii3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "currentArr", {
        get: function () {
            return this._currentArr;
        },
        set: function (value) {
            this._currentArr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "jiange", {
        get: function () {
            return this._jiange;
        },
        set: function (value) {
            this._jiange = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isGo", {
        get: function () {
            return this._isGo;
        },
        set: function (value) {
            this._isGo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isGo1", {
        get: function () {
            return this._isGo1;
        },
        set: function (value) {
            this._isGo1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isGo2", {
        get: function () {
            return this._isGo2;
        },
        set: function (value) {
            this._isGo2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isGo3", {
        get: function () {
            return this._isGo3;
        },
        set: function (value) {
            this._isGo3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "jiedian", {
        get: function () {
            return this._jiedian;
        },
        set: function (value) {
            this._jiedian = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "endtime", {
        get: function () {
            return this._endtime;
        },
        set: function (value) {
            this._endtime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "r", {
        get: function () {
            return this._r;
        },
        set: function (value) {
            this._r = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "danzhu", {
        get: function () {
            return this._danzhu;
        },
        set: function (value) {
            this._danzhu = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "timett", {
        get: function () {
            return this._timett;
        },
        set: function (value) {
            this._timett = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "timett1", {
        get: function () {
            return this._timett1;
        },
        set: function (value) {
            this._timett1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "tt", {
        get: function () {
            return this._tt;
        },
        set: function (value) {
            this._tt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "tt1", {
        get: function () {
            return this._tt1;
        },
        set: function (value) {
            this._tt1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "tt2", {
        get: function () {
            return this._tt2;
        },
        set: function (value) {
            this._tt2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "result", {
        get: function () {
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "resultc", {
        get: function () {
            return this._resultc;
        },
        set: function (value) {
            this._resultc = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "daojishicom", {
        get: function () {
            return this._daojishicom;
        },
        set: function (value) {
            this._daojishicom = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "end", {
        get: function () {
            return this._end;
        },
        set: function (value) {
            this._end = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "endzhuanhuan", {
        get: function () {
            return this._endzhuanhuan;
        },
        set: function (value) {
            this._endzhuanhuan = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "ctt", {
        get: function () {
            return this._ctt;
        },
        set: function (value) {
            this._ctt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "fltt", {
        get: function () {
            return this._fltt;
        },
        set: function (value) {
            this._fltt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "xiazhuArr2", {
        get: function () {
            return this._xiazhuArr2;
        },
        set: function (value) {
            this._xiazhuArr2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "xiazhuArr", {
        get: function () {
            return this._xiazhuArr;
        },
        set: function (value) {
            this._xiazhuArr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "zhiqianArr", {
        get: function () {
            return this._zhiqianArr;
        },
        set: function (value) {
            this._zhiqianArr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "zhuArr", {
        get: function () {
            return this._zhuArr;
        },
        set: function (value) {
            this._zhuArr = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "zhuangnum", {
        get: function () {
            return this._zhuangnum;
        },
        set: function (value) {
            this._zhuangnum = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "changebanker", {
        get: function () {
            return this._changebanker;
        },
        set: function (value) {
            this._changebanker = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "zhuangLists", {
        get: function () {
            return this._zhuangLists;
        },
        set: function (value) {
            this._zhuangLists = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isZhuang", {
        get: function () {
            return this._isZhuang;
        },
        set: function (value) {
            this._isZhuang = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "numShengyu", {
        get: function () {
            return this._numShengyu;
        },
        set: function (value) {
            this._numShengyu = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "isSys", {
        get: function () {
            return this._isSys;
        },
        set: function (value) {
            this._isSys = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "collectobj", {
        get: function () {
            return this._collectobj;
        },
        set: function (value) {
            this._collectobj = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "count1", {
        get: function () {
            return this._count1;
        },
        set: function (value) {
            this._count1 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "count2", {
        get: function () {
            return this._count2;
        },
        set: function (value) {
            this._count2 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "count3", {
        get: function () {
            return this._count3;
        },
        set: function (value) {
            this._count3 = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JinShaInfo.prototype, "ii", {
        get: function () {
            return this._ii;
        },
        set: function (value) {
            this._ii = value;
        },
        enumerable: true,
        configurable: true
    });
    return JinShaInfo;
}());
__reflect(JinShaInfo.prototype, "JinShaInfo");
