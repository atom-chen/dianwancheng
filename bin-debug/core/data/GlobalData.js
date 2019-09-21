/**
  * 游戏全局参数
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var GlobalData;
(function (GlobalData) {
    /*********************用户基础信息**********************/
    GlobalData.openid = "";
    GlobalData.isJoin = "";
    GlobalData.otheruserid = "";
    GlobalData.otheridd = "";
    GlobalData.token = "";
    GlobalData.tableState = "0"; //0 空闲  1，游戏中
    GlobalData.isSign = false; //是否已经签到 0未签到
    GlobalData.platform = "my2016";
    GlobalData.userfrom = "";
    GlobalData.version = "";
    GlobalData.account = "";
    GlobalData.huancun = null;
    //ip
    GlobalData.connectIP = '139.198.3.29'; //211.149.207.220  kaixuan-pc
    GlobalData.connectPort = 7010; //54716
    GlobalData.cdnResUrl = ''; //  
    GlobalData.curData = []; //54716
    //缓存聊天数据
    GlobalData.cacheChat = {};
    GlobalData.configData = {};
    GlobalData.resurl = "";
    GlobalData.channelExt = "";
    GlobalData.isFirstShowSign = true; //是否第一次显示签到
    GlobalData.isHasShowActive = false; //是否已经显示过活动
    GlobalData.isLodingComUI = false; //UI资源是否加载完成
    GlobalData.isLodingComJinSha = false; //金鲨银鲨的资源是否加载完成
    GlobalData.isLodingComNiuNiu = false; //百人牛牛的资源是否加载完成
    GlobalData.isLodingComJinHua = false; //百人金花的资源是否加载完成
    GlobalData.isLodingComBlackJack = false; //21点的资源是否加载完成
    GlobalData.isLodingComPK = false; //竞技场的资源是否加载完成
    GlobalData.isLodingComDDZ = false; //竞技场的资源是否加载完成
    GlobalData.isLodingComClown = false; //竞技场的资源是否加载完成
    GlobalData.isLodingComFruit = false; //竞技场的资源是否加载完成
    GlobalData.hallNotice = -1;
    /***************************end***************************/
    /*********************用户基础配置**********************/
    GlobalData.isMusic = true; //音乐开关  
    GlobalData.isDebug = false; //调试模式
    GlobalData.isLogin = false;
    GlobalData.isComplete = false; //是否连接成功服务器
    GlobalData.isLoadingMcCom = false; //MC加载完成
    GlobalData.isLoadingThemCom = false; //皮肤文件加载完成
    GlobalData.isLoadingResCom = false; //资源文件加载完成
    /***************************end***************************/
})(GlobalData || (GlobalData = {}));
