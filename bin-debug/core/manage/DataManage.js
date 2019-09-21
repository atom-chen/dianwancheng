/**
  * 协议返回信息缓存。访问10次后自动更新。
  * by fany
  * (c) copyright false,0,0,2014 - 2035
  * All Rights Reserved.
  * 快捷创建
  */
var DataManage;
(function (DataManage) {
    function addPool(key, value) {
        var obj = { num: 0, key: key, value: value };
        if (this.data == null) {
            this.data = [];
        }
        this.data[key] = obj;
    }
    DataManage.addPool = addPool;
    function getPool(key) {
        if (this.data == null) {
            this.data = [];
            return null;
        }
        if (this.data[key] == null) {
            return null;
        }
        else {
            return this.getValue(key);
        }
    }
    DataManage.getPool = getPool;
    function getValue(key) {
        var obj = this.data[key];
        if (obj.num > 10) {
            return null;
        }
        else {
            this.data[key].num += 1;
            return obj.value;
        }
    }
    DataManage.getValue = getValue;
    function updateByKey(key) {
        this.data[key] = null;
    }
    DataManage.updateByKey = updateByKey;
    function update(data) {
        if (data.msg.friend) {
            if (data.msg.friend == "1") {
            }
        }
        if (data.msg.bag) {
            if (data.msg.bag == "1") {
                this.data["bag"] = null;
            }
        }
    }
    DataManage.update = update;
})(DataManage || (DataManage = {}));
