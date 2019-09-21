  /**
    * 网络公共类
    * by dily
    * (c) copyright 2014 - 2035
    * All Rights Reserved. 
    * 存放网络公共方法 
    * 注意：是异步请求
    */
module Network {

    export var netArr: Array<any>=[];
    //发送消息
    //url 网络地址
    //data exp "name='dily'&age:18"
    export function sendInfo(url: string = "",urlData: string = "",callback = function() { },str:string=egret.URLRequestMethod.POST):void{
        this.netArr.push({"key":url,"fun":callback});
        var loader:egret.URLLoader = new egret.URLLoader();
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        loader.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        var request:egret.URLRequest = new egret.URLRequest(url);
        request.method = str;
        request.data = new egret.URLVariables(urlData);
        loader.load(request);
    }

    //GET请求完成
    //发送消息 消息为 网址名称
    export function onGetComplete(event:egret.Event):void
    {
        var loader:egret.URLLoader = <egret.URLLoader> event.target;
        loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        var data:egret.URLVariables = loader.data;

        var notify: string = loader._request.url; 
        var variables: string = loader._request.method;
        if(!variables || variables == "post" || variables == "get")
            variables = "";
        var len = this.netArr.length;
        for(var i = 0;i < this.netArr.length; i++) {
            if(this.netArr[i].key == notify + variables)
            { 
                this.netArr[i].fun.apply(null,[data]);
                this.netArr.splice(i,1);
                break;
            }
        }
     }
}



