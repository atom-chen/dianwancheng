/**
  * 游戏管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved. 
  * 快捷创建
  */
module GameManage {
    export var game:fany.GameData;
    /**
    *游戏启动前初始化
    * @param 
    * */
    export function  init(): void {      
        GameManage.game = new fany.GameData();
        GameManage.game.init();
        //ResManage.init();
    }

    export function shareSucc(): void {
//        if(GlobalData.page4)
//        {
//            GlobalData.page4.dispose();
//        }
//        PanelManage.euiLayer.addChild(new Page5());
    }
}

