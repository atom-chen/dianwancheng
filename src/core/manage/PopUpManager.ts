/**
  * 面板弹出管理类
  * by dily,fany有改动
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 面板弹出的管理类
  */
module PopUpManager {
    export var data: Array<any>;
    export function managePanel(panel): void {
        PopUpManager.data = PopUpManager.data || [];
        switch(panel.isAlway) {
            case 0:
                PopUpManager.del();
                break;
            case 1:
                PopUpManager.del();
                break;
            case 2:
                break;
            case 3:
                break;
        }
        if(!PopUpManager.isHave(panel)) {
            PopUpManager.data.push(panel)
        }
        PopUpManager.data.push(panel);
    }
    export function isHave(panel): boolean {
        var len = PopUpManager.data.length;
        for(var i = 0;i < len;i++) {
            var obj = null;
            if(PopUpManager.data[i]) {
                if(PopUpManager.data[i].panel == panel.panel) {
                    obj = PopUpManager.data[i];
                }
            }
        }
        if(!obj) {
            return false;
        }
        return true;
    }
    export function del(): boolean {
        var len = PopUpManager.data.length;
        for(var i = 0;i < len;i++) {
            if(PopUpManager.data[i]) {
                if(PopUpManager.data[i].isAlway != 0) {
                    PopUpManager.removePopUp(PopUpManager.data[i].panel,0,false);
                    PopUpManager.data[i] = null;
                    PopUpManager.data.splice(i,1);
                } else {
                    if(PopUpManager.data[i].panel != PanelManage.hall) {
                        PopUpManager.data[i].panel.visible = false;
                    }
                }
            }
        }
        return true;
    }
    /**
    * 添加面板方法
    * panel       		面板
    * isAlway      	0,创建开始就一直存在,1,一级界面，可以被销毁，2，二级界面，可以被销毁，3，三级界面，可以被销毁
    * effectType        0：没有动画 1:从中间轻微弹出 2：从中间猛烈弹出  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    export function addPopUp(panel,isAlway,effectType: number = 1,parentPanel: egret.DisplayObjectContainer = PanelManage.euiLayer): void {
        if(GameConfig.curPanel == panel) {
            if(GameConfig.curPanel) {
                if(GameConfig.curPanel.visible) {
                    return;
                }
            }
        }
        PopUpManager.managePanel({ panel: panel,isAlway: isAlway });
        GameConfig.curPanelData = { panel: panel,isAlway: isAlway };
        panel.scaleX = 1;
        panel.scaleY = 1;
        panel.x = 0;
        panel.y = 0;
        panel.alpha = 1;
        if(!parentPanel.contains(panel)) {//判断是否包含panel
            parentPanel.addChild(panel);
        }
        panel.visible = true;
        GameConfig.curPanel = panel;
        var popUpWidth = 0;
        var popUpHeight = 0;
        if(popUpWidth != 0) {
            panel.x = GameConfig.curWidth() / 2 - popUpWidth / 2;
            panel.y = GameConfig.curHeight() / 2 - popUpHeight / 2;
        } else {
            popUpWidth = panel.width;
            popUpHeight = panel.height;
        }

        //以下是弹窗动画
        var leftX: number = GameConfig.curWidth() / 2 - popUpWidth / 2;
        var upY: number = GameConfig.curHeight() / 2 - popUpHeight / 2;

        switch(effectType) {
            case 0:
                break;
            case 1:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                egret.Tween.get(panel).to({ alpha: 1,scaleX: 1,scaleY: 1,x: panel.x - popUpWidth / 4,y: panel.y - popUpHeight / 4 },300,egret.Ease.backOut);
                break;
            case 2:
                panel.alpha = 0;
                panel.scaleX = 0.5;
                panel.scaleY = 0.5;
                panel.x = panel.x + popUpWidth / 4;
                panel.y = panel.y + popUpHeight / 4;
                egret.Tween.get(panel).to({ alpha: 1,scaleX: 1,scaleY: 1,x: panel.x - popUpWidth / 4,y: panel.y - popUpHeight / 4 },600,egret.Ease.elasticOut);
                break;
            case 3:
                panel.x = - popUpWidth;
                egret.Tween.get(panel).to({ x: 0 },500,egret.Ease.cubicOut);
                break;
            case 4:
                panel.x = popUpWidth;
                egret.Tween.get(panel).to({ x: 0 },500,egret.Ease.cubicOut);
                break;
            case 5:
                panel.y = - popUpHeight;
                egret.Tween.get(panel).to({ y: 0 },500,egret.Ease.cubicOut);
                break;
            case 6:
                panel.y = popUpHeight;
                egret.Tween.get(panel).to({ y: 0 },500,egret.Ease.cubicOut);
                break;
            default:
                break;
        }

    }

    /**
    * 移除面板方法
    * panel       		面板
    * isDispose         是否销毁面板
    * effectType        0：没有动画 1:从中间缩小消失 2：  3：从左向右 4：从右向左 5、从上到下 6、从下到上
    */
    export function removePopUp(panel,effectType: number = 0,isDispose = true,parentPanel = PanelManage.euiLayer): void {
        var len = PopUpManager.data.length;
        for(var i = 0;i < len;i++) {
            var view = PopUpManager.data[i];
            if(view && i != 0) {
                view.visible = false;
            }
        }
        if(panel == null) {
            return;
        }
        //以下是弹窗动画
        switch(effectType) {
            case 0:
                break;
            case 1:
                egret.Tween.get(panel).to({ alpha: 0,scaleX: 0,scaleY: 0,x: panel.x + panel.width / 2,y: panel.y + panel.height / 2 },300);
                break;
            case 2:
                break;
            case 3:
                egret.Tween.get(panel).to({ x: panel.width },500,egret.Ease.cubicOut);
                break;
            case 4:
                egret.Tween.get(panel).to({ x: -panel.width },500,egret.Ease.cubicOut);
                break;
            case 5:
                egret.Tween.get(panel).to({ y: panel.height },500,egret.Ease.cubicOut);
                break;
            case 6:
                egret.Tween.get(panel).to({ y: -panel.height },500,egret.Ease.cubicOut);
                break;
            default:
                break;
        }

        var waitTime = 500;
        if(effectType == 0) {
            waitTime = 0;
            if(isDispose) {
                EventManage.removeEvent(panel);
                if(panel.parent) {
                    panel.parent.removeChild(panel);
                    panel.removeChildren();
                }
                panel.removeChildren();
            } else {
                panel.alpha = 1;
                panel.scaleX = 1;
                panel.scaleY = 1;
                panel.visible = false;
            }
        } else {
            egret.setTimeout(function() {
                if(isDispose) {
                    EventManage.removeEvent(panel);
                    if(panel.parent) {
                        panel.parent.removeChild(panel);
                        panel.removeChildren();
                    }
                    panel.removeChildren();
                } else {
                    panel.alpha = 1;
                    panel.scaleX = 1;
                    panel.scaleY = 1;
                    panel.visible = false;
                }
            },this,waitTime);
        }
    }
}


