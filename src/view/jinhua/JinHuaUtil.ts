class JinHuaUtil {
    private static instance: JinHuaUtil = null;
    public constructor() {
        if (JinHuaUtil.instance) {
            throw new Error("Instance is alreally exist");
        }
    }

    public static getInstance(): JinHuaUtil {
        if (this.instance == null) {
            this.instance = new JinHuaUtil();
        }
        return this.instance;
    }

    //获取筹码数量    1w  10w   100w   1000w  1y  5y
    public getBetNumber(index): number {
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
    }

    //提示消息类型    2开始下注  3下注结束 4 庄家通杀  5 庄家通赔
    public getMsgSource(type): string {
        var src = '';
        switch (type) {
            case 2:
                src = 'd2'
                break;
            case 3:
                src = 'd3'
                break;
            case 4:
                src = 'd4'
                break;
            case 5:
                src = 'd5'
                break;
        }
        return src;
    }

    public getSoundEffect(type): string {
        switch (type) {
            case 0:
                return 'bgm';    //背景音乐
            case 1:
                return 'jh.jackpot'; //自己赢得最多
            case 2:
                return 'jh.start';   //下注开始
            case 3:
                return 'jh.end'; //下注结束
            case 4:
                return 'jh.ts';  //通杀
            case 5:
                return 'jh.tp';  //通赔
            case 6:
                return 'jh.dealCard';  //发牌
            case 7:
                return 'jh.openCard';  //开牌
            case 8:
                return 'jh.stake';   //筹码
        }
    }

    public getCoinsPos(index): egret.Point {
        var point: egret.Point = new egret.Point();
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
    }

    public getCardType(index): string {
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
    }

    //筹码类型        1000w   5000w   1y  3y  5y
    public coinsType(num): Array<eui.Image> {
        var coinArr = [];
        var coinNum: number = 0;
        var src: string = '';
        num = Math.round(num / 10000);
        if (num > 0 && num < 10) {  //1w
            coinNum = num;
            src = 'b1a';
        }
        else if (num > 9 && num < 100) {   //1000w---10w
            coinNum = num / 10;
            src = 'b2a';
        }
        else if (num > 99 && num < 1000) {   //5000w---100w
            coinNum = num / 100;
            src = 'b3a';
        }
        else if (num > 999 && num < 10000) { //1y----1000w
            coinNum = num / 1000;
            src = 'b4a';
        }
        else if (num > 9999 && num < 100000) { //3y---1y
            coinNum = num / 10000;
            src = 'b5a';
        }
        else {  //5y
            coinNum = num / 50000;
            src = 'b6a';
        }
        for (var i = 0; i < Math.round(coinNum); i++) {
            var coin: eui.Image = new eui.Image(src);
            var p: egret.Point = this.coinPos();
            coin.x = p.x;
            coin.y = p.y;
            coinArr.push(coin);
        }
        return coinArr;
    }

    private coinPos(): egret.Point {
        var p: egret.Point = new egret.Point();
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
    }
}