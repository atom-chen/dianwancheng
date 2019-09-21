/**
  * 游戏全局参数
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module GlobalData {

  /*********************用户基础信息**********************/
  export var openid: string = "";
  export var isJoin: string = "";
  export var user: UserInfo;
  export var jssdk: JSSDK;
  export var otheruserid: string = "";
  export var otheridd: string = "";
  export var token: string = "";
  export var tableState: string = "0";//0 空闲  1，游戏中
  export var isSign: boolean = false; //是否已经签到 0未签到
  export var platform: string = "my2016";
  export var userfrom: string = "";
  export var version: string = "";
  export var account: string = "";
  export var huancun: any = null;
  //ip
  export var connectIP: string = '139.198.3.29';//211.149.207.220  kaixuan-pc
  export var connectPort: number = 7010;//54716

  export var cdnResUrl: string = '';//  
  export var curData: Array<any> = [];//54716
  //缓存聊天数据
  export var cacheChat: Object = {};

  export var configData: any = {};
  export var resurl: string = "";
  export var channelExt: string = "";

  export var isFirstShowSign: boolean = true;//是否第一次显示签到
  export var isHasShowActive: boolean = false; //是否已经显示过活动

  export var isLodingComUI: boolean = false;//UI资源是否加载完成
  export var isLodingComJinSha: boolean = false;//金鲨银鲨的资源是否加载完成
  export var isLodingComNiuNiu: boolean = false;//百人牛牛的资源是否加载完成
  export var isLodingComJinHua: boolean = false;//百人金花的资源是否加载完成
  export var isLodingComBlackJack: boolean = false;//21点的资源是否加载完成
  export var isLodingComPK: boolean = false;//竞技场的资源是否加载完成
  export var isLodingComDDZ: boolean = false;//竞技场的资源是否加载完成
  export var isLodingComClown: boolean = false;//竞技场的资源是否加载完成
  export var isLodingComFruit: boolean = false;//竞技场的资源是否加载完成
  export var hallNotice: number = -1;

  /***************************end***************************/

  /*********************用户基础配置**********************/
  export var isMusic: boolean = true;//音乐开关  
  export var isDebug: boolean = true;//调试模式
  export var isLogin: boolean = false;
  export var isComplete: boolean = false;//是否连接成功服务器
  export var isLoadingMcCom: boolean = false;//MC加载完成
  export var isLoadingThemCom: boolean = false;//皮肤文件加载完成
  export var isLoadingResCom: boolean = false;//资源文件加载完成

  /***************************end***************************/
} 