/**
  * enterframe事件统一管理
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved. 
  * enterframe事件统一管理
  */
module EnterFrameManage {
    export var sp: egret.Sprite;
    export var eventArr: Array<any>;

    /**
    *快速创建动画
    * @param listener   要在enterframe中执行的方法
    * @param functionkey   关键KEY，用当前类加上方法名组合。比如你在类StartPanel里有个方法go,那么key是StartPanel.go    这里直接用==匹配方法对象，好像查询不到，暂时不知道原因，所以加key
    * @param rest   方法参数
    * */
    export function add(listener: Function,functionkey,...rest) {
        if(this.sp==null)
        {
            this.sp = new egret.Sprite();
            this.eventArr = [];
        }
        if(this.checkExist(functionkey) == null) {
            this.eventArr.push({ "key": functionkey,"fun": listener,"para": rest });
            if(!this.sp.hasEventListener(egret.Event.ENTER_FRAME))
            { 
                this.sp.addEventListener(egret.Event.ENTER_FRAME,this.gogo);
            }
        }
    }
    //========检测队列中是否已经存在某个侦听器===========
    export function checkExist(functionkey): any {
        var len: number = this.eventArr.length;
        for(var i: number = 0;i < len;i++) {
            if(this.eventArr[i].key == functionkey) {
                return this.eventArr[i];
            }
        }
        return null;
    }
    //======删除一个侦听器===========
    export function remove(functionkey) {
        //console.log(listener);
        var obj = this.checkExist(functionkey);
        if(obj != null) {
            var id: number = this.eventArr.indexOf(obj);
            if(id > -1) {
                this.eventArr.splice(id,1);
                if(this.eventArr.length == 0) {
                    this.sp.removeEventListener(egret.Event.ENTER_FRAME,this.gogo);
                }
            }
        }
    }
    export function gogo(evt: egret.Event) {
        var len: number = EnterFrameManage.eventArr.length;
        for(var i: number = 0;i < len;i++) {
            var obj = EnterFrameManage.eventArr[i];
            if(obj != null && obj.fun != null) {
                obj.fun.apply(null,obj.para);
            }
            else {
                EnterFrameManage.eventArr.splice(i,1);
                i--;
                len--;
                if(len == 0) {
                    EnterFrameManage.sp.removeEventListener(egret.Event.ENTER_FRAME,EnterFrameManage.gogo,this);
                    return;
                }
            }
        }
    }
}


