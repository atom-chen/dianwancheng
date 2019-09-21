/**
  * 前后端协议
  * by fany
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var Protocol;
(function (Protocol) {
    Protocol.GAME_GOLD_REDBOX = 'golden.goldenHandler.redPack'; //发红包 炸金花
    Protocol.GAME_NIUNIU_REDBOX = 'niuniu.niuniuHandler.redPack'; //发红包 百人牛牛
    Protocol.GAME_CLOWN_REDBOX = 'clown.clownHandler.redPack'; //发红包 小丑
    Protocol.GET_SHOP_LIST = "hall.hallHandler.getShopList";
    Protocol.GET_RANK_LIST = "hall.hallHandler.getRankList";
    Protocol.GET_BANK = "hall.hallHandler.getBank";
    Protocol.INTO_BANK = "hall.hallHandler.intoBank";
    Protocol.OUT_BANK = "hall.hallHandler.outBank";
    Protocol.GAME_GET_REDBOX = 'hall.hallHandler.grabRedPack'; //抢红包
    Protocol.HALL_GET_GOLD = 'hall.hallHandler.getGold'; //同步金币
    //百人金花
    Protocol.JOIN_GOLDEN_GAME = 'golden.goldenHandler.joinGame'; //进入游戏
    Protocol.GOLDEN_GET_BETS = 'golden.goldenHandler.getBets'; //同步下注
    Protocol.GOLDEN_BET_GOLD = 'golden.goldenHandler.betGold'; //下注
    Protocol.GOLDEN_UP_BANKER = 'golden.goldenHandler.upToBanker'; //上庄
    Protocol.GOLDEN_DOWN_BANKER = 'golden.goldenHandler.downBanker'; //下庄
    Protocol.GOLDEN_BANKER_LIST = 'golden.goldenHandler.listBanker'; //待上庄列表
    Protocol.GOLDEN_LEAVE_GAME = 'golden.goldenHandler.leaveGame'; //离开游戏
    Protocol.GOLDEN_SEAT_DOWN = 'golden.goldenHandler.downSeat'; //坐下椅子
    Protocol.GOLDEN_GAME_RECORD = 'golden.goldenHandler.getGameRecord'; //游戏记录
    Protocol.JINHUA_GET_GOLD = 'golden.goldenHandler.getGold'; //同步金币
    //斗牛
    Protocol.JOIN_NIUNIU_GAME = 'niuniu.niuniuHandler.joinGame'; //进入游戏
    Protocol.NIUNIU_GET_BETS = 'niuniu.niuniuHandler.getBets'; //同步下注
    Protocol.NIUNIU_BET_GOLD = 'niuniu.niuniuHandler.betGold'; //下注
    Protocol.NIUNIU_UP_BANKER = 'niuniu.niuniuHandler.upToBanker'; //上庄
    Protocol.NIUNIU_DOWN_BANKER = 'niuniu.niuniuHandler.downBanker'; //下庄
    Protocol.NIUNIU_BANKER_LIST = 'niuniu.niuniuHandler.listBanker'; //待上庄列表
    Protocol.NIUNIU_LEAVE_GAME = 'niuniu.niuniuHandler.leaveGame'; //离开游戏
    Protocol.NIUNIU_SEAT_DOWN = 'niuniu.niuniuHandler.downSeat'; //坐下椅子
    Protocol.NIUNIU_GAME_RECORD = 'niuniu.niuniuHandler.getGameRecord'; //游戏记录
    Protocol.NIUNIU_GET_GOLD = 'niuniu.niuniuHandler.getGold'; //同步金币
    //金鲨银鲨
    Protocol.GAME_ANIMAL_REDBOX = 'animal.animalHandler.redPack'; //发红包 金鲨银鲨
    Protocol.JOIN_JINSHA_GAME = "animal.animalHandler.joinGame";
    Protocol.XIA_ZHU_JINSHA = "animal.animalHandler.betGold";
    Protocol.JIN_SHA_LEAVE = "animal.animalHandler.leaveGame";
    Protocol.JIN_SHA_TONGBU = "animal.animalHandler.getBets";
    Protocol.JIN_SHA_SHANGZHUANG = "animal.animalHandler.upToBanker";
    Protocol.JIN_SHA_XIAZHUANG = "animal.animalHandler.downBanker";
    Protocol.JIN_SHA_ZHUANGLIST = "animal.animalHandler.listBanker";
    Protocol.JINSHA_GET_GOLD = 'animal.animalHandler.getGold'; //同步金币
    //BlackJack  21点
    Protocol.BLACK_JACK_JOIN = 'to.toHandler.joinGame'; //进入并得到初始化数据
    Protocol.BLACK_JACK_START = 'to.toHandler.startGame'; //开始游戏
    Protocol.BLACK_JACK_SETCARD = 'to.toHandler.setCard'; //设置牌
    Protocol.BLACK_JACK_LEAVE = 'to.toHandler.leaveGame'; //离开游戏
    Protocol.BLACK_JACK_RANK = 'to.toHandler.getToList'; //排行榜
    Protocol.BLACK_JACK_CHOOSE = 'to.toHandler.changeDiFen'; //开始游戏
    Protocol.BLACK_JACK_REWARD = 'to.toHandler.getWin'; //开始游戏
    //任务
    Protocol.HALL_TASK_LIST = 'hall.hallHandler.getTaskList';
    Protocol.HALL_TASK_GET = 'hall.hallHandler.getTaskGift';
    //打赏
    Protocol.HALL_REWARD_LIST = 'hall.hallHandler.getRewardList';
    Protocol.HALL_RELEASE_REWARD = 'hall.hallHandler.releaseReward';
    Protocol.HALL_GIVE_REWARD = 'hall.hallHandler.giveReward';
    //摇钱树
    Protocol.HALL_MONEYTREE_LIST = 'hall.hallHandler.getMoneyTree';
    Protocol.HALL_MONEYTREE_GET = 'hall.hallHandler.getMoneyFromTree';
    //提交建议
    Protocol.HALL_SET_PROPOSAL = 'hall.hallHandler.setProposal';
    //邮件
    Protocol.GET_MAIL_LIST = 'hall.hallHandler.getMails';
    //奖品
    Protocol.HALL_GIFT_LOTTERY_INFO = 'hall.hallHandler.getLotteryInfo'; //界面初始化
    Protocol.HALL_GIFT_GET_LOTTERY = 'hall.hallHandler.getLottery'; //抽奖
    Protocol.HALL_GIFT_LIST = 'hall.hallHandler.getGiftList'; //兑换列表
    Protocol.HALL_GIFT_EXCHANGE = 'hall.hallHandler.exchangeGift'; //兑换奖品
    Protocol.HALL_GIFT_SELF_RECORD = 'hall.hallHandler.getSelfExchangeRecord'; //兑换记录(self)
    Protocol.HALL_GIFT_ALL_RECORD = 'hall.hallHandler.getExchangeRecord'; //兑换记录(all)
    //签到
    Protocol.HALL_SIGN_GET = 'hall.hallHandler.getSignCount'; //签到次数
    Protocol.HALL_SIGN_SIGN = 'hall.hallHandler.sign'; //签到
    Protocol.GAME_GONGGAO = "hall.hallHandler.broadcast";
    //邀请
    Protocol.YAO_QING = "hall.hallHandler.spreadInfo";
    //月卡
    Protocol.YUE_KA = "hall.hallHandler.getMonthCard";
    Protocol.GET_YUE = "hall.hallHandler.getCardEveryDay";
    //救济金
    Protocol.GET_ALMS = 'hall.hallHandler.getAlms';
    //聊天
    Protocol.JINSHA_SEND_CHAT = 'animal.animalHandler.broadcast';
    Protocol.NIUNIU_SEND_CHAT = 'niuniu.niuniuHandler.broadcast';
    Protocol.JINHUA_SEND_CHAT = 'golden.goldenHandler.broadcast';
    Protocol.FRUIT_SEND_CHAT = 'fruit.fruitHandler.broadcast';
    //vip
    Protocol.GET_VIPS = 'hall.hallHandler.getVips';
    //pk
    Protocol.PK_CREATE = 'pk.pkHandler.createGame';
    Protocol.PK_JOIN = 'pk.pkHandler.joinGame';
    Protocol.PK_SETHAND = 'pk.pkHandler.setHand';
    Protocol.PK_LEAVE = 'pk.pkHandler.leaveGame';
    //斗地主
    Protocol.JOIN_DDZ_GAME = "hall.hallHandler.queryDDZTable";
    Protocol.DDZ_CREATE_TABLE = "ddz.ddzHandler.createTable";
    Protocol.DDZ_JIAO_FEN = "ddz.ddzHandler.jiaofen";
    Protocol.DDZ_CHU_PAI = "ddz.ddzHandler.chupai";
    Protocol.DDZ_JOIN_TABLE = "ddz.ddzHandler.joinTable";
    Protocol.DDZ_READY_GAME = "ddz.ddzHandler.gameReady";
    Protocol.DDZ_START_GAME = "ddz.ddzHandler.startGame";
    Protocol.DDZ_COMMIT_CARD = "ddz.ddzHandler.commitCard";
    Protocol.DDZ_QUIT_GAME = "ddz.ddzHandler.leaveTable";
    Protocol.DDZ_AGAIN_GAME = "ddz.ddzHandler.againGame";
    //转盘
    Protocol.DIAL_GET_INFO = 'hall.hallHandler.getDialInfo';
    Protocol.DIAL_GET_AWARD = 'hall.hallHandler.getDialAward';
    //关注领取金币
    Protocol.HALL_GET_FOLLOW_GOLD = 'hall.hallHandler.getFollowGold';
    Protocol.GET_JINGCAI_HISTORY_LIST = "hall.hallHandler.getCompetitionRecordList";
    Protocol.GET_JINGCAI_LIST = "hall.hallHandler.getCompetitionList";
    Protocol.SEND_JINGCAI = "hall.hallHandler.competition";
    Protocol.GAME_USER_LOGIN = "connector.entryHandler.usernamelogin";
    Protocol.GAME_REG = "connector.entryHandler.reg";
    Protocol.UPDATE_NAME = "hall.hallHandler.updateName";
    Protocol.UPDATE_ADDRESS = "hall.hallHandler.updateAddress";
    Protocol.GET_ADDRESS = "hall.hallHandler.getAddress";
    Protocol.GET_RANK_LIST2 = "hall.hallHandler.getWinRank";
    //欢乐小丑
    Protocol.CLOWN_CLOWNHANDLER_JOINGAME = "clown.clownHandler.joinGame";
    Protocol.CLOWN_CLOWNHANDLER_LEAVEGAME = "clown.clownHandler.leaveGame";
    Protocol.CLOWN_CLOWNHANDLER_RANDRESULT = "clown.clownHandler.randResult";
    Protocol.CLOWN_CLOWNHANDLER_CHOOSECLOWN = "clown.clownHandler.chooseClown";
    Protocol.CLOWN_CLOWNHANDLER_ENDCHOOSE = "clown.clownHandler.endChoose";
    Protocol.CLOWN_GET_GIFT = "clown.clownHandler.getGift";
    Protocol.CLOWN_QUIT = "clown.clownHandler.endChoose";
    Protocol.CLOWN_RANK_DAY = "clown.clownHandler.getDayRank";
    Protocol.CLOWN_RANK_WEEK = "clown.clownHandler.getWeekRank";
    Protocol.CLOWN_GET_MESSAGES = "clown.clownHandler.getMessages";
    //水果
    Protocol.FRUIT_XIA_ZHU = "fruit.fruitHandler.betGold";
    Protocol.FRUIT_LEAVE = "fruit.fruitHandler.leaveGame";
    Protocol.FRUIT_TONGBU = "fruit.fruitHandler.getBets";
    Protocol.FRUIT_GET_GOLD = 'fruit.fruitHandler.getGold'; //同步金币
    Protocol.FRUIT_JOIN_GAME = "fruit.fruitHandler.joinGame";
    Protocol.FRUIT_GAME_REDBOX = 'fruit.fruitHandler.redPack'; //发红包
    Protocol.FRUIT_GET_MAX = 'fruit.fruitHandler.getMaxWinner'; //
})(Protocol || (Protocol = {}));
