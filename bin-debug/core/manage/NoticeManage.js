var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息管理
 * by fany 2015 7.5
 * (c) copyright 2015 - 2035
 * All Rights Reserved.
 */
var NoticeManage = (function () {
    function NoticeManage() {
        if (NoticeManage.instance) {
            throw new Error("Instance is alreally exist");
        }
    }
    NoticeManage.getInstance = function () {
        if (this.instance == null) {
            this.instance = new NoticeManage();
        }
        return this.instance;
    };
    NoticeManage.prototype.send = function (notice, data, callBack) {
        //        fany.SocketManage.pomelo.request(notice,data,function(data) {
        //                PanelManager.showLoading(false);
        //            callBack(data);
        //        });
    };
    return NoticeManage;
}());
NoticeManage.instance = null;
__reflect(NoticeManage.prototype, "NoticeManage");
