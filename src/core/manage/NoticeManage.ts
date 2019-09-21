/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
class NoticeManage {
    public static instance: NoticeManage = null;
    public constructor() {
        if(NoticeManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }

    public static getInstance(): NoticeManage {
        if(this.instance == null) {
            this.instance = new NoticeManage();
        }
        return this.instance;
    }
    
    public send(notice: string,data: any,callBack: Function): void {
//        fany.SocketManage.pomelo.request(notice,data,function(data) {
//                PanelManager.showLoading(false);
//            callBack(data);
//        });
    }
}