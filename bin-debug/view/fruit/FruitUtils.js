var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
var FruitUtils = (function () {
    function FruitUtils() {
        if (FruitUtils.instance) {
            throw new Error("Instance is alreally exist");
        }
        this.fruit = new FruitInfo();
    }
    FruitUtils.getInstance = function () {
        if (this.instance == null) {
            this.instance = new FruitUtils();
        }
        return this.instance;
    };
    FruitUtils.prototype.clear = function () {
        this.fruit = null;
    };
    FruitUtils.prototype.startEffect = function () {
        var result = this.fruit.result.msg.result;
        var start = this.fruit.end;
        var obj = FruitUtils.getInstance().getTrueRes(result);
        var stt = obj.stt;
        this.fruit.end = obj.end;
        //this.fruit.endzhuanhuan = 22 * 5 + this.fruit.end + 1;
        this.fruit.endzhuanhuan = 22 * 5 + this.fruit.end - start + 1;
        this.fruit.endtime = 0;
        var namea = this.fruit.currentArr[start].source;
        this.fruit.currentArr[start].source = namea.replace("b", "c");
        this.fruit.jiange = 10;
        this.fruit.ii = start;
        this.fruit.jiedian = 3;
        this.fruit.isGo = true;
    };
    FruitUtils.prototype.getFruit = function () {
        if (this.fruit == null) {
            this.fruit = new FruitInfo();
        }
        return this.fruit;
    };
    FruitUtils.prototype.isCanQuit = function () {
        var arr = this.fruit.zhuArr;
        var len = arr.length;
        var b = false;
        for (var i = 0; i < len; i++) {
            if (arr[i] > 0) {
                b = true;
                break;
            }
        }
        return b;
    };
    FruitUtils.prototype.manageMc = function (jiesuan, pushArr) {
        if (this.fruit.isGo) {
            if (++this.fruit.count == this.fruit.jiange) {
                this.fuyuan();
                pushArr(this.fruit.ii++);
                if (this.fruit.isGo1) {
                    pushArr(this.fruit.ii1);
                    pushArr(this.fruit.ii2);
                    pushArr(this.fruit.ii3);
                }
                this.fruit.count = 0;
                if (++this.fruit.endtime == (this.fruit.endzhuanhuan - 4)) {
                    this.fruit.isGo1 = false;
                    this.fruit.jiange = 10;
                    MusicManage.playMuisc("fruit_stop");
                }
                if (this.fruit.endtime == this.fruit.endzhuanhuan) {
                    this.fruit.isGo = false;
                    // var len = this.fruit.currentArr.length;
                    // for (var i = 0; i < len; i++) {
                    //     var namea = this.fruit.currentArr[i].source;
                    //     this.fruit.currentArr[i].source = namea.replace("c", "b");
                    // }
                    // console.log(this.fruit.end)
                    // pushArr(this.fruit.end);
                    jiesuan();
                }
                if (this.fruit.jiedian >= 0) {
                    if (--this.fruit.jiedian == 0) {
                        this.fruit.jiange = 1;
                        this.fruit.jiedian = -1;
                        this.fruit.isGo1 = true;
                        MusicManage.playMuisc("fruit_loop", 1, -1);
                    }
                }
            }
        }
    };
    FruitUtils.prototype.fuyuan = function () {
        if (this.fruit.ii > 21) {
            this.fruit.ii = 0;
        }
        if (this.fruit.ii == 0) {
            this.fruit.ii1 = 21;
            this.fruit.ii2 = 20;
            this.fruit.ii3 = 19;
        }
        else if (this.fruit.ii == 1) {
            this.fruit.ii1 = 0;
            this.fruit.ii2 = 21;
            this.fruit.ii3 = 20;
        }
        else if (this.fruit.ii == 2) {
            this.fruit.ii1 = 1;
            this.fruit.ii2 = 0;
            this.fruit.ii3 = 21;
        }
        else {
            this.fruit.ii1 = this.fruit.ii - 1;
            this.fruit.ii2 = this.fruit.ii - 2;
            this.fruit.ii3 = this.fruit.ii - 3;
        }
        var len = this.fruit.currentArr.length;
        for (var i = 0; i < len; i++) {
            var namea = this.fruit.currentArr[i].source;
            this.fruit.currentArr[i].source = namea.replace("c", "b");
        }
    };
    FruitUtils.prototype.getDanZhu = function (danzhu) {
        var dz = 0;
        switch (danzhu) {
            case "1000":
                dz = 10000;
                break;
            case "10000":
                dz = 100000;
                break;
            case "100000":
                dz = 500000;
                break;
            case "500000":
                dz = 1000000;
                break;
            case "1000000":
                dz = 5000000;
                break;
            case "5000000":
                dz = 10000000;
                break;
            case "10000000":
                dz = 50000000;
                break;
            case "50000000":
                dz = 1000;
                break;
            default:
                dz = 10000;
                break;
        }
        return dz;
    };
    FruitUtils.prototype.jiesuan = function (arr, result) {
        var len = arr.length;
        var win = 0;
        for (var i = 0; i < len; i++) {
            var bet = this.getBet(arr[i].betId);
            if ((result + "" == arr[i].betId + "") || (result + "" == "9")) {
                win += bet * arr[i].gold;
            }
        }
        win = win * (1 - GlobalData.user.rate);
        return win;
    };
    FruitUtils.prototype.getBet = function (num) {
        var bet = 1;
        switch (num) {
            case 1:
                bet = 100;
                break;
            case 2:
                bet = 50;
                break;
            case 3:
                bet = 20;
                break;
            case 4:
                bet = 15;
                break;
            case 5:
                bet = 8;
                break;
            case 6:
                bet = 5;
                break;
            case 7:
                bet = 3;
                break;
            case 8:
                bet = 2;
                break;
        }
        return bet;
    };
    FruitUtils.prototype.getTrueRes = function (result) {
        var stt = "";
        var end = 0;
        switch (result) {
            case "1":
                end = 3;
                stt = "77";
                break;
            case "2":
                end = 14;
                stt = "西瓜";
                break;
            case "3":
                end = RandomUtils.randomArray([9, 20]);
                stt = "樱桃";
                break;
            case "4":
                end = RandomUtils.randomArray([10, 21]);
                stt = "葡萄";
                break;
            case "5":
                end = RandomUtils.randomArray([4, 15]);
                stt = "草莓";
                break;
            case "6":
                end = RandomUtils.randomArray([0, 5, 11, 16]);
                stt = "柚子";
                break;
            case "7":
                end = RandomUtils.randomArray([1, 6, 12, 17]);
                stt = "橘子";
                break;
            case "8":
                end = RandomUtils.randomArray([2, 7, 13, 18]);
                stt = "苹果";
                break;
            case "9":
                end = RandomUtils.randomArray([19, 8]);
                stt = "loucky";
                break;
        }
        return { end: end, stt: stt };
    };
    return FruitUtils;
}());
FruitUtils.instance = null;
__reflect(FruitUtils.prototype, "FruitUtils");
