/**
 * 金沙消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
class GameListen {
    private static instance: GameListen = null;
    public constructor() {
        if (GameListen.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    public static getInstance(): GameListen {
        if (this.instance == null) {
            this.instance = new GameListen();
        }
        return this.instance;
    }
    public setOn(): void {
        fany.SocketManage.pomelo.on(MessageData.RESULT_JINSHA, this.manageOn.bind(this, 2));  //金鲨银鲨结果消息推送
        fany.SocketManage.pomelo.on(MessageData.START_BET, this.manageOn.bind(this, 3));  //金鲨银鲨开始下注消息推送
        fany.SocketManage.pomelo.on(MessageData.STOP_BET, this.manageOn.bind(this, 4));  //金鲨银鲨停止下注下注消息推送
        fany.SocketManage.pomelo.on(MessageData.UP_BANKER, this.manageOn.bind(this, 5));  //金鲨银鲨下庄消息推送
        fany.SocketManage.pomelo.on(MessageData.DOWN_BANKER, this.manageOn.bind(this, 6));  //金鲨银鲨上庄消息推送
        fany.SocketManage.pomelo.on(MessageData.CHANGE_BANKER, this.manageOn.bind(this, 7));  //金鲨银鲨谁上庄消息推送
        fany.SocketManage.pomelo.on(MessageData.COLLECT, this.manageOn.bind(this, 8));  //金鲨银鲨谁上庄消息推送
        this.setDdz();
        this.setPk();
        this.setNiuniu();
        this.setZjh();
        this.setClown();
        this.setFruit();
    }
    private setFruit(): void {
        fany.SocketManage.pomelo.on(MessageData.FRUIT_RESULT, this.manageOnFruit.bind(this, 2));
        fany.SocketManage.pomelo.on(MessageData.FRUIT_START_BET, this.manageOnFruit.bind(this, 3));
        fany.SocketManage.pomelo.on(MessageData.FRUIT_STOP_BET, this.manageOnFruit.bind(this, 4));
        fany.SocketManage.pomelo.on(MessageData.FRUIT_COLLECT, this.manageOnFruit.bind(this, 8));
    }
    public setClown(): void {
        fany.SocketManage.pomelo.on(MessageData.CLOWN_EVENT, this.manageOnClown.bind(this, 1));
    }
    public setDdz(): void {
        fany.SocketManage.pomelo.on(MessageData.JOIN, this.manageOnDdz.bind(this, 1));
        fany.SocketManage.pomelo.on(MessageData.READY, this.manageOnDdz.bind(this, 2));
        fany.SocketManage.pomelo.on(MessageData.LEAVE, this.manageOnDdz.bind(this, 3));
        fany.SocketManage.pomelo.on(MessageData.SENDCARD, this.manageOnDdz.bind(this, 5));
        fany.SocketManage.pomelo.on(MessageData.OPENCARD, this.manageOnDdz.bind(this, 6));
        fany.SocketManage.pomelo.on(MessageData.CONCLUDE, this.manageOnDdz.bind(this, 7));
        fany.SocketManage.pomelo.on(MessageData.CHANGEOWNER, this.manageOnDdz.bind(this, 8));
        fany.SocketManage.pomelo.on(MessageData.CALLDIZHU, this.manageOnDdz.bind(this, 9));
        fany.SocketManage.pomelo.on(MessageData.MAKEDIZHU, this.manageOnDdz.bind(this, 10));
        fany.SocketManage.pomelo.on(MessageData.CURBET, this.manageOnDdz.bind(this, 11));
        fany.SocketManage.pomelo.on(MessageData.CHUPAI, this.manageOnDdz.bind(this, 12));
        fany.SocketManage.pomelo.on(MessageData.CHANGECHUPAI, this.manageOnDdz.bind(this, 13));
        fany.SocketManage.pomelo.on(MessageData.PARAERR, this.manageOnDdz.bind(this, 14));
        fany.SocketManage.pomelo.on(MessageData.PAY, this.manageOnDdz.bind(this, 15));
    }
    public setNiuniu(): void {
        fany.SocketManage.pomelo.on(MessageData.NIUNIU_EVENT, function (data): void {
            if (PanelManage.niuniu) {
                PanelManage.niuniu.onMsgListen(data);
            }
        });  //斗牛监听事件
    }
    public setZjh(): void {
        fany.SocketManage.pomelo.on(MessageData.GOLDEN_EVENT, function (data): void {
            if (PanelManage.zhajinhua) {
                PanelManage.zhajinhua.onMsgListen(data);
            }
        });  //炸金花消息推送
    }

    public setPk(): void {
        fany.SocketManage.pomelo.on(MessageData.PK_EVENT, function (data): void {
            if (PanelManage.pk) {
                PanelManage.pk.messageOn(data);
            }
        });  //炸金花消息推送
    }
    /**
   * 管理服务端主动推送的消息
   * @param index
   */
    private manageOn(index, data): void {
        switch (index) {
            case 2:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.resultcome(data);
                }
                break;
            case 3:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.betcome(data);
                }
                break;
            case 4:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.betstop(data);
                }
                break;
            case 5:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.someonupzhuang(data);
                }
                break;
            case 6:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.someondownzhuang(data);
                }
                break;
            case 7:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.someonshangzhuang(data);
                }
                break;
            case 8:
                if (PanelManage.jinsha) {
                    PanelManage.jinsha.collect(data);
                }
                break;
        }
    }
    private manageOnFruit(index, data): void {
        switch (index) {
            case 2:
                if (PanelManage.fruit) {
                    PanelManage.fruit.resultcome(data);
                }
                break;
            case 3:
                if (PanelManage.fruit) {
                    PanelManage.fruit.betcome(data);
                }
                break;
            case 4:
                if (PanelManage.fruit) {
                    PanelManage.fruit.betstop(data);
                }
                break;
            case 8:
                if (PanelManage.fruit) {
                    PanelManage.fruit.collect(data);
                }
                break;
        }
    }
    private manageOnClown(index, data): void {
        //TipsManage.showTips(index + "==" + JSON.stringify(data))
        switch (index) {
            case 1:
                if (PanelManage.clown) {
                    PanelManage.clown.changeClownKing(data);
                }
                break;
            case 2:
                break;
        }
    }
    /**
  * 管理服务端主动推送的消息
  * @param index
  */
    private manageOnDdz(index, data): void {
        //TipsManage.showTips(index + "==" + JSON.stringify(data))
        switch (index) {
            case 1:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonejoin(data);
                }
                break;
            case 2:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someoneready(data);
                }
                break;
            case 3:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someoneleave(data);
                }
                break;
            case 5:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonesendcard(data);
                }
                break;
            case 6:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someoneopencard(data);
                }
                break;
            case 7:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someoneconclude(data);
                }
                break;
            case 8:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonechangeowner(data);
                }
                break;
            case 9:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonecalldizhu(data);
                } else {
                    GlobalData.huancun = data;
                }
                break;
            case 10:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonemakedizhu(data);
                }
                break;
            case 11:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonecurbet(data);
                }
                break;
            case 12:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonechupai(data);
                }
                break;
            case 13:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonechangechupai(data);
                }
                break;
            case 14:
                if (PanelManage.ddz) {
                    PanelManage.ddz.someonequit(data);
                }
                break;
            case 15:
                // if(PanelManage.hall) {
                //     PanelManage.hall.setGold(data);
                // }
                break;
        }
    }
}