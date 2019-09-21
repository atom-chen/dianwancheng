/**
  * 协议返回信息缓存。访问10次后自动更新。
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved. 
  * 快捷创建
  */
module DataManage {
    export var data: Array<any>;
    export function addPool(key,value): void
    { 
        var obj = { num: 0,key: key,value: value };
        if(this.data == null)
        {
            this.data = [];
        }
        this.data[key] = obj;
    }
    export function getPool(key): any {
        if(this.data == null)
        {
            this.data = [];
            return null;
        }
        if(this.data[key]==null) {
            return null;
        } else {
            return this.getValue(key);
        }
    }
    export function getValue(key): any
    { 
        var obj = this.data[key];
        if(obj.num > 10) {
            return null;
        } else {
            this.data[key].num += 1;
            return obj.value;
        }
    }
    export function updateByKey(key): void {
        this.data[key] = null;
    }
    export function update(data): void {
        if(data.msg.friend) {
            if(data.msg.friend == "1") {
                // if(this.data['friend0'] == undefined){
                //     this.data["friend0"] = {};
                // }
                // if(this.data['friend1'] == undefined){
                //     this.data["friend1"] = {};
                // }\
                // if(this.data['friend2'] == undefined){
                //     this.data["friend2"] = {};
                // }
                // if(this.data['friend3'] == undefined){
                //     this.data["friend3"] = {};
                // }
                // this.data["friend0"] = null;
                // this.data["friend1"] = null;
                // this.data["friend2"] = null;
                // this.data["friend3"] = null;
            }
        }
        if(data.msg.bag) {
            if(data.msg.bag == "1") {
                this.data["bag"] = null;
            }
        }
    }
}

