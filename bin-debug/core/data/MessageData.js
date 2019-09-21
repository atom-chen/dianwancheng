/**
  * 服务端推送消息变量
  * by fany
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var MessageData;
(function (MessageData) {
    /**
     * 网络异常
     */
    MessageData.IO_ERROR = "io-error";
    /**
     * 服务器断开连接
     */
    MessageData.CLOSE = "close";
    MessageData.DWC_MONEY = "dwc_money";
    /**
     *  炸金花
     */
    MessageData.GOLDEN_EVENT = "golden_event";
    MessageData.NIUNIU_EVENT = "niuniu_event";
    MessageData.NOTICE_MESSAGE = "notice_message";
    MessageData.PK_EVENT = 'pk_event';
    MessageData.RESULT_JINSHA = "result";
    MessageData.START_BET = "startBet";
    MessageData.STOP_BET = "stopBet";
    MessageData.UP_BANKER = "upBanker";
    MessageData.DOWN_BANKER = "downBanker";
    MessageData.CHANGE_BANKER = "changeBanker";
    MessageData.COLLECT = "collect";
    MessageData.GLOBALCHAT = "globalChat";
    MessageData.REDPACK = "redpack";
    MessageData.DWC_PAY = "dwc_pay";
    MessageData.GAME_CHAT = "gameChat";
    //斗地主
    MessageData.JOIN = "join";
    MessageData.LEAVE = "leave";
    MessageData.READY = "ready";
    MessageData.CALLDIZHU = "calldizhu";
    MessageData.JIAOFEN = "jiaofen";
    MessageData.MAKEDIZHU = "makedizhu";
    MessageData.START = "start";
    MessageData.SENDCARD = "sendCard";
    MessageData.OPENCARD = "openCard";
    MessageData.CONCLUDE = "complete";
    MessageData.CHANGEOWNER = "changeOwner";
    MessageData.CURBET = "curbet";
    MessageData.CHUPAI = "chupai";
    MessageData.CHANGECHUPAI = "changechupai";
    MessageData.PARAERR = "paraerr";
    MessageData.PAY = "pay";
    MessageData.CLOWN_EVENT = "clown_event";
    MessageData.FRUIT_RESULT = "fruit_result";
    MessageData.FRUIT_START_BET = "fruit_startBet";
    MessageData.FRUIT_STOP_BET = "fruit_stopBet";
    MessageData.FRUIT_COLLECT = "fruit_collect";
})(MessageData || (MessageData = {}));
