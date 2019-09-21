/**
  * 快捷创建
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved. 
  * 快捷创建
  */
module QuickManage {
    /**
     *快速创建动画
     * @param res   资源名称如果资源名称为mc_png或者mc_json,那么这里的res值就传mc
     * */
    export function createMc(res): egret.MovieClip {
        var data = RES.getRes(res + "_json");
        var txtr = RES.getRes(res + "_png");

        var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(res));
        return mc;
    }
    /**
     * 快速创建二维码
     * @param res   资源名称类似resource/assets/bg/bg14.jpg
     * */
    export function openEr(res): void {
        var gameDiv = document.getElementById("gameDiv");
        this.myImg = document.createElement("img");
        this.myImg.src = res;
        this.myImg.style.width = "100%";
        this.myImg.style.height = "100%";
        this.myImg.style.position = "absolute";
        gameDiv.appendChild(this.myImg);

        //gameDiv.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickc,false);
        this.myImg.onclick = this.clickc.bind(this);
    }
    export function clickc(): void {
        var gameDiv = document.getElementById("gameDiv");
        gameDiv.removeChild(this.myImg);
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.GET_FOLLOW_GOLD));
    }

    /**
     * 中文每个字长度是4，数字是2
     * @param _str
     * @param _len
     */
    export function getChar(_str: string, _len: number): string {
        var _ba: egret.ByteArray = new egret.ByteArray;
        _ba.writeUTFBytes(_str);
        if (_ba.length < _len) return _str;
        _ba.position = 0;
        return _ba.readUTFBytes(_len) + "...";
    }
    /**
    * 生成范围内随机数
    * @param min,max
    * */
    export function getRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    export function $GET(name: string) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return decodeURI(decodeURIComponent(decodeURI(r[2]))); return "";
    }

    export function moneyStr(money: number): string {
        if (money >= 10000 && money < 100000000) {
            return QuickManage.get2Num(money / 10000) + "万";
        } else if (money >= 100000000) {
            return QuickManage.get2Num(money / 100000000) + "亿";
        } else {
            return money + "";
        }
    }
    export function get2Num(num: number): string {
        var str = num.toFixed(3);
        str = str.substr(0, str.length - 1);;
        var arr = str.split(".");
        if (arr[1] + "" == "00") {
            return arr[0] + "";
        }
        return str + "";
    }
    export function moneyStr2number(str: string): number {
        var money = 0;
        if (str.indexOf("万") != -1) {
            money = parseInt(str.replace("万", "")) * 10000;
        } else if (str.indexOf("亿") != -1) {
            money = parseInt(str.replace("亿", "")) * 100000000;
        } else {
            money = parseInt(str);
        }
        return money;
    }
    /**
     *数组里交换
     */
    export function swapArr(arr, index1, index2): Array<any> {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    };

    /*
  * 获取url参数值，没有返回null
  * 不传递paraUrl参数默认获取当前url
  * */
    export function getPara(paraName: string, paraUrl?: string): string {
        if (egret.Capabilities.runtimeType == egret.MainContext.RUNTIME_NATIVE) return null;
        var url = paraUrl || location.href;
        if (url.indexOf("?") != -1) {
            var urlPara = "&" + url.split("?")[1];
            var reg = new RegExp("\&" + paraName + "\=.*?(?:\&|$)");
            var result = reg.exec(urlPara);
            if (result) {
                var value: string = result[0];
                return value.split("&")[1].split("=")[1];
            }
        }
        return null;
    }

    /*
     * 给Url参数赋值
     * 不传递paraUrl参数默认获取当前url
     * */
    export function setProperty(paraName: string, paraValue: string, paraUrl?: string): string {
        var url = paraUrl || location.href;
        var urlPara = "&" + url.split("?")[1];
        if (url.indexOf("?") == -1) {
            return url += "?" + paraName + "=" + paraValue;
        } else {
            var urlPara = url.split("?")[1];
            if (urlPara == "")
                return url += paraName + "=" + paraValue;
            var regParaKV = new RegExp("(?:^|\&)" + paraName + "\=.*?(?:\&|$)");
            var result = regParaKV.exec(urlPara);
            if (!result || result[0] == "") {
                return url += "&" + paraName + "=" + paraValue;
            } else {
                var oldValue = result[0];
                var regParaKey = new RegExp("\=.*$");
                var newValue = oldValue.replace(regParaKey, "=" + paraValue);
                return url.replace(oldValue, newValue);
            }
        }
    }

    /*
     * 检查url中是否包含某参数
     * 这代码有一个例外就是paraName = "undefined", paraUrl中不含"?"会返回true
     * 相信你不会这么用的 =.=
     * */
    export function hasProperty(paraName: string, paraUrl?: string): boolean {
        var url = paraUrl || location.href;
        var para = "&" + url.split("?")[1]; //加&是为了把&作为参数名开始=作为参数名结束，防止uid=1&id=2此类误判
        return para.indexOf("&" + paraName + "=") != -1;
    }
    /*
     *设置不可点击
     * */
    export function setTouchEnabled(view): void {
        var len = view.numChildren;
        for (var index = 0; index < len; index++) {
            var child = view.getChildAt(index);
            if (child) {
                child.touchEnabled = false;
            }
        }
    }
    export var erweima: egret.Sprite;
    /*
     *设置不可点击
     * */
    export function tiaoshi(e): void {
        //console.log(e);
    }
    export function sortMoreFun(strarr: any[], sortarr: any[] = null) {
        return function (obj1, obj2) {
            var valarr: number[] = [];
            var sorlen: number = 0;
            if (sortarr) sorlen = sortarr.length;
            var chanum: number;
            for (var b in strarr) {
                //b = parseInt(b);
                var bb: number = parseInt(b);
                chanum = parseInt(obj1[strarr[bb]]) - parseInt(obj2[strarr[bb]]);
                if (chanum == 0) {
                    continue;
                } else {
                    if (sorlen > bb && sortarr[bb] == 0) {
                        return chanum;
                    } else {
                        return -chanum;
                    }
                }
            }
            return 0;
        }
    }
    export function formatMoney(s, type = 0) {
        if (/[^0-9\.]/.test(s))
            return "0";
        if (s == null || s == "")
            return "0";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
            s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {// 不带小数位(默认是有小数位)  
            var a = s.split(".");
            if (a[1] == "00") {
                s = a[0];
            }
        }
        return s;
    }
}
