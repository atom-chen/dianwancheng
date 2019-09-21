module fany {
	/**
	 * 游戏初始化相关
	 * @author  fany
	 *
	 */
    export class GameData {
        public constructor() {
            //this.init();
        }
        public init(): void {
            this.setShare();
            this.start();
        }

        private setShare(): void {
            if (GlobalData.userfrom == "weixin") {
                var sdk = new JSSDK();
                sdk.init();
                GlobalData.jssdk = sdk;
            }
        }
        private start(): void {
            GlobalData.otheridd = QuickManage.$GET("fid");
            PanelManage.openHall();
            ResManage.init("ui", true, this.uiloadingcallback.bind(this));
        }
        private uiloadingcallback(): void {
            GlobalData.isLodingComUI = true;
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UI_LOADING_COM));
            lcp.LListener.getInstance().dispatchEvent(new lcp.LEvent(EventData.UI_COM_OPEN, { num: 0, from: 2 }));
        }
    }
}
