/**
  * 服务端推送消息变量
  * by fany
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module MessageData {
  /**
   * 网络异常
   */
  export var IO_ERROR: string = "io-error";

  /**
   * 服务器断开连接
   */
  export var CLOSE: string = "close";

  export var DWC_MONEY: string = "dwc_money";
  /**
   *  炸金花
   */
  export var GOLDEN_EVENT: string = "golden_event";
  export var NIUNIU_EVENT: string = "niuniu_event";
  export var NOTICE_MESSAGE: string = "notice_message";
  export var PK_EVENT: string = 'pk_event';

  export var RESULT_JINSHA: string = "result";
  export var START_BET: string = "startBet";
  export var STOP_BET: string = "stopBet";
  export var UP_BANKER: string = "upBanker";
  export var DOWN_BANKER: string = "downBanker";
  export var CHANGE_BANKER: string = "changeBanker";
  export var COLLECT: string = "collect";
  export var GLOBALCHAT: string = "globalChat";
  export var REDPACK: string = "redpack";
  export var DWC_PAY: string = "dwc_pay";
  export var GAME_CHAT: string = "gameChat";

  //斗地主
  export var JOIN: string = "join";
  export var LEAVE: string = "leave";
  export var READY: string = "ready";
  export var CALLDIZHU: string = "calldizhu";
  export var JIAOFEN: string = "jiaofen";
  export var MAKEDIZHU: string = "makedizhu";
  export var START: string = "start";
  export var SENDCARD: string = "sendCard";
  export var OPENCARD: string = "openCard";
  export var CONCLUDE: string = "complete";
  export var CHANGEOWNER: string = "changeOwner";
  export var CURBET: string = "curbet";
  export var CHUPAI: string = "chupai";
  export var CHANGECHUPAI: string = "changechupai";
  export var PARAERR: string = "paraerr";
  export var PAY: string = "pay";
  export var CLOWN_EVENT: string = "clown_event";

  export var FRUIT_RESULT: string = "fruit_result";
  export var FRUIT_START_BET: string = "fruit_startBet";
  export var FRUIT_STOP_BET: string = "fruit_stopBet";
  export var FRUIT_COLLECT: string = "fruit_collect";
}