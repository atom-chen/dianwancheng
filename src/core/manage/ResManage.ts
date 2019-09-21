/**
  * 资源加载管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved. 
  * 快捷创建
  */
module ResManage {
    export var resName: string = "";
    export var isLoading: boolean = true;
    export var cb: Function;
    //export var loading: UILoadingPanel;

    /**
     * 
     * @param resName 资源名称，如果背包模块资源叫bag.res.json，那么这里传bag
     * @param isLoading  是否显示进度条，不显示，就是静默加载
     * @param cb   加载完成回调方法
     */
    export function init(resName, isLoading, cb): void {
        ResManage.resName = resName;
        ResManage.isLoading = isLoading;
        ResManage.cb = cb;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig(GlobalData.cdnResUrl + "resource/" + resName + ".res.json?v=" + GlobalData.version, GlobalData.cdnResUrl + "resource/");
    }
    /**
       * 配置文件加载完成,开始预加载preload资源组。
       * Loading of configuration file is complete, start to pre-load the preload resource group
       */
    export function onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        //        this.loading = new UILoadingPanel();
        //        PanelManage.tipsLayer.addChild(this.loading);
        RES.loadGroup(ResManage.resName);
    }
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    export function onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == this.resName) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            ResManage.cb();
        }
    }
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    export function onResourceLoadError(event: RES.ResourceEvent): void {
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
    export function onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == this.resName) {
            if (PanelManage.resloading) {
                PanelManage.resloading.setProgress(event.itemsLoaded, event.itemsTotal);
            }
            if (PanelManage.resloading2) {
                PanelManage.resloading2.setProgress(event.itemsLoaded, event.itemsTotal);
            }
        }
    }

    //    export function getPropsIcon(id): string {
    //        return GlobalData.base + id + ".png";
    //    }
}

