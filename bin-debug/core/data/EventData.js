/**
  * 事件参数
  * by fany
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var EventData;
(function (EventData) {
    EventData.HIDE_LOADING_TXT = "HIDE_LOADING_TXT"; //创建角色
    EventData.LOGIN_REG_ROLE = "LOGIN_REG_ROLE"; //创建角色
    EventData.CREATE_ROLE = "CREATE_ROLE"; //创建角色
    EventData.UPDATE_MAIN = "UPDATE_MAIN"; //更新主界面
    EventData.UI_LOADING_COM = "UI_LOADING_COM"; //UI资源是否加载完成
    EventData.UI_COM_OPEN = "UI_COM_OPEN"; //UI资源加载完成,继续打开界面
    EventData.TXT_SCROLL_COMPLETE = "txtscrollcomplete"; //开头剧情播放完
    EventData.CREATE_SEX = "CREATE_SEX"; //创建性别
    EventData.ADD_CHAT_PLAYER = "ADD_CHAT_PLAYER"; //添加私聊对象
    EventData.ADD_FRIEND_PLAYER = "ADD_FRIEND_PLAYER"; //添加私聊对象
    EventData.INTOBLACk_FRIEND_PLAYER = "INTOBLACk_FRIEND_PLAYER"; //拉黑好友
    EventData.OUTBLACk_FRIEND_PLAYER = "OUTBLACk_FRIEND_PLAYER"; //拉黑好友
    EventData.SHOW_BOTTOM = "SHOW_BOTTOM"; //显示主界面下菜单
    EventData.FIGHT_OVER = "FIGHT_OVER"; //战斗播放结束
    EventData.STORY_OVER = "STORY_OVER"; //战斗播放结束
    EventData.GET_CHAT_PLAYERINFO = 'GET_CHAT_PLAYERINFO'; //得到聊天玩家的信息
    EventData.MAIL_UPDATA = 'MAIL_UPDATA'; //邮件更新
    EventData.GO_ON = 'GO_ON'; //
    EventData.DASHANG_NOTICE_PUBLISH = 'DASHANG_NOTICE_PUBLISH'; //通知打开打赏面板
    EventData.TASK_AFTER_COMPLETE = 'TASK_AFTER_COMPLETE'; //完成任务后的飞金币
    EventData.OPERTE_REDBOX_COMPLETE = 'OPERTE_REDBOX_COMPLETE'; //操作红包之后的金币更新
    EventData.UPDATE_PAY = "UPDATE_PAY"; //充值
    EventData.CHAT_GAME_RESULT = "CHAT_GAME_RESULT"; //收到游戏结果
    EventData.GIFT_ON_EXCHANGE = 'GIFT_ON_EXCHANGE'; //奖品  兑换奖品
    EventData.GET_FOLLOW_GOLD = 'GET_FOLLOW_GOLD'; //关注领取金币
    EventData.CLOWN_CHOOSE_CLOSE = 'CLOWN_CHOOSE_CLOSE'; //关注领取金币
})(EventData || (EventData = {}));
