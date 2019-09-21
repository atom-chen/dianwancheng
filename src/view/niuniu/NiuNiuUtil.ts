class NiuNiuUtil {
    private static instance: NiuNiuUtil = null;
    public constructor() {
        if (NiuNiuUtil.instance) {
            throw new Error("Instance is alreally exist");
        }
    }

    public static getInstance(): NiuNiuUtil {
        if (this.instance == null) {
            this.instance = new NiuNiuUtil();
        }
        return this.instance;
    }

    //获取筹码数量    1w  10w     100w    1000w   5000w   1y
    public getBetNumber(index): number {
        switch (index) {
            case 0:
                return Math.pow(10, 4);
            case 1:
                return Math.pow(10, 5);
            case 2:
                return Math.pow(10, 6);
            case 3:
                return Math.pow(10, 7);
            case 4:
                return 5 * Math.pow(10, 7);
            case 5:
                return Math.pow(10, 8);
        }
    }

    //提示消息类型    2开始下注  3下注结束 4 庄家通杀  5 庄家通赔
    public getMsgSource(type): string {
        var src = '';
        switch (type) {
            case 2:
                src = 'nn.d2'
                break;
            case 3:
                src = 'nn.d3'
                break;
            case 4:
                src = 'nn.d4'
                break;
            case 5:
                src = 'nn.d5'
                break;
        }
        return src;
    }

    public getCoinsPos(index): egret.Point {
        var point: egret.Point = new egret.Point();
        switch (index) {
            case 1:
                point.x = 195;
                point.y = 523;
                break;
            case 2:
                point.x = 383;
                point.y = 523;
                break;
            case 3:
                point.x = 195;
                point.y = 633;
                break;
            case 4:
                point.x = 383;
                point.y = 633;
                break;
        }
        return point;
    }

    public getCardType2(index): string {
        switch (index) {
            case 0:
                return '无牛';
            case 1:
                return '牛一';
            case 2:
                return '牛二';
            case 3:
                return '牛三';
            case 4:
                return '牛四';
            case 5:
                return '牛五';
            case 6:
                return '牛六';
            case 7:
                return '牛七';
            case 8:
                return '牛八';
            case 9:
                return '牛九';
            case 10:
                return '牛牛';
            case 11:
                return '四炸';
            case 12:
                return '五花牛';
            case 13:
                return '五小牛';
        }
    }
    public getCardType(index): string {
        switch (index) {
            case 0:
                return 'nn.n1';
            case 1:
                return 'nn.n2';
            case 2:
                return 'nn.n3';
            case 3:
                return 'nn.n4';
            case 4:
                return 'nn.n5';
            case 5:
                return 'nn.n6';
            case 6:
                return 'nn.n7';
            case 7:
                return 'nn.n8';
            case 8:
                return 'nn.n9';
            case 9:
                return 'nn.n10';
            case 10:
                return 'nn.n11';
            case 11:
                return 'nn.n13';
            case 12:
                return 'nn.n14';
            case 13:
                return 'nn.n12';
        }
    }
    public getCardMusicType(index): string {
        switch (index) {
            case 0:
                return 'nn.niu0';
            case 1:
                return 'nn.niu1';
            case 2:
                return 'nn.niu2';
            case 3:
                return 'nn.niu3';
            case 4:
                return 'nn.niu4';
            case 5:
                return 'nn.niu5';
            case 6:
                return 'nn.niu6';
            case 7:
                return 'nn.niu7';
            case 8:
                return 'nn.niu8';
            case 9:
                return 'nn.niu9';
            case 10:
                return 'nn.niuniu';
            case 11:
                return 'nn.playNiuZhadan';
            case 12:
                return 'nn.playNiu5hua';
            case 13:
                return 'nn.playNiuXiao5';
        }
    }

    //筹码类型
    public coinsType(num): Array<eui.Image> {
        var coinArr = [];
        var coinNum: number = 0;
        var src: string = '';
        num = Math.round(num / 10000);
        if (num > 0 && num < 10) {  //1w
            coinNum = num;
            src = 'nn.b1a';
        }
        else if (num > 9 && num < 100) {    //10w
            coinNum = num / 10;
            src = 'nn.b2a';
        }
        else if (num > 99 && num < 1000) {  //100w
            coinNum = num / 100;
            src = 'nn.b3a';
        }
        else if (num > 999 && num < 5000) { //1000w
            coinNum = num / 1000;
            src = 'nn.b4a';
        }
        else if (num > 4999 && num < 10000) { //5000w
            coinNum = num / 5000;
            src = 'nn.b5a';
        }
        else {  //1y
            coinNum = num / 10000;
            src = 'nn.b6a';
        }
        // if (num > 9 && num < 50) {
        //     coinNum = num / 10;
        //     src = 'nn.b1a';
        // }
        // else if (num > 49 && num < 100) {
        //     coinNum = num / 50;
        //     src = 'nn.b2a';
        // }
        // else if (num > 99 && num < 500) {
        //     coinNum = num / 100;
        //     src = 'nn.b3a';
        // }
        // else if (num > 499 && num < 1000) {
        //     coinNum = num / 500;
        //     src = 'nn.b4a';
        // }
        // else if (num > 999 && num < 5000) {
        //     coinNum = num / 1000;
        //     src = 'nn.b5a';
        // }
        // else {
        //     coinNum = num / 5000;
        //     src = 'nn.b6a';
        // }
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

    public getSoundEffect(type): string {
        switch (type) {
            case 0:
                return 'bgm';    //背景音乐
            case 1:
                return 'nn.jackpot'; //自己赢得最多
            case 2:
                return 'nn.start';   //下注开始
            case 3:
                return 'nn.end'; //下注结束
            case 4:
                return 'nn.ts';  //通杀
            case 5:
                return 'nn.tp';  //通赔
            case 6:
                return 'nn.dealCard';  //发牌
            case 7:
                return 'nn.openCard';  //开牌
            case 8:
                return 'nn.stake';   //筹码
        }
    }
}