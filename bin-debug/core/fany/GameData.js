var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var fany;
(function (fany) {
    /**
     * 游戏初始化相关
     * @author  fany
     *
     */
    var GameData = (function () {
        function GameData() {
            //this.init();
        }
        GameData.prototype.init = function () {
            this.setShare();
            this.start();
        };
        GameData.prototype.setShare = function () {
            if (GlobalData.userfrom == "weixin") {
                var sdk = new JSSDK();
                sdk.init();
                GlobalData.jssdk = sdk;
            }
        };
        GameData.prototype.start = function () {
            GlobalData.otheridd = QuickManage.$GET("fid");
            PanelManage.openHall();
            ResManage.init("ui", true, this.uiloadingcallback.bind(this));
        };
        GameData.prototype.uiloadingcallback = function () {
            GlobalData.isLodingComUI = true;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UI_LOADING_COM));
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UI_COM_OPEN, { num: 0, from: 2 }));
        };
        return GameData;
    }());
    fany.GameData = GameData;
    __reflect(GameData.prototype, "fany.GameData");
})(fany || (fany = {}));
