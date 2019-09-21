/**
  * 简单对象管理类
  * by fany
  * (c) copyright false,0,0,2015 - 2035
  * All Rights Reserved.
  * 面板的管理类
  */
var PokerManage;
(function (PokerManage) {
    function paixu(arr, pokerArr) {
        pokerArr = pokerArr || [];
        var lenn = arr.length;
        for (var i = 0; i < lenn; i++) {
            var poker = null;
            if (arr[i] + "" == "15") {
                poker = { k: 0, v: 16, y: arr[i] };
            }
            else if (arr[i] + "" == "16") {
                poker = { k: 0, v: 17, y: arr[i] };
            }
            else {
                if ((arr[i] + "").charAt(1) == "0") {
                    var value = (arr[i] + "").charAt(2) + "";
                    if (value == "1") {
                        value = "14";
                    }
                    else if (value == "2") {
                        value = "15";
                    }
                    poker = { k: (arr[i] + "").charAt(0) + "", v: value + "", y: arr[i] + "" };
                }
                else {
                    poker = { k: (arr[i] + "").charAt(0) + "", v: (arr[i] + "").charAt(1) + (arr[i] + "").charAt(2) + "", y: arr[i] + "" };
                }
            }
            if (poker.k + "" == "1") {
                poker.v = (parseInt(poker.v) - 1) * 4 + 4;
            }
            else if (poker.k + "" == "2") {
                poker.v = (parseInt(poker.v) - 1) * 4 + 3;
            }
            else if (poker.k + "" == "3") {
                poker.v = (parseInt(poker.v) - 1) * 4 + 2;
            }
            else {
                poker.v = (parseInt(poker.v) - 1) * 4 + 1;
            }
            pokerArr.push(poker);
        }
        pokerArr.sort(QuickManage.sortMoreFun(["v"], [1]));
        return pokerArr;
    }
    PokerManage.paixu = paixu;
    function chupai(chus, pokers) {
        var len = chus.length;
        var lenn = pokers.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < lenn; j++) {
                if (chus[i] == pokers[j].y) {
                    pokers.splice(j, 1);
                    break;
                }
            }
        }
        pokers.sort(QuickManage.sortMoreFun(["v"], [1]));
    }
    PokerManage.chupai = chupai;
    function chupai2(chus, pokers) {
        var len = chus.length;
        var lenn = pokers.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < lenn; j++) {
                if (chus[i] == pokers[j].y) {
                    pokers.splice(j, 1);
                    break;
                }
            }
        }
        pokers.sort(QuickManage.sortMoreFun(["v"], [1]));
    }
    PokerManage.chupai2 = chupai2;
    function jia3zhang(jias, pokers) {
        var len = jias.length;
        var lenn = pokers.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < lenn; j++) {
                if (jias[i] == pokers[j]) {
                    pokers.splice(i, 1);
                }
            }
        }
        pokers.sort(QuickManage.sortMoreFun(["v"], [1]));
    }
    PokerManage.jia3zhang = jia3zhang;
})(PokerManage || (PokerManage = {}));
