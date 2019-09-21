class Main extends eui.UILayer {
    /**
     * 加载进度界面
     * loading process interface
     */
    private loadingView: LoadingUI;
    protected createChildren(): void {
        if (egret.MainContext.deviceType == egret.MainContext.DEVICE_PC) {
            this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        }
        super.createChildren();
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
        } else {
            RES.loadConfig(GlobalData.cdnResUrl + "resource/release.res.json?v=" + GlobalData.version, GlobalData.cdnResUrl + "resource/");
        }
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * Loading of configuration file is complete, start to pre-load the preload resource group
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。 
        var them: eui.Theme = new eui.Theme(GlobalData.cdnResUrl + "resource/default.thm.json?v=" + GlobalData.version, this.stage);
        them.addEventListener(egret.Event.COMPLETE, this.themComplete.bind(this), this);

        this.createScene();
    }
    private themComplete(): void {
        RES.loadGroup("loading");
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    }
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            //this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        } else if (event.groupName == "loading") {
            //设置加载进度界面
            this.loadingView = new LoadingUI();
            this.euiLayer.addChild(this.loadingView);
            RES.loadGroup("preload");
        }
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }
    private gameLayer: egret.DisplayObjectContainer;
    private tipsLayer: egret.DisplayObjectContainer;
    private euiLayer: eui.UILayer;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createScene(): void {
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
    }
    private playMusicOnce(): void {
        MusicManage.initMusic();//音乐初始化
        if (!GlobalData.isDebug) {
            MusicManage.playBgMuisc();
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playMusicOnce, this);
    }
}
