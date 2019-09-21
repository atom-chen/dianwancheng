/**
  * 前后端协议
  * by fany
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
module Protocol {
  export var GAME_GOLD_REDBOX: string = 'golden.goldenHandler.redPack';//发红包 炸金花
  export var GAME_NIUNIU_REDBOX: string = 'niuniu.niuniuHandler.redPack';//发红包 百人牛牛
  export var GAME_CLOWN_REDBOX: string = 'clown.clownHandler.redPack';//发红包 小丑
  export var GET_SHOP_LIST: string = "hall.hallHandler.getShopList";
  export var GET_RANK_LIST: string = "hall.hallHandler.getRankList";
  export var GET_BANK: string = "hall.hallHandler.getBank";
  export var INTO_BANK: string = "hall.hallHandler.intoBank";
  export var OUT_BANK: string = "hall.hallHandler.outBank";
  export var GAME_GET_REDBOX: string = 'hall.hallHandler.grabRedPack';//抢红包
  export var HALL_GET_GOLD: string = 'hall.hallHandler.getGold'; //同步金币
  //百人金花
  export var JOIN_GOLDEN_GAME: string = 'golden.goldenHandler.joinGame';  //进入游戏
  export var GOLDEN_GET_BETS: string = 'golden.goldenHandler.getBets';  //同步下注
  export var GOLDEN_BET_GOLD: string = 'golden.goldenHandler.betGold';  //下注
  export var GOLDEN_UP_BANKER: string = 'golden.goldenHandler.upToBanker'; //上庄
  export var GOLDEN_DOWN_BANKER: string = 'golden.goldenHandler.downBanker'; //下庄
  export var GOLDEN_BANKER_LIST: string = 'golden.goldenHandler.listBanker'; //待上庄列表
  export var GOLDEN_LEAVE_GAME: string = 'golden.goldenHandler.leaveGame'; //离开游戏
  export var GOLDEN_SEAT_DOWN: string = 'golden.goldenHandler.downSeat'; //坐下椅子
  export var GOLDEN_GAME_RECORD: string = 'golden.goldenHandler.getGameRecord'; //游戏记录
  export var JINHUA_GET_GOLD: string = 'golden.goldenHandler.getGold'; //同步金币
  //斗牛
  export var JOIN_NIUNIU_GAME: string = 'niuniu.niuniuHandler.joinGame';  //进入游戏
  export var NIUNIU_GET_BETS: string = 'niuniu.niuniuHandler.getBets';  //同步下注
  export var NIUNIU_BET_GOLD: string = 'niuniu.niuniuHandler.betGold';  //下注
  export var NIUNIU_UP_BANKER: string = 'niuniu.niuniuHandler.upToBanker'; //上庄
  export var NIUNIU_DOWN_BANKER: string = 'niuniu.niuniuHandler.downBanker'; //下庄
  export var NIUNIU_BANKER_LIST: string = 'niuniu.niuniuHandler.listBanker'; //待上庄列表
  export var NIUNIU_LEAVE_GAME: string = 'niuniu.niuniuHandler.leaveGame'; //离开游戏
  export var NIUNIU_SEAT_DOWN: string = 'niuniu.niuniuHandler.downSeat'; //坐下椅子
  export var NIUNIU_GAME_RECORD: string = 'niuniu.niuniuHandler.getGameRecord'; //游戏记录
  export var NIUNIU_GET_GOLD: string = 'niuniu.niuniuHandler.getGold'; //同步金币
  //金鲨银鲨
  export var GAME_ANIMAL_REDBOX: string = 'animal.animalHandler.redPack';//发红包 金鲨银鲨
  export var JOIN_JINSHA_GAME: string = "animal.animalHandler.joinGame";
  export var XIA_ZHU_JINSHA: string = "animal.animalHandler.betGold";
  export var JIN_SHA_LEAVE: string = "animal.animalHandler.leaveGame";
  export var JIN_SHA_TONGBU: string = "animal.animalHandler.getBets";
  export var JIN_SHA_SHANGZHUANG: string = "animal.animalHandler.upToBanker";
  export var JIN_SHA_XIAZHUANG: string = "animal.animalHandler.downBanker";
  export var JIN_SHA_ZHUANGLIST: string = "animal.animalHandler.listBanker";
  export var JINSHA_GET_GOLD: string = 'animal.animalHandler.getGold'; //同步金币
  //BlackJack  21点
  export var BLACK_JACK_JOIN: string = 'to.toHandler.joinGame'; //进入并得到初始化数据
  export var BLACK_JACK_START: string = 'to.toHandler.startGame'; //开始游戏
  export var BLACK_JACK_SETCARD: string = 'to.toHandler.setCard'; //设置牌
  export var BLACK_JACK_LEAVE: string = 'to.toHandler.leaveGame'; //离开游戏
  export var BLACK_JACK_RANK: string = 'to.toHandler.getToList'; //排行榜
  export var BLACK_JACK_CHOOSE: string = 'to.toHandler.changeDiFen'; //开始游戏
  export var BLACK_JACK_REWARD: string = 'to.toHandler.getWin'; //开始游戏
  //任务
  export var HALL_TASK_LIST: string = 'hall.hallHandler.getTaskList';
  export var HALL_TASK_GET: string = 'hall.hallHandler.getTaskGift';

  //打赏
  export var HALL_REWARD_LIST: string = 'hall.hallHandler.getRewardList';
  export var HALL_RELEASE_REWARD: string = 'hall.hallHandler.releaseReward';
  export var HALL_GIVE_REWARD: string = 'hall.hallHandler.giveReward';

  //摇钱树
  export var HALL_MONEYTREE_LIST: string = 'hall.hallHandler.getMoneyTree';
  export var HALL_MONEYTREE_GET: string = 'hall.hallHandler.getMoneyFromTree';

  //提交建议
  export var HALL_SET_PROPOSAL: string = 'hall.hallHandler.setProposal';

  //邮件
  export var GET_MAIL_LIST: string = 'hall.hallHandler.getMails';

  //奖品
  export var HALL_GIFT_LOTTERY_INFO: string = 'hall.hallHandler.getLotteryInfo';  //界面初始化
  export var HALL_GIFT_GET_LOTTERY: string = 'hall.hallHandler.getLottery';  //抽奖
  export var HALL_GIFT_LIST: string = 'hall.hallHandler.getGiftList';  //兑换列表
  export var HALL_GIFT_EXCHANGE: string = 'hall.hallHandler.exchangeGift';  //兑换奖品
  export var HALL_GIFT_SELF_RECORD: string = 'hall.hallHandler.getSelfExchangeRecord';  //兑换记录(self)
  export var HALL_GIFT_ALL_RECORD: string = 'hall.hallHandler.getExchangeRecord';  //兑换记录(all)

  //签到
  export var HALL_SIGN_GET: string = 'hall.hallHandler.getSignCount'; //签到次数
  export var HALL_SIGN_SIGN: string = 'hall.hallHandler.sign'; //签到

  export var GAME_GONGGAO: string = "hall.hallHandler.broadcast";
  //邀请
  export var YAO_QING: string = "hall.hallHandler.spreadInfo";
  //月卡
  export var YUE_KA: string = "hall.hallHandler.getMonthCard";
  export var GET_YUE: string = "hall.hallHandler.getCardEveryDay";
  //救济金
  export var GET_ALMS: string = 'hall.hallHandler.getAlms';
  //聊天
  export var JINSHA_SEND_CHAT: string = 'animal.animalHandler.broadcast';
  export var NIUNIU_SEND_CHAT: string = 'niuniu.niuniuHandler.broadcast';
  export var JINHUA_SEND_CHAT: string = 'golden.goldenHandler.broadcast';
  export var FRUIT_SEND_CHAT: string = 'fruit.fruitHandler.broadcast';
  //vip
  export var GET_VIPS: string = 'hall.hallHandler.getVips';

  //pk
  export var PK_CREATE: string = 'pk.pkHandler.createGame';
  export var PK_JOIN: string = 'pk.pkHandler.joinGame';
  export var PK_SETHAND: string = 'pk.pkHandler.setHand';
  export var PK_LEAVE: string = 'pk.pkHandler.leaveGame';
  //斗地主
  export var JOIN_DDZ_GAME: string = "hall.hallHandler.queryDDZTable";
  export var DDZ_CREATE_TABLE: string = "ddz.ddzHandler.createTable";
  export var DDZ_JIAO_FEN: string = "ddz.ddzHandler.jiaofen";
  export var DDZ_CHU_PAI: string = "ddz.ddzHandler.chupai";
  export var DDZ_JOIN_TABLE: string = "ddz.ddzHandler.joinTable";
  export var DDZ_READY_GAME: string = "ddz.ddzHandler.gameReady";
  export var DDZ_START_GAME: string = "ddz.ddzHandler.startGame";
  export var DDZ_COMMIT_CARD: string = "ddz.ddzHandler.commitCard";
  export var DDZ_QUIT_GAME: string = "ddz.ddzHandler.leaveTable";
  export var DDZ_AGAIN_GAME: string = "ddz.ddzHandler.againGame";

  //转盘
  export var DIAL_GET_INFO: string = 'hall.hallHandler.getDialInfo';
  export var DIAL_GET_AWARD: String = 'hall.hallHandler.getDialAward';

  //关注领取金币
  export var HALL_GET_FOLLOW_GOLD: string = 'hall.hallHandler.getFollowGold';

  export var GET_JINGCAI_HISTORY_LIST: string = "hall.hallHandler.getCompetitionRecordList";
  export var GET_JINGCAI_LIST: string = "hall.hallHandler.getCompetitionList";
  export var SEND_JINGCAI: string = "hall.hallHandler.competition";

  export var GAME_USER_LOGIN: string = "connector.entryHandler.usernamelogin";
  export var GAME_REG: string = "connector.entryHandler.reg";
  export var UPDATE_NAME: string = "hall.hallHandler.updateName";
  export var UPDATE_ADDRESS: string = "hall.hallHandler.updateAddress";
  export var GET_ADDRESS: string = "hall.hallHandler.getAddress";
  export var GET_RANK_LIST2: string = "hall.hallHandler.getWinRank";
  //欢乐小丑
  export var CLOWN_CLOWNHANDLER_JOINGAME: string = "clown.clownHandler.joinGame";
  export var CLOWN_CLOWNHANDLER_LEAVEGAME: string = "clown.clownHandler.leaveGame";
  export var CLOWN_CLOWNHANDLER_RANDRESULT: string = "clown.clownHandler.randResult";
  export var CLOWN_CLOWNHANDLER_CHOOSECLOWN: string = "clown.clownHandler.chooseClown";
  export var CLOWN_CLOWNHANDLER_ENDCHOOSE: string = "clown.clownHandler.endChoose";
  export var CLOWN_GET_GIFT: string = "clown.clownHandler.getGift";
  export var CLOWN_QUIT: string = "clown.clownHandler.endChoose";
  export var CLOWN_RANK_DAY: string = "clown.clownHandler.getDayRank";
  export var CLOWN_RANK_WEEK: string = "clown.clownHandler.getWeekRank";
  export var CLOWN_GET_MESSAGES: string = "clown.clownHandler.getMessages";
  //水果
  export var FRUIT_XIA_ZHU: string = "fruit.fruitHandler.betGold";
  export var FRUIT_LEAVE: string = "fruit.fruitHandler.leaveGame";
  export var FRUIT_TONGBU: string = "fruit.fruitHandler.getBets";
  export var FRUIT_GET_GOLD: string = 'fruit.fruitHandler.getGold'; //同步金币
  export var FRUIT_JOIN_GAME: string = "fruit.fruitHandler.joinGame";
  export var FRUIT_GAME_REDBOX: string = 'fruit.fruitHandler.redPack';//发红包
  export var FRUIT_GET_MAX: string = 'fruit.fruitHandler.getMaxWinner';//
}