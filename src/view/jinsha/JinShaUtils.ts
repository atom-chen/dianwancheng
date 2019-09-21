/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
class JinShaUtils {
    private static instance: JinShaUtils = null;
    private jinsha: JinShaInfo;
    public constructor() {
        if (JinShaUtils.instance) {
            throw new Error("Instance is alreally exist");
        }
        this.jinsha = new JinShaInfo();
    }
    public static getInstance(): JinShaUtils {
        if (this.instance == null) {
            this.instance = new JinShaUtils();
        }
        return this.instance;
    }
    public clear(): void {
        this.jinsha = null;
    }
    public startEffect(): void {
        var result = this.jinsha.result.msg.result;
        var start = this.jinsha.end;
        var obj = JinShaUtils.getInstance().getTrueRes(result);
        var stt = obj.stt;
        this.jinsha.end = obj.end;
        //console.warn("获得到的原始结果是:" + result + "动物是:" + stt + " 转换后转盘结果:" + this.jinsha.end + " ");
        var end = 28 * 5 + this.jinsha.end - start + 1;
        //console.warn("起点start是:" + start + " 转换后end:" + end + " ");
        this.jinsha.endzhuanhuan = end;
        this.jinsha.endtime = 0;
        var namea = this.jinsha.currentArr[start].source;
        this.jinsha.currentArr[start].source = namea.replace("b", "c");
        this.jinsha.jiange = 10;
        this.jinsha.ii = start;
        if (start == 24) {
            this.jinsha.ii1 = 26;
            this.jinsha.ii2 = 25;
            this.jinsha.ii3 = 24;
        } else if (start == 25) {
            this.jinsha.ii1 = 27;
            this.jinsha.ii2 = 26;
            this.jinsha.ii3 = 25;
        } else if (start == 26) {
            this.jinsha.ii1 = 0;
            this.jinsha.ii2 = 27;
            this.jinsha.ii3 = 26;
        } else if (start == 27) {
            this.jinsha.ii1 = 2;
            this.jinsha.ii2 = 1;
            this.jinsha.ii3 = 0;
        } else {
            this.jinsha.ii1 = this.jinsha.ii + 2;
            this.jinsha.ii2 = this.jinsha.ii + 1;
            this.jinsha.ii3 = this.jinsha.ii;
        }
        this.jinsha.jiedian = 3;
        this.jinsha.isGo = true;
    }
    public initZhuangList(): void {
        this.jinsha.zhuangLists = this.jinsha.zhuangLists || [];
        var lenn = this.jinsha.zhuangLists.length;
        for (var i = 0; i < lenn; i++) {
            if (this.jinsha.zhuangLists[i]) {
                if (this.jinsha.zhuangLists[i].parent)
                    this.jinsha.zhuangLists[i].parent.removeChild(this.jinsha.zhuangLists[i]);
                ObjManage.addObj("ZhuangListItemPanel", this.jinsha.zhuangLists[i]);
            }
        }
        this.jinsha.zhuangLists = [];
    }
    public getJinSha(): JinShaInfo {
        if (this.jinsha == null) {
            this.jinsha = new JinShaInfo();
        }
        return this.jinsha;
    }
    public setZhuangItem(item): void {
        this.jinsha.zhuangLists.push(item);
    }
    public isCanQuit(): boolean {
        var arr = this.jinsha.zhuArr;
        var len = arr.length;
        var b = false;
        for (var i = 0; i < len; i++) {
            if (arr[i] > 0) {
                b = true;
                break;
            }
        }
        return b;
    }
    public manageMc(jiesuan, pushArr): void {
        if (this.jinsha.isGo) {
            if (++this.jinsha.count == this.jinsha.jiange) {
                if (this.jinsha.ii > 27) {
                    this.jinsha.ii = 0;
                }
                this.fuyuan();
                pushArr(this.jinsha.ii);
                this.jinsha.count = 0;
                if (++this.jinsha.endtime == (this.jinsha.endzhuanhuan - 3)) {
                    this.jinsha.isGo1 = false;
                    this.jinsha.isGo2 = false;
                    this.jinsha.isGo3 = false;
                    this.jinsha.jiange = 10;
                    MusicManage.playMuisc("music.stop");
                }
                if (this.jinsha.endtime == this.jinsha.endzhuanhuan) {
                    this.jinsha.isGo = false;
                    jiesuan();
                }
                if (this.jinsha.jiedian >= 0) {
                    if (--this.jinsha.jiedian == 0) {
                        this.jinsha.jiange = 1;
                        this.jinsha.jiedian = -1;
                        this.jinsha.isGo1 = true;
                        this.jinsha.isGo2 = true;
                        this.jinsha.isGo3 = true;
                        MusicManage.playMuisc("music.loop", 1, -1);
                    }
                }
                ++this.jinsha.ii;
            }
        }
        if (this.jinsha.isGo1) {
            if (this.jinsha.ii1 > 27) {
                this.jinsha.ii1 = 0;
            }
            pushArr(this.jinsha.ii1);
            ++this.jinsha.ii1;
        }
        if (this.jinsha.isGo2) {
            if (this.jinsha.ii2 > 27) {
                this.jinsha.ii2 = 0;
            }
            pushArr(this.jinsha.ii2);
            ++this.jinsha.ii2;
        }
        if (this.jinsha.isGo3) {
            if (this.jinsha.ii3 > 27) {
                this.jinsha.ii3 = 0;
            }
            pushArr(this.jinsha.ii3);
            ++this.jinsha.ii3;
        }
    }
    public fuyuan(): void {
        var len = this.jinsha.currentArr.length;
        for (var i = 0; i < len; i++) {
            var namea = this.jinsha.currentArr[i].source;
            this.jinsha.currentArr[i].source = namea.replace("c", "b");
        }
    }
    public getDanZhu(danzhu): number {
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
    }
    public jiesuan(arr, result): number {
        var len = arr.length;
        var win = 0;
        for (var i = 0; i < len; i++) {
            var bet = this.getBet(arr[i].betId);
            if (result + "" == arr[i].betId + "") {
                win += bet * arr[i].gold;
            } else {
                if (result > 4 && result < 9) {
                    if ("1" == "" + arr[i].betId) {
                        win += 2 * arr[i].gold;
                    }
                } else if (result > 8 && result < 13) {
                    if ("4" == "" + arr[i].betId) {
                        win += 2 * arr[i].gold;
                    }
                }
            }
        }

        win = win * (1 - GlobalData.user.rate);
        return win;
    }
    public getBet(num): number {
        var bet = 1;
        switch (num) {
            case 1:
                bet = 2;
                break;
            case 2:
                bet = 24;
                break;
            case 3:
                bet = 48;
                break;
            case 4:
                bet = 2;
                break;
            case 5:
                bet = 6;
                break;
            case 6:
                bet = 8;
                break;
            case 7:
                bet = 8;
                break;
            case 8:
                bet = 12;
                break;
            case 9:
                bet = 12;
                break;
            case 10:
                bet = 8;
                break;
            case 11:
                bet = 8;
                break;
            case 12:
                bet = 6;
                break;
        }
        return bet;
    }
    public getTrueRes(result): any {
        var stt = "";
        var end = 0;
        switch (result) {
            case "2"://0,8,14,22
                end = RandomUtils.randomArray([0, 8, 14, 22]);
                stt = "银鲨";
                break;
            case "3"://4 11 18 25
                end = RandomUtils.randomArray([4, 11, 18, 25]);
                stt = "金鲨";
                break;
            case "5"://21 20 19
                end = RandomUtils.randomArray([21, 20, 19]);
                stt = "燕子";
                break;
            case "6"://24 23
                end = RandomUtils.randomArray([24, 23]);
                stt = "鸽子";
                break;
            case "7"://27 26
                end = RandomUtils.randomArray([27, 26]);
                stt = "孔雀";
                break;
            case "8"://3 2 1
                end = RandomUtils.randomArray([3, 2, 1]);
                stt = "老鹰";
                break;
            case "9":// 7 6 5
                end = RandomUtils.randomArray([7, 6, 5]);
                stt = "狮子";
                break;
            case "10"://10 9
                end = RandomUtils.randomArray([10, 9]);
                stt = "熊猫";
                break;
            case "11"://13 12
                end = RandomUtils.randomArray([13, 12]);
                stt = "猴子";
                break;
            case "12"://17 16 15
                end = RandomUtils.randomArray([17, 16, 15]);
                stt = "兔子";
                break;
        }
        return { end: end, stt: stt };
    }
}