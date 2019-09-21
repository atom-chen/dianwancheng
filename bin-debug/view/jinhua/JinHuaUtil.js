var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JinHuaUtil = (function () {
    function JinHuaUtil() {
        if (JinHuaUtil.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    JinHuaUtil.getInstance = function () {
        if (this.instance == null) {
            this.instance = new JinHuaUtil();
        }
        return this.instance;
    };
    //获取筹码数量    1w  10w   100w   1000w  1y  5y
    JinHuaUtil.prototype.getBetNumber = function (index) {
        switch (index) {
            case 0:
                return Math.pow(10, 4);
            case 1:
                return Math.pow(10, 5);
            case 2:
                return 5 * Math.pow(10, 6);
            case 3:
                return Math.pow(10, 7);
            case 4:
                return 1 * Math.pow(10, 8);
            case 5:
                return 5 * Math.pow(10, 8);
        }
    };
    //提示消息类型    2开始下注  3下注结束 4 庄家通杀  5 庄家通赔
    JinHuaUtil.prototype.getMsgSource = function (type) {
        var src = '';
        switch (type) {
            case 2:
                src = 'd2';
                break;
            case 3:
                src = 'd3';
                break;
            case 4:
                src = 'd4';
                break;
            case 5:
                src = 'd5';
                break;
        }
        return src;
    };
    JinHuaUtil.prototype.getSoundEffect = function (type) {
        switch (type) {
            case 0:
                return 'bgm'; //背景音乐
            case 1:
                return 'jh.jackpot'; //自己赢得最多
            case 2:
                return 'jh.start'; //下注开始
            case 3:
                return 'jh.end'; //下注结束
            case 4:
                return 'jh.ts'; //通杀
            case 5:
                return 'jh.tp'; //通赔
            case 6:
                return 'jh.dealCard'; //发牌
            case 7:
                return 'jh.openCard'; //开牌
            case 8:
                return 'jh.stake'; //筹码
        }
    };
    JinHuaUtil.prototype.getCoinsPos = function (index) {
        var point = new egret.Point();
        switch (index) {
            case 1:
                point.x = 190;
                point.y = 510;
                break;
            case 2:
                point.x = 370;
                point.y = 510;
                break;
            case 3:
                point.x = 190;
                point.y = 650;
                break;
            case 4:
                point.x = 370;
                point.y = 650;
                break;
        }
        return point;
    };
    JinHuaUtil.prototype.getCardType = function (index) {
        switch (index) {
            case 32:
                return '豹子';
            case 16:
                return '同花顺';
            case 8:
                return '金花';
            case 4:
                return '顺子';
            case 2:
                return '对子';
            case 1:
                return '单张';
        }
    };
    //筹码类型        1000w   5000w   1y  3y  5y
    JinHuaUtil.prototype.coinsType = function (num) {
        var coinArr = [];
        var coinNum = 0;
        var src = '';
        num = Math.round(num / 10000);
        if (num > 0 && num < 10) {
            coinNum = num;
            src = 'b1a';
        }
        else if (num > 9 && num < 100) {
            coinNum = num / 10;
            src = 'b2a';
        }
        else if (num > 99 && num < 1000) {
            coinNum = num / 100;
            src = 'b3a';
        }
        else if (num > 999 && num < 10000) {
            coinNum = num / 1000;
            src = 'b4a';
        }
        else if (num > 9999 && num < 100000) {
            coinNum = num / 10000;
            src = 'b5a';
        }
        else {
            coinNum = num / 50000;
            src = 'b6a';
        }
        for (var i = 0; i < Math.round(coinNum); i++) {
            var coin = new eui.Image(src);
            var p = this.coinPos();
            coin.x = p.x;
            coin.y = p.y;
            coinArr.push(coin);
        }
        return coinArr;
    };
    JinHuaUtil.prototype.coinPos = function () {
        var p = new egret.Point();
        var index = Math.floor(Math.random() * 4);
        switch (index) {
            case 0:
                p.x = -100;
                p.y = 400;
                break;
            case 1:
                p.x = -100;
                p.y = 800;
                break;
            case 2:
                p.x = 650;
                p.y = 400;
                break;
            case 3:
                p.x = 650;
                p.y = 800;
                break;
        }
        return p;
    };
    return JinHuaUtil;
}());
JinHuaUtil.instance = null;
__reflect(JinHuaUtil.prototype, "JinHuaUtil");
