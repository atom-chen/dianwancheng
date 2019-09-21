/**
  * 游戏管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 快捷创建
  */
var GameManage;
(function (GameManage) {
    /**
    *游戏启动前初始化
    * @param
    * */
    function init() {
        GameManage.game = new fany.GameData();
        GameManage.game.init();
        //ResManage.init();
    }
    GameManage.init = init;
    function shareSucc() {
        //        if(GlobalData.page4)
        //        {
        //            GlobalData.page4.dispose();
        //        }
        //        PanelManage.euiLayer.addChild(new Page5());
    }
    GameManage.shareSucc = shareSucc;
})(GameManage || (GameManage = {}));
