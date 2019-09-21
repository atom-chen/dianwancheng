var jsonData = "test";
var isLoadJs = "";
window.load = isNewVerson();
function setWxConfig(signPackage) {
    wx.config({
        debug: false,
        appId: signPackage.appId,  //必填,公众号的唯一标识
        timestamp: signPackage.timestamp,             //必填,生成签名的时间戳
        nonceStr: signPackage.nonceStr,             //必填,生成签名的随机串
        signature: signPackage.signature,             //必填,签名,见 http://t.cn/RL24Fgw
        jsApiList: [
            "getNetworkType",
            "getLocation",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "onMenuShareQQ",
            "onMenuShareWeibo",
            "onMenuShareQZone"//如业务需求，可继续加入其他微信JS接口
        ]
    });
}
function setShare(title, desc, imgurl, link) {
    wx.ready(function () {
        var shareData64 = {
            title: title,                         //必填,分享标题
            desc: desc,                          //选填,分享描述
            imgUrl: imgurl,                        //选填,分享图片
            link: link, //必填,可跟get参数,禁止直接使用location.href
            success: function () {
                // 用户确认分享后执行的回调函数
                //GameManage.shareSucc();
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        };
        wx.onMenuShareTimeline(shareData64);
        wx.onMenuShareAppMessage(shareData64);
    });
}
function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    return /MicroMessenger/i.test(ua);
}
function isNewVerson() {
    $.getJSON("resource/config/config.json?time=" + (Date.parse(new Date())), function (data) {
        GlobalData.configData = data;
        GlobalData.platform = data.data.platform;
        GlobalData.userfrom = data.data.userfrom;
        GlobalData.version = data.data.version;
        $.get(data.data.versonurl + "?type=1&time=" + (Date.parse(new Date())), {}, function (r) {
            var version = r;
            console.log("当前版本号是:" + version)
            if (GlobalData.isDebug) {
                login(data);
            } else {
                GlobalData.cdnResUrl = data.data.cdnurl;
                if (GlobalData.userfrom == "platform") {
                    login(data);
                } else {
                    var arr = window.location.href.split("/");
                    if (version + "" == arr[arr.length - 2]) {
                        login(data);
                    } else {
                        document.location.href = data.data.versonurl + window.location.search;
                    }
                }
            }
        });
    });
}
function regLogin(url, data, cb) {
    $.get(url, data, cb);
}
function start() {

    egret.runEgret({ renderMode: "canvas", audioType: 2 });
}
function login(data) {
    if (GlobalData.platform == "qunhei") {
        jQuery.getScript("http://m.qunhei.com/game/qhjssdk")
            .done(function () {
                isLoadJs = "complete";
            });
    }
    if (GlobalData.platform == "youxidou") {
        jQuery.getScript("//game.yxd17.com/js/sdk.js")
            .done(function () {
                isLoadJs = "complete";
            });
    }
    if (isWeiXin() == true) {
        if (GlobalData.userfrom == "weixin") {
            var ss = localStorage.getItem('wxopeniddata');
            if (ss) {
                jsonData = ss;
                start();
            } else {
                wxLogin(data);
            }
        } else {
            guestlogin();
        }
    } else {
        guestlogin();
    }
}
function wxLogin(data) {
    var code = getStr("code");
    if (code != "") {
        $.get(data.data.getinfourl + code, function (data) {
            if (data.indexOf("openid") > 0) {
                localStorage.setItem('wxopeniddata', data);
                jsonData = data;
                start();
            } else {
                console.log("进入异常显示:" + data);
                document.getElementById('fonttext').innerHTML = '缓存异常,请清空微信缓存（微信设置->退出账号<br>重新登录微信）再试!';
            }
        });
    }
    else {
        window.location.href = data.data.turnurl + "?callbackurl=" + window.location.href.split("?")[0];
    }
}
function hideDiv() {
    document.getElementById('div-a').style.display = 'none';
}
function guestlogin() {
    try {
        // localStorage.clear();
        var openid = localStorage.getItem('uuid');
        if (openid == null) {
            openid = uuid();
            localStorage.setItem('uuid', openid);
        }
        GlobalData.openid = openid;
        start();
    } catch (e) {
        alert("请关闭浏览器的无痕浏览!")
    }
}
function uuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}
function getUid() {
    var uuid = localStorage.getItem('uuid');
    if (uuid == null) {
        uuid = uuid();
        localStorage.setItem('uuid', uuid);
    }
    return uuid;
}
function getJsonData() {
    return jsonData;
}
function fahongbao(url, cb) {
    $.get(url, {}, cb);
}
function getStr(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return decodeURI(decodeURIComponent(decodeURI(r[2]))); return "";
}

function getPayInfo(url, data, cb) {
    $.get(url, data, cb);
}

function getShareInfo(url, data, cb) {
    $.get(url, data, cb);
}

function pay(url, data, cb) {
    $.post(url, data, cb);
}

function qunheipay(data) {
    if (isLoadJs == "") {
        //alert("");
    } else {
        qhsdk.pay(data, function (code, msg) {
        });
    }
}
function youxidoupay(data) {
    if (isLoadJs == "") {
        //alert("");
    } else {
        YXD.pay(data, function (msg) {
            //alert(msg)
        });
    }
}