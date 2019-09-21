/**
  * 快捷创建
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 快捷创建
  */
var QuickManage;
(function (QuickManage) {
    /**
     *快速创建动画
     * @param res   资源名称如果资源名称为mc_png或者mc_json,那么这里的res值就传mc
     * */
    function createMc(res) {
        var data = RES.getRes(res + "_json");
        var txtr = RES.getRes(res + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(res));
        return mc;
    }
    QuickManage.createMc = createMc;
    /**
     * 快速创建二维码
     * @param res   资源名称类似resource/assets/bg/bg14.jpg
     * */
    function openEr(res) {
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
    QuickManage.openEr = openEr;
    function clickc() {
        var gameDiv = document.getElementById("gameDiv");
        gameDiv.removeChild(this.myImg);
        lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.GET_FOLLOW_GOLD));
    }
    QuickManage.clickc = clickc;
    /**
     * 中文每个字长度是4，数字是2
     * @param _str
     * @param _len
     */
    function getChar(_str, _len) {
        var _ba = new egret.ByteArray;
        _ba.writeUTFBytes(_str);
        if (_ba.length < _len)
            return _str;
        _ba.position = 0;
        return _ba.readUTFBytes(_len) + "...";
    }
    QuickManage.getChar = getChar;
    /**
    * 生成范围内随机数
    * @param min,max
    * */
    function getRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    QuickManage.getRandomNum = getRandomNum;
    function $GET(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(decodeURIComponent(decodeURI(r[2])));
        return "";
    }
    QuickManage.$GET = $GET;
    function moneyStr(money) {
        if (money >= 10000 && money < 100000000) {
            return QuickManage.get2Num(money / 10000) + "万";
        }
        else if (money >= 100000000) {
            return QuickManage.get2Num(money / 100000000) + "亿";
        }
        else {
            return money + "";
        }
    }
    QuickManage.moneyStr = moneyStr;
    function get2Num(num) {
        var str = num.toFixed(3);
        str = str.substr(0, str.length - 1);
        ;
        var arr = str.split(".");
        if (arr[1] + "" == "00") {
            return arr[0] + "";
        }
        return str + "";
    }
    QuickManage.get2Num = get2Num;
    function moneyStr2number(str) {
        var money = 0;
        if (str.indexOf("万") != -1) {
            money = parseInt(str.replace("万", "")) * 10000;
        }
        else if (str.indexOf("亿") != -1) {
            money = parseInt(str.replace("亿", "")) * 100000000;
        }
        else {
            money = parseInt(str);
        }
        return money;
    }
    QuickManage.moneyStr2number = moneyStr2number;
    /**
     *数组里交换
     */
    function swapArr(arr, index1, index2) {
        arr[index1] = arr.splice(index2, 1, arr[index1])[0];
        return arr;
    }
    QuickManage.swapArr = swapArr;
    ;
    /*
  * 获取url参数值，没有返回null
  * 不传递paraUrl参数默认获取当前url
  * */
    function getPara(paraName, paraUrl) {
        if (egret.Capabilities.runtimeType == egret.MainContext.RUNTIME_NATIVE)
            return null;
        var url = paraUrl || location.href;
        if (url.indexOf("?") != -1) {
            var urlPara = "&" + url.split("?")[1];
            var reg = new RegExp("\&" + paraName + "\=.*?(?:\&|$)");
            var result = reg.exec(urlPara);
            if (result) {
                var value = result[0];
                return value.split("&")[1].split("=")[1];
            }
        }
        return null;
    }
    QuickManage.getPara = getPara;
    /*
     * 给Url参数赋值
     * 不传递paraUrl参数默认获取当前url
     * */
    function setProperty(paraName, paraValue, paraUrl) {
        var url = paraUrl || location.href;
        var urlPara = "&" + url.split("?")[1];
        if (url.indexOf("?") == -1) {
            return url += "?" + paraName + "=" + paraValue;
        }
        else {
            var urlPara = url.split("?")[1];
            if (urlPara == "")
                return url += paraName + "=" + paraValue;
            var regParaKV = new RegExp("(?:^|\&)" + paraName + "\=.*?(?:\&|$)");
            var result = regParaKV.exec(urlPara);
            if (!result || result[0] == "") {
                return url += "&" + paraName + "=" + paraValue;
            }
            else {
                var oldValue = result[0];
                var regParaKey = new RegExp("\=.*$");
                var newValue = oldValue.replace(regParaKey, "=" + paraValue);
                return url.replace(oldValue, newValue);
            }
        }
    }
    QuickManage.setProperty = setProperty;
    /*
     * 检查url中是否包含某参数
     * 这代码有一个例外就是paraName = "undefined", paraUrl中不含"?"会返回true
     * 相信你不会这么用的 =.=
     * */
    function hasProperty(paraName, paraUrl) {
        var url = paraUrl || location.href;
        var para = "&" + url.split("?")[1]; //加&是为了把&作为参数名开始=作为参数名结束，防止uid=1&id=2此类误判
        return para.indexOf("&" + paraName + "=") != -1;
    }
    QuickManage.hasProperty = hasProperty;
    /*
     *设置不可点击
     * */
    function setTouchEnabled(view) {
        var len = view.numChildren;
        for (var index = 0; index < len; index++) {
            var child = view.getChildAt(index);
            if (child) {
                child.touchEnabled = false;
            }
        }
    }
    QuickManage.setTouchEnabled = setTouchEnabled;
    /*
     *设置不可点击
     * */
    function tiaoshi(e) {
        //console.log(e);
    }
    QuickManage.tiaoshi = tiaoshi;
    function sortMoreFun(strarr, sortarr) {
        if (sortarr === void 0) { sortarr = null; }
        return function (obj1, obj2) {
            var valarr = [];
            var sorlen = 0;
            if (sortarr)
                sorlen = sortarr.length;
            var chanum;
            for (var b in strarr) {
                //b = parseInt(b);
                var bb = parseInt(b);
                chanum = parseInt(obj1[strarr[bb]]) - parseInt(obj2[strarr[bb]]);
                if (chanum == 0) {
                    continue;
                }
                else {
                    if (sorlen > bb && sortarr[bb] == 0) {
                        return chanum;
                    }
                    else {
                        return -chanum;
                    }
                }
            }
            return 0;
        };
    }
    QuickManage.sortMoreFun = sortMoreFun;
    function formatMoney(s, type) {
        if (type === void 0) { type = 0; }
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
        if (type == 0) {
            var a = s.split(".");
            if (a[1] == "00") {
                s = a[0];
            }
        }
        return s;
    }
    QuickManage.formatMoney = formatMoney;
})(QuickManage || (QuickManage = {}));
