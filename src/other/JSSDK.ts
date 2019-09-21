/**
* Created by d8q8 on 2015/1/19.
* @class JSSDK
* @constructor
**/

interface SignPackage {
        appId: string;
        nonceStr: string;
        timestamp: number;
        signature: string;
        url: string;
}

class JSSDK {
        public CLASS_NAME: string = "JSSDK";
        private title: string;
        private desc: string;
        private title1: string;
        private desc1: string;
        private link: string;
        private imgUrl: string;
        private signPackage: SignPackage;
        private url: string;
        /**
        * 初始化
        **/
        public init() {
                var data = GlobalData.configData;
                var ss = location.href.split("#")[0];
                this.title = "听风娱乐城给你非凡享受";
                this.desc = "听风娱乐城给你非凡享受";

                this.link = data.data.linkhall + "?yid=" + GlobalData.account;
                this.imgUrl = data.data.imgurl;
                this.url = data.data.shareurl;

                //Network.sendInfo(this.url, "url=" + encodeURIComponent(ss), this.getSignPackage.bind(this), egret.URLRequestMethod.GET);
                //H5pop.getWxConfig({ url: encodeURIComponent(ss) },this.getSignPackage.bind(this));
                window["getShareInfo"](this.url + "?url=" + encodeURIComponent(ss), {}, this.getSignPackage.bind(this));
        }

        public setTitle(): void {
                var data = GlobalData.configData;
                this.title = "听风娱乐城给你非凡享受";
                this.desc = "听风娱乐城给你非凡享受";
                this.link = data.data.linkhall + "?yid=" + GlobalData.account;
                this.imgUrl = data.data.imgurl;

                var ss = location.href.split("#")[0];
                this.url = data.data.shareurl;
                window["getShareInfo"](this.url + "?url=" + encodeURIComponent(ss), {}, this.getSignPackage.bind(this));
        }

        /**
        * 获取签名分享
        */
        private getSignPackage(e) {
                this.signPackage = <SignPackage>JSON.parse(e);
                window["setWxConfig"](this.signPackage);
                window["setShare"](this.title, this.desc, this.imgUrl, this.link);
        }
}