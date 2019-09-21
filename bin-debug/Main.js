var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Main.prototype.createChildren = function () {
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        // insitialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        if (GlobalData.isDebug) {
            RES.loadConfig(GlobalData.cdnResUrl + "resource/default.res.json?v=" + GlobalData.version, GlobalData.cdnResUrl + "resource/");
        }
        else {
            RES.loadConfig(GlobalData.cdnResUrl + "resource/release.res.json?v=" + GlobalData.version, GlobalData.cdnResUrl + "resource/");
        }
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。 
        var them = new eui.Theme(GlobalData.cdnResUrl + "resource/default.thm.json?v=" + GlobalData.version, this.stage);
        them.addEventListener(egret.Event.COMPLETE, this.themComplete.bind(this), this);
        this.createScene();
    };
    Main.prototype.themComplete = function () {
        RES.loadGroup("loading");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            //this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        }
        else if (event.groupName == "loading") {
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.euiLayer.addChild(this.loadingView);
            RES.loadGroup("preload");
        }
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createScene = function () {
        //游戏场景层，游戏场景相关内容可以放在这里面。
        //Game scene layer, the game content related to the scene can be placed inside this layer.
        this.gameLayer = new egret.DisplayObjectContainer();
        this.addChild(this.gameLayer);
        this.euiLayer = new eui.UILayer();
        this.addChild(this.euiLayer);
        this.tipsLayer = new egret.DisplayObjectContainer();
        this.addChild(this.tipsLayer);
        PanelManage.gameLayer = this.gameLayer;
        PanelManage.euiLayer = this.euiLayer;
        PanelManage.tipsLayer = this.tipsLayer;
        PanelManage.tipsLayer.touchEnabled = false;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playMusicOnce, this);
    };
    Main.prototype.playMusicOnce = function () {
        MusicManage.initMusic(); //音乐初始化
        if (!GlobalData.isDebug) {
            MusicManage.playBgMuisc();
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playMusicOnce, this);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
