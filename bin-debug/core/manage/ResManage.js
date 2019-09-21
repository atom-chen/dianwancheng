/**
  * 资源加载管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 快捷创建
  */
var ResManage;
(function (ResManage) {
    ResManage.resName = "";
    ResManage.isLoading = true;
    //export var loading: UILoadingPanel;
    /**
     *
     * @param resName 资源名称，如果背包模块资源叫bag.res.json，那么这里传bag
     * @param isLoading  是否显示进度条，不显示，就是静默加载
     * @param cb   加载完成回调方法
     */
    function init(resName, isLoading, cb) {
        ResManage.resName = resName;
        ResManage.isLoading = isLoading;
        ResManage.cb = cb;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(GlobalData.cdnResUrl + "resource/" + resName + ".res.json?v=" + GlobalData.version, GlobalData.cdnResUrl + "resource/");
    }
    ResManage.init = init;
    /**
       * 配置文件加载完成,开始预加载preload资源组。
       * Loading of configuration file is complete, start to pre-load the preload resource group
       */
    function onConfigComplete(event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //        this.loading = new UILoadingPanel();
        //        PanelManage.tipsLayer.addChild(this.loading);
        RES.loadGroup(ResManage.resName);
    }
    ResManage.onConfigComplete = onConfigComplete;
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    function onResourceLoadComplete(event) {
        if (event.groupName == this.resName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            ResManage.cb();
        }
    }
    ResManage.onResourceLoadComplete = onResourceLoadComplete;
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    function onResourceLoadError(event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    }
    ResManage.onResourceLoadError = onResourceLoadError;
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    function onResourceProgress(event) {
        if (event.groupName == this.resName) {
            if (PanelManage.resloading) {
                PanelManage.resloading.setProgress(event.itemsLoaded, event.itemsTotal);
            }
            if (PanelManage.resloading2) {
                PanelManage.resloading2.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }
    }
    ResManage.onResourceProgress = onResourceProgress;
    //    export function getPropsIcon(id): string {
    //        return GlobalData.base + id + ".png";
    //    }
})(ResManage || (ResManage = {}));
